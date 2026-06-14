/* =================================================================
   LUMEN — Motion Engine (vanilla, dependency-free)
   Modules: preloader · theme · nav · mobile menu · cursor · magnetic
            · scroll reveal · stagger · parallax · counters · tilt
            · pricing toggle · logo marquee · scroll progress
   All effects respect prefers-reduced-motion and pointer capability.
   ================================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer  = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /* ---------------- Preloader ---------------- */
  const hidePreloader = () => {
    const pl = $("#preloader");
    if (pl) pl.classList.add("done");
    document.body.style.removeProperty("overflow");
  };
  window.addEventListener("load", () => setTimeout(hidePreloader, 350));
  // Safety net so the page is never stuck behind the curtain
  setTimeout(hidePreloader, 2500);

  /* ---------------- Theme toggle ---------------- */
  const root = document.documentElement;
  const stored = localStorage.getItem("lumen-theme");
  if (stored) root.setAttribute("data-theme", stored);
  $("#themeToggle")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("lumen-theme", next);
  });

  /* ---------------- Cinematic headline (split into words) ---------------- */
  $$("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    // preserve the gradient span on "decisions," — rebuild from innerHTML tokens
    const html = el.innerHTML;
    el.innerHTML = "";
    // Tokenize keeping inline <span> wrappers intact
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const frag = document.createDocumentFragment();
    let idx = 0;
    tmp.childNodes.forEach((node) => {
      const text = node.textContent;
      const isEl = node.nodeType === 1;
      text.split(/(\s+)/).forEach((tok) => {
        if (tok.trim() === "") { frag.appendChild(document.createTextNode(tok)); return; }
        const w = document.createElement("span");
        w.className = "word";
        const inner = document.createElement("span");
        inner.textContent = tok;
        if (isEl) inner.className = node.className; // keep gradient-text
        inner.style.transitionDelay = (idx * 55) + "ms";
        w.appendChild(inner);
        frag.appendChild(w);
        idx++;
      });
    });
    el.appendChild(frag);
    // trigger after preloader lifts
    setTimeout(() => el.classList.add("in"), reduceMotion ? 0 : 500);
  });

  /* ---------------- Dashboard skeleton → live values ---------------- */
  const kpis = $$(".k-value[data-skeleton]");
  if (kpis.length) {
    const reveal = () => kpis.forEach((el, i) => setTimeout(() => el.classList.add("live"), reduceMotion ? 0 : 700 + i * 180));
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); ob.disconnect(); } });
    }, { threshold: 0.3 });
    kpis.forEach((el) => ob.observe(el));
  }

  /* ---------------- Lazy fade-in for generated media (img + video) ---------------- */
  const lazyLoadMedia = (el) => {
    el.addEventListener("load", () => el.classList.add("loaded"), { once: true });
    el.addEventListener("loadeddata", () => el.classList.add("loaded"), { once: true });
    el.addEventListener("error", () => {
      const host = el.closest(".bg-image, .feature-media, .hero-video");
      if (host && host.classList.contains("bg-image")) host.remove();
      else if (host && host.classList.contains("hero-video")) host.remove();
      else el.style.display = "none";
    }, { once: true });
    el.src = el.dataset.src;
    el.removeAttribute("data-src");
    if (el.tagName === "VIDEO") { el.load(); el.play?.().catch(() => {}); }
  };
  $$(".bg-image img[data-src], .feature-media img[data-src], .hero-video video[data-src]").forEach((el) => {
    if (el.tagName === "VIDEO" && reduceMotion) { el.closest(".hero-video")?.remove(); return; }
    if (el.closest(".hero-bg") || el.closest(".hero-video")) { lazyLoadMedia(el); return; } // hero loads now
    const host = el.closest(".bg-image, .feature-media");
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { lazyLoadMedia(el); io.disconnect(); } });
    }, { rootMargin: "300px" });
    io.observe(host);
  });
  // Graceful fallback: if a portrait fails, hide the broken img so the gradient shows
  $$(".avatar img").forEach((img) =>
    img.addEventListener("error", () => { img.style.display = "none"; }, { once: true }));

  /* ---------------- Year ---------------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------------- Navbar scroll state + progress ---------------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 24);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  const toggleMenu = (open) => {
    const willOpen = open ?? !menu.classList.contains("open");
    menu.classList.toggle("open", willOpen);
    burger?.setAttribute("aria-expanded", String(willOpen));
    document.body.style.overflow = willOpen ? "hidden" : "";
  };
  burger?.addEventListener("click", () => toggleMenu());
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------------- Smooth anchor scroll ---------------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------------- Custom cursor + magnetic buttons ---------------- */
  if (finePointer && !reduceMotion) {
    const glow = $("#cursorGlow");
    const dot = $("#cursorDot");
    let mx = innerWidth / 2, my = innerHeight / 2;   // target
    let gx = mx, gy = my;                             // smoothed glow

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      glow.classList.add("active"); dot.classList.add("active");
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    document.addEventListener("mouseleave", () => {
      glow.classList.remove("active"); dot.classList.remove("active");
    });

    const renderCursor = () => {
      gx = lerp(gx, mx, 0.18); gy = lerp(gy, my, 0.18);
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%,-50%)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactive = $$("a, button, .magnetic, .tilt, summary");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => glow.classList.add("hovering"));
      el.addEventListener("mouseleave", () => glow.classList.remove("hovering"));
    });

    // Magnetic pull
    $$(".magnetic").forEach((el) => {
      const strength = 0.35;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------- Card spotlight + 3D tilt ---------------- */
  if (finePointer && !reduceMotion) {
    $$(".card, .tilt").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
        if (el.classList.contains("tilt")) {
          const rx = (py - 0.5) * -6;
          const ry = (px - 0.5) * 6;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        }
      });
      el.addEventListener("mouseleave", () => {
        if (el.classList.contains("tilt")) el.style.transform = "";
      });
    });
  }

  /* ---------------- Scroll reveal + stagger ---------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("in");
      // stagger children
      if (el.hasAttribute("data-stagger")) {
        [...el.children].forEach((child, i) => {
          child.style.transitionDelay = (i * 70) + "ms";
        });
      }
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  $$("[data-reveal], [data-stagger]").forEach((el) => revealObserver.observe(el));

  /* ---------------- Parallax (orbs, floating cards) ---------------- */
  if (!reduceMotion) {
    const layers = $$("[data-parallax]");
    let ticking = false;
    const applyParallax = () => {
      const y = window.scrollY;
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
  }

  /* ---------------- Hero mockup: 3D scroll tilt + mouse rotation ---------------- */
  if (!reduceMotion) {
    const mock = $("#mockup");
    if (mock) {
      let scrollTilt = 14;        // current scroll-driven X tilt
      let tMX = 0, tMY = 0;       // target mouse rotation (deg)
      let mX = 0, mY = 0;         // smoothed mouse rotation

      const updateScroll = () => {
        const r = mock.getBoundingClientRect();
        const p = clamp(1 - (r.top + r.height * 0.2) / innerHeight, 0, 1);
        scrollTilt = lerp(14, 0, p);
      };
      window.addEventListener("scroll", () => requestAnimationFrame(updateScroll), { passive: true });
      updateScroll();

      const stage = $(".hero-visual");
      if (stage && finePointer) {
        stage.addEventListener("mousemove", (e) => {
          const r = stage.getBoundingClientRect();
          tMY = ((e.clientX - (r.left + r.width / 2)) / r.width) * 12;   // rotateY
          tMX = ((e.clientY - (r.top + r.height / 2)) / r.height) * -8;  // extra rotateX
        });
        stage.addEventListener("mouseleave", () => { tMX = 0; tMY = 0; });
      }

      const render3D = () => {
        mX = lerp(mX, tMX, 0.08);
        mY = lerp(mY, tMY, 0.08);
        mock.style.transform = `rotateX(${scrollTilt + mX}deg) rotateY(${mY}deg)`;
        requestAnimationFrame(render3D);
      };
      requestAnimationFrame(render3D);
    }
  }

  /* ---------------- Interactive 3D cube (auto-rotate + cursor) ---------------- */
  const cube = $("#cube");
  if (cube && !reduceMotion) {
    let ry = 0;                 // continuous spin
    let tmx = 0, tmy = 0;       // mouse-target offsets
    let mx2 = 0, my2 = 0;       // smoothed
    if (finePointer) {
      window.addEventListener("mousemove", (e) => {
        tmy = ((e.clientX / innerWidth) - 0.5) * 36;
        tmx = ((e.clientY / innerHeight) - 0.5) * -28;
      }, { passive: true });
    }
    const spin = () => {
      ry += 0.28;
      mx2 = lerp(mx2, tmx, 0.06);
      my2 = lerp(my2, tmy, 0.06);
      cube.style.transform = `rotateX(${-22 + mx2}deg) rotateY(${ry + my2}deg)`;
      requestAnimationFrame(spin);
    };
    requestAnimationFrame(spin);
  }

  /* ---------------- Animated counters ---------------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1600;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      const val = target * easeOut(t);
      const formatted = decimals
        ? val.toFixed(decimals)
        : Math.round(val).toLocaleString("en-US");
      el.textContent = prefix + formatted + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (reduceMotion) {
          const el = entry.target;
          el.textContent = (el.dataset.prefix || "") + el.dataset.count + (el.dataset.suffix || "");
        } else {
          animateCount(entry.target);
        }
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countObserver.observe(el));

  /* ---------------- Pricing toggle ---------------- */
  const bm = $("#billMonthly"), by = $("#billYearly");
  const setBilling = (yearly) => {
    bm.classList.toggle("active", !yearly);
    by.classList.toggle("active", yearly);
    bm.setAttribute("aria-pressed", String(!yearly));
    by.setAttribute("aria-pressed", String(yearly));
    $$("[data-price-m]").forEach((el) => {
      const v = yearly ? el.dataset.priceY : el.dataset.priceM;
      el.textContent = "$" + v;
    });
  };
  bm?.addEventListener("click", () => setBilling(false));
  by?.addEventListener("click", () => setBilling(true));

  /* ---------------- Logo marquee (seamless, generated) ---------------- */
  const track = $("#logoTrack");
  if (track) {
    const logos = ["Northwind", "Tideline", "Vela", "Loopwork", "Bright Atlas", "Meridian", "Quanta", "Helio"];
    const icon = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
    const makeItem = (name) => `<span class="logo-item">${icon}${name}</span>`;
    // duplicate the set so the -50% translate loops seamlessly
    track.innerHTML = (logos.map(makeItem).join("")).repeat(2);
    const track2 = $("#logoTrack2");
    if (track2) track2.innerHTML = ([...logos].reverse().map(makeItem).join("")).repeat(2);
  }

  /* ---------------- Floating ambient particles ---------------- */
  const particles = $("#particles");
  if (particles && !reduceMotion) {
    const N = window.innerWidth < 760 ? 14 : 30;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < N; i++) {
      const p = document.createElement("i");
      const size = 2 + Math.random() * 4;
      p.style.left = Math.random() * 100 + "%";
      p.style.bottom = "-10px";
      p.style.width = p.style.height = size + "px";
      p.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      p.style.animationDuration = (10 + Math.random() * 14) + "s";
      p.style.animationDelay = "-" + (Math.random() * 16) + "s";
      p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
      frag.appendChild(p);
    }
    particles.appendChild(frag);
  }

  /* ---------------- FAQ: keep accordion single-open (optional polish) ---------------- */
  const faqItems = $$(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) faqItems.forEach((o) => { if (o !== item) o.open = false; });
    });
  });

  /* ---------------- Active nav link on scroll (scroll spy) ---------------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-links a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((l) => l.style.color = l.getAttribute("href") === "#" + id ? "var(--text)" : "");
      }
    });
  }, { threshold: 0.5 });
  sections.forEach((s) => spy.observe(s));
})();
