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

  /* ---------------- Hero mockup scroll tilt (flatten as it enters) ---------------- */
  if (!reduceMotion) {
    const mock = $("#mockup");
    if (mock) {
      const updateMock = () => {
        const r = mock.getBoundingClientRect();
        const progress = clamp(1 - (r.top + r.height * 0.2) / innerHeight, 0, 1);
        const tilt = lerp(14, 0, progress); // degrees
        mock.style.transform = `rotateX(${tilt}deg)`;
      };
      window.addEventListener("scroll", () => requestAnimationFrame(updateMock), { passive: true });
      updateMock();
    }
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
