"use client";

import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { platformCards } from "@/lib/content";
import { cn } from "@/lib/utils";

const spanClasses: Record<string, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-1 sm:row-span-1",
  sm: "sm:col-span-1 sm:row-span-1",
};

export function Platform() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-50 dark:opacity-30" />
      <div className="container-px">
        <SectionHeading
          eyebrow="One platform"
          eyebrowIcon={<LayoutGrid className="h-3.5 w-3.5" />}
          title={
            <>
              A complete data platform,{" "}
              <span className="text-gradient">beautifully unified</span>
            </>
          }
          description="From ingestion to insight, every layer of your analytics stack lives in one fast, elegant workspace."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {platformCards.map((card) => {
            const Icon = card.icon;
            const isLarge = card.span === "lg";
            return (
              <motion.div
                key={card.title}
                variants={staggerItem}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-brand-500/30 dark:hover:shadow-soft-dark",
                  spanClasses[card.span],
                )}
              >
                {isLarge && (
                  <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                )}
                <div className="relative">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-brand-600 ring-1 ring-inset ring-brand-500/15 dark:text-brand-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3
                    className={cn(
                      "mt-4 font-display font-semibold tracking-tight text-slate-900 dark:text-white",
                      isLarge ? "text-xl sm:text-2xl" : "text-base",
                    )}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 leading-relaxed text-slate-600 dark:text-slate-400",
                      isLarge ? "text-base max-w-md" : "text-sm",
                    )}
                  >
                    {card.description}
                  </p>
                </div>

                {isLarge && <PlatformPreview />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PlatformPreview() {
  const line = [30, 45, 38, 60, 52, 75, 68, 90];
  const points = line
    .map((v, i) => `${(i / (line.length - 1)) * 100},${100 - v}`)
    .join(" ");

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white p-5 dark:border-white/10 dark:from-white/[0.03] dark:to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {["Revenue", "Cohorts", "Retention"].map((tab, i) => (
            <span
              key={tab}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                i === 0
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400",
              )}
            >
              {tab}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-400">Live</span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-4 h-28 w-full">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(53,99,255,0.3)" />
            <stop offset="100%" stopColor="rgba(53,99,255,0)" />
          </linearGradient>
        </defs>
        <motion.polyline
          points={points}
          fill="none"
          stroke="rgb(53,99,255)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <polygon points={`0,100 ${points} 100,100`} fill="url(#lineFill)" />
      </svg>
    </div>
  );
}
