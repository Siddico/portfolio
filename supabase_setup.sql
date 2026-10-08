-- ============================================================
-- Mohammed Siddiq Portfolio · Supabase Database Setup Script
-- ============================================================
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/fjhuesougisuegeuryjg/sql
-- 2. Paste this entire SQL code into the SQL Editor.
-- 3. Click the "Run" button (bottom right).
-- ============================================================

-- 1. Table for Portfolio Data (Projects, Skills, Certs, Visibility, Scrapbook, Profile)
CREATE TABLE IF NOT EXISTS public.portfolio_data (
  id TEXT PRIMARY KEY,
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  section_visibility JSONB NOT NULL DEFAULT '{}'::jsonb,
  scrapbook_settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  certs JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure motion_settings column exists if queried directly
ALTER TABLE public.portfolio_data ADD COLUMN IF NOT EXISTS motion_settings JSONB DEFAULT '{"tilt3d": true, "cardFlip": true, "smoothScroll": true, "hero3d": true, "tickerSpeed": "normal", "ambientGlow": true}'::jsonb;

-- 2. Table for Contact Messages (Inquiries from visitors)
CREATE TABLE IF NOT EXISTS public.portfolio_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_read BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. Table for AI Bot Conversations & Inquiries History
CREATE TABLE IF NOT EXISTS public.portfolio_ai_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  lang TEXT DEFAULT 'ar',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. SECURITY & ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
-- Enable RLS on all tables
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_ai_chats ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can view portfolio data" ON public.portfolio_data;
DROP POLICY IF EXISTS "Anyone can update portfolio data with key" ON public.portfolio_data;
DROP POLICY IF EXISTS "Public can submit contact messages" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Allow reading messages" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Allow deleting messages" ON public.portfolio_messages;
DROP POLICY IF EXISTS "Public can insert ai chats" ON public.portfolio_ai_chats;
DROP POLICY IF EXISTS "Allow reading ai chats" ON public.portfolio_ai_chats;
DROP POLICY IF EXISTS "Allow deleting ai chats" ON public.portfolio_ai_chats;

-- Policy for AI Chats: Visitors can insert conversation logs
CREATE POLICY "Public can insert ai chats"
  ON public.portfolio_ai_chats
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for AI Chats: Allow reading logs in admin
CREATE POLICY "Allow reading ai chats"
  ON public.portfolio_ai_chats
  FOR SELECT
  TO public
  USING (true);

-- Policy for AI Chats: Allow deleting logs in admin
CREATE POLICY "Allow deleting ai chats"
  ON public.portfolio_ai_chats
  FOR DELETE
  TO public
  USING (true);

-- Policy 1: Anyone (visitors) can READ portfolio data
CREATE POLICY "Public can view portfolio data"
  ON public.portfolio_data
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Allow updating portfolio data
CREATE POLICY "Anyone can update portfolio data with key"
  ON public.portfolio_data
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy 3: Anyone (visitors) can SEND contact messages
CREATE POLICY "Public can submit contact messages"
  ON public.portfolio_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy 4: Allow reading messages
CREATE POLICY "Allow reading messages"
  ON public.portfolio_messages
  FOR SELECT
  TO public
  USING (true);

-- Policy 5: Allow deleting messages
CREATE POLICY "Allow deleting messages"
  ON public.portfolio_messages
  FOR DELETE
  TO public
  USING (true);

-- ============================================================
-- 4. SEED INITIAL DATA (Mohammed Siddiq's live portfolio data)
-- ============================================================
INSERT INTO public.portfolio_data (
  id,
  profile,
  section_visibility,
  scrapbook_settings,
  projects,
  skills,
  certs,
  experience
) VALUES (
  'main',
  '{
    "name": "Mohammed Siddiq",
    "title": "Software Engineer | Flutter Developer",
    "email": "mohammedasiddiqdev@gmail.com",
    "phone": "+20 122 789 7361",
    "location": "Cairo, Egypt",
    "github": "https://github.com/Siddico",
    "linkedin": "https://www.linkedin.com/in/mohammedsiddico/",
    "portfolio": "https://siddico.github.io/portfolio/",
    "summary": "Software Engineer and Flutter Developer with 2+ years of experience specializing in building scalable, high-performance cross-platform mobile applications. Combines clean architecture, efficient code, and thoughtfully crafted user interfaces.",
    "facts": {
      "yoe": "+2",
      "apps": "+4",
      "clean": "100%"
    },
    "motion": {
      "tilt3d": true,
      "cardFlip": true,
      "smoothScroll": true,
      "hero3d": true,
      "tickerSpeed": "normal",
      "ambientGlow": true
    }
  }'::jsonb,
  '{
    "hero": true,
    "stats": true,
    "stackStrip": true,
    "projects": true,
    "skills": true,
    "experience": true,
    "certs": true,
    "about": true,
    "contact": true
  }'::jsonb,
  '{
    "enabled": true,
    "showPolaroidHero": true,
    "showProjects": true,
    "showExperienceReceipt": true,
    "showSkillsSticky": true,
    "showCertsWax": true,
    "showContact": true,
    "terminalTag": "Flutter 3.24 · Clean Architecture · Dart"
  }'::jsonb,
  '[
    {
      "id": "brainguard",
      "visible": true,
      "name": { "en": "BrainGuard", "ar": "BrainGuard" },
      "tag": { "en": "Graduation Project · AI Stroke Prediction & Patient Monitoring", "ar": "مشروع التخرج · تنبؤ بالسكتات بالذكاء الاصطناعي ومراقبة المرضى" },
      "bg": "linear-gradient(160deg, #0F172A 0%, #1E3A8A 100%)",
      "screens": ["brainguard-ai", "brainguard-home"],
      "desc": {
        "en": "A cross-platform healthcare ecosystem for patients and doctors, featuring real-time biometric analysis, stroke risk assessment, and remote tele-monitoring.",
        "ar": "منظومة رعاية صحية متكاملة عبر المنصات للمرضى والأطباء، تجمع بين التحليل اللحظي للإشارات الحيوية، وتقييم مخاطر السكتة الدماغية، والمتابعة الطبية عن بُعد."
      },
      "points": {
        "en": [
          "Integrated multiple AI services: PPG prediction from .mat files, EHR-based stroke risk modeling, and a Gemini clinical chatbot",
          "Real-time patient-doctor connectivity with live chat, QR-based pairing, push notifications, and appointments",
          "OCR-assisted prescription analysis and automated medication schedule reminders",
          "Architected with Clean Architecture, responsive UI, role-based access, and Cloudinary + Firebase cloud storage"
        ],
        "ar": [
          "دمج عدة خدمات ذكاء اصطناعي: تنبؤ بإشارات PPG من ملفات .mat، تقييم مخاطر السكتة ببيانات EHR، وشات طبي ذكي بـ Gemini API",
          "ربط لحظي بين المريض والطبيب مع شات، واقتران سريع بـ QR Code، وإشعارات فورية، وحجز مواعيد",
          "تحليل الروشتات الطبية بتقنية OCR ومتابعة التذكير بمواعيد الأدوية والتاريخ المرضي",
          "مبني بـ Clean Architecture مع واجهات متجاوبة، وصلاحيات مخصصة، وإدارة سحابية بـ Firebase وCloudinary"
        ]
      },
      "metrics": [
        { "v": "4+", "l": { "en": "AI models", "ar": "نماذج AI" } },
        { "v": "96.8%", "l": { "en": "accuracy", "ar": "دقة التنبؤ" } },
        { "v": "< 1s", "l": { "en": "response", "ar": "استجابة فورية" } },
        { "v": "Clean", "l": { "en": "architecture", "ar": "Clean Arch" } }
      ],
      "stack": ["Flutter", "Firebase", "Node.js", "Hugging Face", "Gemini API", "Cloudinary", "Clean Architecture", "PPG Signal"],
      "links": [
        { "label": { "en": "GitHub Repository", "ar": "الكود على GitHub" }, "href": "https://github.com/Siddico" }
      ]
    },
    {
      "id": "biscofa",
      "visible": true,
      "name": { "en": "Biscofa", "ar": "Biscofa" },
      "tag": { "en": "Commercial Product · Customer & Admin Apps", "ar": "منتج تجاري · تطبيقي العميل والآدمن" },
      "bg": "linear-gradient(160deg, #2D1B14 0%, #170E0A 100%)",
      "screens": ["biscofa-home", "biscofa-admin"],
      "desc": {
        "en": "A comprehensive café management system featuring two dedicated Flutter applications: a client shopping & rewards app and a complete real-time admin portal.",
        "ar": "نظام متكامل لإدارة الكافيهات يشمل تطبيقين مخصصين بـ Flutter: تطبيق للعملاء لطلب المشروبات وبرنامج الولاء، ولوحة تحكم لحظية للآدمن."
      },
      "points": {
        "en": [
          "Customer app with real-time product browsing, dynamic menu, cart, live order tracking, and loyalty rewards system",
          "Dedicated Admin app for catalog management, categories, promo codes, push campaigns, and sales reports",
          "Real-time database sync via Firebase Firestore with high-performance state management",
          "Optimized for scalability, smooth animations, low bundle size, and released on Google Play and App Store"
        ],
        "ar": [
          "تطبيق عملاء يشمل تصفح المنتجات، سلة المشتريات، متابعة الطلب لحظياً، ونظام نقاط ولاء ومكافآت",
          "تطبيق كامل للآدمن للتحكم بالمنتجات، التصنيفات، أكواد الخصم، إرسال الإشعارات، والتقارير المالية",
          "مزامنة فورية للبيانات عبر Cloud Firestore مع معمارية قوية وإدارة حالة سلسة",
          "محسن لأعلى أداء وسرعة وتم نشره على Google Play وApp Store"
        ]
      },
      "metrics": [
        { "v": "2", "l": { "en": "Apps", "ar": "تطبيقين متجرين" } },
        { "v": "100%", "l": { "en": "Live Sync", "ar": "مزامنة لحظية" } },
        { "v": "24/7", "l": { "en": "Ordering", "ar": "طلب مستمر" } }
      ],
      "stack": ["Flutter", "Firebase", "Firestore", "Cloud Messaging", "Google Play", "App Store", "Clean Architecture"],
      "links": [
        { "label": { "en": "Google Play", "ar": "Google Play" }, "href": "https://play.google.com" },
        { "label": { "en": "GitHub", "ar": "GitHub" }, "href": "https://github.com/Siddico" }
      ]
    },
    {
      "id": "alhayah",
      "visible": true,
      "name": { "en": "Al Hayah", "ar": "مساهمي الحياة" },
      "tag": { "en": "Enterprise App · Supabase Realtime", "ar": "تطبيق مؤسسي · Supabase Realtime" },
      "bg": "linear-gradient(160deg, #064E3B 0%, #022C22 100%)",
      "screens": ["alhayah-home"],
      "desc": {
        "en": "A secure mobile portal for private hospital shareholders with exclusive access to hospital services, dividend tracking, and executive benefits.",
        "ar": "تطبيق موبايل آمن لمساهمي مستشفى خاصة يتيح الوصول الحصري للخدمات الطبية، متابعة الأرباح، ومزايا كبار المساهمين."
      },
      "points": {
        "en": [
          "Role-based authentication with dedicated experiences for Admin and Hospital Shareholders",
          "Complaints handling system, secure shareholder identity card, and VIP medical discount workflows",
          "Integrated Supabase for modern authentication, Row-Level Security, and real-time database management",
          "Strict data privacy, cryptographic token handling, and multi-platform deployment on Play Store & App Store"
        ],
        "ar": [
          "تسجيل دخول مبني على الصلاحيات (Role-Based Auth) بتجربة مخصصة لكل من الآدمن والمساهمين",
          "نظام تقديم ومتابعة الشكاوى، بطاقة هوية رقمية للمساهم، وخصومات طبية حصرية",
          "ربط كامل مع Supabase للتوثيق وقواعد البيانات اللحظية وحماية البيانات بـ RLS",
          "أعلى معايير حماية البيانات والخصوصية ونشر كامل على المتاجر"
        ]
      },
      "metrics": [
        { "v": "RBAC", "l": { "en": "Role Auth", "ar": "صلاحيات آمنة" } },
        { "v": "100%", "l": { "en": "Supabase", "ar": "بيانات لحظية" } },
        { "v": "VIP", "l": { "en": "Shareholders", "ar": "كبار المساهمين" } }
      ],
      "stack": ["Flutter", "Supabase", "PostgreSQL", "RLS", "Google Play", "App Store", "Clean Code"],
      "links": [
        { "label": { "en": "Showcase / GitHub", "ar": "الكود على GitHub" }, "href": "https://github.com/Siddico" }
      ]
    },
    {
      "id": "event-time",
      "visible": true,
      "name": { "en": "Event Time", "ar": "إدارة الفعاليات" },
      "tag": { "en": "Event Tech · Realtime Sync & Check-In", "ar": "تنظيم الفعاليات · مزامنة لحظية ودخول بـ QR" },
      "bg": "linear-gradient(160deg, #312E81 0%, #1E1B4B 100%)",
      "screens": ["event-home"],
      "desc": {
        "en": "A mobile application for conference registrations, attendee ticketing, and live event check-in management with real-time sync.",
        "ar": "تطبيق موبايل متين لتسجيل حضور المؤتمرات والفعاليات، وإدارة التذاكر، وتسجيل الدخول السريع أثناء الفعاليات الحية."
      },
      "points": {
        "en": [
          "Event registration system connected to Firebase and REST APIs for instant attendee synchronization",
          "Organizer tools for live event entry check-in, ticket validation, and attendance statistics",
          "Responsive, adaptive layout designed for both high-traffic gate tablets and attendees'' smartphones"
        ],
        "ar": [
          "نظام تسجيل في الفعاليات متصل بـ Firebase و RESTful APIs لمزامنة الحضور فورياً",
          "أدوات للمنظمين لمسح تذاكر الحضور وإدارتهم لحظياً أثناء الفعالية مع إحصائيات مباشرة",
          "واجهة متجاوبة وسريعة مصممة للشاشات المختلفة وأجهزة التابلت عند بوابات الدخول"
        ]
      },
      "metrics": [
        { "v": "QR", "l": { "en": "Fast Scan", "ar": "مسح وتأكيد" } },
        { "v": "Cloud", "l": { "en": "Realtime", "ar": "مزامنة سحابية" } }
      ],
      "stack": ["Flutter", "RESTful API", "Firebase", "QR Scanning", "Responsive UI", "Android"],
      "links": [
        { "label": { "en": "GitHub", "ar": "GitHub" }, "href": "https://github.com/Siddico" }
      ]
    }
  ]'::jsonb,
  '[
    {
      "id": "mobile",
      "visible": true,
      "title": { "en": "Mobile Development", "ar": "تطوير تطبيقات الموبايل" },
      "items": ["Flutter", "Dart", "Android SDK", "iOS", "Responsive UI", "Pixel-Perfect Layouts", "Custom Animations", "Platform Channels"]
    },
    {
      "id": "architecture",
      "visible": true,
      "title": { "en": "State & Architecture", "ar": "إدارة الحالة والمعمارية البرمجية" },
      "items": ["Clean Architecture", "BLoC (Cubit)", "Riverpod", "Provider", "SOLID Principles", "OOP", "Dependency Injection", "Repository Pattern"]
    },
    {
      "id": "backend",
      "visible": true,
      "title": { "en": "Backend & Cloud Services", "ar": "السحابة وقواعد البيانات وAPIs" },
      "items": ["RESTful APIs", "Firebase Firestore", "Firebase Auth", "Cloud Messaging (FCM)", "Supabase", "PostgreSQL", "RLS", "Node.js (Express)"]
    },
    {
      "id": "tools",
      "visible": true,
      "title": { "en": "AI, Storage & Tools", "ar": "الذكاء الاصطناعي والتخزين والأدوات" },
      "items": ["Gemini API", "Hugging Face Models", "Cloudinary Storage", "Git & GitHub", "Postman", "CI/CD & Fastlane", "App Store & Play Store Publishing"]
    }
  ]'::jsonb,
  '[
    {
      "id": "cert-1",
      "visible": true,
      "name": { "en": "Flutter & Dart - The Complete Guide", "ar": "دليل فلاتر ودارت الشامل للمحترفين" },
      "issuer": "Udemy / Maximillian Schwarzmüller",
      "date": "2024",
      "credentialId": "UC-FLUTTER-2024",
      "url": "https://www.udemy.com",
      "badge": "Flutter",
      "color": "#2F5BEA"
    },
    {
      "id": "cert-2",
      "visible": true,
      "name": { "en": "Clean Architecture & Design Patterns in Flutter", "ar": "Clean Architecture وأنماط التصميم في فلاتر" },
      "issuer": "Advanced Architecture Mastery",
      "date": "2024",
      "credentialId": "ARCH-CLEAN-99",
      "url": "#",
      "badge": "Clean Arch",
      "color": "#10B981"
    },
    {
      "id": "cert-3",
      "visible": true,
      "name": { "en": "Business English Certified", "ar": "شهادة الإنجليزية للأعمال والتواصل المهني" },
      "issuer": "Professional Business English",
      "date": "2023",
      "credentialId": "ENG-B2-PRO",
      "url": "#",
      "badge": "English",
      "color": "#F59E0B"
    }
  ]'::jsonb,
  '[
    {
      "id": "exp-1",
      "visible": true,
      "role": { "en": "Software Engineer & Flutter Developer", "ar": "مهندس برمجيات ومطور تطبيقات فلاتر" },
      "company": "Freelance & Enterprise Client Products",
      "period": { "en": "2024 - Present", "ar": "2024 - الحالي" },
      "points": {
        "en": [
          "Developed high-traffic production Flutter apps with Clean Architecture and BLoC / Riverpod",
          "Integrated Supabase & Firebase realtime backends, push notifications, and payment gateways",
          "Published and maintained multiple apps on Google Play Store and Apple App Store"
        ],
        "ar": [
          "تطوير تطبيقات فلاتر إنتاجية بمعمارية Clean Architecture وإدارة حالة احترافية بـ BLoC و Riverpod",
          "ربط قواعد بيانات سحابية لحظية بـ Supabase و Firebase مع إشعارات فورية وخدمات دفع",
          "نشر وإدارة تطبيقات حية على متجري Google Play و Apple App Store"
        ]
      }
    },
    {
      "id": "exp-2",
      "visible": true,
      "role": { "en": "Graduation Project Lead Engineer", "ar": "مهندس أول لمشروع التخرج (BrainGuard)" },
      "company": "Faculty of Computers & Artificial Intelligence",
      "period": { "en": "2023 - 2024", "ar": "2023 - 2024" },
      "points": {
        "en": [
          "Engineered an AI healthcare mobile application combining PPG signals, EHR data, and Gemini clinical chatbot",
          "Implemented QR pairing, live chat between doctors and patients, and medication OCR reminders",
          "Achieved Excellent grade and recognition for architectural rigor"
        ],
        "ar": [
          "هندسة تطبيق طبي ذكي يدمج بين إشارات PPG الحيوية، بيانات السجل الطبي EHR، وشات Gemini الاستشاري",
          "برمجة اقتران المريض بالطبيب بـ QR Code، محادثة فورية، وتحليل الروشتات بـ OCR",
          "الحصول على تقدير امتياز وإشادة بلجنة التحكيم لجودة المعمارية والواجهات"
        ]
      }
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  profile = EXCLUDED.profile,
  section_visibility = EXCLUDED.section_visibility,
  scrapbook_settings = EXCLUDED.scrapbook_settings,
  projects = EXCLUDED.projects,
  skills = EXCLUDED.skills,
  certs = EXCLUDED.certs,
  experience = EXCLUDED.experience,
  updated_at = NOW();
