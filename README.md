# Aurora — Premium SaaS Landing Page

> The AI operating system for modern teams. A production-ready, conversion-focused
> marketing site with a liquid-glass design system and a physics-based motion layer.

Built with **Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion**, grounded in the
**UI/UX Pro Max** design intelligence skill (`.claude/skills/ui-ux-pro-max`).

---

## Quick start

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```

---

## 1. Architecture

```
index.html                 # fonts, meta, skip-link, theme bootstrap
src/
  main.tsx                 # React root
  App.tsx                  # composition + lazy-loaded below-fold sections
  index.css                # design tokens, glass utilities, reduced-motion
  data/content.ts          # all copy & data (single source of truth)
  lib/
    motion.ts              # shared springs + entrance variants
    useReducedMotion.ts    # reactive prefers-reduced-motion
    useTheme.ts            # dark/light controller (persisted)
    cn.ts                  # className combiner
  components/
    AuroraBackground.tsx   # ambient drifting gradient blobs + grid
    CursorGlow.tsx         # cursor-following light (fine pointers only)
    ScrollProgress.tsx     # top gradient progress bar
    Navbar.tsx             # animated glass nav + mobile sheet + theme toggle
    Hero.tsx               # cinematic word-reveal headline + CTAs
    ProductPreview.tsx     # tilted glass dashboard, skeleton→loaded, SVG chart
    LogoCloud.tsx          # seamless logo marquee
    Features.tsx           # bento grid of feature cards
    Stats.tsx              # count-up metrics
    Testimonials.tsx       # masonry quotes
    Pricing.tsx            # 3 tiers + monthly/annual toggle
    FAQ.tsx                # accessible accordion
    CTA.tsx                # final conversion block
    Footer.tsx             # sitemap + socials + status
    primitives/            # Reveal, MagneticButton, Tilt, SectionHeading
```

**Component hierarchy:** `App` mounts the three persistent motion layers (background, cursor,
scroll bar) + `Navbar`, then a single `<main>` flowing Hero → social proof → product →
metrics → testimonials → pricing → FAQ → CTA → footer (the skill's *Minimal Single Column*
conversion pattern, scaled up for a full SaaS page).

---

## 2. Design system

Seeded from UI/UX Pro Max (`--design-system`): **Liquid Glass** style on a **Minimal Single
Column** conversion pattern, premium-modern typographic mood. The red accent the database
suggested was swapped for a futuristic indigo→violet→cyan spectrum to match the
Linear/Stripe/Vercel reference points in the brief.

All design decisions live as **semantic CSS variable tokens** in `src/index.css` and are
exposed to Tailwind in `tailwind.config.js` — never raw hex in components.

### Color system (semantic tokens)

| Token | Dark (default) | Light | Role |
|-------|----------------|-------|------|
| `--bg` | `#07070A` | `#F8FAFC` | Page background |
| `--fg` | `#F4F6F8` | `#0F172A` | Primary text |
| `--muted` | `#9AA1AC` | `#475569` | Secondary text (≥4.5:1) |
| `--primary` | `#7C6CFF` | `#635CE9` | Brand / primary CTA |
| `--secondary` | `#B26CEA` | `#9333EA` | Gradient mid-stop |
| `--accent` | `#4DD4FF` | `#0EA5E9` | Gradient end / highlights |
| `--success` | `#34D399` | `#10B981` | Positive state |
| `--warning` | `#FBBF24` | `#D97706` | Caution state |
| `--error` | `#FB7185` | `#DC2626` | Destructive state |
| `--border` | white @ low α | slate @ low α | Hairlines / dividers |

Surfaces are **glass**: low-alpha gradient fills + `backdrop-filter: blur()` + a 1px gradient
ring (`.ring-grad`). Both themes are defined together so contrast and brand hold in each.

### Typography

- **Display:** Space Grotesk (600/700) — headlines, numerals, brand.
- **Body:** Inter (400/500/600) — everything else.
- **Fluid scale** via `clamp()` so type breathes from 375 px to 1440 px without breakpoints:
  `display-xl → display-lg → display-md → title → lead → base(16px) → sm`.
