"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { plans } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Pricing"
          eyebrowIcon={<Tag className="h-3.5 w-3.5" />}
          title={
            <>
              Simple pricing that{" "}
              <span className="text-gradient">scales with you</span>
            </>
          }
          description="Start free, upgrade when you're ready. No credit card required, no surprises, cancel anytime."
        />

        {/* Billing toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !yearly ? "text-slate-900 dark:text-white" : "text-slate-400",
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className={cn(
              "relative h-7 w-12 rounded-full p-1 transition-colors",
              yearly ? "bg-brand-600" : "bg-slate-300 dark:bg-white/15",
            )}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={cn(
                "block h-5 w-5 rounded-full bg-white shadow-sm",
                yearly && "ml-5",
              )}
            />
          </button>
          <span
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              yearly ? "text-slate-900 dark:text-white" : "text-slate-400",
            )}
          >
            Yearly
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Save 20%
            </span>
          </span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => {
            const isCustom =
              plan.name === "Enterprise" || (plan.name === "Starter" && plan.price.monthly === 0);
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            return (
              <motion.div
                key={plan.name}
                variants={staggerItem}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-7 transition-all duration-300",
                  plan.highlighted
                    ? "border-brand-500/40 bg-white shadow-glow lg:-mt-4 lg:mb-0 dark:bg-slate-900/60"
                    : "border-slate-200/80 bg-white hover:border-brand-200 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-brand-500/30",
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-end gap-1">
                  {plan.name === "Enterprise" ? (
                    <span className="font-display text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      Custom
                    </span>
                  ) : plan.name === "Starter" ? (
                    <span className="font-display text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        ${price}
                      </span>
                      <span className="mb-1 text-sm text-slate-500 dark:text-slate-400">
                        /seat /mo
                      </span>
                    </>
                  )}
                </div>
                {plan.name === "Growth" && (
                  <p className="mt-1 text-xs text-slate-400">
                    Billed {yearly ? "annually" : "monthly"}
                  </p>
                )}
                {plan.name !== "Growth" && <div className="mt-1 h-4" />}

                <Link href="#" className="mt-6">
                  <Button
                    variant={plan.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="mt-7 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
