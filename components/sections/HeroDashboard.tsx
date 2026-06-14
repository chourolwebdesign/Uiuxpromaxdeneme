"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const bars = [42, 58, 36, 72, 54, 88, 64, 96, 78, 92];

const metrics = [
  { label: "Revenue", value: "$2.41M", delta: "+18.2%", icon: TrendingUp },
  { label: "Active users", value: "184,920", delta: "+9.4%", icon: Users },
  { label: "Conversion", value: "6.8%", delta: "+2.1%", icon: ArrowUpRight },
];

export function HeroDashboard() {
  return (
    <div className="glass-strong overflow-hidden rounded-3xl shadow-glow-lg ring-1 ring-black/5 dark:ring-white/10">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-slate-200/70 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        </div>
        <div className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-400 dark:border-white/10 dark:bg-white/5">
          <Search className="h-3.5 w-3.5" />
          <span className="truncate">app.lumina.so/dashboards/revenue</span>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-6">
        {/* Metric cards */}
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
            className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {m.label}
              </span>
              <m.icon className="h-4 w-4 text-brand-500" />
            </div>
            <div className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {m.value}
            </div>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              {m.delta}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 px-4 pb-4 sm:grid-cols-5 sm:px-6 sm:pb-6">
        {/* Chart */}
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 sm:col-span-3 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Revenue growth
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last 10 weeks
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              +128% YoY
            </span>
          </div>
          <div className="mt-5 flex h-36 items-end gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.8 + i * 0.06,
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative flex-1 rounded-md bg-gradient-to-t from-brand-500/80 to-accent-500/80"
              >
                <span className="absolute inset-x-0 top-0 h-1 rounded-full bg-white/50" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI insight panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="gradient-border relative flex flex-col rounded-2xl bg-gradient-to-br from-brand-50/80 to-accent-50/40 p-5 sm:col-span-2 dark:from-brand-500/10 dark:to-accent-500/5"
        >
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-white shadow-glow">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              AI insight
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Enterprise revenue jumped{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              18.2%
            </span>{" "}
            this week, driven by the new onboarding flow. Expansion is
            outpacing churn 3.4&times;.
          </p>
          <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-medium text-brand-600 dark:text-brand-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Updated just now
          </div>
        </motion.div>
      </div>

      {/* Floating live card */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute -left-4 bottom-10 hidden animate-float lg:block"
      >
        <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft dark:shadow-soft-dark">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Goal reached
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Q3 target +12%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
