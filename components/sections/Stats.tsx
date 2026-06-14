"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/content";

function parseValue(raw: string) {
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const numeric = Number(raw.replace(/,/g, ""));
  return { numeric, decimals };
}

export function Stats() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-500/20 bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 px-6 py-14 shadow-glow-lg sm:px-12">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />
            <div className="absolute inset-0 bg-grid opacity-[0.07]" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative grid grid-cols-2 gap-y-10 sm:gap-x-8 lg:grid-cols-4"
          >
            {stats.map((stat) => {
              const { numeric, decimals } = parseValue(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="text-center"
                >
                  <div className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    <AnimatedCounter value={numeric} decimals={decimals} />
                    {stat.suffix}
                  </div>
                  <p className="mt-2 text-sm font-medium text-brand-100/90">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
