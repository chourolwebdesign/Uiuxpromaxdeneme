"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { features } from "@/lib/content";

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const Icon = feature.icon;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      variants={staggerItem}
      onMouseMove={handleMove}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-brand-500/30 dark:hover:shadow-soft-dark"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(53,99,255,0.10), transparent 70%)`,
        }}
      />
      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-brand-600 ring-1 ring-inset ring-brand-500/15 transition-transform duration-300 group-hover:scale-110 dark:text-brand-300">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Lumina"
          eyebrowIcon={<Layers className="h-3.5 w-3.5" />}
          title={
            <>
              Everything you need to{" "}
              <span className="text-gradient">understand your business</span>
            </>
          }
          description="A complete analytics platform that replaces your dashboards, your data warehouse complexity, and your weekly metrics meeting."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
