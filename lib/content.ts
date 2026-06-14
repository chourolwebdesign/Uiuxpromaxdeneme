import {
  Activity,
  BarChart3,
  Bell,
  BrainCircuit,
  Database,
  Gauge,
  GitBranch,
  Globe2,
  LineChart,
  Lock,
  Puzzle,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "Lumina",
  tagline: "Intelligent analytics for ambitious teams.",
  description:
    "Lumina turns scattered product data into decisions your whole team can act on — beautiful dashboards, predictive insights, and AI that explains the 'why' behind every metric.",
  url: "https://lumina.example.com",
  email: "hello@lumina.so",
};

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Platform", href: "#platform" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: "AI insight engine",
    description:
      "Ask questions in plain English and get charts, cohorts, and root-cause analysis in seconds — no SQL required.",
  },
  {
    icon: LineChart,
    title: "Predictive forecasting",
    description:
      "Lumina models your trends and flags revenue risk weeks before it shows up in a quarterly report.",
  },
  {
    icon: Gauge,
    title: "Real-time dashboards",
    description:
      "Sub-second queries across billions of events. Your numbers update the instant the world changes.",
  },
  {
    icon: Workflow,
    title: "Automated workflows",
    description:
      "Trigger alerts, sync to Slack, or kick off downstream jobs when a metric crosses any threshold you define.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description:
      "SOC 2 Type II, GDPR, and SSO out of the box. Granular roles keep every dataset exactly where it belongs.",
  },
  {
    icon: Puzzle,
    title: "200+ integrations",
    description:
      "Connect your warehouse, CRM, billing, and product analytics in minutes with native, no-maintenance syncs.",
  },
];

export type Stat = { value: string; label: string; suffix?: string };

export const stats: Stat[] = [
  { value: "12", suffix: "B+", label: "Events processed daily" },
  { value: "99.99", suffix: "%", label: "Platform uptime" },
  { value: "340", suffix: "ms", label: "Median query speed" },
  { value: "8,000", suffix: "+", label: "Teams onboarded" },
];

export type PlatformCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  span: "lg" | "md" | "sm";
};

export const platformCards: PlatformCard[] = [
  {
    icon: BarChart3,
    title: "A canvas built for clarity",
    description:
      "Drag-and-drop dashboards with pixel-perfect themes. Share a link, embed anywhere, or export board-ready PDFs.",
    span: "lg",
  },
  {
    icon: Database,
    title: "Connect any source",
    description: "Warehouses, lakes, and SaaS tools — unified.",
    span: "sm",
  },
  {
    icon: Sparkles,
    title: "AI narratives",
    description: "Every chart comes with a plain-language summary.",
    span: "sm",
  },
  {
    icon: Bell,
    title: "Smart alerting",
    description:
      "Anomaly detection that learns your seasonality and only pings you when it truly matters.",
    span: "md",
  },
  {
    icon: GitBranch,
    title: "Version control",
    description: "Branch, review, and roll back metric definitions like code.",
    span: "md",
  },
];

export type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    icon: Database,
    title: "Connect your data",
    description:
      "Authenticate a source and Lumina maps your schema automatically. Most teams are live in under ten minutes.",
  },
  {
    number: "02",
    icon: Activity,
    title: "Explore with AI",
    description:
      "Type a question or drag a metric onto the canvas. Lumina builds the query, the chart, and the explanation.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Automate the wins",
    description:
      "Set thresholds, route alerts, and let workflows act on insights before your competitors even notice them.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Lumina replaced three tools and a full-time analyst. Our PMs finally answer their own questions — and trust the numbers.",
    name: "Sofia Marchetti",
    role: "VP of Product",
    company: "Northwind",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote:
      "We caught a churn spike eleven days early because Lumina's forecast flagged it. That alone paid for the platform.",
    name: "Daniel Okafor",
    role: "Head of Growth",
    company: "Cadence",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote:
      "The most beautiful analytics product I've ever used — and somehow the fastest. Our exec team actually opens it now.",
    name: "Amelia Chen",
    role: "Chief Operating Officer",
    company: "Vela",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote:
      "Onboarding was genuinely delightful. We connected Snowflake at 9am and shipped our first exec dashboard by lunch.",
    name: "Marcus Bennett",
    role: "Director of Analytics",
    company: "Helios",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  },
];

export const logos = [
  "Northwind",
  "Cadence",
  "Vela",
  "Helios",
  "Quanta",
  "Lumen Labs",
  "Aerial",
  "Monarch",
];

export type Plan = {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "Everything a small team needs to start making data-driven calls.",
    features: [
      "Up to 5 seats",
      "3 connected data sources",
      "Unlimited dashboards",
      "7-day data history",
      "Community support",
    ],
    cta: "Start for free",
  },
  {
    name: "Growth",
    price: { monthly: 49, yearly: 39 },
    description: "Advanced AI, automation, and forecasting for scaling companies.",
    features: [
      "Unlimited seats",
      "25 connected data sources",
      "AI insight engine + narratives",
      "Predictive forecasting",
      "Smart alerting & workflows",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 0, yearly: 0 },
    description: "Security, governance, and scale for the largest organizations.",
    features: [
      "Everything in Growth",
      "Unlimited data sources",
      "SSO, SCIM & audit logs",
      "Dedicated infrastructure",
      "Custom data residency",
      "24/7 white-glove support",
    ],
    cta: "Talk to sales",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How long does it take to get set up?",
    answer:
      "Most teams connect their first data source and ship a dashboard within ten minutes. Lumina automatically detects your schema, so there's no manual modeling required to get started.",
  },
  {
    question: "Do I need to know SQL?",
    answer:
      "Not at all. You can ask questions in plain English and Lumina's AI engine writes the query for you. Power users can still drop into raw SQL whenever they want full control.",
  },
  {
    question: "How does Lumina keep our data secure?",
    answer:
      "We're SOC 2 Type II certified and GDPR compliant, with encryption in transit and at rest. Enterprise plans add SSO, SCIM provisioning, audit logs, and custom data residency.",
  },
  {
    question: "Can Lumina connect to our existing stack?",
    answer:
      "Yes. We offer 200+ native integrations including Snowflake, BigQuery, Redshift, Postgres, Salesforce, Stripe, and Segment. New syncs take minutes and require no ongoing maintenance.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "Your data and dashboards are preserved. You can upgrade to a paid plan at any time, or stay on the free Starter tier — we'll never delete your work or hold it hostage.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Yes. Switching to annual billing saves you roughly 20% compared to paying monthly, and unlocks the same features without any usage caps.",
  },
];

export const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Platform", href: "#platform" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Customers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API reference", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
    { label: "Security", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Licenses", href: "#" },
  ],
};

export const trustBadges = [
  { icon: Lock, label: "SOC 2 Type II" },
  { icon: Globe2, label: "GDPR Ready" },
  { icon: Gauge, label: "99.99% Uptime" },
];
