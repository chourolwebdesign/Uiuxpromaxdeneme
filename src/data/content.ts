import {
  Sparkles,
  Workflow,
  LineChart,
  ShieldCheck,
  Zap,
  Boxes,
  type LucideIcon,
} from 'lucide-react';

export const nav = [
  { label: 'Product', href: '#features' },
  { label: 'Metrics', href: '#stats' },
  { label: 'Customers', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const logos = [
  'Northwind',
  'Lumen',
  'Quanta',
  'Vertex',
  'Helios',
  'Monolith',
  'Cobalt',
  'Arcadia',
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  span?: 'wide' | 'tall';
}

export const features: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI agents that actually ship',
    body: 'Delegate the busywork. Agents triage, draft, and resolve across your stack — and show their reasoning every step of the way.',
    span: 'wide',
  },
  {
    icon: LineChart,
    title: 'Analytics without the warehouse',
    body: 'Ask questions in plain language. Aurora models your data on the fly and returns charts you can trust.',
  },
  {
    icon: Workflow,
    title: 'Automations on a canvas',
    body: 'Drag, connect, ship. Visual workflows with versioning, rollbacks, and human-in-the-loop approvals.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-grade by default',
    body: 'SOC 2 Type II, SSO/SCIM, granular roles, and audit logs — switched on from day one, not sold as an add-on.',
    span: 'tall',
  },
  {
    icon: Zap,
    title: 'Real-time, everywhere',
    body: 'Sub-50ms updates stream to every client. No refresh, no stale dashboards, no waiting.',
  },
  {
    icon: Boxes,
    title: '120+ native integrations',
    body: 'Connect the tools you already use in a click. Two-way sync keeps everything honest.',
  },
];

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 99.99, suffix: '%', label: 'Uptime, last 12 months', decimals: 2 },
  { value: 48, suffix: 'ms', label: 'Median end-to-end latency' },
  { value: 12, suffix: 'M+', label: 'Workflows run each day' },
  { value: 4.9, suffix: '/5', label: 'Average customer rating', decimals: 1 },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We replaced four tools and a spreadsheet graveyard with Aurora. Our team ships analytics in an afternoon that used to take a quarter.',
    name: 'Mara Okafor',
    role: 'VP Engineering, Northwind',
    initials: 'MO',
  },
  {
    quote:
      'The agents are the real deal. They handle 70% of our inbound triage and leave a clean audit trail. It feels like cheating.',
    name: 'Daniel Reyes',
    role: 'Head of Ops, Lumen',
    initials: 'DR',
  },
  {
    quote:
      'It is the first internal tool people open by choice. The motion, the speed, the clarity — it sets the bar for everything else we build.',
    name: 'Priya Nair',
    role: 'Director of Product, Quanta',
    initials: 'PN',
  },
  {
    quote:
      'Security signed off in a week. SSO, SCIM, audit logs, and per-row access were already there. That never happens.',
    name: 'Tom Albright',
    role: 'CISO, Vertex',
    initials: 'TA',
  },
  {
    quote:
      'Aurora paid for itself in the first month of automations. The canvas is genuinely fun to build in.',
    name: 'Sofia Bauer',
    role: 'COO, Helios',
    initials: 'SB',
  },
];

export interface Plan {
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: 0,
    cadence: 'forever',
    tagline: 'Everything a small team needs to get moving.',
    features: ['Up to 5 seats', '3 active workflows', 'Community support', '7-day history'],
    cta: 'Start for free',
  },
  {
    name: 'Scale',
    price: 24,
    cadence: 'per seat / month',
    tagline: 'For teams turning experiments into systems.',
    features: [
      'Unlimited workflows',
      'AI agents + reasoning logs',
      'Real-time analytics',
      'SSO & role-based access',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: -1,
    cadence: 'custom',
    tagline: 'Control, compliance, and scale for the whole org.',
    features: ['SCIM provisioning', 'Audit logs & data residency', 'Dedicated SLA', 'Solutions engineer'],
    cta: 'Talk to sales',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'How long does it take to get set up?',
    a: 'Most teams are live in under 15 minutes. Connect a data source, pick a template, and Aurora scaffolds your first dashboard and automation automatically.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Aurora is SOC 2 Type II certified with encryption in transit and at rest, SSO/SCIM, granular role-based access, and full audit logging. Enterprise plans add data residency and a dedicated SLA.',
  },
  {
    q: 'Can the AI agents act without approval?',
    a: 'You decide. Every agent can run fully autonomous or with human-in-the-loop approval gates. Each action is logged with the reasoning behind it, so nothing is a black box.',
  },
  {
    q: 'Do you integrate with the tools we already use?',
    a: 'We ship 120+ native, two-way integrations — from data warehouses to messaging to ticketing — plus a typed API and webhooks for anything custom.',
  },
  {
    q: 'What happens when my trial ends?',
    a: 'Nothing breaks. You keep read access to your data and can export everything at any time. Upgrade whenever you are ready — no credit card required to start.',
  },
];
