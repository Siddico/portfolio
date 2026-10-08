const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5173;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'siddiq2026';

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers
function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return fallback;
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// Simple in-memory session tokens for admin
const activeTokens = new Set();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. Please login.' });
  }
  const token = authHeader.replace(/^Bearer\s+/, '').trim();
  if (activeTokens.has(token)) {
    next();
  } else {
    return res.status(401).json({ error: 'Invalid or expired session. Please login again.' });
  }
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes

// 1. Auth
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    activeTokens.add(token);
    res.json({ success: true, token, message: 'Logged in successfully' });
  } else {
    res.status(401).json({ success: false, error: 'Incorrect password' });
  }
});

app.get('/api/auth/check', authMiddleware, (req, res) => {
  res.json({ success: true, user: 'Mohammed Siddiq (Admin)' });
});

// 2. Settings (Theme, colors, toggles)
app.get('/api/settings', (req, res) => {
  const settings = readJson(SETTINGS_FILE, {
    primaryColor: '#2563EB',
    accentColor: '#F59E0B',
    enableScrapMood: true,
    enable3DHero: true,
    heroStatus: {
      en: 'Available for Flutter roles · Cairo / Remote',
      ar: 'متاح لفرص Flutter · متاح للعمل عن بُعد أو بالقاهرة'
    }
  });
  res.json(settings);
});

app.post('/api/settings', authMiddleware, (req, res) => {
  const updated = req.body;
  const current = readJson(SETTINGS_FILE, {});
  const merged = { ...current, ...updated };
  if (writeJson(SETTINGS_FILE, merged)) {
    res.json({ success: true, settings: merged });
  } else {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// 3. Portfolio Data
app.get('/api/portfolio', (req, res) => {
  const data = readJson(PORTFOLIO_FILE, {});
  res.json(data);
});

app.post('/api/portfolio', authMiddleware, (req, res) => {
  const data = req.body;
  if (writeJson(PORTFOLIO_FILE, data)) {
    res.json({ success: true, data });
  } else {
    res.status(500).json({ error: 'Failed to update portfolio data' });
  }
});

// 4. Projects CRUD
app.get('/api/projects', (req, res) => {
  const data = readJson(PORTFOLIO_FILE, { projects: [] });
  res.json(data.projects || []);
});

app.post('/api/projects', authMiddleware, (req, res) => {
  const newProject = req.body;
  if (!newProject.id) {
    newProject.id = 'proj_' + Date.now();
  }
  const data = readJson(PORTFOLIO_FILE, { projects: [] });
  data.projects = data.projects || [];
  data.projects.unshift(newProject);
  
  if (writeJson(PORTFOLIO_FILE, data)) {
    res.json({ success: true, project: newProject });
  } else {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedProject = req.body;
  const data = readJson(PORTFOLIO_FILE, { projects: [] });
  const index = (data.projects || []).findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  data.projects[index] = { ...data.projects[index], ...updatedProject, id };
  if (writeJson(PORTFOLIO_FILE, data)) {
    res.json({ success: true, project: data.projects[index] });
  } else {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const data = readJson(PORTFOLIO_FILE, { projects: [] });
  const filtered = (data.projects || []).filter(p => p.id !== id);

  data.projects = filtered;
  if (writeJson(PORTFOLIO_FILE, data)) {
    res.json({ success: true, message: 'Project removed successfully' });
  } else {
    res.status(500).json({ error: 'Failed to remove project' });
  }
});

// 4b. Skills CRUD
app.get('/api/skills', (req, res) => {
  const data = readJson(PORTFOLIO_FILE, { skills: [] });
  res.json(data.skills || []);
});

app.post('/api/skills', authMiddleware, (req, res) => {
  const item = req.body;
  if (!item.id) item.id = 'skill_' + Date.now();
  const data = readJson(PORTFOLIO_FILE, {});
  data.skills = data.skills || [];
  data.skills.push(item);
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, item });
  else res.status(500).json({ error: 'Failed to add skill group' });
});

app.put('/api/skills/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const data = readJson(PORTFOLIO_FILE, {});
  data.skills = data.skills || [];
  const idx = data.skills.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Skill group not found' });
  data.skills[idx] = { ...data.skills[idx], ...updated, id };
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, item: data.skills[idx] });
  else res.status(500).json({ error: 'Failed to update skill group' });
});

app.delete('/api/skills/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const data = readJson(PORTFOLIO_FILE, {});
  data.skills = (data.skills || []).filter(s => s.id !== id);
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true });
  else res.status(500).json({ error: 'Failed to remove skill group' });
});

// 4c. Certifications CRUD
app.get('/api/certs', (req, res) => {
  const data = readJson(PORTFOLIO_FILE, { certs: [] });
  res.json(data.certs || []);
});

app.post('/api/certs', authMiddleware, (req, res) => {
  const cert = req.body;
  if (!cert.id) cert.id = 'cert_' + Date.now();
  const data = readJson(PORTFOLIO_FILE, {});
  data.certs = data.certs || [];
  data.certs.unshift(cert);
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, cert });
  else res.status(500).json({ error: 'Failed to add certificate' });
});

