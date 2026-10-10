/* Scrapbook: a hand-made portfolio. Torn paper header, polaroids with tape, sticky notes you can drag,
   projects as taped pages, experience as a shop receipt, contact as an envelope. */
(function () {
  "use strict";
  const STAR = '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M20 3l4.6 11 11.4.9-8.7 7.4 2.7 11.2L20 27.7 9.9 33.5l2.7-11.2L3.9 14.9 15.4 14z"/></svg>';
  const SPARK = '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 4c1.6 9 5.4 13 16 16-10.6 3-14.4 7-16 16-1.6-9-5.4-13-16-16 10.6-3 14.4-7 16-16z"/></svg>';
  const SMILE = '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="20" cy="20" r="16"/><path d="M13 23c3 5 11 5 14 0"/><path d="M14 15v2M26 15v2"/></svg>';
  const ARROW = '<svg viewBox="0 0 90 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 30c22-24 52-26 76-10"/><path d="M70 10l10 10-13 5"/></svg>';

  function render(root, S) {
    const C = S.content || window.CONTENT || {};
    const t = S.t || ((k) => k);
    const e = S.esc || ((s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    
    // Robust multi-lingual string resolver
    const L = (o) => {
      if (!o) return "";
      if (typeof o === "string") {
        if (o.startsWith("tl.") || o.startsWith("sk.") || o.startsWith("proj.") || o.startsWith("cert.") || o.startsWith("hero.") || o.startsWith("about.") || o.startsWith("contact.")) {
          return t(o);
        }
        return o;
      }
      if (typeof o === "object") {
        if (Array.isArray(o)) return o;
        return o[S.lang] || o.en || o.ar || "";
      }
      return String(o);
    };

    // Robust array resolver (handles both array and { en: [], ar: [] })
    const getPoints = (x) => {
      if (!x) return [];
      if (Array.isArray(x)) return x;
      if (typeof x === "object") {
        const arr = x[S.lang] || x.en || x.ar;
        if (Array.isArray(arr)) return arr;
      }
      return [];
    };

    const rot = (i, k = 2.2) => ((i * 37) % 7 - 3) * k / 3;

    // 1. Projects Rendering
    const activeProjects = (S.projects || window.PROJECTS || []).filter(p => p && p.visible !== false);
    const proj = activeProjects.map((p, i) => {
      const screens = p.screens && p.screens.length ? p.screens : ["brainguard-home"];
      const shots = screens.slice(0, 3).map((k, j) => {
        const src = (S.screens && S.screens[k]) || k;
        return `<figure class="sb-pol sb-pol--s" style="--r:${[-6, 3, -2][j]}deg"><i class="sb-tape"></i><img src="${e(src)}" alt="${e(L(p.name))} screen" loading="lazy"></figure>`;
      }).join("");

      const stampsHtml = p.metrics && p.metrics.length ? `<div class="sb-stamps">${p.metrics.map((m, j) => {
        const val = String(m.v || "");
        const vClass = val.length > 7 ? "sb-stamp-val--xs" : val.length > 4 ? "sb-stamp-val--s" : "";
        const rVal = [-5, 4, -3, 5][j % 4];
        return `<span class="sb-stamp" style="--r:${rVal}deg"><b class="${vClass}">${e(val)}</b><small class="sb-stamp-lbl">${e(L(m.l))}</small></span>`;
      }).join("")}</div>` : "";

      const pts = getPoints(p.points);
      const stack = Array.isArray(p.stack) ? p.stack : [];
      const links = Array.isArray(p.links) ? p.links : [];
      const didText = (C.projects && C.projects.did) ? L(C.projects.did) : (S.lang === "ar" ? "أبرز الإنجازات" : "Key Accomplishments");

      return `<article class="sb-page sb-drop" style="--r:${i % 2 ? 1.2 : -1.2}deg">
        <i class="sb-tape sb-tape--l"></i><i class="sb-tape sb-tape--r"></i>
        <div class="sb-page__shots">${shots}</div>
        <div class="sb-page__body">
          <span class="sb-label">${e(L(p.tag))}</span>
          <h3 class="sb-page__name">${e(L(p.name))}</h3>
          <p>${e(L(p.desc))}</p>
          <p class="sb-hand">${e(didText)}</p>
          <ul class="sb-checks">${pts.map((x) => `<li>${e(L(x))}</li>`).join("")}</ul>
          ${stampsHtml}
          <div class="sb-tags">${stack.map((x) => `<span>${e(x)}</span>`).join("")}</div>
          <div class="sb-tickets">${links.map((l) => `<a class="sb-ticket" href="${e(l.href)}" target="_blank" rel="noopener">${e(L(l.label))} ↗</a>`).join("")}
          ${p.social ? p.social.map((x) => `<a class="sb-ticket sb-ticket--alt" href="${e(x.href)}" target="_blank" rel="noopener">${e(x.label)} ↗</a>`).join("") : ""}</div>
        </div>
      </article>`;
    }).join("");

    // 2. Others Activities Rendering
    const otherItems = (C.others && C.others.items) ? C.others.items : [];
    const others = otherItems.map((o, i) => `<div class="sb-index sb-drop" style="--r:${rot(i + 2)}deg"><b>${e(o.name)}</b><p>${e(t(o.k))}</p>${o.href ? `<a href="${e(o.href)}" target="_blank" rel="noopener">${e(o.linkKey ? t(o.linkKey) : o.link)}</a>` : ""}</div>`).join("");

    // 3. Experience Timeline (Receipt Style)
    const expItems = (C.experience && C.experience.items ? C.experience.items : []).filter(x => x && x.visible !== false);
    const exp = expItems.map((x) => {
      const title = L(x.t || x.role || x.title);
      const place = L(x.placeText || x.place || x.company);
      const dateStr = L(x.dateKey ? t(x.dateKey) : (x.date || x.period));
      const pts = getPoints(x.points);
      return `<li>
        <div class="sb-rc__row"><b>${e(title)}</b><i></i><span>${e(dateStr)}</span></div>
        <em>${e(place)}</em>
        <ul>${pts.map((k) => `<li>${e(L(k))}</li>`).join("")}</ul>
      </li>`;
    }).join("");

    // 4. Skills Sticky Notes Rendering
    const skillGroups = window.__PORTFOLIO_SKILLS || (window.__PORTFOLIO_DATA && window.__PORTFOLIO_DATA.skills) || (C.skills && C.skills.groups) || [];
    const activeSkills = skillGroups.filter(g => g && g.visible !== false);
    const notes = activeSkills.map((g, i) => {
      const title = L(g.title || g.t || g.name);
      const items = g.items || g.tags || [];
      return `<div class="sb-note sb-drop" data-drag style="--r:${rot(i, 4)}deg;--c:var(--n${i % 3})">
        <i class="sb-pin"></i>
        <h3>${e(title)}</h3>
        <ul>${items.map((x) => `<li>${e(x)}</li>`).join("")}</ul>
      </div>`;
    }).join("");

    // 5. Certifications Wax Seals Rendering
    const certItems = (C.certs && C.certs.items ? C.certs.items : []).filter(c => c && c.visible !== false);
    const certsHtml = certItems.map((c, i) => {
      const name = L(c.name);
      const issuer = L(c.issuer);
      const date = L(c.date);
      const idStr = c.credentialId || c.id;
      const href = c.href || c.url || "#";
      const mark = c.mark || c.badge || "✓";
      const tone = c.tone || c.color || "#2F5BEA";
      const badgeImg = c.badgeImage ? `<img src="${e(c.badgeImage)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" alt="">` : e(mark);
      const idLabel = C.certs && C.certs.idLabel ? L(C.certs.idLabel) : "ID";
      const showLabel = C.certs && C.certs.show ? L(C.certs.show) : (S.lang === "ar" ? "تحقق" : "Verify");
      return `<a class="sb-cert sb-drop" href="${e(href)}" target="_blank" rel="noopener" style="--r:${[-2, 1.5, -1, 2][i % 4]}deg">
        <i class="sb-tape"></i><span class="sb-seal" style="--c:${tone}">${badgeImg}</span>
        <b>${e(name)}</b><span>${e(issuer)}</span><em>${e(date)}${idStr ? ` · ${e(idLabel)} ${e(idStr)}` : ""}</em>
        <span class="sb-cert__go">${e(showLabel)} ↗</span>
      </a>`;
    }).join("");

    // 6. Dynamic Facts & Profile resolution
    const pData = window.__PORTFOLIO_DATA || {};
    const pr = pData.profile || {};
    const personName = pr.name || C.name || "Mohammed Siddiq";
    const personPhoto = pr.photo || C.photo || "assets/img/me/mohammed-siddiq.png";
    const liveFacts = pData.facts || pr.facts || {};
    const factsList = [
      { v: liveFacts.yoe || "2+", sup: "yrs", k: "facts.1" },
      { v: liveFacts.apps || "4+", suf: "apps", k: "facts.2" },
      { v: liveFacts.clean || "100%", k: "facts.3" }
    ];
    const contactEmail = pr.email || (C.contact && C.contact.email) || "mohammedasiddiqdev@gmail.com";
    const contactPhone = pr.phone || "+20 122 789 7361";
    const cleanPhone = contactPhone.replace(/[^0-9]/g, '');

    const SB = window.__SCRAPBOOK_SETTINGS || {
      showPolaroidHero: true,
      showProjects: true,
      showExperienceReceipt: true,
      showSkillsSticky: true,
      showCertsWax: true,
      showContact: true
    };

    const heroTitleList = (C.hero && Array.isArray(C.hero.title)) ? C.hero.title : ["hero.t1", "hero.t2", "hero.t3"];
    const navItems = Array.isArray(C.nav) ? C.nav : [["projects", "nav.projects"], ["experience", "nav.experience"], ["skills", "nav.skills"], ["about", "nav.about"], ["contact", "nav.contact"]];
    const stackItems = (C.stack && Array.isArray(C.stack)) ? C.stack : ["Flutter", "Dart", "BLoC", "Clean Architecture", "Firebase", "Supabase"];

    root.innerHTML = `
    <header class="sb-top">
      <nav class="sb-nav">
        <a class="sb-brand" href="#sb-hero">${e(personName.split(" ")[0])} <span>${SPARK}</span></a>
        <div class="sb-links">${navItems.map(([id, k]) => `<a href="#sb-${id}">${e(t(k))}</a>`).join("")}</div>
        <div class="sb-actions"><button class="sb-lang" type="button">${S.lang === "ar" ? "EN" : "ع"}</button><button class="sb-cv" type="button">CV ↓</button></div>
      </nav>
      <div class="sb-mast">
        <span class="sb-year">2026</span>
        <h1 class="sb-title" aria-label="Portfolio"><span>P</span><span>o</span><span>r</span><span>t</span><span>f</span><span class="sb-o">o</span><span>l</span><span>i</span><span>o</span></h1>
        <p class="sb-tagline">Flutter <b>✦</b> Clean Architecture <b>✦</b> AI &amp; Cloud</p>
        <i class="sb-doodle sb-doodle--a">${STAR}</i><i class="sb-doodle sb-doodle--b">${SPARK}</i><i class="sb-doodle sb-doodle--c">${STAR}</i>
      </div>
    </header>

    ${SB.showPolaroidHero !== false ? `
    <section class="sb-board" id="sb-hero">
      <div class="sb-wrap sb-hero">
        <figure class="sb-pol sb-pol--hero sb-drop" style="--r:-4deg"><i class="sb-tape"></i><div class="sb-pol__bg"><img src="${e(personPhoto)}" alt="${e(personName)}"></div><figcaption>${e(personName)}</figcaption><i class="sb-sticker">${SMILE}</i></figure>
        <div class="sb-hello">
          <span class="sb-status">${e(t(C.hero ? C.hero.status : "hero.status"))}</span>
          <h2 class="sb-hi">${e(t(C.hero ? C.hero.hi : "hero.hi"))} <span class="sb-wave">!</span></h2>
          <p class="sb-lead">${heroTitleList.map((k, i) => i === 1 ? `<mark>${e(t(k))}</mark>` : e(t(k))).join(" ")}</p>
          <p class="sb-sub">${e(t(C.hero ? C.hero.sub : "hero.sub"))}</p>
          <div class="sb-tickets"><a class="sb-ticket" href="#sb-projects">${e(t(C.hero ? C.hero.cta1 : "hero.cta1"))} →</a><a class="sb-ticket sb-ticket--alt" href="#sb-contact">${e(t(C.hero ? C.hero.cta2 : "hero.cta2"))}</a></div>
          <div class="sb-facts">${factsList.map((f, i) => `<div class="sb-sticky" data-drag style="--r:${[-5, 3, -2][i]}deg;--c:var(--n${i})"><b>${e(f.v)}${f.sup ? `<sup>${f.sup}</sup>` : ""}${f.suf || ""}</b><span>${e(t(f.k))}</span></div>`).join("")}</div>
        </div>
      </div>
      <div class="sb-strip"><div>${stackItems.concat(stackItems).map((x) => `<span>${e(x)}</span>`).join("<i>✦</i>")}</div></div>
    </section>` : ""}

    ${SB.showProjects !== false ? `
    <section class="sb-sec" id="sb-projects">
      <div class="sb-wrap">
        <header class="sb-head"><span class="sb-hand">${e(t(C.projects ? C.projects.k : "proj.k"))}</span><h2 class="sb-h2"><span class="sb-labeltape">${e(t(C.projects ? C.projects.title : "proj.title"))}</span></h2><p>${e(t(C.projects ? C.projects.sub : "proj.sub"))}</p></header>
        <div class="sb-pages">${proj}</div>
        <h3 class="sb-h3">${e(t(C.others ? C.others.title : "other.title"))}</h3>
        <div class="sb-others">${others}</div>
      </div>
    </section>` : ""}

    ${SB.showExperienceReceipt !== false ? `
    <section class="sb-sec sb-sec--tint" id="sb-experience">
      <div class="sb-wrap sb-exp">
        <header class="sb-head"><span class="sb-hand">${e(t(C.experience ? C.experience.k : "exp.k"))}</span><h2 class="sb-h2">${e(t(C.experience ? C.experience.title : "exp.title"))}</h2><i class="sb-arrow">${ARROW}</i></header>
        <div class="sb-receipt sb-drop" style="--r:1.5deg">
          <p class="sb-rc__shop">the experience shop</p>
          <p class="sb-rc__meta"><span>item</span><span>date</span></p>
          <ol>${exp}</ol>
          <p class="sb-rc__total"><span>TOTAL</span><span>${liveFacts.apps || "4+"} Apps &amp; Clean Architecture ✓</span></p>
          <p class="sb-rc__thanks">thank you for reading!</p>
        </div>
      </div>
    </section>` : ""}

    ${SB.showCertsWax !== false ? `
    <section class="sb-sec" id="sb-certs">
      <div class="sb-wrap">
        <header class="sb-head"><span class="sb-hand">${e(t(C.certs ? C.certs.k : "cert.k"))}</span><h2 class="sb-h2"><span class="sb-labeltape">${e(t(C.certs ? C.certs.title : "cert.title"))}</span></h2><p>${e(t(C.certs ? C.certs.sub : "cert.sub"))}</p></header>
        <div class="sb-certs">${certsHtml}</div>
      </div>
    </section>` : ""}

    ${SB.showSkillsSticky !== false ? `
    <section class="sb-sec" id="sb-skills">
      <div class="sb-wrap">
        <header class="sb-head"><span class="sb-hand">${e(t(C.skills ? C.skills.k : "sk.k"))}</span><h2 class="sb-h2"><span class="sb-labeltape">${e(t(C.skills ? C.skills.title : "sk.title"))}</span></h2><p class="sb-hint">${S.lang === "ar" ? "اسحب الورق" : "drag the notes around"} ↯</p></header>
        <div class="sb-notes">${notes}</div>
      </div>
    </section>` : ""}

    <section class="sb-sec sb-sec--tint" id="sb-about">
      <div class="sb-wrap sb-about">
        <figure class="sb-pol sb-pol--about sb-drop" style="--r:3deg"><i class="sb-tape"></i><img src="${e(personPhoto)}" alt="${e(personName)}" loading="lazy"><figcaption>${e(t(C.about ? C.about.cap : "about.cap"))}</figcaption></figure>
        <div class="sb-notebook sb-drop" style="--r:-1deg">
          <span class="sb-hand">${e(t(C.about ? C.about.k : "about.k"))}</span>
          <h2 class="sb-h2">${e(t(C.about ? C.about.title : "about.title"))}</h2>
          ${(C.about && Array.isArray(C.about.p) ? C.about.p : ["about.p1", "about.p2"]).map((k) => `<p>${e(t(k))}</p>`).join("")}
          <p class="sb-langs">${(C.about && Array.isArray(C.about.langs) ? C.about.langs : ["about.lang1", "about.lang2"]).map((k) => `<span>${e(t(k))}</span>`).join("")}</p>
        </div>
      </div>
    </section>

    ${SB.showContact !== false ? `
    <section class="sb-sec" id="sb-contact">
      <div class="sb-wrap">
        <div class="sb-envelope sb-drop" style="--r:-1deg">
          <span class="sb-hand">${e(t(C.contact ? C.contact.k : "contact.k"))}</span>
          <h2 class="sb-big">${e(t(C.contact ? C.contact.t1 : "contact.t1"))} <mark>${e(t(C.contact ? C.contact.t2 : "contact.t2"))}</mark></h2>
          <p>${e(t(C.contact ? C.contact.sub : "contact.sub"))}</p>
          <div class="sb-mail"><a href="mailto:${e(contactEmail)}">${e(contactEmail)}</a><button class="sb-stampbtn" type="button">${e(t(C.contact ? C.contact.copy : "contact.copy"))}</button></div>
          <div class="sb-tickets">
            <a class="sb-ticket sb-ticket--wa" href="https://wa.me/${e(cleanPhone)}" target="_blank" rel="noopener">WhatsApp · ${e(contactPhone)}</a>
            <a class="sb-ticket sb-ticket--alt" href="${e(pr.linkedin || 'https://www.linkedin.com/in/mohammedsiddico/')}" target="_blank" rel="noopener">LinkedIn ↗</a>
            <a class="sb-ticket sb-ticket--alt" href="${e(pr.github || 'https://github.com/Siddico')}" target="_blank" rel="noopener">GitHub ↗</a>
            <button class="sb-ticket sb-cv2" type="button">${e(t(C.contact ? C.contact.cv : "contact.cv"))}</button>
          </div>
          <i class="sb-postmark">CAIRO<br>EGYPT</i>
        </div>
        <p class="sb-foot">© 2026 ${e(personName)} · ${S.lang === "ar" ? "متعمل بالإيد" : "made by hand, with code"}</p>
      </div>
    </section>` : ""}`;

    const langBtn = root.querySelector(".sb-lang");
    if (langBtn) langBtn.addEventListener("click", () => S.setLang(S.lang === "ar" ? "en" : "ar"));
    
    root.querySelectorAll(".sb-cv, .sb-cv2").forEach((b) => b.addEventListener("click", S.openCv));
    
    const copy = root.querySelector(".sb-stampbtn");
    if (copy) copy.addEventListener("click", () => S.copy(contactEmail, copy, t(C.contact ? C.contact.copy : "contact.copy")));
    
    root.querySelectorAll('a[href^="#sb-"]').forEach((a) => a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const targetSel = a.getAttribute("href");
      const el = root.querySelector(targetSel);
      if (el) {
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -10 });
        else el.scrollIntoView({ behavior: "smooth" });
      }
    }));

    // Sticky notes dragging interaction
    root.querySelectorAll("[data-drag]").forEach((n) => {
      let sx = 0, sy = 0, ox = 0, oy = 0, on = false;
      n.addEventListener("pointerdown", (ev) => {
        on = true; sx = ev.clientX; sy = ev.clientY;
        ox = +n.dataset.x || 0; oy = +n.dataset.y || 0;
        n.setPointerCapture(ev.pointerId);
        n.classList.add("is-held");
      });
      n.addEventListener("pointermove", (ev) => {
        if (!on) return;
        const x = ox + ev.clientX - sx, y = oy + ev.clientY - sy;
        n.dataset.x = x; n.dataset.y = y; n.style.translate = `${x}px ${y}px`;
      });
      const up = () => { on = false; n.classList.remove("is-held"); };
      n.addEventListener("pointerup", up);
      n.addEventListener("pointercancel", up);
    });

    if (!S.canAnimate || !window.gsap) return;
    
    // Smooth scroll triggers and entry animations
    if (window.ScrollTrigger) {
      ScrollTrigger.batch(root.querySelectorAll(".sb-drop, .sb-sticky"), {
        start: "top 90%", once: true,
        onEnter: (els) => {
          const isMobile = window.innerWidth <= 600;
          gsap.from(els, {
            y: isMobile ? -40 : -90,
            rotation: (idx, target) => {
              if (isMobile && target.classList.contains("sb-envelope")) return 0;
              return gsap.utils.random(isMobile ? -2 : -14, isMobile ? 2 : 14);
            },
            opacity: 0,
            duration: .9,
            ease: "back.out(1.6)",
            stagger: .08
          });
        }
      });
    }
    const stripDiv = root.querySelector(".sb-strip > div");
    if (stripDiv) gsap.to(stripDiv, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    gsap.to(root.querySelectorAll(".sb-doodle"), { rotation: "+=360", duration: 18, ease: "none", repeat: -1 });
  }

  function intro(root) {
    if (!window.gsap) return;
    gsap.timeline()
      .from(root.querySelector(".sb-top"), { yPercent: -100, duration: .7, ease: "power3.out" })
      .from(root.querySelectorAll(".sb-title span"), { y: -80, rotation: () => gsap.utils.random(-30, 30), opacity: 0, duration: .8, ease: "back.out(2)", stagger: .05 }, .3)
      .from(root.querySelectorAll(".sb-year, .sb-tagline, .sb-doodle"), { scale: 0, opacity: 0, duration: .6, ease: "back.out(2.5)", stagger: .08 }, .7);
  }

  window.MOOD_SITES.scrap = { render, intro };
})();
