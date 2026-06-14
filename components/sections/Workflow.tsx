"use client";

import { motion } from "framer-motion";
import { Workflow as WorkflowIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { steps } from "@/lib/content";

export function Workflow() {
  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-slate-50/60 py-24 sm:py-32 dark:bg-white/[0.015]"
    >
      <div className="container-px">
        <SectionHeading
          eyebrow="How it works"
          eyebrowIcon={<WorkflowIcon className="h-3.5 w-3.5" />}
          title={
            <>
              From data to decision in{" "}
              <span className="text-gradient">three steps</span>
            </>
          }
          description="No data team required. Lumina handles the heavy lifting so you can focus on the answers, not the infrastructure."
        />

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-16 grid gap-8 md:grid-cols-3"
        >
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent md:block dark:via-brand-500/40" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                variants={staggerItem}
                className="relative flex flex-col items-start"
              >
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <span className="grid h-24 w-24 place-items-center rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900 dark:shadow-soft-dark">
                    <Icon className="h-9 w-9 text-brand-600 dark:text-brand-300" />
                  </span>
                  <span className="font-display text-6xl font-bold tracking-tight text-slate-100 dark:text-white/10">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