app.put('/api/certs/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const data = readJson(PORTFOLIO_FILE, {});
  data.certs = data.certs || [];
  const idx = data.certs.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Certificate not found' });
  data.certs[idx] = { ...data.certs[idx], ...updated, id };
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, cert: data.certs[idx] });
  else res.status(500).json({ error: 'Failed to update certificate' });
});

app.delete('/api/certs/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const data = readJson(PORTFOLIO_FILE, {});
  data.certs = (data.certs || []).filter(c => c.id !== id);
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true });
  else res.status(500).json({ error: 'Failed to remove certificate' });
});

// 4d. Visibility & Scrapbook controls
app.post('/api/visibility', authMiddleware, (req, res) => {
  const visibility = req.body;
  const data = readJson(PORTFOLIO_FILE, {});
  data.sectionVisibility = { ...(data.sectionVisibility || {}), ...visibility };
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, sectionVisibility: data.sectionVisibility });
  else res.status(500).json({ error: 'Failed to update visibility' });
});

app.post('/api/scrapbook', authMiddleware, (req, res) => {
  const scrapbookSettings = req.body;
  const data = readJson(PORTFOLIO_FILE, {});
  data.scrapbookSettings = { ...(data.scrapbookSettings || {}), ...scrapbookSettings };
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, scrapbookSettings: data.scrapbookSettings });
  else res.status(500).json({ error: 'Failed to update scrapbook settings' });
});

// 4e. Activities CRUD
app.get('/api/activities', (req, res) => {
  const data = readJson(PORTFOLIO_FILE, { activities: [] });
  res.json(data.activities || []);
});

app.post('/api/activities', authMiddleware, (req, res) => {
  const act = req.body;
  if (!act.id) act.id = 'act_' + Date.now();
  const data = readJson(PORTFOLIO_FILE, {});
  data.activities = data.activities || [];
  data.activities.unshift(act);
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, activity: act });
  else res.status(500).json({ error: 'Failed to add activity' });
});

app.delete('/api/activities/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const data = readJson(PORTFOLIO_FILE, {});
  data.activities = (data.activities || []).filter(a => a.id !== id);
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true });
  else res.status(500).json({ error: 'Failed to remove activity' });
});

// 4f. Section Order
app.post('/api/section-order', authMiddleware, (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order)) return res.status(400).json({ error: 'Order must be an array' });
  const data = readJson(PORTFOLIO_FILE, {});
  data.sectionOrder = order;
  if (writeJson(PORTFOLIO_FILE, data)) res.json({ success: true, sectionOrder: order });
  else res.status(500).json({ error: 'Failed to save section order' });
});

// 5. Contact Inquiries & Messages
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const messages = readJson(MESSAGES_FILE, []);
  const newMsg = {
    id: 'msg_' + Date.now(),
    name: String(name).slice(0, 100),
    email: String(email).slice(0, 150),
    message: String(message).slice(0, 3000),
    date: new Date().toISOString(),
    read: false
  };

  messages.unshift(newMsg);
  if (writeJson(MESSAGES_FILE, messages)) {
    res.json({ success: true, message: 'Message sent successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

app.get('/api/messages', authMiddleware, (req, res) => {
  const messages = readJson(MESSAGES_FILE, []);
  res.json(messages);
});

app.delete('/api/messages/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const messages = readJson(MESSAGES_FILE, []);
  const filtered = messages.filter(m => m.id !== id);
  if (writeJson(MESSAGES_FILE, filtered)) {
    res.json({ success: true, message: 'Message deleted' });
  } else {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// 6. AI Assistant Conversations
const AI_LOGS_FILE = path.join(DATA_DIR, 'ai_chats.json');

app.post('/api/ai/log', (req, res) => {
  const { question, answer, lang, metadata } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'Question and answer required' });
  const logs = readJson(AI_LOGS_FILE, []);
  const item = {
    id: 'ai_' + Date.now(),
    question: String(question).slice(0, 1500),
    answer: String(answer).slice(0, 3000),
    lang: lang || 'ar',
    metadata: metadata || {},
    created_at: new Date().toISOString()
  };
  logs.unshift(item);
  writeJson(AI_LOGS_FILE, logs);
  res.json({ success: true, item });
});

app.get('/api/ai/logs', authMiddleware, (req, res) => {
  const logs = readJson(AI_LOGS_FILE, []);
  res.json(logs);
});

app.delete('/api/ai/logs/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const logs = readJson(AI_LOGS_FILE, []);
  const filtered = logs.filter(l => l.id !== id);
  writeJson(AI_LOGS_FILE, filtered);
  res.json({ success: true });
});

// Serve Admin Dashboard page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve static assets and index.html
app.use(express.static(path.join(__dirname)));

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Mohammed Siddiq Portfolio & Backend Running!`);
  console.log(`🌐 Portfolio URL: http://localhost:${PORT}`);
  console.log(`⚙️  Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`🔑 Default Admin Password: ${ADMIN_PASSWORD}`);
  console.log(`====================================================`);
});
