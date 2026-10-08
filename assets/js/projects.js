/* Projects shown as cards. `bg` paints the visual panel, `screens` are the phones shown in it. */
window.SCREENS = {
  "brainguard-home": "assets/img/screens/brainguard-home.svg",
  "brainguard-ai": "assets/img/screens/brainguard-ai.svg",
  "biscofa-home": "assets/img/screens/biscofa-home.svg",
  "biscofa-admin": "assets/img/screens/biscofa-admin.svg",
  "alhayah-home": "assets/img/screens/alhayah-home.svg",
  "event-home": "assets/img/screens/event-home.svg"
};

window.PROJECTS = [
  {
    id: "brainguard",
    name: { en: "BrainGuard", ar: "BrainGuard" },
    tag: { en: "Graduation Project · AI Stroke Prediction & Patient Monitoring", ar: "مشروع التخرج · تنبؤ بالسكتات بالذكاء الاصطناعي ومراقبة المرضى" },
    bg: "linear-gradient(160deg, #0F172A 0%, #1E3A8A 100%)",
    screens: ["brainguard-ai", "brainguard-home"],
    desc: {
      en: "A cross-platform healthcare ecosystem for patients and doctors, featuring real-time biometric analysis, stroke risk assessment, and remote tele-monitoring.",
      ar: "منظومة رعاية صحية متكاملة عبر المنصات للمرضى والأطباء، تجمع بين التحليل اللحظي للإشارات الحيوية، وتقييم مخاطر السكتة الدماغية، والمتابعة الطبية عن بُعد."
    },
    points: {
      en: [
        "Integrated multiple AI services: PPG prediction from .mat files, EHR-based stroke risk modeling, and a Gemini clinical chatbot",
        "Real-time patient-doctor connectivity with live chat, QR-based pairing, push notifications, and appointments",
        "OCR-assisted prescription analysis and automated medication schedule reminders",
        "Architected with Clean Architecture, responsive UI, role-based access, and Cloudinary + Firebase cloud storage"
      ],
      ar: [
        "دمج عدة خدمات ذكاء اصطناعي: تنبؤ بإشارات PPG من ملفات .mat، تقييم مخاطر السكتة ببيانات EHR، وشات طبي ذكي بـ Gemini API",
        "ربط لحظي بين المريض والطبيب مع شات، واقتران سريع بـ QR Code، وإشعارات فورية، وحجز مواعيد",
        "تحليل الروشتات الطبية بتقنية OCR ومتابعة التذكير بمواعيد الأدوية والتاريخ المرضي",
        "مبني بـ Clean Architecture مع واجهات متجاوبة، وصلاحيات مخصصة، وإدارة سحابية بـ Firebase وCloudinary"
      ]
    },
    metrics: [
      { v: "4+", l: { en: "AI models", ar: "نماذج AI" } },
      { v: "96.8%", l: { en: "accuracy", ar: "دقة التنبؤ" } },
      { v: "Realtime", l: { en: "pairing", ar: "اقتران فوري" } },
      { v: "Clean", l: { en: "architecture", ar: "Clean Arch" } }
    ],
    stack: ["Flutter", "Firebase", "Node.js", "Hugging Face", "Gemini API", "Cloudinary", "Clean Architecture", "PPG Signal"],
    links: [
      { label: { en: "GitHub Repository", ar: "الكود على GitHub" }, href: "https://github.com/Siddico" }
    ]
  },
  {
    id: "biscofa",
    name: { en: "Biscofa", ar: "Biscofa" },
    tag: { en: "Commercial Product · Customer & Admin Apps", ar: "منتج تجاري · تطبيقي العميل والآدمن" },
    bg: "linear-gradient(160deg, #2D1B14 0%, #170E0A 100%)",
    screens: ["biscofa-home", "biscofa-admin"],
    desc: {
      en: "A comprehensive café management system featuring two dedicated Flutter applications: a client shopping & rewards app and a complete real-time admin portal.",
      ar: "نظام متكامل لإدارة الكافيهات يشمل تطبيقين مخصصين بـ Flutter: تطبيق للعملاء لطلب المشروبات وبرنامج الولاء، ولوحة تحكم لحظية للآدمن."
    },
    points: {
      en: [
        "Customer app with real-time product browsing, dynamic menu, cart, live order tracking, and loyalty rewards system",
        "Dedicated Admin app for catalog management, categories, promo codes, push campaigns, and sales reports",
        "Real-time database sync via Firebase Firestore with high-performance state management",
        "Optimized for scalability, smooth animations, low bundle size, and released on Google Play and App Store"
      ],
      ar: [
        "تطبيق عملاء يشمل تصفح المنتجات، سلة المشتريات، متابعة الطلب لحظياً، ونظام نقاط ولاء ومكافآت",
        "تطبيق كامل للآدمن للتحكم بالمنتجات، التصنيفات، أكواد الخصم، إرسال الإشعارات، والتقارير المالية",
        "مزامنة فورية للبيانات عبر Cloud Firestore مع معمارية قوية وإدارة حالة سلسة",
        "محسن لأعلى أداء وسرعة وتم نشره على Google Play وApp Store"
      ]
    },
    metrics: [
      { v: "2", l: { en: "apps (Client & Admin)", ar: "تطبيقين (عميل وآدمن)" } },
      { v: "Stores", l: { en: "Play & App Store", ar: "المتاجر الرسمية" } },
      { v: "Live", l: { en: "order tracking", ar: "تتبع لحظي" } }
    ],
    stack: ["Flutter", "Firebase", "Firestore", "Cloud Messaging", "Google Play", "App Store", "Clean Architecture"],
    links: [
      { label: { en: "Google Play", ar: "Google Play" }, href: "https://play.google.com" },
      { label: { en: "GitHub", ar: "GitHub" }, href: "https://github.com/Siddico" }
    ]
  },
  {
    id: "alhayah",
    name: { en: "Al Hayah", ar: "مساهمي الحياة" },
    tag: { en: "Enterprise App · Supabase Realtime", ar: "تطبيق مؤسسي · Supabase Realtime" }  ,
    bg: "linear-gradient(160deg, #064E3B 0%, #022C22 100%)",
    screens: ["alhayah-home", "brainguard-ai"],
    desc: {
      en: "A secure mobile portal for private hospital shareholders with exclusive access to hospital services, dividend tracking, and executive benefits.",
      ar: "تطبيق موبايل آمن لمساهمي مستشفى خاصة يتيح الوصول الحصري للخدمات الطبية، متابعة الأرباح، ومزايا كبار المساهمين."
    },
    points: {
      en: [
        "Role-based authentication with dedicated experiences for Admin and Hospital Shareholders",
        "Complaints handling system, secure shareholder identity card, and VIP medical discount workflows",
        "Integrated Supabase for modern authentication, Row-Level Security, and real-time database management",
        "Strict data privacy, cryptographic token handling, and multi-platform deployment on Play Store & App Store"
      ],
      ar: [
        "تسجيل دخول مبني على الصلاحيات (Role-Based Auth) بتجربة مخصصة لكل من الآدمن والمساهمين",
        "نظام تقديم ومتابعة الشكاوى، بطاقة هوية رقمية للمساهم، وخصومات طبية حصرية",
        "ربط كامل مع Supabase للتوثيق وقواعد البيانات اللحظية وحماية البيانات بـ RLS",
        "أعلى معايير حماية البيانات والخصوصية ونشر كامل على المتاجر"
      ]
    },
    metrics: [
      { v: "RBAC", l: { en: "role access", ar: "صلاحيات مخصصة" } },
      { v: "Supabase", l: { en: "realtime DB", ar: "قاعدة بيانات لحظية" } },
      { v: "100%", l: { en: "secure auth", ar: "أمان وموثوقية" } }
    ],
    stack: ["Flutter", "Supabase", "PostgreSQL", "RLS", "Google Play", "App Store", "Clean Code"],
    links: [
      { label: { en: "Showcase / GitHub", ar: "الكود على GitHub" }, href: "https://github.com/Siddico" }
    ]
  },
  {
    id: "event-time",
    name: { en: "Event Time", ar: "إدارة الفعاليات" },
    tag: { en: "Event Tech · Realtime Sync & Check-In", ar: "تنظيم الفعاليات · مزامنة لحظية ودخول بـ QR" },
    bg: "linear-gradient(160deg, #312E81 0%, #1E1B4B 100%)",
    screens: ["event-home", "brainguard-home"],
    desc: {
      en: "A mobile application for conference registrations, attendee ticketing, and live event check-in management with real-time sync.",
      ar: "تطبيق موبايل متين لتسجيل حضور المؤتمرات والفعاليات، وإدارة التذاكر، وتسجيل الدخول السريع أثناء الفعاليات الحية."
    },
    points: {
      en: [
        "Event registration system connected to Firebase and REST APIs for instant attendee synchronization",
        "Organizer tools for live event entry check-in, ticket validation, and attendance statistics",
        "Responsive, adaptive layout designed for both high-traffic gate tablets and attendees' smartphones"
      ],
      ar: [
        "نظام تسجيل في الفعاليات متصل بـ Firebase و RESTful APIs لمزامنة الحضور فورياً",
        "أدوات للمنظمين لمسح تذاكر الحضور وإدارتهم لحظياً أثناء الفعالية مع إحصائيات مباشرة",
        "واجهة متجاوبة وسريعة مصممة للشاشات المختلفة وأجهزة التابلت عند بوابات الدخول"
      ]
    },
    metrics: [
      { v: "QR Scan", l: { en: "live check-in", ar: "دخول لحظي" } },
      { v: "Firebase", l: { en: "realtime sync", ar: "مزامنة سحابية" } }
    ],
    stack: ["Flutter", "RESTful API", "Firebase", "QR Scanning", "Responsive UI", "Android"],
    links: [
      { label: { en: "GitHub", ar: "GitHub" }, href: "https://github.com/Siddico" }
    ]
  }
];

