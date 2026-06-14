import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { MagneticButton } from './primitives/MagneticButton';
import { ProductPreview } from './ProductPreview';
import { spring } from '../lib/motion';
import { usePrefersReducedMotion } from '../lib/useReducedMotion';

const headline = ['The AI operating', 'system for', 'modern teams'];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  // Hero content drifts up + fades slightly as you scroll past it (parallax).
  const y = useTransform(scrollYProgress, [0, 0.18], ['0%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.55]);

  return (
    <section className="relative pt-36 sm:pt-44 lg:pt-48">
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="container-px flex flex-col items-center text-center"
      >
        {/* Announcement pill */}
        <motion.a
          href="#features"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="ring-grad group inline-flex items-center gap-2 rounded-full bg-surface/[0.04] px-3.5 py-1.5 text-sm text-muted backdrop-blur transition-colors hover:text-fg"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-3 w-3 text-white" />
          </span>
          Aurora 3.0 — agents are here
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </motion.a>

        {/* Headline — word-by-word cinematic reveal */}
        <h1 className="mt-7 max-w-4xl font-display text-display-xl">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-1">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.25 + li * 0.12 }}
              >
                {li === 2 ? <span className="text-gradient">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.6 }}
          className="mt-6 max-w-prose text-balance text-lead text-muted"
        >
          Aurora unifies analytics, automation, and AI agents on one luminous canvas. Ship faster,
          see further, and let your team focus on the work that actually matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.72 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton href="#cta" className="px-7 py-3.5 text-base">
            Start building free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </MagneticButton>
          <MagneticButton href="#features" variant="glass" className="px-6 py-3.5 text-base">
            <Play className="h-4 w-4 fill-current" />
            Watch the 90s tour
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-5 text-sm text-muted/80"
        >
          No credit card required · Free for up to 5 teammates
        </motion.p>
      </motion.div>

      {/* Floating product preview */}
      <ProductPreview />
    </section>
  );
}
