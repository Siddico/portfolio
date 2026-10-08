/* The content every version of the site shares, in one place and one order.
   Text is referenced by i18n key (English lives in index.html, Arabic in i18n.js);
   the hot-reload moods render their own layouts from this. Projects come from projects.js. */
window.CONTENT = {
  name: "Mohammed Siddiq",
  title: "Software Engineer | Flutter Developer",
  photo: "assets/img/me/mohammed-siddiq.png",
  aboutPhoto: "assets/img/me/mohammed-siddiq.png",
  hero: { status: "hero.status", hi: "hero.hi", title: ["hero.t1", "hero.t2", "hero.t3"], sub: "hero.sub", cta1: "hero.cta1", cta2: "hero.cta2" },
  facts: [
    { v: "2+", sup: "yrs", k: "facts.1" },
    { v: "4+", suf: "apps", k: "facts.2" },
    { v: "100%", k: "facts.3" }
  ],
  stack: ["Flutter", "Dart", "BLoC (Cubit)", "Riverpod", "Provider", "Clean Architecture", "Firebase", "Supabase", "REST APIs", "Python", "Cloudinary", "Sqflite"],
  projects: { k: "proj.k", title: "proj.title", sub: "proj.sub", did: { en: "Key Accomplishments", ar: "أبرز الإنجازات" }, follow: { en: "More on GitHub", ar: "المزيد على GitHub" } },
  others: {
    title: "other.title",
    items: [
      { name: "Codeavour International", k: "other.1", link: "2026" },
      { name: "IEEE Flutter Workshops", k: "other.2", link: "IEEE" },
      { name: "Stroke Risk Machine Learning", k: "other.3" }
    ]
  },
  experience: {
    k: "exp.k", title: "exp.title",
    items: [
      { date: "Feb 2026 – Apr 2026", place: "tl.1.place", t: "tl.1.t", points: ["tl.1.a", "tl.1.b", "tl.1.c"] },
      { date: "Oct 2024 – May 2025", place: "tl.2.place", t: "tl.2.t", points: ["tl.2.a", "tl.2.b"] },
      { date: "Oct 2025 – Present", place: "tl.3.place", t: "tl.3.t", points: ["tl.3.a", "tl.3.b"] },
      { date: "Oct 2023 – Jul 2026", place: "tl.4.place", t: "tl.4.t", points: ["tl.4.a"] }
    ]
  },
  certs: {
    k: "cert.k", title: "cert.title", sub: "cert.sub", show: { en: "Verify Credential", ar: "تحقق من الشهادة" }, idLabel: { en: "Track", ar: "المسار" },
    items: [
      { name: "Flutter Mobile Development", issuer: "National Telecommunication Institute (NTI)", date: { en: "Issued Apr 2026", ar: "صدرت أبريل 2026" }, mark: "NTI", tone: "#1D4E89", href: "https://www.linkedin.com/in/mohammedsiddico/" },
      { name: "IBM-Powered Data Science Program", issuer: "Digital Egypt Pioneers Initiative (DEPI) · IBM", date: { en: "Issued May 2025", ar: "صدرت مايو 2025" }, mark: "IBM", tone: "#0062FF", href: "https://www.linkedin.com/in/mohammedsiddico/" },
      { name: "Business English Track", issuer: "DEPI (OTO Courses)", date: { en: "Issued May 2025", ar: "صدرت مايو 2025" }, mark: "ENG", tone: "#059669", href: "https://www.linkedin.com/in/mohammedsiddico/" }
    ]
  },
  skills: {
    k: "sk.k", title: "sk.title",
    groups: [
      { t: "sk.1", tags: ["Flutter", "Dart", "BLoC (Cubit)", "Provider", "Riverpod", "Responsive UI", "Adaptive Layouts", "Animations"] },
      { t: "sk.2", tags: ["Clean Architecture", "MVVM", "SOLID Principles", "Clean Code", "Design Patterns", "Repository Pattern"] },
      { t: "sk.3", tags: ["Firebase", "Cloud Firestore", "Supabase", "Cloudinary", "RESTful APIs", "Sqflite", "SQLite"] },
      { t: "sk.4", tags: ["Python", "Machine Learning", "Exploratory Data Analysis (EDA)", "Scikit-learn", "Gemini API", "Hugging Face"] },
      { t: "sk.5", tags: ["App Performance", "App Size Optimization", "Memory Optimization", "Edge Case Handling", "State Management"] },
      { t: "sk.6", tags: ["Git & GitHub", "Postman", "Android Studio", "VS Code", "CI/CD", "Play Console", "App Store Connect"] }
    ]
  },
  about: { k: "about.k", title: "about.title", p: ["about.p1", "about.p2"], langs: ["about.lang1", "about.lang2"], cap: "about.cap" },
  contact: {
    k: "contact.k", t1: "contact.t1", t2: "contact.t2", sub: "contact.sub", copy: "contact.copy", cv: "contact.cv",
    email: "mohammedasiddiqdev@gmail.com", whatsapp: { href: "https://wa.me/201227897361", label: "+20 122 789 7361" },
    links: [
      { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/mohammedsiddico/" },
      { label: "GitHub ↗", href: "https://github.com/Siddico" },
      { label: "Portfolio ↗", href: "https://siddico.github.io/portfolio/" }
    ]
  },
  nav: [["projects", "nav.projects"], ["experience", "nav.experience"], ["skills", "nav.skills"], ["about", "nav.about"], ["contact", "nav.contact"]]
};
