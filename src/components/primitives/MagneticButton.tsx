import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { springOptsSnappy } from '../../lib/motion';
import { usePrefersReducedMotion } from '../../lib/useReducedMotion';
import { cn } from '../../lib/cn';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'glass';
  className?: string;
  'aria-label'?: string;
  /** Magnet pull strength in px. */
  strength?: number;
}

/**
 * A button/link that is gently pulled toward the cursor (magnetic effect)
 * and lifts on press. Falls back to a static button under reduced-motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  strength = 14,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springOptsSnappy);
  const sy = useSpring(y, springOptsSnappy);

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / (r.width / 2)) * strength);
    y.set((relY / (r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight cursor-pointer select-none transition-colors duration-200 min-h-[48px] focus-visible:outline-2';

  const variants: Record<string, string> = {
    primary: 'text-white shadow-glow',
    ghost: 'text-fg/90 hover:text-fg border border-border/15 hover:border-border/25 bg-surface/[0.03]',
    glass: 'text-fg glass hover:bg-surface/[0.08]',
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] animate-gradient-pan"
        />
      )}
      {/* Sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full"
      >
        <span className="absolute -inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      {children}
    </motion.a>
  );
}
