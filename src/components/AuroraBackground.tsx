import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/useReducedMotion';

/**
 * Ambient page backdrop: three slow-drifting aurora blobs, a dotted grid,
 * and a subtle vignette. Pure CSS/transform animation — no images, no JS
 * per-frame work — so it stays cheap and respects reduced-motion.
 */
export function AuroraBackground() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  // Gentle parallax: blobs drift up as you scroll.
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* aurora blobs */}
      <motion.div
        style={reduced ? undefined : { y: y1 }}
        className="absolute -top-[20%] left-[5%] h-[60vh] w-[60vh] rounded-full bg-primary/30 blur-[120px] animate-aurora"
      />
      <motion.div
        style={reduced ? undefined : { y: y2 }}
        className="absolute top-[10%] right-[0%] h-[55vh] w-[55vh] rounded-full bg-secondary/25 blur-[130px] animate-aurora-slow"
      />
      <div className="absolute bottom-[-10%] left-[30%] h-[50vh] w-[50vh] rounded-full bg-accent/20 blur-[140px] animate-aurora" />

      {/* dotted grid + fade mask */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(circle_at_50%_30%,#000_10%,transparent_75%)]" />

      {/* top + bottom vignette to anchor content */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent,rgb(var(--bg))_70%)]" />
    </div>
  );
}
