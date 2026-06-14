import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { nav } from '../data/content';
import { MagneticButton } from './primitives/MagneticButton';
import { useTheme } from '../lib/useTheme';
import { cn } from '../lib/cn';

function Logo() {
  return (
    <a href="#main" className="flex items-center gap-2.5" aria-label="Aurora home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden>
          <path
            d="M12 3c2.5 4 4.5 6 4.5 9a4.5 4.5 0 1 1-9 0c0-3 2-5 4.5-9Z"
            fill="currentColor"
            opacity="0.95"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">Aurora</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={cn(
          'container-px mt-3 flex items-center justify-between rounded-full transition-all duration-300',
          scrolled ? 'glass-strong py-2.5 shadow-glass' : 'py-3',
        )}
      >
        <Logo />

        {/* Desktop links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-surface/[0.06] hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface/[0.06] hover:text-fg"
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <a
            href="#"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg sm:block"
          >
            Sign in
          </a>

          <MagneticButton href="#cta" className="hidden px-5 py-2.5 text-sm sm:inline-flex">
            Get started
          </MagneticButton>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full text-fg transition-colors hover:bg-surface/[0.06] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="container-px lg:hidden"
          >
            <div className="glass-strong mt-2 rounded-4xl p-3 shadow-elevated">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 text-base font-medium text-fg/90 transition-colors hover:bg-surface/[0.06]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-col gap-2 px-1 pb-1">
                <a
                  href="#"
                  className="rounded-full px-4 py-3 text-center text-sm font-medium text-muted hover:text-fg"
                >
                  Sign in
                </a>
                <MagneticButton href="#cta" className="w-full" onClick={() => setOpen(false)}>
                  Get started
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
