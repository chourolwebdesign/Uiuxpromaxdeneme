import { Reveal, RevealItem } from './Reveal';
import { cn } from '../../lib/cn';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: Props) {
  return (
    <Reveal
      className={cn(
        'flex max-w-prose flex-col',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <RevealItem>
        <span className="inline-flex items-center gap-2 rounded-full border border-border/15 bg-surface/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
          {eyebrow}
        </span>
      </RevealItem>
      <RevealItem as="h2" className="mt-5 font-display text-display-md text-balance">
        {title}
      </RevealItem>
      {subtitle && (
        <RevealItem as="p" className="mt-4 text-lead text-muted text-balance">
          {subtitle}
        </RevealItem>
      )}
    </Reveal>
  );
}
