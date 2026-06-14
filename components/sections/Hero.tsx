"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroDashboard } from "@/components/sections/HeroDashboard";
import { trustBadges } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-36 lg:pb-32 lg:pt-44"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60 dark:opacity-40" />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[-10%] h-[640px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(53,99,255,0.45),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(53,99,255,0.35),transparent)]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[8%] top-[20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.35),transparent)] blur-2xl"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[6%] top-[36%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(89,139,255,0.3),transparent)] blur-2xl"
          animate={{ y: [0, -28, 0], x: [0, 18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-px">
        <motion.div
          style={{ y, opacity }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Badge icon={<Sparkles className="h-3.5 w-3.5" />}>
              Introducing Lumina AI Insight Engine
            </Badge>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
          >
            Turn raw data into
            <span className="relative whitespace-nowrap">
              {" "}
              <span className="text-gradient">decisions</span>
            </span>
            <br className="hidden sm:block" /> your whole team trusts.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
          >
            Lumina unifies every source, surfaces the insights that matter, and
            explains the <em className="not-italic font-medium text-slate-800 dark:text-slate-200">why</em> behind your
            metrics — so you ship the right thing, faster.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link href="#pricing">
              <Button size="lg" className="pr-5">
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#platform">
              <Button size="lg" variant="secondary">
                <Play className="h-4 w-4 fill-current" />
                Watch the demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2.5">
                {[
                  "1438761681033-6461ffad8d80",
                  "1500648767791-00dcc994a43e",
                  "1494790108377-be9c29b29330",
                  "1507003211169-0a1dd7228f2d",
                ].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/photo-${id}?w=64&h=64&fit=crop&crop=faces&auto=format&q=80`}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-slate-900"
                  />
                ))}
              </div>
              <div className="ml-1 flex flex-col items-start">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Loved by 8,000+ teams
                </span>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-white/10" />

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-500" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="perspective relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-b from-brand-500/20 to-transparent blur-2xl" />
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}
