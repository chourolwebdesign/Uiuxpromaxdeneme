import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ArrowUpRight, Cpu, Users } from 'lucide-react';
import { Tilt } from './primitives/Tilt';
import { usePrefersReducedMotion } from '../lib/useReducedMotion';

/** Animated area chart drawn as SVG — the line draws itself on reveal. */
function MiniChart() {
  const reduced = usePrefersReducedMotion();
  const path =
    'M0 78 C 28 70, 48 40, 78 44 S 128 70, 158 52 S 214 8, 250 18 S 300 54, 340 30';
  const area = `${path} L 340 100 L 0 100 Z`;

  return (
    <svg viewBox="0 0 340 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(var(--primary))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--primary))" />
          <stop offset="100%" stopColor="rgb(var(--accent))" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="glass rounded-2xl p-3.5">
      <div className="flex items-center justify-between text-muted">
        <Icon className="h-4 w-4" />
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
          <ArrowUpRight className="h-3 w-3" />
          {delta}
        </span>
      </div>
      <div className="mt-3 font-display text-xl font-semibold tabular tracking-tight">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

export function ProductPreview() {
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.2], [reduced ? 0 : 7, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [reduced ? 1 : 0.95, 1]);

  // Simulate the dashboard data resolving — skeleton, then real content.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="container-px relative mt-16 sm:mt-20">
      {/* glow puddle under the device */}
      <div
        aria-hidden
        className="absolute inset-x-10 top-10 -z-10 h-64 rounded-full bg-primary/20 blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.5 }}
        style={reduced ? undefined : { rotateX: rotate, scale, transformPerspective: 1400 }}
        className="mx-auto max-w-5xl [transform-style:preserve-3d]"
      >
        <Tilt max={4} className="group rounded-[1.75rem]">
          <div className="ring-grad glass-strong overflow-hidden rounded-[1.75rem] p-2 shadow-elevated">
            {/* window chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2.5">
              <span className="h-3 w-3 rounded-full bg-error/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <div className="mx-auto flex items-center gap-2 rounded-full bg-surface/[0.05] px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                app.aurora.io / overview
              </div>
            </div>

            {/* dashboard body */}
            <div className="grid gap-3 rounded-3xl bg-bg/40 p-3 sm:grid-cols-[180px_1fr]">
              {/* sidebar */}
              <aside className="hidden flex-col gap-1.5 rounded-2xl bg-surface/[0.03] p-3 sm:flex">
                {['Overview', 'Agents', 'Workflows', 'Analytics', 'Integrations'].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${
                      i === 0 ? 'bg-primary/15 text-fg' : 'text-muted'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted/40'}`}
                    />
                    {item}
                  </div>
                ))}
                <div className="mt-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 p-3 text-xs text-muted">
                  <Cpu className="mb-1.5 h-4 w-4 text-accent" />
                  3 agents active
                </div>
              </aside>

              {/* main */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {loaded ? (
                    <>
                      <Kpi icon={Activity} label="Events / min" value="48.2k" delta="12%" />
                      <Kpi icon={Users} label="Active users" value="9,310" delta="6%" />
                      <Kpi icon={Cpu} label="Tasks automated" value="1,204" delta="34%" />
                    </>
                  ) : (
                    [0, 1, 2].map((i) => (
                      <div key={i} className="skeleton h-[92px] rounded-2xl" />
                    ))
                  )}
                </div>

                <div className="glass rounded-2xl p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Throughput</div>
                      <div className="text-xs text-muted">Last 24 hours</div>
                    </div>
                    <div className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                      Live
                    </div>
                  </div>
                  <div className="h-28">
                    {loaded ? <MiniChart /> : <div className="skeleton h-full w-full rounded-xl" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </motion.div>

      {/* floating glass chips */}
      {!reduced && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 140, damping: 14 }}
            className="absolute -left-2 top-1/3 hidden animate-float lg:block"
          >
            <div className="glass-strong flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-glass">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Cpu className="h-4 w-4 text-white" />
              </span>
              <div>
                <div className="text-sm font-semibold leading-tight">Agent resolved</div>
                <div className="text-xs text-muted">Ticket #4821 · 0.8s</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 140, damping: 14 }}
            className="absolute -right-1 top-2/3 hidden animate-float lg:block [animation-delay:1.5s]"
          >
            <div className="glass-strong flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-glass">
              <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-success/20">
                <span className="absolute h-2 w-2 rounded-full bg-success animate-pulse-ring" />
                <span className="h-2 w-2 rounded-full bg-success" />
              </span>
              <div>
                <div className="text-sm font-semibold leading-tight tabular">+34% throughput</div>
                <div className="text-xs text-muted">vs. last week</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
