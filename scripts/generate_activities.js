const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'assets', 'img', 'activities');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const activities = [
  {
    name: 'activity-ieee.svg',
    title: 'IEEE Flutter Workshop',
    sub: 'Clean Architecture & BLoC Session',
    color1: '#00629B',
    color2: '#0A2540',
    accent: '#00B4D8',
    tag: 'IEEE Student Branch',
    icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'activity-codeavour.svg',
    title: 'Codeavour International',
    sub: 'AI & Robotics Global Competition 2026',
    color1: '#7928CA',
    color2: '#1F1147',
    accent: '#FF0080',
    tag: 'Organizing Committee',
    icon: `<circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="2"/><path d="M12 7v5l3 3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
  },
  {
    name: 'activity-depi.svg',
    title: 'DEPI IBM AI Summit',
    sub: 'Data Science & Machine Learning Track',
    color1: '#0F62FE',
    color2: '#001141',
    accent: '#33B1FF',
    tag: 'IBM Program',
    icon: `<rect x="3" y="4" width="18" height="16" rx="3" stroke="#fff" stroke-width="2"/><path d="M7 15l3-3 3 2 4-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'activity-nti.svg',
    title: 'NTI Mobile Bootcamp',
    sub: 'Cross-Platform Flutter Trainee Sprint',
    color1: '#059669',
    color2: '#064E3B',
    accent: '#34D399',
    tag: 'National Telecom Institute',
    icon: `<rect x="5" y="2" width="14" height="20" rx="3" stroke="#fff" stroke-width="2"/><circle cx="12" cy="18" r="1" fill="#fff"/>`
  },
  {
    name: 'activity-brainguard.svg',
    title: 'BrainGuard AI Showcase',
    sub: 'Healthcare AI & Stroke Tele-Monitoring',
    color1: '#DC2626',
    color2: '#450A0A',
    accent: '#F87171',
    tag: 'Graduation Project Expo',
    icon: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'activity-cleanarch.svg',
    title: 'Architecture Masterclass',
    sub: 'Domain Driven Design & SOLID in Flutter',
    color1: '#D97706',
    color2: '#451A03',
    accent: '#FBBF24',
    tag: 'Technical Mentorship',
    icon: `<polygon points="12 2 2 7 12 12 22 7 12 2" stroke="#fff" stroke-width="2"/><polyline points="2 17 12 22 22 17" stroke="#fff" stroke-width="2"/><polyline points="2 12 12 17 22 12" stroke="#fff" stroke-width="2"/>`
  },
  {
    name: 'activity-gdsc.svg',
    title: 'GDSC Tech Talk & Demo',
    sub: 'State Management with BLoC & Cubit',
    color1: '#2563EB',
    color2: '#1E1B4B',
    accent: '#60A5FA',
    tag: 'Google Developer Community',
    icon: `<path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  },
  {
    name: 'activity-hackathon.svg',
    title: 'University Hackathon',
    sub: 'Best Technical Architecture Award',
    color1: '#4F46E5',
    color2: '#1E1B4B',
    accent: '#A5B4FC',
    tag: 'Beni-Suef University',
    icon: `<circle cx="12" cy="8" r="6" stroke="#fff" stroke-width="2"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
  }
];

activities.forEach(act => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 260" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${act.name.replace('.svg','')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${act.color1}"/>
      <stop offset="100%" stop-color="${act.color2}"/>
    </linearGradient>
    <radialGradient id="glow_${act.name.replace('.svg','')}" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${act.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${act.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid_${act.name.replace('.svg','')}" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="440" height="260" rx="16" fill="url(#bg_${act.name.replace('.svg','')})"/>
  <rect width="440" height="260" rx="16" fill="url(#glow_${act.name.replace('.svg','')})"/>
  <rect width="440" height="260" rx="16" fill="url(#grid_${act.name.replace('.svg','')})"/>
  
  <!-- Decorative floating circles -->
  <circle cx="390" cy="50" r="80" fill="${act.accent}" fill-opacity="0.12" filter="blur(20px)"/>
  <circle cx="60" cy="220" r="70" fill="${act.color1}" fill-opacity="0.25" filter="blur(20px)"/>

  <!-- Tag Pill -->
  <g transform="translate(24, 24)">
    <rect width="${act.tag.length * 8.2 + 24}" height="26" rx="13" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <circle cx="12" cy="13" r="4" fill="${act.accent}"/>
    <text x="22" y="17" fill="#ffffff" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="0.3">${act.tag}</text>
  </g>

  <!-- Big Icon Badge -->
  <g transform="translate(356, 24)">
    <rect width="60" height="60" rx="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <g transform="translate(18, 18)">
      ${act.icon}
    </g>
  </g>

  <!-- Title & Description text -->
  <text x="26" y="170" fill="#ffffff" font-family="'Plus Jakarta Sans', 'IBM Plex Sans Arabic', system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="-0.02em">${act.title}</text>
  <text x="26" y="198" fill="rgba(255,255,255,0.85)" font-family="'Plus Jakarta Sans', 'IBM Plex Sans Arabic', system-ui, sans-serif" font-size="13" font-weight="500">${act.sub}</text>

  <!-- Bottom Accent bar -->
  <rect x="26" y="222" width="48" height="4" rx="2" fill="${act.accent}"/>
  <text x="84" y="227" fill="rgba(255,255,255,0.6)" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="600">Verified Activity · Mohammed Siddiq</text>
</svg>`;
  fs.writeFileSync(path.join(targetDir, act.name), svg, 'utf8');
  console.log(`Generated ${act.name}`);
});