window.ACTIVITIES = [
  {
    id: "act-ieee",
    title: { ar: "ورشة عمل IEEE Flutter المتخصصة", en: "IEEE Flutter Workshop & Mentorship" },
    tag: { ar: "IEEE Student Branch", en: "IEEE Student Branch" },
    sub: { ar: "معمارية Clean Architecture وإدارة الحالة بـ BLoC", en: "Clean Architecture & BLoC Deep Dive" },
    desc: { ar: "قيادة ورش عمل تقنية وتدريب أكثر من 120 طالب ومهندس على أساسيات ومفاهيم المعمارية النظيفة وبناء تطبيقات فلاتر إنتاجية قابلة للتوسع.", en: "Led hands-on workshops mentoring 120+ student developers in clean architecture, testable code, and high-performance Flutter app engineering." },
    date: { ar: "أكتوبر 2025 - الحالي", en: "Oct 2025 – Present" },
    image: "assets/img/activities/activity-ieee.svg",
    visible: true
  },
  {
    id: "act-codeavour",
    title: { ar: "مسابقة Codeavour العالمية للذكاء الاصطناعي والروبوتات", en: "Codeavour International AI & Robotics 2026" },
    tag: { ar: "لجنة التنظيم الدولية", en: "Organizing Committee" },
    sub: { ar: "تنظيم أكبر حدث عالمي للذكاء الاصطناعي 2026", en: "Global AI & Robotics Championship 2026" },
    desc: { ar: "عضو اللجنة المنظمة للبطولة الدولية في مصر، إدارة الفرق المشاركة، وتحكيم المشاريع البرمجية التنافسية بمجال الذكاء الاصطناعي.", en: "Organizing committee member coordinating national and international student teams, evaluating AI projects, and managing event operations." },
    date: { ar: "2026", en: "2026" },
    image: "assets/img/activities/activity-codeavour.svg",
    visible: true
  },
  {
    id: "act-depi",
    title: { ar: "ملتقى وتخرج مبادرة DEPI من وزارة الاتصالات وIBM", en: "DEPI IBM Data Science & AI Summit" },
    tag: { ar: "مبادرة رواد مصر الرقمية", en: "IBM & DEPI Track" },
    sub: { ar: "تطوير نماذج تعلم الآلة وتحليل البيانات الطبية", en: "Machine Learning & Predictive Modeling" },
    desc: { ar: "المشاركة الفعالة في برنامج رواد مصر الرقمية، تدريب مكثف على بايثون، استخراج الأنماط، وتدريب نماذج التنبؤ بالمخاطر الصحية.", en: "Intensive immersion in advanced Python, exploratory data analysis, and developing machine learning models for real-world healthcare decision-making." },
    date: { ar: "مايو 2025", en: "May 2025" },
    image: "assets/img/activities/activity-depi.svg",
    visible: true
  },
  {
    id: "act-nti",
    title: { ar: "معسكر المعهد القومي للاتصالات NTI لتطبيقات الموبايل", en: "NTI Mobile Engineering Bootcamp" },
    tag: { ar: "NTI Trainee", en: "National Telecom Institute" },
    sub: { ar: "سبرنت برمجي مكثف لتطبيقات فلاتر الحية", en: "Full-Cycle Flutter App Development Sprint" },
    desc: { ar: "إنجاز مشاريع موبايل متكاملة بأحدث ممارسات السوق، دمج الخدمات السحابية، وضغط الأداء والذاكرة لأقصى كفاءة.", en: "Engineered production-grade cross-platform apps adhering to modern software lifecycle guidelines, REST APIs, and memory optimization." },
    date: { ar: "أبريل 2026", en: "Apr 2026" },
    image: "assets/img/activities/activity-nti.svg",
    visible: true
  },
  {
    id: "act-brainguard",
    title: { ar: "معرض مشاريع التخرج وتكريم BrainGuard", en: "BrainGuard AI Healthcare Expo" },
    tag: { ar: "مشروع التخرج · امتياز", en: "Graduation Expo · Excellent" },
    sub: { ar: "عرض منظومة التنبؤ بالسكتات الدماغية أمام لجنة التحكيم", en: "Live Clinical IoT & AI Defense" },
    desc: { ar: "عرض تطبيقي المريض والطبيب مع شات Gemini السريري وربط الحساسات الحيوية لحظياً، وحصد تقدير امتياز وإشادة واسعة.", en: "Delivered public keynote defense of BrainGuard AI ecosystem, featuring real-time PPG analysis, live patient-doctor pairing, and OCR analysis." },
    date: { ar: "2024", en: "2024" },
    image: "assets/img/activities/activity-brainguard.svg",
    visible: true
  },
  {
    id: "act-cleanarch",
    title: { ar: "جلسة تدريبية: Clean Architecture في مشاريع الفلاتر الحقيقية", en: "Clean Architecture & Design Patterns Session" },
    tag: { ar: "Technical Session", en: "Architecture Masterclass" },
    sub: { ar: "تطبيق SOLID Principles وعزل طبقات البيانات والـ Domain", en: "Domain-Driven Design & Separation of Concerns" },
    desc: { ar: "شرح عملي حي لكيفية هيكلة مشاريع فلاتر المؤسسية لسهولة الصيانة والفحص الآلي وعزل منطق الأعمال عن الواجهات.", en: "Live coding session demonstrating how to decouple presentation, domain, and data layers with repository patterns and dependency injection." },
    date: { ar: "2025", en: "2025" },
    image: "assets/img/activities/activity-cleanarch.svg",
    visible: true
  },
  {
    id: "act-gdsc",
    title: { ar: "هاكاثون وورشة عمل مجتمعات جوجل للطلبة GDSC", en: "GDSC Flutter Code Jam & Tech Talk" },
    tag: { ar: "Google Developers", en: "GDSC Community" },
    sub: { ar: "التكامل مع السحابة وإدارة الحالة المتقدمة", en: "Firebase & Supabase Cloud Integration" },
    desc: { ar: "تقديم محتوى تعليمي تطبيقي لبناء تطبيقات سريعة الاستجابة وربط قواعد البيانات اللحظية والتوثيق الآمن.", en: "Hands-on live demo on constructing reactive mobile experiences, real-time Firestore synchronization, and secure OAuth flows." },
    date: { ar: "2025", en: "2025" },
    image: "assets/img/activities/activity-gdsc.svg",
    visible: true
  },
  {
    id: "act-hackathon",
    title: { ar: "مسابقة الابتكار البرمجي والهاكاثون الجامعي", en: "Faculty Innovation Hackathon" },
    tag: { ar: "جائزة أفضل معمارية برمجية", en: "Best Architecture Award" },
    sub: { ar: "بناء نموذج أولي خلال 48 ساعة بـ Flutter و AI", en: "Rapid Prototyping Under 48h Sprint" },
    desc: { ar: "تطوير حل ذكي متكامل خلال 48 ساعة حصد المركز الأول في جودة المعمارية وتكامل الذكاء الاصطناعي مع تجربة المستخدم.", en: "Collaborative 48-hour sprint building a functional mobile prototype with AI analytics, winning recognition for code quality." },
    date: { ar: "2024", en: "2024" },
    image: "assets/img/activities/activity-hackathon.svg",
    visible: true
  }
];

