/* ============================================================
   Mohammed Siddiq Portfolio · Supabase Cloud Client
   Zero-Downtime, Offline-First Architecture
============================================================ */
(function () {
  "use strict";

  const SUPABASE_URL = "https://fjhuesougisuegeuryjg.supabase.co";
  // SAFE TO USE IN BROWSER: Publishable client key with Row-Level Security
  const SUPABASE_ANON_KEY = "sb_publishable_0b1NyIZLJ0iTXQPOtWlxdQ_cJkM3mmX";

  let client = null;

  function getClient() {
    if (client) return client;
    if (window.supabase && typeof window.supabase.createClient === "function") {
      try {
        client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: false }
        });
      } catch (err) {
        console.warn("Could not initialize Supabase client:", err);
      }
    }
    return client;
  }

  window.PORTFOLIO_DB = {
    url: SUPABASE_URL,
    isReady: () => !!getClient(),

    // 1. Fetch live portfolio data with graceful fallback
    async getData() {
      const db = getClient();
      if (!db) return null;
      try {
        const { data, error } = await db
          .from("portfolio_data")
          .select("*")
          .eq("id", "main")
          .single();

        if (error || !data) return null;

        const profile = data.profile || {};
        const facts = profile.facts || data.facts || { yoe: "+2", apps: "+4", clean: "100%" };
        const motionSettings = data.motion_settings || profile.motion || data.scrapbook_settings?.motion || {
          tilt3d: true,
          cardFlip: true,
          smoothScroll: true,
          hero3d: true,
          tickerSpeed: "normal",
          ambientGlow: true
        };

        return {
          profile: profile,
          facts: facts,
          motionSettings: motionSettings,
          sectionVisibility: data.section_visibility || {},
          scrapbookSettings: data.scrapbook_settings || {},
          projects: data.projects || [],
          skills: data.skills || [],
          certs: data.certs || [],
          experience: data.experience || []
        };
      } catch (err) {
        console.warn("Supabase fetch failed, using local offline-first fallback:", err);
        return null;
      }
    },

    // 2. Submit contact message to cloud database
    async sendMessage(name, email, message) {
      const db = getClient();
      if (!db) throw new Error("Database client not available");
      
      const { data, error } = await db
        .from("portfolio_messages")
        .insert([{
          name: String(name).slice(0, 100),
          email: String(email).slice(0, 150),
          message: String(message).slice(0, 3000),
          created_at: new Date().toISOString(),
          is_read: false
        }])
        .select();

      if (error) throw error;
      return { success: true, data };
    },

    // 3. Admin: Save full portfolio state to cloud
    async savePortfolio(fullData) {
      const db = getClient();
      if (!db) throw new Error("Database client not available");

      const motion = fullData.motionSettings || fullData.profile?.motion || {};
      const facts = fullData.facts || fullData.profile?.facts || {};

      const payload = {
        id: "main",
        profile: {
          ...(fullData.profile || {}),
          facts: facts,
          motion: motion
        },
        section_visibility: fullData.sectionVisibility || {},
        scrapbook_settings: {
          ...(fullData.scrapbookSettings || {}),
          motion: motion
        },
        projects: fullData.projects || [],
        skills: fullData.skills || [],
        certs: fullData.certs || [],
        experience: fullData.experience || [],
        updated_at: new Date().toISOString()
      };

      const { data, error } = await db
        .from("portfolio_data")
        .upsert(payload, { onConflict: "id" })
        .select();

      if (error) throw error;
      return { success: true, data };
    },

    // 4. Admin: Fetch contact messages
    async getMessages() {
      const db = getClient();
      if (!db) return [];
      try {
        const { data, error } = await db
          .from("portfolio_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) return [];
        return data || [];
      } catch (err) {
        return [];
      }
    },

    // 5. Admin: Delete message
    async deleteMessage(id) {
      const db = getClient();
      if (!db) return false;
      const { error } = await db
        .from("portfolio_messages")
        .delete()
        .eq("id", id);
      return !error;
    }
  };
})();
