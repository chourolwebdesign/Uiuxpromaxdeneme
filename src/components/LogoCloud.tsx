import { logos } from '../data/content';

/**
 * Infinite marquee of customer wordmarks. The track is duplicated and
 * translated -50% so the loop is seamless. Edges fade via a mask.
 */
export function LogoCloud() {
  const row = [...logos, ...logos];
  return (
    <section aria-label="Trusted by leading teams" className="py-16 sm:py-20">
      <p className="container-px text-center text-sm font-medium uppercase tracking-[0.18em] text-muted">
        Trusted by fast-moving teams at
      </p>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold tracking-tight text-fg/40 transition-colors duration-300 hover:text-fg/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
