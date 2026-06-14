# Lumina

**Intelligent analytics for ambitious teams.**

A complete, production-ready premium marketing website built with a modern
Silicon-Valley-grade design system — glassmorphism, animated gradients,
cinematic scroll reveals, and full dark-mode support.

![Built with Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0080)

## ✨ Highlights

- **Cinematic hero** with parallax, animated aurora gradients, and a live
  dashboard mockup that animates its charts on load.
- **Glassmorphism + neumorphism** surfaces, soft shadows, and gradient borders.
- **Scroll-triggered reveals** and staggered entrances throughout, powered by
  Framer Motion with `prefers-reduced-motion` support.
- **Dark mode** by default with an animated theme toggle (persists across visits).
- **Fully responsive** — pixel-aligned on mobile, tablet, and desktop.
- **Accessible** — semantic HTML, skip-link, focus-visible rings, ARIA states,
  reduced-motion fallbacks.
- **SEO-ready** — Open Graph + Twitter cards, JSON-LD structured data, dynamic
  `sitemap.xml` and `robots.txt`.
- **Fast** — static-rendered, ~164 kB first-load JS, optimized fonts and assets.

## 🧱 Sections

Navbar · Hero · Logo cloud · Features · Platform (bento grid) · Workflow ·
Stats · Testimonials · Pricing (with billing toggle) · FAQ · CTA · Footer ·
custom 404.

## 🛠 Tech stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | Next.js 14 (App Router)         |
| Language     | TypeScript                      |
| Styling      | Tailwind CSS                    |
| Animation    | Framer Motion                   |
| Icons        | lucide-react                    |
| Theming      | next-themes                     |
| Fonts        | Inter (body) + Sora (display)   |

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # create an optimized production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## 📁 Project structure

```
app/                     # App Router entry, layout, metadata, routes
  layout.tsx             # Fonts, SEO, theme provider, skip link
  page.tsx               # Landing page composition + JSON-LD
  globals.css            # Design tokens, utilities, component layers
  sitemap.ts / robots.ts # SEO route handlers
  not-found.tsx          # Custom 404
components/
  layout/                # Navbar, Footer, PageLoader
  sections/              # Hero, Features, Platform, Pricing, FAQ, …
  ui/                    # Reusable primitives (Button, Badge, Reveal, …)
  providers/             # ThemeProvider
lib/
  content.ts             # All copy, data, and config in one place
  utils.ts               # cn() class-merge helper
```

All copy and data live in `lib/content.ts`, so the site can be re-themed for a
different brand by editing a single file.

## 📝 License

Demo project. Imagery via [Unsplash](https://unsplash.com).
