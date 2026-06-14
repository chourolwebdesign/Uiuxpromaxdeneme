import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealItem } from './primitives/Reveal';
import { MagneticButton } from './primitives/MagneticButton';

export function CTA() {
  return (
    <section id="cta" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <div className="ring-grad relative overflow-hidden rounded-5xl glass-strong px-6 py-16 text-center shadow-elevated sm:px-12 sm:py-20">
          {/* animated aurora inside the card */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <motion.div
              animate={{ x: ['-10%', '10%', '-10%'], y: ['-5%', '8%', '-5%'] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/30 blur-[90px]"
            />
            <motion.div
              animate={{ x: ['8%', '-8%', '8%'], y: ['6%', '-6%', '6%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-accent/25 blur-[90px]"
            />
          </div>

          <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
            <RevealItem as="h2" className="font-display text-display-lg text-balance">
              Build the workspace your <span className="text-gradient">team deserves</span>
            </RevealItem>
            <RevealItem as="p" className="mt-5 text-lead text-muted text-balance">
              Join thousands of teams shipping faster with Aurora. Free to start, ready in minutes.
            </RevealItem>
            <RevealItem className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <MagneticButton href="#" className="px-7 py-3.5 text-base">
                Start building free
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton href="#" variant="ghost" className="px-6 py-3.5 text-base">
                Book a demo
              </MagneticButton>
            </RevealItem>
            <RevealItem as="p" className="mt-6 text-sm text-muted/80">
              14-day Pro trial · No credit card · Cancel anytime
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
