"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  duration?: number;
};

/**
 * Counts up from zero to `value` when scrolled into view.
 * Preserves locale formatting and optional decimals.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1.6,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    latest.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
    });
    return controls.stop;
  }, [inView, value, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
