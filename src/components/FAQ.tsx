import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/content';
import { SectionHeading } from './primitives/SectionHeading';
import { Reveal, RevealItem } from './primitives/Reveal';

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <RevealItem className="glass overflow-hidden rounded-3xl">
      <h3>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-display text-[1.05rem] font-medium">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border/15 bg-surface/[0.03] text-muted"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 text-[0.975rem] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </RevealItem>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Reveal className="mx-auto mt-12 flex max-w-2xl flex-col gap-3" gap={0.05}>
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </Reveal>

        <p className="mt-10 text-center text-sm text-muted">
          Still curious?{' '}
          <a href="#" className="font-medium text-fg underline-offset-4 hover:underline">
            Talk to our team
          </a>{' '}
          — we usually reply within an hour.
        </p>
      </div>
    </section>
  );
}
