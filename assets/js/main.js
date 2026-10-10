(() => {
  "use strict";

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const canAnimate = hasGsap && !reduced;
  if (!canAnimate) root.classList.add("no-anim");

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* --------------------------------------------------------------- i18n */
  const EN = {};
  const EN_PH = {};
  $$("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] = el.textContent; });
  $$("[data-i18n-ph]").forEach((el) => { EN_PH[el.dataset.i18nPh] = el.placeholder; });
  let lang = store.get("lang") === "ar" ? "ar" : "en";
  const tr = (k) => (lang === "ar" ? window.I18N_AR[k] : EN[k]) || EN[k] || "";

  function applyLang(next) {
    lang = next;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => {
      const v = lang === "ar" ? window.I18N_AR[el.dataset.i18n] : EN[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      const v = lang === "ar" ? window.I18N_AR[el.dataset.i18nPh] : EN_PH[el.dataset.i18nPh];
      if (v != null) el.placeholder = v;
    });
    renderProjects();
    renderCerts();
    renderExperience();
    renderSkills();
    renderActivities();
    store.set("lang", lang);
  }

  const SKILL_ICONS = {
    mobile: `<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>`,
    architecture: `<svg viewBox="0 0 24 24"><path d="M12 3 3 7.5l9 4.5 9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/></svg>`,
    backend: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="2.8"/><path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6"/><path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/></svg>`,
    tools: `<svg viewBox="0 0 24 24"><path d="m14.7 6.3 3 3-8.4 8.4H6.3v-3z"/><path d="m13.3 7.7 3 3"/></svg>`,
    ai: `<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2.5h16V17"/></svg>`,
    optimization: `<svg viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z"/><circle cx="12" cy="10" r="2.4"/></svg>`,
    default: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  };

  function renderSkills() {
    const skills = window.__PORTFOLIO_SKILLS || (window.__PORTFOLIO_DATA && window.__PORTFOLIO_DATA.skills);
    if (!skills || !Array.isArray(skills) || !skills.length) return;
    const listEl = $("#skillsList");
    if (!listEl) return;
    const L = (o) => (o && typeof o === "object") ? (o[lang] || o.en || o.ar || "") : (o || "");
    const active = skills.filter(g => g.visible !== false);
    listEl.innerHTML = active.map(g => {
      const icon = SKILL_ICONS[g.id] || SKILL_ICONS.default;
      const title = esc(L(g.title || g.name));
      const tags = (g.items || []).map(it => `<li>${esc(it)}</li>`).join('');
      return `<div class="skill" data-id="${esc(g.id)}">
        <span class="skill__icon" aria-hidden="true">${icon}</span>
        <h3>${title}</h3>
        <ul class="tags">${tags}</ul>
      </div>`;
    }).join('');
    if (!reduced && matchMedia("(pointer: fine)").matches) wireTouches();
  }

  function renderExperience() {
    const E = window.CONTENT && window.CONTENT.experience;
    if (!E || !E.items) return;
    const listEl = $("#experienceList");
    if (!listEl) return;
    const L = (o) => {
      if (!o) return "";
      if (typeof o === "string" && o.startsWith("tl.")) {
        return lang === "ar" ? (window.I18N_AR[o] || o) : (EN[o] || o);
      }
      if (typeof o === "object") return o[lang] || o.en || o.ar || "";
      return String(o);
    };
    const items = E.items.filter(x => x && x.visible !== false);
    listEl.innerHTML = items.map(x => {
      let pts = [];
      if (Array.isArray(x.points)) pts = x.points;
      else if (x.points && typeof x.points === "object") pts = x.points[lang] || x.points.en || x.points.ar || [];
      const title = L(x.t || x.role || x.title);
      const place = L(x.place || x.company);
      const date = L(x.date || x.period);
      return `
        <li class="tl">
          <div class="tl__meta">
            <span class="tl__date">${esc(date)}</span>
            <span class="tl__place">${esc(place)}</span>
          </div>
          <div class="tl__card">
            <h3>${esc(title)}</h3>
            <ul>
              ${pts.map(p => `<li>${esc(L(p))}</li>`).join('')}
            </ul>
          </div>
        </li>
      `;
    }).join('');
  }

  function renderCerts() {
    const C = window.CONTENT && window.CONTENT.certs;
    if (!C) return;
    const L = (o) => (o && typeof o === "object") ? (o[lang] || o.en || o.ar || "") : (o || "");
    const items = (C.items || []).filter(c => c && c.visible !== false);
    const listEl = $("#certList");
    if (!listEl) return;
    listEl.innerHTML = items.map((c) => {
      const name = L(c.name);
      const issuer = L(c.issuer);
      const date = L(c.date);
      const idVal = c.credentialId || c.id;
      const href = c.href || c.url || "#";
      const tone = c.tone || c.color || "#2F5BEA";
      const badgeImg = c.badgeImage ? `<img src="${esc(c.badgeImage)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" alt="">` : esc(c.mark || c.badge || "✓");
      const idLabel = C.idLabel ? L(C.idLabel) : (lang === "ar" ? "رقم الاعتماد" : "ID");
      const showLabel = C.show ? L(C.show) : (lang === "ar" ? "تحقق" : "Verify");
      return `<a class="cert" href="${esc(href)}" target="_blank" rel="noopener">
        <span class="cert__mark" style="background:${tone}" aria-hidden="true">${badgeImg}</span>
        <span class="cert__body"><b>${esc(name)}</b><span>${esc(issuer)}</span><em>${esc(date)}${idVal ? ` · ${idLabel} ${esc(idVal)}` : ""}</em></span>
        <span class="cert__go">${showLabel} ↗</span></a>`;
    }).join("");
  }

  /* ----------------------------------------------------------- projects */
  const L = {
    did: { en: "What I did", ar: "أبرز الإنجازات" },
    follow: { en: "More on GitHub", ar: "المزيد على GitHub" }
  };
  let activeProjectSlideTimers = [];

  function wireProjectSliders() {
    activeProjectSlideTimers.forEach(t => clearInterval(t));
    activeProjectSlideTimers = [];

    $$(".project").forEach((projEl) => {
      const pId = projEl.dataset.id;
      const proj = (window.PROJECTS || []).find(p => p.id === pId);
      if (!proj || !proj.screens || proj.screens.length <= 1) return;
      const visual = projEl.querySelector(".project__visual");
      if (!visual) return;
      const screens = proj.screens;
      let cur = 0;
      let isAnimating = false;
      let isHovered = false;

      const prevBtn = visual.querySelector(".proj-nav-btn--prev");
      const nextBtn = visual.querySelector(".proj-nav-btn--next");
      const dots = visual.querySelectorAll(".proj-dot");
      const curEl = visual.querySelector(".proj-cur");
      const liveDevice = visual.querySelector(".device--live");
      const imgs = liveDevice ? liveDevice.querySelectorAll("img") : [];
      const screensBox = visual.querySelector(".device__screens");

      function showSlide(idx, source = "manual") {
        if (!screens.length || (isAnimating && source === "manual")) return;
        const prevIdx = cur;
        cur = (idx + screens.length) % screens.length;

        if (curEl) curEl.textContent = String(cur + 1);
        dots.forEach((d, i) => d.classList.toggle("is-active", i === cur));

        if (imgs.length) {
          const doSwap = () => {
            imgs.forEach((im, i) => {
              im.classList.toggle("is-on", i === cur);
            });
            isAnimating = false;
          };

          const cardFlipAllowed = canAnimate && (!window.__MOTION_SETTINGS || window.__MOTION_SETTINGS.cardFlip !== false);
          if (cardFlipAllowed && screensBox && prevIdx !== cur && typeof gsap !== "undefined") {
            isAnimating = true;
            const dir = (idx >= prevIdx) ? 1 : -1;
            gsap.timeline()
              .to(screensBox, {
                rotationY: dir * 90,
                scale: 0.96,
                duration: 0.22,
                ease: "power2.in",
                onComplete: doSwap
              })
              .fromTo(screensBox,
                { rotationY: -dir * 90, scale: 0.96 },
                { rotationY: 0, scale: 1, duration: 0.38, ease: "back.out(1.4)" }
              );
          } else {
            doSwap();
          }
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          showSlide(cur - 1, "manual");
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          showSlide(cur + 1, "manual");
        });
      }
      dots.forEach((d, i) => {
        d.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          showSlide(i, "manual");
        });
      });

      // Auto-slide every 4.8 seconds when not hovered
      const timer = setInterval(() => {
        if (document.hidden || isHovered) return;
        showSlide(cur + 1, "auto");
      }, 4800);
      activeProjectSlideTimers.push(timer);

      visual.addEventListener("mouseenter", () => { isHovered = true; });
      visual.addEventListener("mouseleave", () => { isHovered = false; });

      // Mobile Touch Swipe Navigation
      let touchStartX = 0;
      let touchStartY = 0;
      visual.addEventListener("touchstart", (e) => {
        isHovered = true;
        if (!e.touches || !e.touches[0]) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      visual.addEventListener("touchend", (e) => {
        isHovered = false;
        if (!e.changedTouches || !e.changedTouches[0]) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
          if (deltaX < 0) {
            // Swiped left -> next screenshot
            showSlide(cur + 1, "manual");
          } else {
            // Swiped right -> previous screenshot
            showSlide(cur - 1, "manual");
          }
        }
      }, { passive: true });
    });
  }

  function resolveScreenPath(src) {
    if (!src) return "assets/img/screens/brainguard-home.svg";
    if (src.startsWith("/") || src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("assets/")) {
      return src;
    }
    const map = (window.SCREENS || {
      "brainguard-home": "assets/img/screens/brainguard-home.svg",
      "brainguard-ai": "assets/img/screens/brainguard-ai.svg",
      "biscofa-home": "assets/img/screens/biscofa-home.svg",
      "biscofa-admin": "assets/img/screens/biscofa-admin.svg",
      "alhayah-home": "assets/img/screens/alhayah-home.svg",
      "event-home": "assets/img/screens/event-home.svg"
    });
    return map[src] || `assets/img/screens/${src}.svg`;
  }

  const collapsedProjects = new Set();

  function wireProjectCollapsibles() {
    $$(".project__toggle-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = btn.dataset.projId;
        const wrap = btn.closest(".project__body").querySelector(".project__collapse-wrap");
        if (!wrap) return;

        const isNowCollapsed = !wrap.classList.contains("is-collapsed");
        wrap.classList.toggle("is-collapsed", isNowCollapsed);
        btn.classList.toggle("is-collapsed", isNowCollapsed);
        btn.setAttribute("aria-expanded", String(!isNowCollapsed));

        if (isNowCollapsed) {
          collapsedProjects.add(pId);
        } else {
          collapsedProjects.delete(pId);
        }

        const textEl = btn.querySelector(".toggle-btn__text");
        if (textEl) {
          textEl.textContent = isNowCollapsed
            ? (lang === "ar" ? "عرض التفاصيل كاملة" : "Show full details")
            : (lang === "ar" ? "إخفاء التفاصيل" : "Hide details");
        }

        const updateLayout = () => {
          const cards = $$(".project");
          if (cards.length && $("#projectList").classList.contains("is-stacked")) {
            cards.forEach((c) => { c.style.minHeight = ""; });
            const hmax = Math.max(...cards.map((c) => c.offsetHeight));
            cards.forEach((c) => { c.style.minHeight = hmax + "px"; });
          }
          if (window.ScrollTrigger) ScrollTrigger.refresh();
          if (window.__lenis) window.__lenis.resize();
        };

        updateLayout();
        setTimeout(updateLayout, 160);
        setTimeout(updateLayout, 340);
      });
    });
  }

  function renderProjects() {
    const activeProjects = (window.PROJECTS || []).filter(p => p && p.visible !== false);
    const listEl = $("#projectList");
    if (!listEl) return;
    listEl.innerHTML = activeProjects.map((p) => {
      const pName = p.name ? (typeof p.name === "object" ? (p.name[lang] || p.name.en || p.name.ar || "") : String(p.name)) : "";
      const pEnName = p.name ? (typeof p.name === "object" ? (p.name.en || p.name.ar || "") : String(p.name)) : "";
      const sc = (p.screens && Array.isArray(p.screens) && p.screens.length) ? p.screens : ["brainguard-home"];
      const hasMultiple = sc.length > 1;

      const img = (k, on) => `<img class="${on ? "is-on" : ""}" src="${esc(resolveScreenPath(k))}" alt="${esc(pEnName)} screen" loading="lazy" width="540" height="1200" onerror="this.onerror=null;this.src='assets/img/screens/brainguard-home.svg';">`;

      const navControls = hasMultiple ? `
        <button class="proj-nav-btn proj-nav-btn--prev" type="button" aria-label="${lang === 'ar' ? 'السابق' : 'Previous'}"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button class="proj-nav-btn proj-nav-btn--next" type="button" aria-label="${lang === 'ar' ? 'التالي' : 'Next'}"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
        <div class="proj-slider-bar">
          <div class="proj-dots">${sc.map((_, i) => `<button class="proj-dot ${i === 0 ? "is-active" : ""}" data-slide="${i}" type="button" aria-label="Slide ${i+1}"></button>`).join('')}</div>
          <span class="proj-counter"><span class="proj-cur">1</span> / ${sc.length}</span>
        </div>
      ` : "";

      const devices = `<div class="device device--live" data-depth="1.1"><div class="device__screens">${sc.map((k, i) => img(k, i === 0)).join("")}</div></div>`;
      
      const metrics = (p.metrics && p.metrics.length) ? `<div class="metrics">${p.metrics.map((m) => {
        const lbl = m.l ? (typeof m.l === "object" ? (m.l[lang] || m.l.en || "") : String(m.l)) : "";
        return `<div><b>${esc(m.v || "")}</b><span>${esc(lbl)}</span></div>`;
      }).join("")}</div>` : "";

      const split = lang === "ar"
        ? pName.split(" ").map((w) => `<span class="ch"><span>${esc(w)}</span></span>`).join(" ")
        : [...pName].map((c) => c === " " ? " " : `<span class="ch"><span>${esc(c)}</span></span>`).join("");
      
      const pTag = p.tag ? (typeof p.tag === "object" ? (p.tag[lang] || p.tag.en || "") : String(p.tag)) : "";
      const pDesc = p.desc ? (typeof p.desc === "object" ? (p.desc[lang] || p.desc.en || "") : String(p.desc)) : "";
      
      let pts = [];
      if (Array.isArray(p.points)) pts = p.points;
      else if (p.points && typeof p.points === "object") pts = p.points[lang] || p.points.en || p.points.ar || [];

      const stack = Array.isArray(p.stack) ? p.stack : [];
      const links = (p.links || []).map((l, i) => {
        const lbl = l.label ? (typeof l.label === "object" ? (l.label[lang] || l.label.en || "") : String(l.label)) : "Link";
        return `<a class="btn ${i ? "btn--ghost" : "btn--primary"} btn--sm" href="${esc(l.href || "#")}" target="_blank" rel="noopener">${esc(lbl)} ↗</a>`;
      }).join("");

      const socialLinks = (p.social || []).map((x) => `<a href="${esc(x.href || "#")}" target="_blank" rel="noopener">${esc(x.label || "Social")} ↗</a>`).join("");
      const didText = L.did ? (L.did[lang] || L.did.en || "What I did") : "What I did";

      const isCollapsed = collapsedProjects.has(p.id);
      const toggleText = isCollapsed
        ? (lang === "ar" ? "عرض التفاصيل كاملة" : "Show full details")
        : (lang === "ar" ? "إخفاء التفاصيل" : "Hide details");

      return `<article class="project" data-id="${esc(p.id)}">
        <div class="project__visual" style="background:${p.bg || '#1E293B'}">
          <span class="project__word" aria-hidden="true">${esc(pEnName)}</span>
          <div class="project__phones">${devices}</div>
          ${navControls}
        </div>
        <div class="project__body">
          <span class="project__tag">${esc(pTag)}</span>
          <h3 class="project__name" aria-label="${esc(pName)}">${split}</h3>
          <p class="project__desc">${esc(pDesc)}</p>
          <div class="project__details-head">
            <p class="project__label">${didText}</p>
            <button class="project__toggle-btn ${isCollapsed ? "is-collapsed" : ""}" type="button" aria-expanded="${!isCollapsed}" aria-controls="proj-pts-${esc(p.id)}" data-proj-id="${esc(p.id)}">
              <span class="toggle-btn__text">${toggleText}</span>
              <svg class="toggle-btn__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          </div>
          <div class="project__collapse-wrap ${isCollapsed ? "is-collapsed" : ""}" id="proj-pts-${esc(p.id)}">
            <div class="project__collapse-inner">
              <ul class="project__points">${pts.map((t) => `<li>${esc(typeof t === "object" ? (t[lang] || t.en || "") : t)}</li>`).join("")}</ul>
            </div>
          </div>
          ${metrics}
          <ul class="tags">${stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="project__links">${links}</div>
          ${socialLinks ? `<div class="socials"><span>${(L.follow && (L.follow[lang] || L.follow.en)) || "Follow"}</span>${socialLinks}</div>` : ""}
        </div>
      </article>`;
    }).join("");

    wireProjectSliders();
    wireProjectCollapsibles();
    if (typeof revealProjects === "function") {
      try { revealProjects(); } catch (e) {}
    }
  }

  /* ----------------------------------------------------------- activities */
  function renderActivities() {
    const marqueeWrap = $("#activitiesMarquee");
    if (!marqueeWrap) return;
    const acts = (window.__PORTFOLIO_ACTIVITIES || window.ACTIVITIES || []).filter(a => a && a.visible !== false);
    if (!acts.length) return;

    const L = (o) => (o && typeof o === "object") ? (o[lang] || o.en || o.ar || "") : (o || "");
    const viewLabel = lang === "ar" ? "عرض التفاصيل ↗" : "View Details ↗";

    const row1Acts = acts.filter((_, i) => i % 2 === 0);
    const row2Acts = acts.filter((_, i) => i % 2 === 1);
    const list1 = row1Acts.length ? row1Acts : acts;
    const list2 = row2Acts.length ? row2Acts : acts;

    const makeCard = (a) => {
      const title = esc(L(a.title));
      const sub = esc(L(a.sub || a.desc));
      const tag = esc(L(a.tag));
      const date = esc(L(a.date));
      const imgSrc = esc(a.image || "assets/img/activities/activity-ieee.svg");
      return `
        <div class="act-card" data-act-id="${esc(a.id)}" role="button" tabindex="0">
          <div class="act-card__media">
            <img src="${imgSrc}" alt="${title}" loading="lazy">
            ${tag ? `<span class="act-card__tag">${tag}</span>` : ""}
            ${date ? `<span class="act-card__date">${date}</span>` : ""}
          </div>
          <div class="act-card__content">
            <h3 class="act-card__title">${title}</h3>
            <p class="act-card__sub">${sub}</p>
            <div class="act-card__footer">
              <span>${viewLabel}</span>
            </div>
          </div>
        </div>
      `;
    };

    const track1Html = [...list1, ...list1].map(makeCard).join("");
    const track2Html = [...list2, ...list2].map(makeCard).join("");

    marqueeWrap.innerHTML = `
      <div class="act-row">
        <div class="act-track act-track--left">${track1Html}</div>
        <div class="act-track act-track--left">${track1Html}</div>
      </div>
      <div class="act-row">
        <div class="act-track act-track--right">${track2Html}</div>
        <div class="act-track act-track--right">${track2Html}</div>
      </div>
    `;

    wireActivityModal();
  }

  function wireActivityModal() {
    const modal = $("#actModal");
    if (!modal) return;
    const imgEl = $("#actModalImg");
    const tagEl = $("#actModalTag");
    const dateEl = $("#actModalDate");
    const titleEl = $("#actModalTitle");
    const descEl = $("#actModalDesc");

    function openModal(a) {
      const L = (o) => (o && typeof o === "object") ? (o[lang] || o.en || o.ar || "") : (o || "");
      if (imgEl) imgEl.src = a.image || "assets/img/activities/activity-ieee.svg";
      if (tagEl) tagEl.textContent = L(a.tag);
      if (dateEl) dateEl.textContent = L(a.date);
      if (titleEl) titleEl.textContent = L(a.title);
      if (descEl) descEl.textContent = L(a.desc || a.sub);
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.removeProperty("overflow");
    }

    $$(".act-card").forEach(c => {
      c.addEventListener("click", () => {
        const id = c.dataset.actId;
        const acts = (window.__PORTFOLIO_ACTIVITIES || window.ACTIVITIES || []);
        const found = acts.find(a => a.id === id);
        if (found) openModal(found);
      });
    });

    modal.querySelectorAll("[data-close]").forEach(el => {
      el.addEventListener("click", closeModal);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  /* ----------------------------------------------------------- section reordering */
  function applySectionOrder(order) {
    if (!order || !Array.isArray(order) || !order.length) return;
    const main = $("main#top");
    if (!main) return;
    const SEC_MAP = {
      hero: $("#hero"),
      stackStrip: $(".strip"),
      projects: $("#projects"),
      experience: $("#experience"),
      certs: $("#certs"),
      skills: $("#skills"),
      about: $("#about"),
      activities: $("#activities"),
      contact: $("#contact")
    };
    order.forEach(key => {
      const el = SEC_MAP[key];
      if (el && el.parentNode === main) {
        main.appendChild(el);
      }
    });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  applyLang(lang);
  wireCv();
  wireCopy();
  wireMobileNav();
  // what the hot-reload sites (moods.js) use: the same text, data and helpers as this page
  window.SITE = {
    t: tr, esc, canAnimate, reduced,
    get lang() { return lang; },
    setLang(next) { applyLang(next); if (window.MOODS) window.MOODS.rerender(); },
    projects: window.PROJECTS, screens: window.SCREENS, content: window.CONTENT,
    openCv: () => openCv(null),
    copy(text, labelEl, idle) {
      const done = () => { labelEl.textContent = lang === "ar" ? window.I18N_AR["contact.copied"] : "Copied ✓"; setTimeout(() => { labelEl.textContent = idle; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => {}); else done();
    }
  };
  if (!reduced && matchMedia("(pointer: fine)").matches) wireTouches();
  $("#langToggle").addEventListener("click", () => {
    const next = lang === "ar" ? "en" : "ar";
    if (scene3d) scene3d.relabel();
    if (!canAnimate) { applyLang(next); return; }
    gsap.to("main", { opacity: 0, duration: .18, onComplete: () => {
      try {
        applyLang(next);
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      } catch (err) {
        console.error("Language toggle error:", err);
      } finally {
        gsap.to("main", { opacity: 1, duration: .28, clearProps: "opacity" });
      }
    } });
  });

  /* ------------------------------------------------- hero: interactive 3D scene */
  const hero = $("#hero");
  Object.assign(EN, {
    "tip.flutter": "Flutter & Dart", "tip.phone": "BrainGuard & Biscofa · click to switch screens", "tip.maps": "Google Maps & Geolocation",
    "tip.chat": "Realtime Chat · Firebase & Supabase", "tip.store": "Google Play & App Store", "tip.tests": "Clean Architecture & Code",
    "tip.code": "AI & Machine Learning", "hero.hintTouch": "Tap the 3D objects"
  });

  // Dynamic synchronization with Supabase Cloud & Local Backend API
  async function syncWithBackend() {
    try {
      // 1. Always load settings (theme colors, hero status) if backend is running
      try {
        const setRes = await fetch('/api/settings').catch(() => null);
        if (setRes && setRes.ok) {
          const settings = await setRes.json();
          if (settings.primaryColor) root.style.setProperty('--primary', settings.primaryColor);
          if (settings.accentColor) root.style.setProperty('--amber', settings.accentColor);
          if (settings.heroStatus) {
            EN["hero.status"] = settings.heroStatus.en || EN["hero.status"];
            if (window.I18N_AR) window.I18N_AR["hero.status"] = settings.heroStatus.ar || window.I18N_AR["hero.status"];
            const el = document.querySelector('[data-i18n="hero.status"]');
            if (el) el.textContent = lang === 'ar' ? window.I18N_AR["hero.status"] : EN["hero.status"];
          }
        }
      } catch (e) {}

      let cloudData = null;
      let localData = null;

      // 2. Fetch local API if available
      try {
        const portRes = await fetch('/api/portfolio').catch(() => null);
        if (portRes && portRes.ok) localData = await portRes.json();
      } catch (e) {}

      // 3. Fetch live Supabase Cloud database
      if (window.PORTFOLIO_DB && window.PORTFOLIO_DB.isReady()) {
        try {
          cloudData = await window.PORTFOLIO_DB.getData();
        } catch (sErr) {
          console.warn("Supabase fetch fallback:", sErr);
        }
      }

      // 4. Fallback to static data/portfolio.json if neither returned data
      if (!localData && !cloudData) {
        try {
          const stRes = await fetch('data/portfolio.json').catch(() => null);
          if (stRes && stRes.ok) localData = await stRes.json();
        } catch (e) {}
      }

      // 5. Intelligent Merge: local changes (photos, projects) are preserved seamlessly
      let portData = null;
      if (localData && cloudData) {
        const cloudTime = new Date(cloudData.updated_at || 0).getTime();
        const localTime = new Date(localData.updated_at || 0).getTime();
        const primary = cloudTime > localTime ? cloudData : localData;
        const secondary = cloudTime > localTime ? localData : cloudData;
        portData = {
          ...secondary,
          ...primary,
          profile: {
            ...(secondary.profile || {}),
            ...(primary.profile || {})
          }
        };
      } else {
        portData = localData || cloudData;
      }

      if (portData) {
        window.__PORTFOLIO_DATA = portData;
        window.__SCRAPBOOK_SETTINGS = portData.scrapbookSettings || {};

        // 1. Profile Photo & Bio sync (فصل صورة البداية وصورة قسم من أنا وصورة المساعد)
        if (portData.profile) {
          const pr = portData.profile;
          const heroPhoto = pr.photo || pr.heroPhoto || "assets/img/me/mohammed-siddiq.png";
          const aboutPhoto = pr.aboutPhoto || heroPhoto;
          const botPhoto = pr.botPhoto || heroPhoto;

          // Hero Section Photo
          document.querySelectorAll('.hero__photo, #heroPhoto').forEach(img => {
            img.src = heroPhoto;
          });

          // About Section Photo (منفصلة ومستقلة)
          document.querySelectorAll('.about__img, #aboutPhoto').forEach(img => {
            img.src = aboutPhoto;
          });

          // AI Chatbot Avatar
          document.querySelectorAll('.siddiq-bot__toggle-avatar img, .siddiq-bot__avatar-ring img').forEach(img => {
            img.src = botPhoto;
          });

          if (window.CONTENT) {
            window.CONTENT.photo = heroPhoto;
            window.CONTENT.aboutPhoto = aboutPhoto;
            window.CONTENT.botPhoto = botPhoto;
          }

          if (pr.name) {
            document.querySelectorAll('.brand__name, #aboutName').forEach(el => el.textContent = pr.name);
          }
          if (pr.email) {
            document.querySelectorAll('.mailcard__mail').forEach(el => {
              el.textContent = pr.email;
              const link = el.tagName === 'A' ? el : el.closest('a');
              if (link) link.href = `mailto:${pr.email}`;
            });
          }
          if (pr.phone) {
            const cleanNum = pr.phone.replace(/[^0-9+]/g, '');
            document.querySelectorAll('.whatsapp').forEach(el => el.href = `https://wa.me/${cleanNum.replace('+', '')}`);
            document.querySelectorAll('.whatsapp__num').forEach(el => el.textContent = pr.phone);
          }
          if (pr.github) {
            document.querySelectorAll('a[href*="github.com"]').forEach(el => {
              if (!el.classList.contains('brand')) el.href = pr.github;
            });
          }
          if (pr.linkedin) {
            document.querySelectorAll('a[href*="linkedin.com"]').forEach(el => el.href = pr.linkedin);
          }
        }

        // 2. Projects sync
        if (portData.projects && Array.isArray(portData.projects) && portData.projects.length) {
          window.PROJECTS = portData.projects;
          window.SITE.projects = portData.projects;
          renderProjects();
        }

        // 3. Skills & Tech Stack sync
        if (portData.skills && Array.isArray(portData.skills) && portData.skills.length) {
          window.__PORTFOLIO_SKILLS = portData.skills;
          renderSkills();
          // Update ticker strip track with live skills
          const track = $("#stripTrack");
          if (track) {
            const allItems = [];
            portData.skills.filter(g => g.visible !== false).forEach(g => {
              (g.items || []).forEach(it => { if (!allItems.includes(it)) allItems.push(it); });
            });
            if (allItems.length) {
              track.innerHTML = allItems.map(it => `<span>${esc(it)}</span>`).join('');
            }
          }
        }

        // 4. Certifications sync
        if (portData.certs && Array.isArray(portData.certs) && portData.certs.length) {
          if (window.CONTENT && window.CONTENT.certs) {
            window.CONTENT.certs.items = portData.certs;
          }
          renderCerts();
        }

        // 5. Experience timeline sync
        if (portData.experience && Array.isArray(portData.experience) && portData.experience.length) {
          if (window.CONTENT && window.CONTENT.experience) {
            window.CONTENT.experience.items = portData.experience;
          }
          renderExperience();
        }

        // 6. Facts & Stats Numbers sync (سنين الخبرة، عدد التطبيقات، دقة الكود)
        const facts = portData.facts || portData.profile?.facts;
        if (facts) {
          const yoeEl = $("#factYoe");
          const appsEl = $("#factApps");
          const cleanEl = $("#factClean");
          if (yoeEl && facts.yoe) {
            const rawYoe = String(facts.yoe).replace(/[^0-9]/g, '') || "2";
            yoeEl.textContent = rawYoe;
            yoeEl.setAttribute("data-count", rawYoe);
          }
          if (appsEl && facts.apps) {
            const rawApps = String(facts.apps).replace(/[^0-9]/g, '') || "4";
            appsEl.textContent = rawApps;
            appsEl.setAttribute("data-count", rawApps);
          }
          if (cleanEl && facts.clean) {
            cleanEl.textContent = String(facts.clean).replace('%', '');
          }
        }

        // 7. Motion & Animation Settings (الحركات والتأثيرات)
        const motion = portData.motionSettings || portData.profile?.motion;
        if (motion) {
          window.__MOTION_SETTINGS = motion;
          if (motion.ambientGlow === false) {
            const glow = $(".hero__glow");
            if (glow) glow.style.display = "none";
          }
          if (motion.hero3d === false) {
            const stage = $("#sceneStage");
            if (stage) stage.style.display = "none";
            const hint = $(".hero__hint");
            if (hint) hint.style.display = "none";
          }
          if (motion.tickerSpeed) {
            const track = $("#stripTrack");
            if (track) {
              const speeds = { slow: "48s", normal: "28s", fast: "14s" };
              track.style.animationDuration = speeds[motion.tickerSpeed] || "28s";
            }
          }
        }

        // 8. Custom Theme Colors
        if (portData.profile?.primaryColor) {
          root.style.setProperty('--primary', portData.profile.primaryColor);
        }
        if (portData.profile?.accentColor) {
          root.style.setProperty('--amber', portData.profile.accentColor);
        }

        // 9. Section & Component Granular Visibility
        if (portData.sectionVisibility) {
          const vis = portData.sectionVisibility;
          const secMap = {
            hero: "#hero",
            stats: ".hero__facts",
            stackStrip: ".strip",
            projects: "#projects",
            skills: "#skills",
            experience: "#experience",
            certs: "#certs",
            about: "#about",
            activities: "#activities",
            contact: "#contact",
            whatsapp: ".whatsapp",
            mailcard: ".mailcard",
            socials: ".socials",
            cvBtn: ".nav__actions .btn, #heroCvBtn"
          };
          for (const [key, selector] of Object.entries(secMap)) {
            const el = document.querySelector(selector);
            if (el) {
              if (vis[key] === false) el.style.display = 'none';
              else el.style.removeProperty('display');
            }
          }
        }

        // 10. Activities sync
        if (portData.activities && Array.isArray(portData.activities) && portData.activities.length) {
          window.__PORTFOLIO_ACTIVITIES = portData.activities;
          renderActivities();
        }

        // 11. Section Ordering sync
        if (portData.sectionOrder && Array.isArray(portData.sectionOrder) && portData.sectionOrder.length) {
          applySectionOrder(portData.sectionOrder);
        }

        if (portData.scrapbookSettings && portData.scrapbookSettings.enabled === false) {
          const hrEl = document.getElementById('hotReload');
          if (hrEl) hrEl.style.display = 'none';
        }
      }
    } catch (e) {
      // Running static or offline
    }
  }
  syncWithBackend();
  const heroScreenMeta = [
    { name: "BrainGuard", sub: { en: "AI Stroke Risk & Biometrics", ar: "تنبؤ السكتة بالذكاء الاصطناعي والمؤشرات الحيوية" } },
    { name: "BrainGuard AI", sub: { en: "Biometric Dashboard", ar: "لوحة المريض والمؤشرات الحيوية" } },
    { name: "Biscofa", sub: { en: "Customer Coffee Ordering App", ar: "تطبيق العميل وطلب المشروبات" } },
    { name: "Biscofa Admin", sub: { en: "Live Store Management Portal", ar: "لوحة تحكم المتجر والطلبات اللحظية" } },
    { name: "Al Hayah", sub: { en: "Pharmacy & Medicine Delivery", ar: "تطبيق الصيدلية وتوصيل الأدوية" } },
    { name: "Event Time", sub: { en: "Event Ticketing & Booking", ar: "حجز الفعاليات والتذاكر" } }
  ];

  function updateHeroPhoneTip(idx) {
    const item = heroScreenMeta[idx] || heroScreenMeta[0];
    const sub = lang === "ar" ? item.sub.ar : item.sub.en;
    const tipAr = `📱 ${item.name} · ${sub} (انقر للتبديل)`;
    const tipEn = `📱 ${item.name} · ${sub} (Click to switch)`;
    EN["tip.phone"] = tipEn;
    if (window.I18N_AR) window.I18N_AR["tip.phone"] = tipAr;
    const tipEl = $("#sceneTip");
    if (tipEl && tipEl.dataset.key === "phone") {
      tipEl.textContent = lang === "ar" ? tipAr : tipEn;
    }
  }

  function wireHeroProjectFrame() {
    const frame = $("#heroProjectFrame");
    if (!frame) return;
    const imgs = $$("#heroFrameScreen img", frame);
    const badgeText = $("#heroBadgeText", frame);
    if (!imgs.length) return;

    let cur = 0;
    let timer = null;

    function setFrameSlide(idx) {
      cur = (idx + imgs.length) % imgs.length;
      imgs.forEach((img, i) => {
        img.classList.toggle("is-active", i === cur);
      });
      const activeImg = imgs[cur];
      if (activeImg && badgeText) {
        const name = activeImg.dataset.name || "Project";
        const sub = (lang === "ar" ? activeImg.dataset.subAr : activeImg.dataset.subEn) || "";
        badgeText.textContent = sub ? `${name} · ${sub}` : name;
      }
    }

    function nextSlide() {
      setFrameSlide(cur + 1);
    }

    timer = setInterval(() => {
      if (!document.hidden) nextSlide();
    }, 3200);

    frame.addEventListener("click", () => {
      clearInterval(timer);
      nextSlide();
      timer = setInterval(() => {
        if (!document.hidden) nextSlide();
      }, 3200);
      frame.style.transform = (root.dir === "rtl" ? "rotate(-6deg) " : "rotate(6deg) ") + "scale(0.96)";
      setTimeout(() => { frame.style.transform = ""; }, 220);
    });
  }

  let scene3d = null;
  if (window.HeroScene && window.HeroScene.supported()) {
    try {
      const S = window.SCREENS || {
        "brainguard-home": "assets/img/screens/brainguard-home.svg",
        "brainguard-ai": "assets/img/screens/brainguard-ai.svg",
        "biscofa-home": "assets/img/screens/biscofa-home.svg",
        "biscofa-admin": "assets/img/screens/biscofa-admin.svg",
        "alhayah-home": "assets/img/screens/alhayah-home.svg",
        "event-home": "assets/img/screens/event-home.svg"
      };
      scene3d = window.HeroScene.create($("#sceneStage"), {
        photo: (window.__PORTFOLIO_DATA?.profile?.photo) || "assets/img/me/mohammed-siddiq.png",
        screens: [
          S["brainguard-home"] || "assets/img/screens/brainguard-home.svg",
          S["brainguard-ai"] || "assets/img/screens/brainguard-ai.svg",
          S["biscofa-home"] || "assets/img/screens/biscofa-home.svg",
          S["biscofa-admin"] || "assets/img/screens/biscofa-admin.svg",
          S["alhayah-home"] || "assets/img/screens/alhayah-home.svg",
          S["event-home"] || "assets/img/screens/event-home.svg"
        ],
        onScreenChange: (idx) => {
          updateHeroPhoneTip(idx);
        },
        tip: $("#sceneTip"), reduced,
        label: (k) => tr("tip." + k)
      });
      root.classList.add("has-scene");
      if (matchMedia("(pointer: coarse)").matches) {
        const hint = $(".hero__hint");
        hint.dataset.i18n = "hero.hintTouch";
        hint.textContent = tr("hero.hintTouch");
      }
    } catch (e) { scene3d = null; }
  }

  wireHeroProjectFrame();

  // Multi-screen project sliders are managed with full synchronization in wireProjectSliders()

  if (!canAnimate) {
    if (scene3d) scene3d.start();
    return;
  }

  /* ================================================================ motion */
  gsap.registerPlugin(ScrollTrigger);
  let lenis = null;
  if (typeof window.Lenis !== "undefined" && (!window.__MOTION_SETTINGS || window.__MOTION_SETTINGS.smoothScroll !== false)) {
    lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = id.length > 1 ? $(id) : null;
      if (!target && id !== "#top") return;
      e.preventDefault();
      lenis.scrollTo(target || 0, { offset: -70 });
    }));
  }

  // hero entrance: copy slides in while the 3D objects fly in from deep space
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero__copy > *", { y: 26, opacity: 0, duration: .8, stagger: .08 }, .1)
    .from(".hero__hint", { opacity: 0, duration: .6 }, 2.2);
  if (scene3d) {
    gsap.delayedCall(.15, () => scene3d.start());
    // scrolling away pulls the objects apart and towards you
    ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", scrub: .4, onUpdate: (s) => { scene3d.exit = s.progress; } });
  } else {
    gsap.from(".hero__photo", { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", delay: .3 });
  }

  // keep Lenis in step whenever ScrollTrigger re-measures the page
  if (lenis) { ScrollTrigger.addEventListener("refresh", () => lenis.resize()); ScrollTrigger.refresh(); }

  // about: a quiet fade-up for the portrait
  gsap.from(".about__photo", { y: 40, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".about__photo", start: "top 82%", once: true } });

  // counters
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count, o = { v: 0 };
    el.textContent = "0";
    gsap.to(o, { v: end, duration: end > 50 ? 1.8 : 1, delay: .6, ease: "power3.out", onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US"); } });
  });

  // stack strip
  const strip = $(".strip__track");
  strip.innerHTML += strip.innerHTML;
  gsap.fromTo(strip, { xPercent: 0 }, { xPercent: -50, duration: 36, ease: "none", repeat: -1 });

  // reveals
  $$(".sec-head, .minor-title, .about__copy, .contact__inner > *").forEach((el) =>
    gsap.from(el, { y: 36, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
  ScrollTrigger.batch(".other, .tl, .skill", { start: "top 90%", once: true, onEnter: (els) => gsap.from(els, { y: 30, opacity: 0, duration: .7, ease: "power3.out", stagger: .08 }) });
  let projectCtx = null;
  function revealProjects() {
    if (projectCtx) projectCtx.revert();
    projectCtx = gsap.context(() => {
      const cards = $$(".project");
      // on wide screens the cards stack: each one sticks and the next slides over it
      cards.forEach((c) => { c.style.minHeight = ""; c.style.top = ""; });
      const hmax = Math.max(...cards.map((c) => c.offsetHeight));
      const stack = innerWidth > 900 && hmax < innerHeight - 112 - (cards.length - 1) * 14;
      $("#projectList").classList.toggle("is-stacked", stack);
      // same height for every card, each one a little lower, like a deck
      if (stack) cards.forEach((c, i) => { c.style.minHeight = hmax + "px"; c.style.top = 92 + i * 14 + "px"; });
      cards.forEach((card, idx) => {
        const devs = $$(".device", card), vis = $(".project__visual", card), one = devs.length === 1;
        const pose = (i) => one ? { y: 0, r: 0 } : [{ y: 16, r: -5 }, { y: -12, r: 0 }, { y: 16, r: 5 }][i] || { y: 0, r: 0 };
        gsap.set(devs, { y: (i) => pose(i).y, rotation: (i) => pose(i).r });
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } });
        tl.from(card, { y: 90, rotationX: 10, transformPerspective: 1400, transformOrigin: "50% 0%", opacity: 0, duration: 1.1, ease: "expo.out" })
          .from($$(".project__name .ch > span", card), { yPercent: 115, rotation: 8, duration: .8, ease: "back.out(1.6)", stagger: .035 }, .25)
          .from($$(".project__tag, .project__desc, .project__label", card), { y: 18, opacity: 0, duration: .6, ease: "power3.out", stagger: .06 }, .35)
          .from($$(".project__points li", card), { x: -24, opacity: 0, duration: .55, ease: "power3.out", stagger: .07 }, .5)
          .from($$(".metrics > div, .tags li", card), { y: 14, scale: .8, opacity: 0, duration: .5, ease: "back.out(2)", stagger: .03 }, .6)
          // phones rise from below and fan out to their places (sides a little lower and tilted)
          .fromTo(devs, { y: 110, x: (i) => (one ? 0 : (1 - i) * 70), rotation: 0, scale: .82, opacity: 0 },
            { y: (i) => pose(i).y, x: 0, rotation: (i) => pose(i).r, scale: 1, opacity: 1, duration: 1.15, ease: "power3.out", stagger: .12 }, .15);
        // metrics count up
        $$(".metrics b", card).forEach((b) => {
          const m = b.textContent.replace(/,/g, "").match(/^(\d+)(.*)$/); if (!m) return;
          const o = { v: 0 }, end = +m[1];
          tl.to(o, { v: end, duration: 1.4, ease: "power3.out", onUpdate: () => { b.textContent = Math.round(o.v).toLocaleString("en-US") + m[2]; } }, .6);
        });
        // gentle idle float (on yPercent, so it never fights the resting position)
        devs.forEach((d, i) => gsap.fromTo(d, { yPercent: 0 }, { yPercent: i % 2 ? -2.2 : 2.2, duration: 2.6 + i * .4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 + i * .25 }));
        // giant outlined name slides behind the phones
        gsap.fromTo($(".project__word", card), { xPercent: 12 }, { xPercent: -38, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .6 } });
        // stacking: the card under the next one shrinks back and dims
        if (stack && idx < cards.length - 1) {
          gsap.to(card, { scale: .9, "--dim": .35, ease: "none", scrollTrigger: { trigger: cards[idx + 1], start: "top bottom", end: () => "top " + (92 + (idx + 1) * 14) + "px", scrub: true } });
        }
        // 3D tilt toward the pointer + a spotlight that follows it
        vis.addEventListener("pointermove", (e) => {
          const r = vis.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
          vis.style.setProperty("--mx", (nx + .5) * 100 + "%"); vis.style.setProperty("--my", (ny + .5) * 100 + "%");
          devs.forEach((d) => { const k = +d.dataset.depth || 1; gsap.to(d, { rotationY: nx * 30 * k, rotationX: -ny * 20 * k, z: 50 * k, duration: .6, ease: "power3.out", overwrite: "auto" }); });
        });
        vis.addEventListener("pointerleave", () => devs.forEach((d) => gsap.to(d, { rotationY: 0, rotationX: 0, z: 0, duration: .9, ease: "elastic.out(1, .5)", overwrite: "auto" })));
      });
    });
  }
  revealProjects();

  // nav + progress
  const nav = $("#nav");
  const navLinks = $$(".nav__links a");
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => {
    $("#progress").style.transform = `scaleX(${s.progress})`;
    nav.classList.toggle("is-scrolled", s.scroll() > 10);
    nav.classList.toggle("is-hidden", s.direction === 1 && s.scroll() > 500);
  } });
  ["projects", "experience", "skills", "about", "contact"].forEach((id) => {
    ScrollTrigger.create({ trigger: "#" + id, start: "top 50%", end: "bottom 50%", onToggle: (s) => {
      if (s.isActive) navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + id));
    } });
  });
  window.addEventListener("load", () => ScrollTrigger.refresh());

  /* ============================================== helpers (no motion needed) */
  /* small interactions: every card and button answers the pointer */
  function wireTouches() {
    if (window.__MOTION_SETTINGS && window.__MOTION_SETTINGS.tilt3d === false) return;
    // skill cards and fact tiles: tilt + a spotlight that follows the cursor
    $$(".skill, .facts > div, .mailcard").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", x * 100 + "%"); el.style.setProperty("--my", y * 100 + "%");
        el.style.transform = `perspective(700px) rotateX(${(.5 - y) * 7}deg) rotateY(${(x - .5) * 9}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    // magnetic buttons
    $$(".btn, .whatsapp, .lang").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  var openCv; // var: wireCv() runs (and sets it) before this line is reached
  function wireCv() {
    const modal = $("#cvModal");
    let last = null;
    const close = () => { modal.hidden = true; if (window.__lenis) window.__lenis.start(); if (last) last.focus(); };
    openCv = (from) => { last = from || document.activeElement; modal.hidden = false; if (window.__lenis) window.__lenis.stop(); $(".cv-modal__close", modal).focus(); };
    $$("[data-cv]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); openCv(a); }));
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
    // inside the claude.ai preview, plain download links are blocked; save through the viewer instead
    let saver = null;
    if (window.claude && typeof window.claude.use === "function") window.claude.use("downloads").then((ns) => { saver = ns; }, () => {});
    const dl = $(".cv-modal__actions a", modal);
    dl.addEventListener("click", (e) => {
      if (!saver) return;
      e.preventDefault();
      fetch(dl.getAttribute("href")).then((r) => r.blob())
        .then((blob) => saver.save({ filename: "Flutter_Developer_Mohammed_Siddiq.pdf", data: blob }))
        .catch(() => { /* declined or unavailable: the preview stays visible */ });
    });
  }
  function wireCopy() {
    const btn = $("#copyMail");
    btn.addEventListener("click", () => {
      const label = $("span", btn);
      const email = $("#mailLink").textContent.trim();
      const done = () => {
        label.textContent = lang === "ar" ? window.I18N_AR["contact.copied"] : "Copied ✓";
        setTimeout(() => { label.textContent = tr("contact.copy"); }, 1800);
      };
      const fallback = () => { const r = document.createRange(); r.selectNodeContents($("#mailLink")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(done, fallback);
      else fallback();
    });
  }

  function wireMobileNav() {
    const burger = $("#mobileNavToggle");
    const drawer = $("#mobileNavDrawer");
    const closeBtn = $("#mobileNavClose");
    const backdrop = $("#navDrawerBackdrop");
    if (!burger || !drawer) return;

    function openDrawer() {
      drawer.classList.add("is-open");
      burger.classList.add("is-active");
      burger.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      burger.classList.remove("is-active");
      burger.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.removeProperty("overflow");
    }

    burger.addEventListener("click", () => {
      if (drawer.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (backdrop) backdrop.addEventListener("click", closeDrawer);

    $$(".nav-drawer__links a", drawer).forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        closeDrawer();
        if (href && href.startsWith("#")) {
          const target = $(href);
          if (target) {
            e.preventDefault();
            if (window.__lenis) {
              window.__lenis.scrollTo(target, { offset: -70 });
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
    });
  }
})();
