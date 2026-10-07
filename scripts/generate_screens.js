const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'img', 'screens');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function createSvg(title, bgGradient, contentSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 1200" width="540" height="1200">
  <defs>
    <linearGradient id="screenBg" x1="0" y1="0" x2="0" y2="1">
      ${bgGradient}
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="540" height="1200" rx="44" fill="url(#screenBg)"/>
  
  <!-- Status bar -->
  <g fill="#ffffff" opacity="0.9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
    <text x="52" y="52" font-size="20" font-weight="700">9:41</text>
    <circle cx="440" cy="46" r="4.5"/>
    <circle cx="454" cy="46" r="4.5"/>
    <circle cx="468" cy="46" r="4.5"/>
    <rect x="486" y="38" width="28" height="15" rx="4" fill="none" stroke="#fff" stroke-width="2.5"/>
    <rect x="490" y="42" width="16" height="7" rx="2" fill="#fff"/>
  </g>

  <!-- App Header -->
  <g transform="translate(40, 85)">
    <rect x="0" y="0" width="460" height="60" rx="16" fill="url(#cardGrad)"/>
    <circle cx="36" cy="30" r="18" fill="#ffffff" fill-opacity="0.15"/>
    <path d="M40 22 L30 30 L40 38" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
    <text x="76" y="38" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="700">${title}</text>
    <circle cx="424" cy="30" r="18" fill="#ffffff" fill-opacity="0.15"/>
    <circle cx="424" cy="30" r="4" fill="#ffffff"/>
  </g>

  ${contentSvg}

  <!-- Bottom Navigation Bar -->
  <g transform="translate(40, 1100)">
    <rect x="0" y="0" width="460" height="68" rx="34" fill="#12131A" filter="url(#shadow)"/>
    <circle cx="80" cy="34" r="22" fill="#3B82F6" fill-opacity="0.2"/>
    <circle cx="80" cy="34" r="8" fill="#3B82F6"/>
    <circle cx="180" cy="34" r="8" fill="#6B7280"/>
    <circle cx="280" cy="34" r="8" fill="#6B7280"/>
    <circle cx="380" cy="34" r="8" fill="#6B7280"/>
  </g>
</svg>`;
}

// 1. BrainGuard Home
const brainguardHome = createSvg('BrainGuard AI', 
  `<stop offset="0%" stop-color="#0B132B"/><stop offset="100%" stop-color="#1C2541"/>`,
  `
  <!-- Vitals Card -->
  <g transform="translate(40, 170)" filter="url(#shadow)">
    <rect width="460" height="230" rx="24" fill="#1E293B"/>
    <rect x="24" y="24" width="110" height="32" rx="16" fill="#3B82F6" fill-opacity="0.2"/>
    <text x="44" y="46" fill="#60A5FA" font-size="15" font-weight="700">PATIENT V2</text>
    <text x="24" y="95" fill="#94A3B8" font-size="16">Stroke Risk Index</text>
    <text x="24" y="150" fill="#10B981" font-size="46" font-weight="800">Low · 12%</text>
    <text x="24" y="185" fill="#64748B" font-size="14">AI assessment updated 5m ago via PPG</text>
    <!-- Circular gauge -->
    <circle cx="370" cy="115" r="55" stroke="#334155" stroke-width="12" fill="none"/>
    <circle cx="370" cy="115" r="55" stroke="#10B981" stroke-width="12" fill="none" stroke-dasharray="290 60" stroke-linecap="round"/>
    <text x="370" y="122" fill="#fff" font-size="22" font-weight="700" text-anchor="middle">88%</text>
    <text x="370" y="142" fill="#94A3B8" font-size="12" text-anchor="middle">SAFE</text>
  </g>

  <!-- Live PPG Signal Card -->
  <g transform="translate(40, 425)" filter="url(#shadow)">
    <rect width="460" height="210" rx="24" fill="#1E293B"/>
    <text x="24" y="38" fill="#F8FAFC" font-size="18" font-weight="700">Real-Time PPG Signal Analysis</text>
    <text x="24" y="62" fill="#64748B" font-size="13">Streaming from .mat Bio-Sensor</text>
    <!-- Pulse Wave -->
    <path d="M 30 140 Q 60 140 80 135 T 120 140 T 150 90 T 170 170 T 190 60 T 210 160 T 230 135 T 280 140 T 320 85 T 340 175 T 360 65 T 380 160 T 420 140" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="round"/>
    <rect x="24" y="165" width="90" height="26" rx="8" fill="#EC4899" fill-opacity="0.2"/>
    <text x="40" y="183" fill="#F472B6" font-size="13" font-weight="700">74 BPM</text>
    <text x="130" y="183" fill="#94A3B8" font-size="13">Normal Sinus Rhythm</text>
  </g>

  <!-- Gemini AI Health Assistant Card -->
  <g transform="translate(40, 660)" filter="url(#shadow)">
    <rect width="460" height="190" rx="24" fill="url(#cardGrad)" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
    <circle cx="56" cy="50" r="22" fill="#38BDF8" fill-opacity="0.2"/>
    <text x="56" y="58" fill="#38BDF8" font-size="20" text-anchor="middle">✨</text>
    <text x="96" y="46" fill="#F8FAFC" font-size="18" font-weight="700">Gemini Clinical Bot</text>
    <text x="96" y="68" fill="#38BDF8" font-size="13">AI Doctor Consultation</text>
    <rect x="24" y="95" width="412" height="70" rx="14" fill="#0F172A" fill-opacity="0.6"/>
    <text x="44" y="125" fill="#E2E8F0" font-size="14">"Patient vitals indicate optimal vascular response."</text>
    <text x="44" y="148" fill="#64748B" font-size="13">Tap to analyze prescriptions via OCR ➔</text>
  </g>

  <!-- Doctor Pairing status -->
  <g transform="translate(40, 875)">
    <rect width="460" height="90" rx="20" fill="#1E293B"/>
    <circle cx="50" cy="45" r="24" fill="#10B981" fill-opacity="0.2"/>
    <text x="50" y="52" fill="#10B981" font-size="18" text-anchor="middle">🩺</text>
    <text x="90" y="38" fill="#F8FAFC" font-size="16" font-weight="600">Connected to Dr. Ahmed Samir</text>
    <text x="90" y="62" fill="#10B981" font-size="13">Live Tele-Monitoring Active · QR Paired</text>
  </g>
  `
);

// 2. BrainGuard AI Analysis Screen
const brainguardAi = createSvg('AI Risk Engine',
  `<stop offset="0%" stop-color="#090D1A"/><stop offset="100%" stop-color="#141E33"/>`,
  `
  <g transform="translate(40, 170)" filter="url(#shadow)">
    <rect width="460" height="280" rx="24" fill="#1B2438"/>
    <text x="24" y="42" fill="#94A3B8" font-size="15" font-weight="600">MULTIMODAL DEEP LEARNING</text>
    <text x="24" y="75" fill="#FFFFFF" font-size="24" font-weight="800">EHR &amp; PPG Prediction</text>
    
    <rect x="24" y="105" width="412" height="60" rx="14" fill="#0F172A"/>
    <text x="44" y="132" fill="#94A3B8" font-size="13">Model Architecture</text>
    <text x="44" y="152" fill="#38BDF8" font-size="15" font-weight="700">ResNet + BiLSTM + Gemini Clinical NLP</text>

    <rect x="24" y="185" width="195" height="70" rx="14" fill="#0F172A"/>
    <text x="40" y="212" fill="#94A3B8" font-size="13">Accuracy</text>
    <text x="40" y="240" fill="#10B981" font-size="24" font-weight="800">96.8%</text>

    <rect x="240" y="185" width="195" height="70" rx="14" fill="#0F172A"/>
    <text x="256" y="212" fill="#94A3B8" font-size="13">Latency</text>
    <text x="256" y="240" fill="#F59E0B" font-size="24" font-weight="800">140 ms</text>
  </g>

  <!-- Prediction Output Timeline -->
  <g transform="translate(40, 475)" filter="url(#shadow)">
    <rect width="460" height="420" rx="24" fill="#1B2438"/>
    <text x="24" y="40" fill="#FFFFFF" font-size="20" font-weight="700">Historical Biomarkers</text>
    
    <g transform="translate(24, 70)">
      <rect width="412" height="85" rx="14" fill="#0F172A"/>
      <circle cx="36" cy="42" r="16" fill="#10B981" fill-opacity="0.2"/>
      <text x="36" y="48" fill="#10B981" font-size="15" text-anchor="middle">✓</text>
      <text x="70" y="35" fill="#FFFFFF" font-size="16" font-weight="600">PPG Mat File Stream #108</text>
      <text x="70" y="60" fill="#94A3B8" font-size="13">No ischemic episode detected</text>
      <text x="330" y="38" fill="#64748B" font-size="13">Today 14:20</text>
    </g>

    <g transform="translate(24, 175)">
      <rect width="412" height="85" rx="14" fill="#0F172A"/>
      <circle cx="36" cy="42" r="16" fill="#3B82F6" fill-opacity="0.2"/>
      <text x="36" y="48" fill="#3B82F6" font-size="15" text-anchor="middle">i</text>
      <text x="70" y="35" fill="#FFFFFF" font-size="16" font-weight="600">OCR Prescription Parsed</text>
      <text x="70" y="60" fill="#94A3B8" font-size="13">Aspirin 81mg &amp; Atorvastatin 20mg</text>
      <text x="330" y="38" fill="#64748B" font-size="13">Yesterday</text>
    </g>

    <g transform="translate(24, 280)">
      <rect width="412" height="85" rx="14" fill="#0F172A"/>
      <circle cx="36" cy="42" r="16" fill="#F59E0B" fill-opacity="0.2"/>
      <text x="36" y="48" fill="#F59E0B" font-size="15" text-anchor="middle">!</text>
      <text x="70" y="35" fill="#FFFFFF" font-size="16" font-weight="600">EHR Systolic Variation</text>
      <text x="70" y="60" fill="#94A3B8" font-size="13">Mild spike logged · Notified doctor</text>
      <text x="330" y="38" fill="#64748B" font-size="13">3 days ago</text>
    </g>
  </g>
  `
);

// 3. Biscofa Menu & Ordering Screen
const biscofaHome = createSvg('Biscofa Specialty Café',
  `<stop offset="0%" stop-color="#2D1B14"/><stop offset="100%" stop-color="#1A0F0A"/>`,
  `
  <!-- Loyalty Card -->
  <g transform="translate(40, 170)" filter="url(#shadow)">
    <rect width="460" height="210" rx="24" fill="linear-gradient(135deg, #B45309, #78350F)"/>
    <text x="30" y="45" fill="#FDE68A" font-size="15" font-weight="700">BISCOFA REWARDS</text>
    <text x="30" y="95" fill="#FFFFFF" font-size="36" font-weight="800">480 Points</text>
    <text x="30" y="130" fill="#FEF3C7" font-size="14">You are only 20 pts away from a free Flat White!</text>
    <rect x="30" y="155" width="400" height="12" rx="6" fill="#000000" fill-opacity="0.3"/>
    <rect x="30" y="155" width="340" height="12" rx="6" fill="#FBBF24"/>
  </g>

  <!-- Categories -->
  <g transform="translate(40, 410)">
    <rect x="0" y="0" width="105" height="42" rx="21" fill="#D97706"/>
    <text x="52" y="26" fill="#FFF" font-size="14" font-weight="700" text-anchor="middle">☕ Coffee</text>
    <rect x="115" y="0" width="105" height="42" rx="21" fill="#3B2519"/>
    <text x="167" y="26" fill="#D1D5DB" font-size="14" font-weight="600" text-anchor="middle">Cold Brew</text>
    <rect x="230" y="0" width="105" height="42" rx="21" fill="#3B2519"/>
    <text x="282" y="26" fill="#D1D5DB" font-size="14" font-weight="600" text-anchor="middle">Desserts</text>
    <rect x="345" y="0" width="105" height="42" rx="21" fill="#3B2519"/>
    <text x="397" y="26" fill="#D1D5DB" font-size="14" font-weight="600" text-anchor="middle">Bakery</text>
  </g>

  <!-- Products grid -->
  <g transform="translate(40, 480)" filter="url(#shadow)">
    <!-- Item 1 -->
    <rect width="218" height="270" rx="20" fill="#291811"/>
    <circle cx="109" cy="80" r="50" fill="#452718"/>
    <text x="109" y="90" fill="#FFF" font-size="34" text-anchor="middle">☕</text>
    <text x="20" y="165" fill="#FFFFFF" font-size="17" font-weight="700">Spanish Latte</text>
    <text x="20" y="190" fill="#9CA3AF" font-size="13">Sweet condensed milk</text>
    <text x="20" y="235" fill="#FBBF24" font-size="20" font-weight="800">85 EGP</text>
    <circle cx="185" cy="230" r="18" fill="#D97706"/>
    <text x="185" y="237" fill="#FFF" font-size="18" font-weight="700" text-anchor="middle">+</text>

    <!-- Item 2 -->
    <rect x="242" width="218" height="270" rx="20" fill="#291811"/>
    <circle cx="351" cy="80" r="50" fill="#452718"/>
    <text x="351" y="90" fill="#FFF" font-size="34" text-anchor="middle">🥤</text>
    <text x="262" y="165" fill="#FFFFFF" font-size="17" font-weight="700">Iced Pistachio</text>
    <text x="262" y="190" fill="#9CA3AF" font-size="13">Creamy artisan blend</text>
    <text x="262" y="235" fill="#FBBF24" font-size="20" font-weight="800">110 EGP</text>
    <circle cx="427" cy="230" r="18" fill="#D97706"/>
    <text x="427" y="237" fill="#FFF" font-size="18" font-weight="700" text-anchor="middle">+</text>
  </g>

  <!-- Live Active Order Bar -->
  <g transform="translate(40, 780)" filter="url(#shadow)">
    <rect width="460" height="100" rx="20" fill="#3B2519" stroke="#D97706" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="22" fill="#D97706"/>
    <text x="50" y="58" fill="#FFF" font-size="18" text-anchor="middle">🚚</text>
    <text x="90" y="42" fill="#FFFFFF" font-size="16" font-weight="700">Order #842 is on the way</text>
    <text x="90" y="66" fill="#FBBF24" font-size="13">Estimated arrival in 8 mins · Live GPS</text>
  </g>
  `
);

// 4. Biscofa Admin Dashboard
const biscofaAdmin = createSvg('Biscofa Admin Portal',
  `<stop offset="0%" stop-color="#18181B"/><stop offset="100%" stop-color="#09090B"/>`,
  `
  <g transform="translate(40, 170)">
    <!-- KPI 1 -->
    <rect width="218" height="130" rx="20" fill="#27272A"/>
    <text x="20" y="38" fill="#A1A1AA" font-size="14">Today's Revenue</text>
    <text x="20" y="80" fill="#10B981" font-size="28" font-weight="800">28,450 EGP</text>
    <text x="20" y="108" fill="#10B981" font-size="13">▲ +18.4% vs yesterday</text>

    <!-- KPI 2 -->
    <rect x="242" width="218" height="130" rx="20" fill="#27272A"/>
    <text x="262" y="38" fill="#A1A1AA" font-size="14">Active Orders</text>
    <text x="262" y="80" fill="#38BDF8" font-size="28" font-weight="800">42 Orders</text>
    <text x="262" y="108" fill="#94A3B8" font-size="13">7 in preparation</text>
  </g>

  <!-- Live Orders Queue -->
  <g transform="translate(40, 330)" filter="url(#shadow)">
    <rect width="460" height="400" rx="24" fill="#27272A"/>
    <text x="24" y="42" fill="#FFFFFF" font-size="20" font-weight="700">Live Orders Management</text>
    
    <g transform="translate(20, 70)">
      <rect width="420" height="85" rx="14" fill="#18181B"/>
      <text x="20" y="35" fill="#FFFFFF" font-size="16" font-weight="700">#ORD-902 · Amr Khaled</text>
      <text x="20" y="60" fill="#A1A1AA" font-size="13">2x Flat White, 1x Croissant · 210 EGP</text>
      <rect x="310" y="24" width="90" height="36" rx="10" fill="#10B981"/>
      <text x="355" y="47" fill="#FFF" font-size="13" font-weight="700" text-anchor="middle">Ready</text>
    </g>

    <g transform="translate(20, 170)">
      <rect width="420" height="85" rx="14" fill="#18181B"/>
      <text x="20" y="35" fill="#FFFFFF" font-size="16" font-weight="700">#ORD-903 · Sarah Nour</text>
      <text x="20" y="60" fill="#A1A1AA" font-size="13">1x V60 Colombia · 95 EGP</text>
      <rect x="310" y="24" width="90" height="36" rx="10" fill="#F59E0B"/>
      <text x="355" y="47" fill="#FFF" font-size="13" font-weight="700" text-anchor="middle">Brewing</text>
    </g>

    <g transform="translate(20, 270)">
      <rect width="420" height="85" rx="14" fill="#18181B"/>
      <text x="20" y="35" fill="#FFFFFF" font-size="16" font-weight="700">#ORD-904 · Tarek Mostafa</text>
      <text x="20" y="60" fill="#A1A1AA" font-size="13">3x Iced Latte, 2x Cheesecake</text>
      <rect x="310" y="24" width="90" height="36" rx="10" fill="#3B82F6"/>
      <text x="355" y="47" fill="#FFF" font-size="13" font-weight="700" text-anchor="middle">Accepted</text>
    </g>
  </g>
  `
);

// 5. Al Hayah Shareholders App
const alhayahHome = createSvg('Al Hayah Hospital',
  `<stop offset="0%" stop-color="#0F2D2E"/><stop offset="100%" stop-color="#081819"/>`,
  `
  <!-- Shareholder VIP Card -->
  <g transform="translate(40, 170)" filter="url(#shadow)">
    <rect width="460" height="230" rx="24" fill="linear-gradient(135deg, #0D9488, #115E59)"/>
    <text x="30" y="45" fill="#CCFBF1" font-size="14" font-weight="700">PREMIUM SHAREHOLDER CARD</text>
    <text x="30" y="90" fill="#FFFFFF" font-size="24" font-weight="700">Eng. Mohammed Siddiq</text>
    <text x="30" y="118" fill="#99F6E4" font-size="14">ID: SH-20491 · Shares: 1,250</text>
    <rect x="30" y="150" width="140" height="34" rx="17" fill="#042F2E" fill-opacity="0.4"/>
    <text x="100" y="172" fill="#5EEAD4" font-size="13" font-weight="700" text-anchor="middle">40% VIP DISCOUNT</text>
    <circle cx="390" cy="115" r="40" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="390" y="125" fill="#CCFBF1" font-size="28" text-anchor="middle">🏥</text>
  </g>

  <!-- Shareholder Services -->
  <g transform="translate(40, 430)">
    <rect width="460" height="340" rx="24" fill="#133E3F"/>
    <text x="24" y="40" fill="#FFFFFF" font-size="20" font-weight="700">Shareholder Privileges</text>
    
    <g transform="translate(20, 65)">
      <rect width="195" height="110" rx="16" fill="#0A2526"/>
      <text x="20" y="40" fill="#2DD4BF" font-size="22">📅</text>
      <text x="20" y="70" fill="#FFFFFF" font-size="15" font-weight="700">VIP Clinic Booking</text>
      <text x="20" y="92" fill="#99F6E4" font-size="12">Priority consultants</text>
    </g>

    <g transform="translate(245, 65)">
      <rect width="195" height="110" rx="16" fill="#0A2526"/>
      <text x="20" y="40" fill="#2DD4BF" font-size="22">💰</text>
      <text x="20" y="70" fill="#FFFFFF" font-size="15" font-weight="700">Annual Dividends</text>
      <text x="20" y="92" fill="#99F6E4" font-size="12">Realtime payout log</text>
    </g>

    <g transform="translate(20, 195)">
      <rect width="195" height="110" rx="16" fill="#0A2526"/>
      <text x="20" y="40" fill="#2DD4BF" font-size="22">📑</text>
      <text x="20" y="70" fill="#FFFFFF" font-size="15" font-weight="700">Financial Reports</text>
      <text x="20" y="92" fill="#99F6E4" font-size="12">Quarterly audits</text>
    </g>

    <g transform="translate(245, 195)">
      <rect width="195" height="110" rx="16" fill="#0A2526"/>
      <text x="20" y="40" fill="#2DD4BF" font-size="22">💬</text>
      <text x="20" y="70" fill="#FFFFFF" font-size="15" font-weight="700">Direct Support</text>
      <text x="20" y="92" fill="#99F6E4" font-size="12">Dedicated board liaison</text>
    </g>
  </g>
  `
);

// 6. Event Time Management
const eventHome = createSvg('Event Time Manager',
  `<stop offset="0%" stop-color="#1E1B4B"/><stop offset="100%" stop-color="#0F0E26"/>`,
  `
  <!-- Active Conference Badge -->
  <g transform="translate(40, 170)" filter="url(#shadow)">
    <rect width="460" height="230" rx="24" fill="linear-gradient(135deg, #6366F1, #4338CA)"/>
    <text x="30" y="45" fill="#E0E7FF" font-size="14" font-weight="700">LIVE EVENT PORTAL</text>
    <text x="30" y="90" fill="#FFFFFF" font-size="24" font-weight="800">Tech Summit Cairo 2026</text>
    <text x="30" y="120" fill="#C7D2FE" font-size="14">Grand Nile Hall · 850 Registered</text>
    <rect x="30" y="150" width="180" height="38" rx="19" fill="#312E81"/>
    <text x="120" y="174" fill="#FFFFFF" font-size="14" font-weight="700" text-anchor="middle">Scan Check-in QR ➔</text>
  </g>

  <!-- Live Attendee Statistics -->
  <g transform="translate(40, 430)">
    <rect width="218" height="120" rx="20" fill="#282566"/>
    <text x="20" y="38" fill="#C7D2FE" font-size="14">Checked In</text>
    <text x="20" y="80" fill="#34D399" font-size="32" font-weight="800">642 / 850</text>
    <text x="20" y="105" fill="#A5B4FC" font-size="13">75.5% attendance rate</text>

    <rect x="242" width="218" height="120" rx="20" fill="#282566"/>
    <text x="262" y="38" fill="#C7D2FE" font-size="14">Live Sessions</text>
    <text x="262" y="80" fill="#F472B6" font-size="32" font-weight="800">4 Stages</text>
    <text x="262" y="105" fill="#A5B4FC" font-size="13">Flutter &amp; AI Tracks</text>
  </g>

  <!-- Attendee checkin queue -->
  <g transform="translate(40, 580)" filter="url(#shadow)">
    <rect width="460" height="280" rx="24" fill="#282566"/>
    <text x="24" y="42" fill="#FFFFFF" font-size="20" font-weight="700">Recent Registrations</text>
    
    <g transform="translate(20, 65)">
      <rect width="420" height="55" rx="12" fill="#1E1B4B"/>
      <circle cx="28" cy="28" r="8" fill="#10B981"/>
      <text x="50" y="34" fill="#FFFFFF" font-size="15" font-weight="600">Karim El-Sayed · VIP Pass</text>
      <text x="340" y="34" fill="#10B981" font-size="13">Checked in</text>
    </g>

    <g transform="translate(20, 130)">
      <rect width="420" height="55" rx="12" fill="#1E1B4B"/>
      <circle cx="28" cy="28" r="8" fill="#10B981"/>
      <text x="50" y="34" fill="#FFFFFF" font-size="15" font-weight="600">Mariam Adel · Speaker</text>
      <text x="340" y="34" fill="#10B981" font-size="13">Checked in</text>
    </g>

    <g transform="translate(20, 195)">
      <rect width="420" height="55" rx="12" fill="#1E1B4B"/>
      <circle cx="28" cy="28" r="8" fill="#F59E0B"/>
      <text x="50" y="34" fill="#FFFFFF" font-size="15" font-weight="600">Omar Farouk · General</text>
      <text x="340" y="34" fill="#F59E0B" font-size="13">Pending</text>
    </g>
  </g>
  `
);

fs.writeFileSync(path.join(dir, 'brainguard-home.svg'), brainguardHome);
fs.writeFileSync(path.join(dir, 'brainguard-ai.svg'), brainguardAi);
fs.writeFileSync(path.join(dir, 'biscofa-home.svg'), biscofaHome);
fs.writeFileSync(path.join(dir, 'biscofa-admin.svg'), biscofaAdmin);
fs.writeFileSync(path.join(dir, 'alhayah-home.svg'), alhayahHome);
fs.writeFileSync(path.join(dir, 'event-home.svg'), eventHome);

console.log('Successfully generated all UI screen mockups in assets/img/screens!');
