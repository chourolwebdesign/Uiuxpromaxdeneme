"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-slate-950 px-6 py-16 text-center sm:px-12 sm:py-20 dark:border-white/10">
          {/* Animated background */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(53,99,255,0.4),transparent)] blur-2xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[15%] top-[20%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.35),transparent)] blur-2xl"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-grid opacity-[0.06]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Ready to see your data{" "}
                <span className="text-gradient">clearly</span>?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-balance text-base leading-relaxed text-slate-300 sm:text-lg">
                Join 8,000+ teams making faster, smarter decisions with Lumina.
                Set up in minutes — free forever to start.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="#">
                  <Button size="lg" className="pr-5">
                    Start for free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                  >
                    Book a demo
                  </Button>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 text-xs text-slate-400">
                No credit card required &middot; 14-day Growth trial &middot; Cancel anytime
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
