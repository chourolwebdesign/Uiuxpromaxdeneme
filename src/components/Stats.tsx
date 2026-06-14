import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { stats, type Stat } from '../data/content';
import { Reveal, RevealItem } from './primitives/Reveal';
import { usePrefersReducedMotion } from '../lib/useReducedMotion';

/** Counts from 0 → target when scrolled into view (or jumps if reduced-motion). */
function Counter({ stat, play }: { stat: Stat; play: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setValue(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [play, reduced, stat.value]);

  return (
    <span className="tabular">
      {stat.prefix}
      {value.toLocaleString('en-US', {
        minimumFractionDigits: stat.decimals ?? 0,
        maximumFractionDigits: stat.decimals ?? 0,
      })}
      {stat.suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <section id="stats" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-px" ref={ref}>
        <div className="ring-grad glass-strong overflow-hidden rounded-5xl px-6 py-12 shadow-glass sm:px-12 sm:py-14">
          <Reveal className="grid grid-cols-2 gap-y-10 lg:grid-cols-4" gap={0.08}>
            {stats.map((s) => (
              <RevealItem
                key={s.label}
                className="flex flex-col items-center text-center lg:border-l lg:border-border/10 lg:first:border-l-0"
              >
                <div className="font-display text-display-md font-semibold text-gradient">
                  <Counter stat={s} play={inView} />
                </div>
                <div className="mt-2 max-w-[14ch] text-sm text-muted">{s.label}</div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
