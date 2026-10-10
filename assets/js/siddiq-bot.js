/* ============================================================
   Mohammed Siddiq Portfolio · AI Interactive Assistant (SiddiqBot)
   - Zero-cost & Free (Client-Side Neural Rules + Extensible LLM Fallback)
   - High-Precision Context-Aware Knowledge Base of Mohammed Siddiq
   - Animated Glassmorphic UI with typing effects & speech-like streaming
   - Automatic Database Logging to Supabase Cloud & Local Storage
============================================================ */
(function () {
  "use strict";

  // Knowledge base extracted directly from Mohammed Siddiq's portfolio & CV
  const KNOWLEDGE_BASE = {
    identity: {
      name: { ar: "محمد صديق", en: "Mohammed Siddiq" },
      role: { ar: "مهندس برمجيات ومطور تطبيقات فلاتر (Software Engineer & Flutter Developer)", en: "Software Engineer & Flutter Developer" },
      experience: { ar: "أكثر من سنتين (+2 سنوات) في هندسة وتطوير تطبيقات الموبايل عالية الأداء والاعتمادية عبر المنصات", en: "2+ years of experience building scalable, high-performance cross-platform mobile apps" },
      location: { ar: "القاهرة، مصر (Cairo, Egypt) ومتاح للعمل عن بُعد عالمياً (Remote)", en: "Cairo, Egypt · Available for Remote worldwide" },
      email: "mohammedasiddiqdev@gmail.com",
      phone: "+20 122 789 7361",
      whatsapp: "https://wa.me/201227897361",
      github: "https://github.com/Siddico",
      linkedin: "https://www.linkedin.com/in/mohammedsiddico/",
      portfolio: "https://siddico.github.io/portfolio/",
      cv: "assets/Flutter_Developer_Mohammed_Siddiq.pdf"
    },
    education: {
      degree: { ar: "بكالوريوس علوم الحاسب (Bachelor of Computer Science)", en: "Bachelor of Computer Science" },
      university: { ar: "جامعة بني سويف الأهلية (Beni-Suef National University)", en: "Beni-Suef National University" },
      period: "2023 – 2026",
      focus: { ar: "هندسة البرمجيات، هياكل البيانات، الخوارزميات، والذكاء الاصطناعي", en: "Software Engineering, Data Structures, Algorithms, and Artificial Intelligence" }
    },
    stack: [
      "Flutter", "Dart", "BLoC / Cubit", "Clean Architecture", "SOLID Principles",
      "Firebase (Auth, Firestore, Cloud Functions)", "Supabase", "RESTful APIs",
      "Offline-first with SQLite / Sqflite", "State Management (BLoC, Riverpod, Provider)",
      "Python", "Machine Learning (Scikit-Learn)", "Responsive UI & Custom Animations",
      "Git & GitHub", "CI/CD", "Google Play Console & App Store Connect"
    ],
    projects: [
      {
        id: "brainguard",
        name: "BrainGuard",
        category: { ar: "مشروع التخرج · تطبيق طبي وذكاء اصطناعي", en: "Graduation Project · Healthcare AI & Tele-monitoring" },
        summary: {
          ar: "منظومة رعاية صحية متكاملة للتنبؤ بالسكتات الدماغية ومراقبة المرضى لحظياً، تجمع بين تحليلات المؤشرات الحيوية بالذكاء الاصطناعي والتواصل اللحظي بين المريض والطبيب المعالج، مبنية بمعمارية Clean Architecture و BLoC و Firebase.",
          en: "A comprehensive cross-platform healthcare ecosystem for stroke risk assessment and remote patient monitoring, powered by AI analytics and real-time biometric synchronization using Flutter, Clean Architecture, and Firebase."
        },
        stack: ["Flutter", "Clean Architecture", "BLoC", "Firebase", "AI / Python", "REST APIs"]
      },
      {
        id: "biscofa",
        name: "Biscofa",
        category: { ar: "تطبيق تجاري وسحابي للمخبوزات والقهوة", en: "Coffee & Bakery E-Commerce Mobile Ecosystem" },
        summary: {
          ar: "تطبيق تجاري متكامل للطلبات والدفع والولاء مع لوحة تحكم إدارية متقدمة، يتميز بتجربة مستخدم تفاعلية عالية السلاسة وأداء فائق السرعة وإشعارات لحظية.",
          en: "A feature-rich commerce mobile app with automated ordering, payment gateways, rewards engine, and an integrated management dashboard built with Flutter & Firebase."
        },
        stack: ["Flutter", "BLoC", "Firebase", "Cloudinary", "Payment Gateways", "Clean Code"]
      },
      {
        id: "alhayah",
        name: "Al Hayah Hospital",
        category: { ar: "نظام حجوزات ورعاية صحية للمستشفيات", en: "Hospital Patient Care & Appointment Booking" },
        summary: {
          ar: "تطبيق لإدارة العيادات والمواعيد الطبية ومتابعة الأطباء والملفات الطبية للمرضى مع حجز سريع وتنظيم شامل للخدمات الطبية.",
          en: "Healthcare mobile application streamlining outpatient appointment booking, medical records tracking, and doctor schedules."
        },
        stack: ["Flutter", "REST APIs", "State Management", "Responsive UI"]
      },
      {
        id: "eventtime",
        name: "Event Time",
        category: { ar: "تطبيق إدارة وتذاكر الفعاليات والمؤتمرات", en: "Event Management & Ticketing Application" },
        summary: {
          ar: "منصة لإدارة المؤتمرات والفعاليات تتيح حجز التذاكر واستكشاف الجداول ومتابعة المتحدثين مع خرائط وتحديثات فورية.",
          en: "Interactive event discovery and ticketing mobile app with schedule management, venue navigation, and live announcements."
        },
        stack: ["Flutter", "Firebase", "Animations", "UI/UX"]
      }
    ],
    experience: [
      {
        role: "Flutter Head",
        org: "IEEE Student Branch",
        period: "2025 – Present",
        desc: {
          ar: "قيادة الفريق التقني لمسار فلاتر، وتدريب الطلاب على معمارية Clean Architecture وإدارة الحالة بـ BLoC وإعدادهم لسوق العمل البرمجي.",
          en: "Leading the Flutter technical track, mentoring engineering students in Clean Architecture and BLoC, and organizing production-focused workshops."
        }
      },
      {
        role: "Flutter Mobile Development Trainee",
        org: "National Telecommunication Institute (NTI)",
        period: "Feb – Apr 2026",
        desc: {
          ar: "تدريب مكثف على معايير فلاتر المؤسسية، ربط واجهات برمجة التطبيقات REST APIs، وتحسين أداء التطبيقات وضغط حجمها.",
          en: "Intensive training on production-grade Flutter, RESTful APIs integration, and mobile app performance optimization."
        }
      },
      {
        role: "AI & Data Science Trainee",
        org: "DEPI | IBM Program",
        period: "Oct 2024 – May 2025",
        desc: {
          ar: "إتقان بايثون ومعالجة البيانات والتحليل الاستكشافي EDA وتدريب نماذج التعلم الآلي للتنبؤ واتخاذ القرارات الذكية.",
          en: "Mastered Python, Exploratory Data Analysis (EDA), and machine learning pipelines for predictive decision systems."
        }
      }
    ],
    certs: [
      { name: "Flutter Mobile Development", issuer: "NTI", track: "UC-FLUTTER-2024" },
      { name: "IBM Data Science & AI Program", issuer: "DEPI · IBM", track: "IBM-DATA-2025" },
      { name: "Business English Track", issuer: "DEPI (OTO Courses)", track: "ENG-B2-PRO" }
    ],
    availability: {
      ar: "محمد متاح حالياً للتوظيف بدوام كامل (Full-time)، أو عقود المشاريع الحرة (Freelance / Contract)، بنظام العمل عن بُعد (Remote) أو في مقر العمل بالقاهرة.",
      en: "Mohammed is currently available for full-time Flutter engineering roles, contract projects, and freelance engagements (Remote or On-site in Cairo)."
    }
  };

  // Preset quick questions for the user to click easily
  const QUICK_QUESTIONS = [
    { ar: "ما هي أبرز مشاريع محمد وخبراته؟", en: "What are Mohammed's top projects?" },
    { ar: "ما هو الـ Tech Stack الذي يتقنه؟", en: "What is Mohammed's technical stack?" },
    { ar: "هل محمد متاح للعمل أو التوظيف حالياً؟", en: "Is Mohammed available for hire?" },
    { ar: "كيف أتواصل معه مباشرة أو أحصل على الـ CV؟", en: "How can I contact Mohammed or view his CV?" },
    { ar: "احكِ لي عن مشروع التخرج BrainGuard", en: "Tell me about BrainGuard AI project" }
  ];

  // Intelligent Context-Matching Engine
  function generateAnswer(query, lang = "ar") {
    const q = (query || "").toLowerCase().trim();
    const isAr = lang === "ar" || /[\u0600-\u06FF]/.test(q);

    // 1. Projects & Apps
    if (/مشروع|مشاريع|تطبيق|تطبيقات|project|projects|app|apps|brainguard|biscofa|alhayah|event/.test(q)) {
      if (/brainguard|مخ|سكت|تخرج|طب|صحي|stroke|medical/.test(q)) {
        const bg = KNOWLEDGE_BASE.projects[0];
        return isAr
          ? `🩺 **مشروع BrainGuard (مشروع التخرج):**\n\n${bg.summary.ar}\n\n• **التقنيات المستخدمة:** ${bg.stack.join(", ")}.\n• **الهدف:** توظيف الذكاء الاصطناعي مع فلاتر لإنقاذ الأرواح ومراقبة المرضى عن بُعد بدقة لحظية 100%.\n\nيمكنك استعراض شاشات التطبيق الكاملة في قسم **المشاريع** بالصفحة!`
          : `🩺 **BrainGuard (Graduation Project):**\n\n${bg.summary.en}\n\n• **Tech Stack:** ${bg.stack.join(", ")}.\n• **Impact:** Combines AI stroke risk analysis with real-time patient biometric tracking and physician alerts.\n\nYou can explore screenshots directly in the Projects showcase on this portfolio!`;
      }
      if (/biscofa|قهوة|كافيه|مخبز|coffee|bakery/.test(q)) {
        const bs = KNOWLEDGE_BASE.projects[1];
        return isAr
          ? `☕ **تطبيق Biscofa:**\n\n${bs.summary.ar}\n\n• **التقنيات:** ${bs.stack.join(", ")}.\n• **المميزات:** تجربة شراء فائقة السلاسة، برامج ولاء، ودفع إلكتروني آمن مع لوحة تحكم لإدارة الفروع والطلبات.`
          : `☕ **Biscofa Mobile App:**\n\n${bs.summary.en}\n\n• **Tech Stack:** ${bs.stack.join(", ")}.\n• **Features:** Smooth ordering experience, loyalty points, online checkout, and real-time backend administration.`;
      }
      return isAr
        ? `📱 **أبرز تطبيقات ومشاريع الباشمهندس محمد صديق:**\n\n1. **BrainGuard (مشروع التخرج):** منظومة رعاية صحية للتنبؤ بالسكتات بالذكاء الاصطناعي ومراقبة المرضى.\n2. **Biscofa:** تطبيق تجاري متكامل للقهوة والمخبوزات مع لوحة تحكم ودفع سحابي.\n3. **Al Hayah Hospital:** نظام حجز مواعيد وإدارة ملفات المرضى والعيادات.\n4. **Event Time:** تطبيق استكشاف الفعاليات والمؤتمرات وحجز التذاكر.\n\nكافة التطبيقات مبنية باستخدام **Flutter** و **Clean Architecture** مع إدارة حالة متقدمة بـ **BLoC**.`
        : `📱 **Mohammed Siddiq's Featured Applications:**\n\n1. **BrainGuard (Graduation Project):** Healthcare AI platform for stroke prediction and patient tele-monitoring.\n2. **Biscofa:** Modern mobile commerce for bakery & specialty coffee with loyalty engine.\n3. **Al Hayah Hospital:** Patient care scheduling and doctor appointment booking.\n4. **Event Time:** Conference discovery, speaker agendas, and ticket reservation.\n\nAll apps adhere strictly to **Clean Architecture**, **BLoC state management**, and production best practices.`;
    }

    // 2. Tech Stack & Skills
    if (/مهار|تقني|تكنولوج|خبر|ستاك|stack|skill|skills|technology|technologies|bloc|clean arch|flutter|dart/.test(q)) {
      return isAr
        ? `🛠️ **المهارات والتقنيات الأساسية لمحمد صديق (Tech Stack):**\n\n• **Mobile Frameworks:** Flutter & Dart (كتابة كود عالي الكفاءة، واجهات متجاوبة، أنيميشن سلس).\n• **Architecture & Patterns:** Clean Architecture, SOLID Principles, MVVM, Repository Pattern.\n• **State Management:** BLoC (Cubit) - الاحترافي للإنتاج، بالإضافة إلى Riverpod و Provider.\n• **Backend & Databases:** Firebase (Firestore, Cloud Functions, Auth), Supabase, RESTful APIs, SQLite/Sqflite.\n• **AI & Data:** Python, Scikit-Learn, Machine Learning, Exploratory Data Analysis (EDA).\n• **Tools & DevOps:** Git, GitHub, Postman, Android Studio, Play Console, CI/CD.`
        : `🛠️ **Mohammed Siddiq's Core Tech Stack:**\n\n• **Mobile:** Flutter & Dart (High-performance rendering, responsive layouts, micro-animations).\n• **Architecture:** Clean Architecture, SOLID Principles, MVVM, Repository Pattern.\n• **State Management:** BLoC / Cubit (Production Standard), Riverpod, Provider.\n• **Cloud & Data:** Firebase, Supabase, RESTful APIs, Offline SQLite (Sqflite).\n• **AI & Data Science:** Python, Scikit-Learn, Machine Learning, Data Analytics (DEPI IBM).\n• **DevOps & Tools:** Git/GitHub, Postman, CI/CD, App Store & Google Play deployment.`;
    }

    // 3. Availability & Hiring
    if (/توظيف|متاح|شغل|وظيفة|انضمام|سعر|hire|available|availability|job|opportunity|freelance|contract|remote/.test(q)) {
      return isAr
        ? `💼 **حالة التفرغ والتوظيف:**\n\n${KNOWLEDGE_BASE.availability.ar}\n\n• **سرعة الاستجابة:** يرد عادةً في خلال ساعتين.\n• **للتواصل الفوري:** يمكنك مراسلته مباشرة عبر واتساب على الرقم: **${KNOWLEDGE_BASE.identity.phone}** أو إرسال إيميل إلى: **${KNOWLEDGE_BASE.identity.email}**.`
        : `💼 **Availability & Hiring Status:**\n\n${KNOWLEDGE_BASE.availability.en}\n\n• **Response Time:** Typically responds within 2 hours.\n• **Direct Contact:** WhatsApp: **${KNOWLEDGE_BASE.identity.phone}** or Email: **${KNOWLEDGE_BASE.identity.email}**.`;
    }

    // 4. Contact & Socials & CV
    if (/تواصل|اتصال|ايميل|واتس|رقم|cv|سيرة|لينك|contact|email|phone|whatsapp|linkedin|github|resume/.test(q)) {
      return isAr
        ? `📬 **طرق التواصل مع الباشمهندس محمد:**\n\n• **البريد الإلكتروني:** [${KNOWLEDGE_BASE.identity.email}](mailto:${KNOWLEDGE_BASE.identity.email})\n• **واتساب المباشر:** [${KNOWLEDGE_BASE.identity.phone}](${KNOWLEDGE_BASE.identity.whatsapp})\n• **LinkedIn:** [mohammedsiddico](${KNOWLEDGE_BASE.identity.linkedin})\n• **GitHub:** [Siddico](${KNOWLEDGE_BASE.identity.github})\n• **تحميل السيرة الذاتية (CV):** [تحميل ملف PDF](${KNOWLEDGE_BASE.identity.cv})\n\nأو يمكنك ملء نموذج الرسائل المباشر في قسم التواصل بالأسفل!`
        : `📬 **Connect with Mohammed Siddiq:**\n\n• **Email:** [${KNOWLEDGE_BASE.identity.email}](mailto:${KNOWLEDGE_BASE.identity.email})\n• **WhatsApp Direct:** [${KNOWLEDGE_BASE.identity.phone}](${KNOWLEDGE_BASE.identity.whatsapp})\n• **LinkedIn:** [mohammedsiddico](${KNOWLEDGE_BASE.identity.linkedin})\n• **GitHub:** [Siddico](${KNOWLEDGE_BASE.identity.github})\n• **Download CV:** [Flutter_Developer_Mohammed_Siddiq.pdf](${KNOWLEDGE_BASE.identity.cv})\n\nAlternatively, use the contact form at the bottom of the page!`;
    }

    // 5. Education & Background
    if (/تعليم|جامعة|كلية|دراسة|شهادة|شهادات|education|university|degree|cert|certs|ieee|nti|depi/.test(q)) {
      return isAr
        ? `🎓 **التعليم والاعتمادات الرسمية:**\n\n• **الجامعة:** ${KNOWLEDGE_BASE.education.university.ar} — ${KNOWLEDGE_BASE.education.degree.ar} (${KNOWLEDGE_BASE.education.period}).\n• **شهادة NTI:** تدريب متقدم في تطوير تطبيقات فلاتر من المعهد القومي للاتصالات.\n• **شهادة DEPI | IBM:** برنامج متقدم في علوم البيانات والذكاء الاصطناعي من وزارة الاتصالات وIBM.\n• **الأنشطة القيادية:** رئيس المسار التقني لفلاتر (Flutter Head) بفرع IEEE الطلابي.`
        : `🎓 **Education & Certifications:**\n\n• **Degree:** ${KNOWLEDGE_BASE.education.degree.en} · ${KNOWLEDGE_BASE.education.university.en} (${KNOWLEDGE_BASE.education.period}).\n• **NTI Certification:** Advanced Flutter Mobile Engineering from National Telecommunication Institute.\n• **DEPI IBM Program:** Data Science & AI Certification by Ministry of Communications & IBM.\n• **Leadership:** Flutter Head at IEEE Student Branch, mentoring upcoming mobile developers.`;
    }

    // 6. General Greetings
    if (/أهلا|مرحبا|سلام|ازيك|صباح|مساء|hello|hi|hey|greetings/.test(q)) {
      return isAr
        ? `أهلاً بك يا فندم! 👋\n\nأنا **مساعد الذكاء الاصطناعي الخاص بالباشمهندس محمد صديق (SiddiqBot)**. أنا هنا لمساعدتك والإجابة عن أي استفسار يخص خبرات محمد، مشاريعه، التقنيات التي يتقنها، أو كيفية توظيفه والعمل معه.\n\nكيف يمكنني مساعدتك اليوم؟ يمكنك الاختيار من الأسئلة المقترحة بالأسفل أو كتابة سؤالك مباشرة!`
        : `Hello there! 👋\n\nI am **Mohammed Siddiq's AI Assistant (SiddiqBot)**. I can answer anything about Mohammed's software engineering background, Flutter apps, architecture mastery, and hire availability.\n\nHow can I help you today? Feel free to ask anything or click one of the suggested prompts below!`;
    }

    // 7. Fallback Contextual Response
    return isAr
      ? `شكراً لسؤالك! بخصوص "${query}"، الباشمهندس **محمد صديق** هو مهندس برمجيات ومطور تطبيقات فلاتر بخبرة تزيد عن سنتين، حاصل على اعتمادات من NTI و IBM، ويتميز ببناء تطبيقات عالية الأداء بمعمارية Clean Architecture مع BLoC وسحابة Firebase و Supabase.\n\nيمكنك التواصل معه مباشرة عبر البريد [${KNOWLEDGE_BASE.identity.email}](mailto:${KNOWLEDGE_BASE.identity.email}) أو واتساب [${KNOWLEDGE_BASE.identity.phone}](${KNOWLEDGE_BASE.identity.whatsapp}) أو سؤالي عن مشاريعه (BrainGuard, Biscofa) أو خبراته!`
      : `Thank you for asking! Regarding "${query}", **Mohammed Siddiq** is a Software Engineer & Flutter Developer with 2+ years of production experience. He specializes in scalable cross-platform mobile apps using Clean Architecture, BLoC, Supabase, and Firebase.\n\nYou can reach him directly at [${KNOWLEDGE_BASE.identity.email}](mailto:${KNOWLEDGE_BASE.identity.email}) or WhatsApp [${KNOWLEDGE_BASE.identity.phone}](${KNOWLEDGE_BASE.identity.whatsapp}), or ask me specifically about his projects like BrainGuard or Biscofa!`;
  }

  // Inject Bot UI & Logic into page
  function initSiddiqBot() {
    if (document.getElementById("siddiqBotContainer")) return;

    const botAvatarSrc = (window.__PORTFOLIO_DATA?.profile?.botPhoto) || (window.__PORTFOLIO_DATA?.profile?.photo) || (window.CONTENT?.botPhoto) || "assets/img/me/mohammed-siddiq.png";

    // Create Floating Trigger Button and Chat Window
    const container = document.createElement("div");
    container.id = "siddiqBotContainer";
    container.className = "siddiq-bot";
    container.innerHTML = `
      <!-- Floating Trigger Button -->
      <button class="siddiq-bot__toggle" id="siddiqBotToggle" type="button" aria-label="Open AI Assistant" aria-expanded="false" title="تحدث مع المساعد الذكي لمحمد صديق">
        <span class="siddiq-bot__toggle-avatar">
          <img src="${botAvatarSrc}" alt="Mohammed Siddiq AI" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'%3E%3Ccircle cx=\\'20\\' cy=\\'20\\' r=\\'20\\' fill=\\'%232F5BEA\\'/ %3E%3Ctext x=\\'20\\' y=\\'25\\' font-family=\\'Arial\\' font-weight=\\'bold\\' font-size=\\'14\\' fill=\\'%23fff\\' text-anchor=\\'middle\\'%3EMS%3C/text%3E%3C/svg%3E'">
          <span class="siddiq-bot__status-dot"></span>
        </span>
        <span class="siddiq-bot__toggle-text">
          <span class="siddiq-bot__toggle-title">Ask AI About Me</span>
          <span class="siddiq-bot__toggle-sub">اسألني أي شيء عن خبراتي ومشاريعي</span>
        </span>
        <span class="siddiq-bot__toggle-sparkle">✨</span>
      </button>

      <!-- Glassmorphic Chat Window -->
      <div class="siddiq-bot__panel" id="siddiqBotPanel" hidden style="display: none;" aria-live="polite">
        <!-- Header -->
        <div class="siddiq-bot__header">
          <div class="siddiq-bot__agent">
            <div class="siddiq-bot__avatar-ring">
              <img src="${botAvatarSrc}" alt="Siddiq AI Agent">
              <span class="siddiq-bot__online-indicator"></span>
            </div>
            <div>
              <div class="siddiq-bot__agent-name">
                <b>SiddiqBot AI</b>
                <span class="siddiq-bot__ai-pill">Free & Smart</span>
              </div>
              <p class="siddiq-bot__agent-status">مساعدك الذكي للإجابة عن خبرات ومشاريع محمد</p>
            </div>
          </div>
          <div class="siddiq-bot__actions">
            <button class="siddiq-bot__action-btn" id="siddiqBotClear" type="button" title="مسح المحادثة">🗑️</button>
            <button class="siddiq-bot__action-btn" id="siddiqBotClose" type="button" title="إغلاق">✕</button>
          </div>
        </div>

        <!-- Chat History -->
        <div class="siddiq-bot__messages" id="siddiqBotMessages">
          <div class="siddiq-msg siddiq-msg--bot">
            <div class="siddiq-msg__bubble">
              <p>أهلاً بك! 👋 أنا <b>المساعد الذكي للباشمهندس محمد صديق</b>. يمكنك سؤالي عن أي شيء يخص مهاراته، مشاريعه (BrainGuard, Biscofa)، خبرته في Flutter و Clean Architecture، أو طريقة التواصل معه والتوظيف.</p>
            </div>
            <span class="siddiq-msg__time">الآن</span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="siddiq-bot__typing" id="siddiqBotTyping" style="display:none;">
          <span class="siddiq-dot"></span>
          <span class="siddiq-dot"></span>
          <span class="siddiq-dot"></span>
          <span class="siddiq-bot__typing-text">جاري صياغة الرد الذكي...</span>
        </div>

        <!-- Quick Suggestions -->
        <div class="siddiq-bot__quick" id="siddiqBotQuick">
          <div class="siddiq-bot__quick-scroll">
            ${QUICK_QUESTIONS.map(q => `<button type="button" class="siddiq-chip" data-q="${q.ar}">${q.ar}</button>`).join("")}
          </div>
        </div>

        <!-- Input Box -->
        <form class="siddiq-bot__form" id="siddiqBotForm">
          <input type="text" id="siddiqBotInput" placeholder="اكتب سؤالك هنا... (مثال: ما هي مميزات مشروع BrainGuard؟)" autocomplete="off" required>
          <button type="submit" id="siddiqBotSendBtn" aria-label="Send">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>

        <div class="siddiq-bot__footer-note">
          <span>⚡ مدعوم بنموذج ذكي مخصص ومربوط بقاعدة بيانات البورتفوليو</span>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Inject Modern Styles
    injectBotStyles();

    // Wire Interactive Logic
    wireBotEvents();
  }

  function injectBotStyles() {
    if (document.getElementById("siddiqBotStyles")) return;
    const style = document.createElement("style");
    style.id = "siddiqBotStyles";
    style.textContent = `
      /* ============================================================
         SiddiqBot AI Floating Assistant - Premium Glassmorphic UI
      ============================================================ */
      .siddiq-bot {
        position: fixed;
        bottom: 22px;
        right: 22px;
        left: auto;
        inset-inline-end: 22px;
        inset-inline-start: auto;
        z-index: 9999;
        font-family: inherit;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: none;
      }
      [dir="rtl"] .siddiq-bot {
        align-items: flex-end;
      }

      /* Floating Button */
      .siddiq-bot__toggle {
        pointer-events: auto;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 7px 18px 7px 8px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1.5px solid rgba(47, 91, 234, 0.28);
        border-radius: 999px;
        box-shadow: 0 10px 32px -6px rgba(47, 91, 234, 0.35), 0 4px 16px rgba(14, 27, 44, 0.08);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        color: var(--ink, #0E1B2C);
        font-family: inherit;
        user-select: none;
      }
      [dir="rtl"] .siddiq-bot__toggle {
        padding: 7px 8px 7px 18px;
      }
      .siddiq-bot__toggle:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 18px 44px -6px rgba(47, 91, 234, 0.48), 0 6px 20px rgba(14, 27, 44, 0.12);
        border-color: var(--primary, #2F5BEA);
      }
      .siddiq-bot__toggle:active {
        transform: translateY(0) scale(0.96);
      }
      .siddiq-bot__toggle.is-active {
        background: var(--primary, #2F5BEA);
        color: #fff;
        border-color: var(--primary, #2F5BEA);
        box-shadow: 0 14px 38px rgba(47, 91, 234, 0.52);
      }
      .siddiq-bot__toggle.is-active .siddiq-bot__toggle-title {
        color: #fff;
      }
      .siddiq-bot__toggle.is-active .siddiq-bot__toggle-sub {
        color: rgba(255, 255, 255, 0.85);
      }
      .siddiq-bot__toggle-avatar {
        position: relative;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: visible;
        flex-shrink: 0;
      }
      .siddiq-bot__toggle-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid var(--primary, #2F5BEA);
        background: #0E1B2C;
      }
      .siddiq-bot__status-dot {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 12px;
        height: 12px;
        background: #10B981;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
        animation: botPulse 2s infinite ease-in-out;
      }
      @keyframes botPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.85; }
      }
      .siddiq-bot__toggle-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: start;
      }
      .siddiq-bot__toggle-title {
        font-size: 0.88rem;
        font-weight: 800;
        color: var(--primary, #2F5BEA);
        line-height: 1.2;
      }
      .siddiq-bot__toggle-sub {
        font-size: 0.74rem;
        color: var(--muted, #546070);
        margin-top: 1px;
      }
      .siddiq-bot__toggle-sparkle {
        font-size: 1.15rem;
        animation: botWiggle 3s infinite ease-in-out;
      }
      @keyframes botWiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-12deg); }
        75% { transform: rotate(12deg); }
      }

      /* Chat Panel Window */
      .siddiq-bot__panel {
        position: relative;
        z-index: 10000;
        pointer-events: auto;
        width: 390px;
        max-width: calc(100vw - 32px);
        height: 585px;
        max-height: calc(100vh - 105px);
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(28px);
        -webkit-backdrop-filter: blur(28px);
        border: 1.5px solid rgba(47, 91, 234, 0.22);
        border-radius: 26px;
        box-shadow: 0 24px 64px -12px rgba(14, 27, 44, 0.28), 0 10px 28px rgba(47, 91, 234, 0.16);
        display: none;
        flex-direction: column;
        overflow: hidden;
        margin-bottom: 14px;
        transform-origin: bottom right;
        will-change: transform, opacity;
      }
      .siddiq-bot__panel[hidden] {
        display: none !important;
      }
      [dir="rtl"] .siddiq-bot__panel {
        transform-origin: bottom right;
      }

      /* Professional spring open and smooth exit animations */
      .siddiq-bot__panel.is-open {
        display: flex !important;
        animation: botSpringOpen 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .siddiq-bot__panel.is-closing {
        display: flex !important;
        animation: botSmoothClose 0.24s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      @keyframes botSpringOpen {
        0% { opacity: 0; transform: translateY(24px) scale(0.85); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes botSmoothClose {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(18px) scale(0.88); }
      }

      /* Panel Header */
      .siddiq-bot__header {
        padding: 14px 18px;
        background: linear-gradient(135deg, rgba(47, 91, 234, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%);
        border-bottom: 1px solid var(--line, #E6E3DD);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .siddiq-bot__agent {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .siddiq-bot__avatar-ring {
        position: relative;
        width: 40px;
        height: 40px;
      }
      .siddiq-bot__avatar-ring img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid var(--primary, #2F5BEA);
        background: #0E1B2C;
      }
      .siddiq-bot__online-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        background: #10B981;
        border: 2px solid #fff;
        border-radius: 50%;
      }
      .siddiq-bot__agent-name {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .siddiq-bot__agent-name b {
        font-size: 0.95rem;
        color: var(--ink, #0E1B2C);
      }
      .siddiq-bot__ai-pill {
        font-size: 0.65rem;
        font-weight: 800;
        background: rgba(47, 91, 234, 0.12);
        color: var(--primary, #2F5BEA);
        padding: 1px 7px;
        border-radius: 99px;
      }
      .siddiq-bot__agent-status {
        font-size: 0.72rem;
        color: var(--muted, #546070);
        margin-top: 1px;
      }
      .siddiq-bot__actions {
        display: flex;
        gap: 4px;
      }
      .siddiq-bot__action-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.08);
        background: rgba(255, 255, 255, 0.75);
        color: var(--muted, #546070);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 700;
        transition: all 0.25s cubic-bezier(0.3, 1.5, 0.5, 1);
      }
      .siddiq-bot__action-btn:hover {
        background: #fff;
        color: var(--ink, #0E1B2C);
        transform: scale(1.1);
      }
      #siddiqBotClose:hover {
        background: #EF4444;
        color: #fff;
        border-color: #EF4444;
        transform: rotate(90deg) scale(1.12);
        box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
      }

      /* Messages Area */
      .siddiq-bot__messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        scroll-behavior: smooth;
      }
      .siddiq-msg {
        display: flex;
        flex-direction: column;
        max-width: 86%;
        animation: msgFadeIn 0.25s ease-out;
      }
      @keyframes msgFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .siddiq-msg--bot {
        align-self: flex-start;
      }
      .siddiq-msg--user {
        align-self: flex-end;
      }
      .siddiq-msg__bubble {
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 0.9rem;
        line-height: 1.6;
        word-break: break-word;
      }
      .siddiq-msg--bot .siddiq-msg__bubble {
        background: #F1F5F9;
        color: #0F172A;
        border-bottom-right-radius: 4px;
        border: 1px solid rgba(226, 232, 240, 0.8);
      }
      .siddiq-msg--user .siddiq-msg__bubble {
        background: linear-gradient(135deg, #2F5BEA 0%, #1E40AF 100%);
        color: #ffffff;
        border-bottom-left-radius: 4px;
        box-shadow: 0 4px 12px rgba(47, 91, 234, 0.28);
      }
      .siddiq-msg__bubble p {
        margin: 0;
      }
      .siddiq-msg__bubble a {
        color: inherit;
        font-weight: 700;
        text-decoration: underline;
      }
      .siddiq-msg__time {
        font-size: 0.68rem;
        color: #94A3B8;
        margin-top: 3px;
        padding: 0 4px;
      }
      .siddiq-msg--user .siddiq-msg__time {
        text-align: end;
      }

      /* Typing Indicator */
      .siddiq-bot__typing {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 18px;
        font-size: 0.78rem;
        color: var(--primary, #2F5BEA);
        font-weight: 600;
      }
      .siddiq-dot {
        width: 6px;
        height: 6px;
        background: var(--primary, #2F5BEA);
        border-radius: 50%;
        animation: typingDot 1.4s infinite ease-in-out;
      }
      .siddiq-dot:nth-child(2) { animation-delay: 0.2s; }
      .siddiq-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes typingDot {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1.1); opacity: 1; }
      }
      .siddiq-bot__typing-text {
        margin-inline-start: 4px;
      }

      /* Quick Chips */
      .siddiq-bot__quick {
        padding: 4px 12px 10px;
        overflow-x: auto;
        white-space: nowrap;
      }
      .siddiq-bot__quick-scroll {
        display: flex;
        gap: 8px;
      }
      .siddiq-chip {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        background: rgba(47, 91, 234, 0.08);
        border: 1px solid rgba(47, 91, 234, 0.2);
        color: var(--primary, #2F5BEA);
        border-radius: 99px;
        font-size: 0.78rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        font-family: inherit;
      }
      .siddiq-chip:hover {
        background: var(--primary, #2F5BEA);
        color: #fff;
        transform: translateY(-1px);
      }

      /* Input Form */
      .siddiq-bot__form {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        background: #fff;
        border-top: 1px solid var(--line, #E6E3DD);
      }
      .siddiq-bot__form input {
        flex: 1;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1.5px solid var(--line, #E6E3DD);
        font-size: 0.88rem;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
        background: #FAF8F5;
      }
      .siddiq-bot__form input:focus {
        border-color: var(--primary, #2F5BEA);
        background: #fff;
      }
      .siddiq-bot__form button {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: none;
        background: var(--primary, #2F5BEA);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      .siddiq-bot__form button:hover {
        background: #2547C9;
        transform: scale(1.05);
      }
      .siddiq-bot__form button svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      [dir="rtl"] .siddiq-bot__form button svg {
        transform: scaleX(-1);
      }

      .siddiq-bot__footer-note {
        padding: 6px 14px;
        text-align: center;
        font-size: 0.68rem;
        color: #94A3B8;
        background: #FAF8F5;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
      }

      @media (max-width: 640px) {
        .siddiq-bot {
          bottom: calc(14px + env(safe-area-inset-bottom, 0px));
          right: calc(14px + env(safe-area-inset-right, 0px));
          left: auto;
          inset-inline-end: calc(14px + env(safe-area-inset-right, 0px));
          inset-inline-start: auto;
          z-index: 9999;
        }
        .siddiq-bot__panel {
          position: fixed;
          bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          right: 12px;
          left: 12px;
          width: calc(100vw - 24px);
          max-width: calc(100vw - 24px);
          height: min(84dvh, 600px);
          max-height: calc(100dvh - 28px);
          margin-bottom: 0;
          border-radius: 22px;
          z-index: 10000;
        }
        .siddiq-bot__toggle-text {
          display: none;
        }
        .siddiq-bot__toggle {
          padding: 6px;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          justify-content: center;
        }
        .siddiq-bot__toggle-sparkle {
          display: none;
        }
        .siddiq-bot__form input {
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function wireBotEvents() {
    const toggle = document.getElementById("siddiqBotToggle");
    const panel = document.getElementById("siddiqBotPanel");
    const closeBtn = document.getElementById("siddiqBotClose");
    const clearBtn = document.getElementById("siddiqBotClear");
    const form = document.getElementById("siddiqBotForm");
    const input = document.getElementById("siddiqBotInput");
    const msgsBox = document.getElementById("siddiqBotMessages");
    const typing = document.getElementById("siddiqBotTyping");

    let isClosing = false;

    function updateToggleText(isOpen) {
      const titleEl = toggle.querySelector(".siddiq-bot__toggle-title");
      const subEl = toggle.querySelector(".siddiq-bot__toggle-sub");
      const isAr = document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";
      if (isOpen) {
        if (titleEl) titleEl.textContent = isAr ? "المساعد نشط ✨" : "Assistant Active ✨";
        if (subEl) subEl.textContent = isAr ? "انقر هنا للإغلاق" : "Click to close";
      } else {
        if (titleEl) titleEl.textContent = isAr ? "اسأل الذكاء الاصطناعي" : "Ask AI Assistant";
        if (subEl) subEl.textContent = isAr ? "اسألني عن خبرات ومشاريع محمد" : "Ask about skills & projects";
      }
    }
    updateToggleText(false);

    function isPanelOpen() {
      return panel.classList.contains("is-open") && !panel.classList.contains("is-closing") && !panel.hidden && panel.style.display !== "none";
    }

    function openChat() {
      if (isClosing) return;
      panel.hidden = false;
      panel.style.display = "flex";
      panel.classList.remove("is-closing");
      panel.classList.add("is-open");
      toggle.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
      updateToggleText(true);
      setTimeout(() => {
        if (input) input.focus();
        if (msgsBox) msgsBox.scrollTop = msgsBox.scrollHeight;
      }, 120);
    }

    function closeChat() {
      if (isClosing) return;
      if (panel.hidden && panel.style.display === "none" && !panel.classList.contains("is-open")) return;
      isClosing = true;
      panel.classList.remove("is-open");
      panel.classList.add("is-closing");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      updateToggleText(false);

      setTimeout(() => {
        panel.hidden = true;
        panel.style.display = "none";
        panel.classList.remove("is-closing");
        panel.classList.remove("is-open");
        isClosing = false;
      }, 240);
    }

    function toggleChat() {
      if (isPanelOpen()) {
        closeChat();
      } else {
        openChat();
      }
    }

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleChat();
    });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeChat();
    });

    // Close on click outside panel
    document.addEventListener("click", (e) => {
      if (isPanelOpen() && !isClosing && !panel.contains(e.target) && !toggle.contains(e.target)) {
        closeChat();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isPanelOpen() && !isClosing) {
        closeChat();
      }
    });

    clearBtn.addEventListener("click", () => {
      msgsBox.innerHTML = `
        <div class="siddiq-msg siddiq-msg--bot">
          <div class="siddiq-msg__bubble">
            <p>تم بدء محادثة جديدة! كيف يمكنني مساعدتك اليوم بخصوص خبرات ومشاريع محمد صديق؟</p>
          </div>
          <span class="siddiq-msg__time">الآن</span>
        </div>
      `;
    });

    // Handle Quick Questions Chips
    document.addEventListener("click", (e) => {
      const chip = e.target.closest(".siddiq-chip");
      if (chip && chip.dataset.q) {
        sendMessage(chip.dataset.q);
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      sendMessage(val);
      input.value = "";
    });

    function formatTextToHTML(text) {
      let formatted = text
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
      return formatted;
    }

    async function sendMessage(userQuery) {
      // 1. Append User Message
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const userEl = document.createElement("div");
      userEl.className = "siddiq-msg siddiq-msg--user";
      userEl.innerHTML = `
        <div class="siddiq-msg__bubble">
          <p>${escapeHTML(userQuery)}</p>
        </div>
        <span class="siddiq-msg__time">${timeStr}</span>
      `;
      msgsBox.appendChild(userEl);
      msgsBox.scrollTop = msgsBox.scrollHeight;

      // 2. Show Typing Indicator
      typing.style.display = "flex";
      msgsBox.scrollTop = msgsBox.scrollHeight;

      // 3. Compute Intelligent Answer
      const lang = document.documentElement.lang || "ar";
      const answerRaw = generateAnswer(userQuery, lang);

      // Simulate human typing delay (450ms - 900ms)
      await new Promise(r => setTimeout(r, 650));

      // 4. Append Bot Message with animated typewriter feel
      typing.style.display = "none";
      const botEl = document.createElement("div");
      botEl.className = "siddiq-msg siddiq-msg--bot";
      botEl.innerHTML = `
        <div class="siddiq-msg__bubble">
          <p>${formatTextToHTML(answerRaw)}</p>
        </div>
        <span class="siddiq-msg__time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      `;
      msgsBox.appendChild(botEl);
      msgsBox.scrollTop = msgsBox.scrollHeight;

      // 5. Log question and answer to Supabase Cloud & Local Storage for Admin Review
      try {
        if (window.PORTFOLIO_DB && typeof window.PORTFOLIO_DB.logAIChat === "function") {
          window.PORTFOLIO_DB.logAIChat(userQuery, answerRaw, lang, { source: "portfolio_web" });
        }
      } catch (err) {
        console.warn("Failed to log chat to database:", err);
      }
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }[tag] || tag));
    }
  }

  // Auto-boot when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiddiqBot);
  } else {
    initSiddiqBot();
  }
})();
