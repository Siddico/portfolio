# 🚀 Mohammed Siddiq · Software Engineer & Flutter Developer

<div align="center">

[![Flutter](https://img.shields.io/badge/Flutter-3.24-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.5-0175C2?logo=dart&logoColor=white)](https://dart.dev)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean%20Code%20%26%20BLoC-10B981)](#-architecture--engineering-principles)
[![Supabase](https://img.shields.io/badge/Cloud%20Database-Supabase%20RLS-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Three.js](https://img.shields.io/badge/3D%20Hero-WebGL%20Three.js-black?logo=three.js&logoColor=white)](https://threejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-success?logo=github)](https://siddico.github.io/portfolio/)

**A world-class, dynamic portfolio engineered with interactive 3D WebGL, Flutter Hot Reload simulation, real-time Supabase Cloud synchronization, and an enterprise Admin Dashboard.**

[🌐 Live Portfolio](https://siddico.github.io/portfolio/) • [💼 LinkedIn](https://www.linkedin.com/in/mohammedsiddico/) • [📱 GitHub](https://github.com/Siddico)

---

</div>

## 📌 Overview

**Mohammed Siddiq** is a passionate **Software Engineer & Flutter Developer** based in Cairo, Egypt. Specializing in high-performance cross-platform mobile apps with **Clean Architecture**, robust state management (**BLoC/Cubit**, **Riverpod**), and full-stack cloud integrations (**Supabase**, **Firebase**, **Node.js**).

This repository contains the source code for Mohammed's flagship portfolio, designed to stand out through technical elegance, fluid micro-interactions, full bilingual localization, and real-time database management.

---

## ✨ Key Features & Technical Highlights

### 1. 🌟 Interactive 3D Hero Scene (Three.js WebGL)
- An authentic 3D environment rendering transparent portrait cuts, glowing depth spheres, and floating interactive tech badges (Flutter logo, running smartphone simulator, cloud backend cylinder, AI neural code tag).
- True cursor parallax, raycasted click interactions, inertia springs, and confetti particles.

### 2. ⚡ Flutter "Hot Reload" Experience (Scrapbook Edition)
- Press <kbd>r</kbd> or click the **Hot reload** button to seamlessly swap the entire application live into a handmade **Scrapbook Edition**!
- Features torn-paper headers, real-world polaroid photographs with tape, draggable physical sticky note skills, and an itemized shop receipt timeline.
- Press <kbd>R</kbd> or click **Hot restart** to wipe and return to the primary engineering interface.

### 3. 🛡️ Supabase Cloud & Zero-Downtime Offline-First Architecture
- **Zero-Downtime Guarantee:** The portfolio fetches content live from **Supabase PostgreSQL** via Row-Level Security (RLS). If offline or network-limited, it automatically falls back seamlessly to `data/portfolio.json`.
- **Dynamic Content Hydration:** Projects, career timeline, tech stack tags, hero facts (`+2` YOE, `+4` Apps, `100%` Clean Code), custom brand colors, and animations are rendered dynamically without touching code.

### 4. 🔒 Enterprise Admin Management Dashboard (`admin.html`)
- **Restricted Access Portal:** Dedicated, styled authentication gate with session management.
- **Full CRUD Management:**
  - Add, edit, reorder, or delete projects with automated client-side HTML5 canvas image compression.
  - Granular section & component visibility switches (hide/show any project, job, or widget instantly).
  - Dynamic Motion & Animation controls (toggle 3D Tilt, Lenis Smooth Scroll, Card Flips, Hero 3D scene, or adjust ticker speed).
  - Inquiries inbox with instant email response action.
- **🚀 One-Click Full Cloud Seed & Sync:** Automatically packages and syncs the entire portfolio state directly to Supabase Cloud.

### 5. 🌐 Seamless Bilingual Engine (Arabic RTL & English LTR)
- Instant fluid typography swap between Google Font Outfit/Plus Jakarta Sans (English) and Cairo/Alexandria (Arabic).
- Correct semantic `dir="rtl"` alignment, grammar tuning, and localized timeline dates.

### 6. 📱 Fluid Responsiveness & Modern Aesthetics
- Pixel-perfect across smartphones (iOS / Android), tablets, laptops, and ultra-wide desktop monitors.
- Butter-smooth scrolling powered by **Lenis** and **GSAP ScrollTrigger**.

---

## 🏗️ Project Architecture & Directory Structure

```text
├── admin.html               # Dedicated Admin Dashboard Portal
├── index.html               # Main Portfolio Page (Semantic HTML5)
├── server.js                # Local Express REST API Server
├── supabase_setup.sql       # PostgreSQL Cloud Schema, RLS & Seed Script
├── README.md                # Project Documentation
├── assets/
│   ├── css/
│   │   └── main.css         # Custom Design Tokens & Responsive CSS System
│   ├── js/
│   │   ├── main.js          # Core Application, Dynamic DOM Hydration & GSAP
│   │   ├── supabase.js      # Supabase Cloud Client & Offline-First Adapter
│   │   ├── scene.js         # Interactive WebGL 3D Hero Scene (Three.js)
│   │   ├── content.js       # Shared Content Model
│   │   ├── projects.js      # Project Dataset & Metadata
│   │   ├── i18n.js          # Arabic/English Translations Dictionary
│   │   ├── moods.js         # Hot Reload Lifecycle & Transition Engine
│   │   └── mockups.js       # High-Fidelity Vector Device Mockups
│   ├── img/
│   │   └── me/              # Profile Photography & Transparent Assets
│   └── vendor/              # Bundled libraries (GSAP, Lenis, Three.js)
├── cv/                      # Integrated CV Document Viewer & PDF
├── data/
│   └── portfolio.json       # Canonical Local & Offline Data Backup
└── moods/
    ├── scrap.js             # Scrapbook Mode Dynamic Component Engine
    └── scrap.css            # Hand-crafted Scrapbook Aesthetic Styles
```

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v18+ recommended) or any static web server (e.g. Python).

### 1. Clone the repository
```bash
git clone https://github.com/Siddico/portfolio.git
cd portfolio
```

### 2. Install dependencies (Optional for API server)
```bash
npm install
```

### 3. Run the development server
```bash
# Option A: Full-stack Node.js server (serves frontend + REST API)
npm run dev

# Option B: Any static server
npx serve .
# or
python3 -m http.server 5173
```

Open `http://localhost:5173` in your browser.

---

## 🗄️ Supabase Cloud Configuration

To connect your own Supabase instance:

1. Create a project on [Supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase Dashboard.
3. Paste and run the entire contents of [`supabase_setup.sql`](supabase_setup.sql).
4. Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` inside [`assets/js/supabase.js`](assets/js/supabase.js).
5. Open `admin.html`, log in, and click **"🚀 مزامنة ورفع كافة محتويات البورتفوليو إلى الداتابيز السحابية الآن (Full Cloud Seed & Sync)"**.

---

## 👨‍💻 About Mohammed Siddiq

- **Role:** Software Engineer & Flutter Developer
- **Location:** Cairo, Egypt
- **Education:** B.Sc. in Computer Science (FCAI)
- **Key Specializations:**
  - Scalable Cross-Platform Mobile Applications (Flutter & Dart)
  - Clean Architecture, BLoC (Cubit), Riverpod, SOLID Principles
  - Real-time Backends (Supabase, Firebase, Node.js REST APIs)
  - AI & Machine Learning Integration (Gemini API, Hugging Face, Scikit-learn)
  - Native Store Publishing (Google Play Console & Apple App Store Connect)

### 📬 Get In Touch
- **Email:** [mohammedasiddiqdev@gmail.com](mailto:mohammedasiddiqdev@gmail.com)
- **Phone / WhatsApp:** [+20 122 789 7361](https://wa.me/201227897361)
- **LinkedIn:** [linkedin.com/in/mohammedsiddico](https://www.linkedin.com/in/mohammedsiddico/)
- **GitHub:** [github.com/Siddico](https://github.com/Siddico)

---

<div align="center">
  <sub>Crafted with passion, Clean Code & precision by <b>Mohammed Siddiq</b> © 2026</sub>
</div>
