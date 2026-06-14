import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/useReducedMotion';

/**
 * A soft light that follows the cursor — adds depth and a high-end feel
 * without obscuring content. Pointer-events: none, so it never blocks
 * clicks. Hidden on touch devices and under reduced-motion.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    // Skip on devices without a fine pointer (touch).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-30 hidden -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:block"
    >
      <div className="h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgb(var(--primary)/0.10),transparent_60%)]" />
    </motion.div>
  );
}
