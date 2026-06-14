import type { Variants, Transition, SpringOptions } from 'framer-motion';

/** Spring configs for useSpring()/useTransform (no `type` field). */
export const springOpts: SpringOptions = { stiffness: 120, damping: 18, mass: 0.9 };
export const springOptsSnappy: SpringOptions = { stiffness: 320, damping: 26, mass: 0.6 };

/**
 * Shared motion tokens. One rhythm across the whole site so every
 * animation feels like it belongs to the same physical world.
 */

// Natural spring used for entrances and magnetic elements.
export const spring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
  mass: 0.6,
};

// Entrance: rise + fade. Exit is faster than enter (feels responsive).
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...spring },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Stagger container: children reveal 60ms apart.
export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { ...spring } },
};
