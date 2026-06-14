import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { riseIn, stagger } from '../../lib/motion';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the children stagger in. */
  delay?: number;
  /** Per-child stagger gap (seconds). */
  gap?: number;
  as?: 'div' | 'section' | 'ul' | 'header';
}

/**
 * Scroll-triggered reveal container. Animates once when ~20% in view.
 * Wrap items in <RevealItem> to inherit the staggered rise.
 */
export function Reveal({ children, className, delay = 0, gap = 0.07, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'h2' | 'p' | 'span';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag variants={riseIn} className={cn(className)}>
      {children}
    </MotionTag>
  );
}
