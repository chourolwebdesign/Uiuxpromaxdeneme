"use client";

import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/ui/Logo";
import { footerLinks, siteConfig } from "@/lib/content";

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="relative border-t border-slate-200/80 bg-slate-50/60 dark:border-white/10 dark:bg-white/[0.015]">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,2fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {siteConfig.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label
                htmlFor="newsletter"
                className="text-sm font-medium text-slate-900 dark:text-white"
              >
                Get product updates
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-full bg-brand-600 px-5 text-sm font-medium text-white transition-colors hover:bg-brand-500"
                >
                  Subscribe
                </button>
              </div>
              {submitted && (
                <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Thanks! You&apos;re on the list.
                </p>
              )}
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {group}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}, Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
