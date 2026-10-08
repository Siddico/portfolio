const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const suitPhotoPath = path.join(rootDir, 'assets', 'img', 'me', 'hero-suit.png');
const outputHtmlPath = path.join(rootDir, 'scripts', 'og_card.html');
const outputPngPath = path.join(rootDir, 'assets', 'img', 'og-preview.png');

console.log('Generating Open Graph 1200x630 banner...');

// Read hero photo as base64
let heroBase64 = '';
if (fs.existsSync(suitPhotoPath)) {
  const photoBuf = fs.readFileSync(suitPhotoPath);
  heroBase64 = `data:image/png;base64,${photoBuf.toString('base64')}`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: #090D18;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #F8FAFC;
    position: relative;
  }

  /* Deep tech background with glowing meshes */
  .bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 25%, rgba(37, 99, 235, 0.32) 0%, transparent 45%),
      radial-gradient(circle at 85% 75%, rgba(245, 158, 11, 0.22) 0%, transparent 40%),
      radial-gradient(circle at 75% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
      linear-gradient(135deg, #070B14 0%, #0B1120 50%, #080D1A 100%);
    z-index: 1;
  }

  /* Grid overlay pattern */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 36px 36px;
    z-index: 2;
    mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 95%);
    -webkit-mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 95%);
  }

  .card-container {
    position: relative;
    z-index: 10;
    width: 1200px;
    height: 630px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 56px 64px 48px;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
  }

  /* Left column */
  .left-col {
    flex: 1;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 12;
  }

  .top-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .badge-role {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(37, 99, 235, 0.18);
    border: 1.5px solid rgba(59, 130, 246, 0.45);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #60A5FA;
  }

  .badge-domain {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: #94A3B8;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10B981;
    box-shadow: 0 0 10px #10B981;
  }

  .hero-text {
    margin-top: 18px;
  }

  .name {
    font-size: 58px;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.035em;
    background: linear-gradient(135deg, #FFFFFF 30%, #BAE6FD 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
  }

  .tagline {
    font-size: 23px;
    line-height: 1.35;
    font-weight: 600;
    color: #94A3B8;
    max-width: 580px;
    margin-bottom: 24px;
  }

  .tagline b {
    color: #38BDF8;
    font-weight: 700;
  }

  /* Skills pills */
  .skills-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 28px;
  }

  .skill-pill {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #E2E8F0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .skill-pill.highlight {
    background: rgba(37, 99, 235, 0.22);
    border-color: rgba(59, 130, 246, 0.5);
    color: #93C5FD;
  }

  /* Stats footer row */
  .stats-row {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
  }

  .stat-val {
    font-size: 26px;
    font-weight: 900;
    color: #F8FAFC;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .stat-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748B;
    margin-top: 3px;
  }

  /* Right column: Person portrait & badges */
  .right-col {
    position: relative;
    width: 440px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .portrait-glow {
    position: absolute;
    width: 380px;
    height: 480px;
    bottom: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 75%);
    filter: blur(28px);
    z-index: 1;
  }

  .portrait-frame {
    position: absolute;
    bottom: -48px;
    right: 10px;
    width: 420px;
    height: 560px;
    z-index: 5;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .portrait-img {
    height: 560px;
    max-width: none;
    object-fit: contain;
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7));
  }

  /* Floating UI tag */
  .floating-badge {
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 15;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    padding: 12px 18px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .fl-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #02569B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 19px;
    color: #fff;
    box-shadow: 0 4px 12px rgba(2, 86, 155, 0.4);
  }

  .fl-text h4 {
    font-size: 14px;
    font-weight: 800;
    color: #F8FAFC;
    margin-bottom: 2px;
  }

  .fl-text p {
    font-size: 11px;
    font-weight: 600;
    color: #94A3B8;
  }

  .bottom-badge {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 15;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(16, 185, 129, 0.4);
    border-radius: 12px;
    padding: 8px 14px;
    box-shadow: 0 10px 24px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #34D399;
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="grid-pattern"></div>

  <div class="card-container">
    <!-- Left Column -->
    <div class="left-col">
      <div>
        <div class="top-meta">
          <div class="badge-role">
            <span>⚡ Flutter & Software Engineer</span>
          </div>
          <div class="badge-domain">
            <span class="dot"></span>
            <span>siddico.github.io/portfolio</span>
          </div>
        </div>

        <div class="hero-text">
          <h1 class="name">Mohammed Siddiq</h1>
          <p class="tagline">
            Building <b>production-grade</b>, scalable mobile apps with Clean Architecture, AI integration, and fluid UX.
          </p>
        </div>

        <div class="skills-row">
          <div class="skill-pill highlight">📱 Flutter & Dart</div>
          <div class="skill-pill">🏛️ Clean Architecture</div>
          <div class="skill-pill">⚡ BLoC & Riverpod</div>
          <div class="skill-pill">🔥 Firebase & Supabase</div>
          <div class="skill-pill">🤖 Gemini AI</div>
          <div class="skill-pill">🚀 App Store & Play Store</div>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-val">+2 Years</span>
          <span class="stat-label">Experience</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">+4 Apps</span>
          <span class="stat-label">Production Ready</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">100%</span>
          <span class="stat-label">Clean Code</span>
        </div>
        <div class="stat-item">
          <span class="stat-val">Cairo / Remote</span>
          <span class="stat-label">Available for Hire</span>
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="right-col">
      <div class="portrait-glow"></div>
      
      <div class="floating-badge">
        <div class="fl-icon">F</div>
        <div class="fl-text">
          <h4>Flutter Specialist</h4>
          <p>Pixel-Perfect · iOS & Android</p>
        </div>
      </div>

      <div class="portrait-frame">
        <img class="portrait-img" src="${heroBase64}" alt="Mohammed Siddiq">
      </div>

      <div class="bottom-badge">
        <span>●</span>
        <span>Open to Opportunities</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(outputHtmlPath, html, 'utf8');
console.log('Saved og_card.html at:', outputHtmlPath);

// Render using Microsoft Edge headless
const edgeExe = path.join('C:', 'Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe');
if (fs.existsSync(edgeExe)) {
  const fileUrl = `file:///${outputHtmlPath.replace(/\\/g, '/')}`;
  const cmd = `"${edgeExe}" --headless --disable-gpu --window-size=1200,630 --screenshot="${outputPngPath}" "${fileUrl}"`;
  console.log('Running Edge screenshot capture...');
  try {
    execSync(cmd, { stdio: 'inherit' });
    if (fs.existsSync(outputPngPath)) {
      const stats = fs.statSync(outputPngPath);
      console.log(`Successfully generated og-preview.png! Size: ${stats.size} bytes`);
    } else {
      console.error('Failed to create output PNG.');
    }
  } catch (err) {
    console.error('Error running Edge screenshot:', err);
  }
} else {
  console.warn('Edge executable not found at standard path.');
}
