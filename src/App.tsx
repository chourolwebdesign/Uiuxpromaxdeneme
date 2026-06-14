import { lazy, Suspense } from 'react';
import { AuroraBackground } from './components/AuroraBackground';
import { CursorGlow } from './components/CursorGlow';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoCloud } from './components/LogoCloud';
import { Features } from './components/Features';

// Below-the-fold sections are code-split so the hero paints fast.
const Stats = lazy(() => import('./components/Stats').then((m) => ({ default: m.Stats })));
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({ default: m.Testimonials })),
);
const Pricing = lazy(() => import('./components/Pricing').then((m) => ({ default: m.Pricing })));
const FAQ = lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })));
const CTA = lazy(() => import('./components/CTA').then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

/** Reserves vertical space while a lazy section loads — avoids layout shift. */
function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export default function App() {
  return (
    <>
      <AuroraBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <LogoCloud />
        <Features />

        <Suspense fallback={<SectionFallback />}>
          <Stats />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