- Line-height 1.5–1.75 on body; tabular figures on stats/prices to prevent layout shift.
- `font-display: swap` + preconnect to avoid invisible text and FOIT.

### Spacing & layout

- **8px rhythm** throughout (4/8/16/24/32/48/64/96/128).
- Container max-width **1280px**, responsive gutters (20 → 32 → 40 px).
- Breakpoints **375 / 768 / 1024 / 1440**, mobile-first.
- Elevation scale: `shadow-soft → glass → glow → elevated` (no ad-hoc shadows).
- Radius scale tops out at `4xl/5xl` for the soft, expensive corners.

---

## 3. Motion specifications

> Higgsfield MCP was **not connected** in the build environment, so no AI-generated
> video/image assets are used. Every motion is code-driven (Framer Motion + CSS transforms),
> which keeps the page dependency-free and fully offline-capable. The hero's `ProductPreview`
> and `AuroraBackground` are the natural slots to drop Higgsfield-generated media into later.

One motion rhythm, defined once in `lib/motion.ts` and reused everywhere:

| Pattern | Where | Spec |
|---------|-------|------|
| Entrance spring | all reveals | `stiffness 120, damping 18, mass 0.9` |
| Snappy spring | magnetic / toggles | `stiffness 320, damping 26` |
| Staggered reveal | grids & lists | 60–70 ms per child, fires once at ~12% in view |
| Cinematic headline | Hero | per-line mask + spring rise, 120 ms apart |
| Parallax | Hero, background, device | transform-only, scroll-linked |
| Magnetic buttons | all primary CTAs | cursor-tracked translate + press scale 0.96 |
| Cursor glow | global | spring-followed radial light, fine-pointer only |
| 3D tilt | feature/preview cards | pointer rotateX/Y + tracking glow |
| Count-up | Stats | 0→target, 1.6 s, eased, on view |
| Self-drawing chart | ProductPreview | SVG `pathLength` 0→1 |
| Skeleton → loaded | ProductPreview | shimmer placeholders resolve to data |

**Accessibility:** every effect is gated by `prefers-reduced-motion` — globally in CSS and
reactively in JS (`usePrefersReducedMotion`). Reduced-motion users get instant, static states
with no parallax, no ambient loops, and no count-up. Animations use `transform`/`opacity`
only (no layout-shifting properties), and exits are shorter than entrances.

---

## 4. Accessibility & UX

- Skip-to-content link; semantic landmarks (`header`/`main`/`nav`/`footer`).
- Visible 2px brand focus ring for keyboard users (`:focus-visible`).
- All interactive targets ≥ 44–48 px; `cursor-pointer` on clickables.
- Icon-only controls carry `aria-label`; accordion/menu use `aria-expanded`; toggle uses
  `role="radiogroup"`/`aria-checked`.
- Text contrast meets WCAG AA in both themes; color is never the sole signal.
- No emoji as icons — a single vector family (`lucide-react`) throughout.

---

## 5. Performance

- Below-the-fold sections are **lazily imported** (`React.lazy` + `Suspense`); the animation
  library is split into its own chunk. Initial JS ≈ 55 kB gzip + 46 kB motion, CSS ≈ 7 kB gzip.
- Ambient visuals are CSS-only blurred gradients — no images, no per-frame JS.
- Fonts: preconnect + `display=swap`; lazy fallbacks reserve space (no CLS).
- Build target ES2020, esbuild minification, manual vendor chunking.

---

## 6. Customizing

- **Copy & data:** `src/data/content.ts` — features, stats, testimonials, plans, FAQs, nav.
- **Brand colors:** `src/index.css` (`:root`/`.dark`/`.light` token blocks).
- **Type & scale:** `tailwind.config.js` (`fontFamily`, `fontSize`).
- **Motion feel:** `src/lib/motion.ts` (spring constants, stagger gaps).

---

*Design intelligence by [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
installed under `.claude/skills/ui-ux-pro-max`.*
