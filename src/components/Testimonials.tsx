import { Quote } from 'lucide-react';
import { testimonials, type Testimonial } from '../data/content';
import { SectionHeading } from './primitives/SectionHeading';

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="ring-grad glass mb-4 break-inside-avoid rounded-4xl p-6 transition-colors duration-300 hover:bg-surface/[0.06]">
      <Quote className="h-6 w-6 text-primary/70" aria-hidden />
      <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-fg/90">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
          {t.initials}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold">{t.name}</span>
          <span className="text-sm text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Loved by teams"
          title="The tool people open by choice"
          subtitle="From seed-stage startups to public companies, teams trust Aurora to run the work that keeps them moving."
        />

        {/* Masonry via CSS columns — natural, varied heights */}
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
