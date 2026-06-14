import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../lib/useReducedMotion';
import { cn } from '../../lib/cn';

/**
 * 3D pointer-tilt wrapper for cards. Adds a soft parallax glow that
 * tracks the cursor. Disabled entirely under reduced-motion.
 */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });

  const glowX = useTransform(px, [0, 1], ['0%', '100%']);
  const glowY = useTransform(py, [0, 1], ['0%', '100%']);

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn('relative [transform-style:preserve-3d]', className)}
    >
      {!reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [mask-image:radial-gradient(140px_140px_at_var(--gx)_var(--gy),#000,transparent)] group-hover:opacity-100"
          style={
            {
              '--gx': glowX,
              '--gy': glowY,
              background:
                'radial-gradient(160px 160px at var(--gx) var(--gy), rgb(var(--primary) / 0.25), transparent)',
            } as React.CSSProperties
          }
        />
      )}
      {children}
    </motion.div>
  );
}
