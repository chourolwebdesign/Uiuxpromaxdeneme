import { Github, Twitter, Linkedin } from 'lucide-react';

const columns = [
  { title: 'Product', links: ['Features', 'Integrations', 'Changelog', 'Pricing', 'Security'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Customers', 'Contact'] },
  { title: 'Resources', links: ['Docs', 'API reference', 'Community', 'Status', 'Guides'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'DPA', 'Cookies'] },
];

const socials = [
  { icon: Twitter, label: 'Aurora on X' },
  { icon: Github, label: 'Aurora on GitHub' },
  { icon: Linkedin, label: 'Aurora on LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border/10 pt-16">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden>
                  <path d="M12 3c2.5 4 4.5 6 4.5 9a4.5 4.5 0 1 1-9 0c0-3 2-5 4.5-9Z" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">Aurora</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The AI operating system for modern teams. Analytics, automation, and agents on one
              luminous canvas.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/15 bg-surface/[0.03] text-muted transition-colors hover:bg-surface/[0.08] hover:text-fg"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/10 py-8 sm:flex-row">
          <p className="text-sm text-muted">© {new Date().getFullYear()} Aurora Labs, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-success" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
