import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { plans, type Plan } from '../data/content';
import { SectionHeading } from './primitives/SectionHeading';
import { Reveal, RevealItem } from './primitives/Reveal';
import { MagneticButton } from './primitives/MagneticButton';
import { cn } from '../lib/cn';

function priceLabel(plan: Plan, annual: boolean) {
  if (plan.price < 0) return 'Custom';
  if (plan.price === 0) return '$0';
  const monthly = annual ? Math.round(plan.price * 0.8) : plan.price;
  return `$${monthly}`;
}

function PlanCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  return (
    <RevealItem className={cn('h-full', plan.featured && 'lg:-my-3')}>
      <div
        className={cn(
          'ring-grad relative flex h-full flex-col rounded-4xl p-7',
          plan.featured ? 'glass-strong shadow-glow' : 'glass',
        )}
      >
        {plan.featured && (
          <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-semibold text-white shadow-glow">
            <Sparkles className="h-3.5 w-3.5" />
            Most popular
          </span>
        )}

        <h3 className="font-display text-title">{plan.name}</h3>
        <p className="mt-1.5 text-sm text-muted">{plan.tagline}</p>

        <div className="mt-6 flex items-end gap-1.5">
          <span className="font-display text-display-md font-semibold tabular leading-none">
            {priceLabel(plan, annual)}
          </span>
          {plan.price > 0 && <span className="pb-1.5 text-sm text-muted">/{annual ? 'mo' : 'mo'}</span>}
        </div>
        <p className="mt-1 text-xs text-muted">
          {plan.price > 0 ? `${plan.cadence}${annual ? ' · billed annually' : ''}` : plan.cadence}
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-fg/90">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-2">
          {plan.featured ? (
            <MagneticButton href="#cta" className="w-full">
              {plan.cta}
            </MagneticButton>
          ) : (
            <a
              href="#cta"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-border/15 bg-surface/[0.03] px-6 py-3 text-[0.95rem] font-semibold text-fg transition-colors duration-200 hover:bg-surface/[0.08]"
            >
              {plan.cta}
            </a>
          )}
        </div>
      </div>
    </RevealItem>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that scales with you"
          subtitle="Start free. Upgrade when you are ready. No hidden fees, no surprise overages."
        />

        {/* Billing toggle */}
        <div className="mt-9 flex items-center justify-center">
          <LayoutGroup>
            <div
              role="radiogroup"
              aria-label="Billing period"
              className="glass inline-flex items-center rounded-full p-1"
            >
              {([
                ['Monthly', false],
                ['Annual', true],
              ] as const).map(([label, val]) => {
                const active = annual === val;
                return (
                  <button
                    key={label}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setAnnual(val)}
                    className={cn(
                      'relative min-h-[40px] rounded-full px-5 py-2 text-sm font-medium transition-colors',
                      active ? 'text-white' : 'text-muted hover:text-fg',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="billing-pill"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    )}
                    {label}
                    {label === 'Annual' && (
                      <span
                        className={cn(
                          'ml-1.5 rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold',
                          active ? 'bg-white/20 text-white' : 'bg-success/15 text-success',
                        )}
                      >
                        −20%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <Reveal className="mt-12 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3" gap={0.08}>
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} annual={annual} />
          ))}
        </Reveal>

        <p className="mt-8 text-center text-sm text-muted">
          All plans include unlimited viewers, 99.99% uptime SLA, and end-to-end encryption.
        </p>
      </div>
    </section>
  );
}
