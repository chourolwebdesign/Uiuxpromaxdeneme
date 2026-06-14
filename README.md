# Lumen — Premium SaaS Landing

A hand-crafted, production-ready marketing site engineered to feel like it came out of
Apple, Linear, Stripe, Framer, and Vercel — **zero dependencies, zero build step.**

Open `index.html` in any modern browser, or serve the folder:

```bash
npx serve .        # or: python3 -m http.server 8000
```

---

## Why no framework?

Every "wow" effect here is achieved with semantic HTML, a modern CSS design system, and a
compact vanilla-JS motion engine. That means **instant first paint, no hydration, no bundle**
— the fastest path to a 95+ Lighthouse score while keeping the code clean and componentized.

## Architecture

```
index.html              # Semantic structure, all sections, inline SVG icons + favicon
assets/css/styles.css   # Design system → base → components → sections → motion utilities
assets/js/main.js       # Motion engine (modular IIFE)
```

## Design system

| Token group | Highlights |
|-------------|------------|
| **Color**   | Brand indigo→violet→cyan signature gradient; semantic success/warning/error; full **dark + light** themes via `[data-theme]` |
| **Type**    | Inter, fluid `clamp()` scale from `--fs-xs` to `--fs-4xl`, gradient text, balanced wrapping |
| **Spacing** | Strict **8px grid** (`--space-1…10`) |
| **Radii**   | `--r-sm` → `--r-2xl` + pill |
| **Motion**  | Shared easings: `--ease-out`, `--ease-spring`, `--ease-in-out`; duration tokens |
| **Surfaces**| Glassmorphism (`backdrop-filter`), layered shadows, ambient glow |

## Components

Animated glass navbar · cinematic hero with ambient orbs + live dashboard mockup ·
floating glass stat cards · logo marquee · bento feature grid · animated stat counters ·
3-step "how it works" · masonry testimonials · pricing with monthly/yearly toggle ·
accordion FAQ · gradient CTA · rich footer.

## Motion specifications

- **Page enter** — preloader curtain + staggered hero reveal
- **Scroll reveals** — `IntersectionObserver`, per-child stagger via `[data-stagger]`
- **Parallax** — `[data-parallax]` orbs & floating cards, rAF-throttled
- **Hero mockup** — flattens from a 14° tilt to flat as it scrolls into view
- **Magnetic buttons** — cursor-attracted `.magnetic` elements
- **Custom cursor** — smoothed glow ring + dot (pointer-fine only)
- **3D tilt + spotlight** — `.tilt`/`.card` track the cursor
- **Counters** — eased count-up on view
- **Scroll progress** — gradient bar + nav scroll-spy

## Accessibility & performance

- Respects `prefers-reduced-motion` (all motion gracefully disabled)
- Pointer effects gated behind `(hover: hover) and (pointer: fine)`
- Keyboard-focusable, `:focus-visible` rings, ARIA labels, semantic landmarks
- Fonts loaded non-render-blocking with `display=swap`
- No layout-shifting external images — all visuals are CSS/SVG
- Responsive: mobile-first, drawer nav, fluid grids at every breakpoint

## Customization

Rebrand in one place — edit the token block at the top of `styles.css`
(`--brand-*`, `--gradient-brand`, `--gradient-text`). Swap copy in `index.html`.
