"use client";

import { motion } from "framer-motion";
import { logos } from "@/lib/content";

export function LogoCloud() {
  const doubled = [...logos, ...logos];

  return (
    <section className="border-y border-slate-200/70 bg-slate-50/50 py-12 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="container-px">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500"
        >
          Trusted by data teams at the world&apos;s fastest-growing companies
        </motion.p>

        <div className="relative mt-8 overflow-hidden mask-fade-edges">
          <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16">
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2 text-xl font-semibold tracking-tight text-slate-400 grayscale transition hover:text-slate-700 hover:grayscale-0 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-400 to-accent-500" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
