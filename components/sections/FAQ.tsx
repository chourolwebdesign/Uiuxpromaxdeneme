"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              eyebrowIcon={<HelpCircle className="h-3.5 w-3.5" />}
              title={
                <>
                  Questions,{" "}
                  <span className="text-gradient">answered</span>
                </>
              }
              description="Everything you need to know about the product and billing. Can't find what you're looking for?"
            />
            <Reveal delay={0.15}>
              <Link
                href={`mailto:hello@lumina.so`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-300"
              >
                Chat with our team
                <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>
          </div>

          <ul className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={faq.question} delay={i * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left"
                    >
                      <span className="text-base font-medium tracking-tight text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors dark:bg-white/5 dark:text-slate-300">
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
