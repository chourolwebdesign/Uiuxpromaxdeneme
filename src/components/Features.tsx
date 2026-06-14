import { motion } from 'framer-motion';
import { features, type Feature } from '../data/content';
import { SectionHeading } from './primitives/SectionHeading';
import { Reveal, RevealItem } from './primitives/Reveal';
import { Tilt } from './primitives/Tilt';
import { cn } from '../lib/cn';

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <RevealItem
      className={cn(
        'group h-full',
        feature.span === 'wide' && 'sm:col-span-2',
        feature.span === 'tall' && 'lg:row-span-2',
      )}
    >
      <Tilt className="group h-full rounded-4xl">
        <article className="ring-grad glass relative flex h-full flex-col overflow-hidden rounded-4xl p-6 transition-colors duration-300 hover:bg-surface/[0.06] sm:p-7">
          {/* corner glow */}
          <div
            aria-hidden
            className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-accent/15 text-fg ring-1 ring-inset ring-border/10">
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <h3 className="mt-5 font-display text-title">{feature.title}</h3>
          <p className="mt-2.5 text-[0.975rem] leading-relaxed text-muted">{feature.body}</p>

          {feature.span === 'tall' && (
            <div className="mt-auto pt-6">
              <div className="grid grid-cols-3 gap-2">
                {['SOC 2', 'SSO', 'SCIM', 'Audit', 'RBAC', 'GDPR'].map((b) => (
                  <span
                    key={b}
                    className="rounded-xl border border-border/10 bg-surface/[0.03] px-2 py-2 text-center text-xs font-medium text-muted"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </Tilt>
    </RevealItem>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="The platform"
          title="One canvas for your whole operation"
          subtitle="Stop stitching together six tools and a pile of spreadsheets. Aurora brings analytics, automation, and AI into a single, beautifully fast workspace."
        />

        <Reveal className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </Reveal>
      </div>

      {/* subtle moving divider */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container-px mt-24 h-px origin-center bg-gradient-to-r from-transparent via-border/20 to-transparent"
      />
    </section>
  );
}
