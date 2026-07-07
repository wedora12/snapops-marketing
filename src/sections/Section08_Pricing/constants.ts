// Section 8 — Pricing. Real tiers/pricing as provided by the user — no
// longer placeholder.

export const sectionCopy = {
  eyebrow: "PRICING",
  headline: "Built for wedding studios, by a wedding studio.",
  subhead: "Start free. Upgrade when you're ready to scale.",
};

export type PricingTier = {
  id: string;
  icon: string;
  name: string;
  price: string;
  cadence: string;
  annualNote?: string;
  description: string;
  limits: string[];
  includedIntro?: string;
  included: string[];
  bestFor: string;
  ctaLabel: string;
  featured?: boolean;
};

export const tiers: PricingTier[] = [
  {
    id: "free",
    icon: "🌱",
    name: "Free",
    price: "₹0",
    cadence: "/ forever",
    description: "For solo shooters and small studios just getting organized.",
    limits: ["5 leads / month", "2 active projects"],
    included: [
      "Full lead pipeline (DNP → Followup → Meeting Scheduled → Send Proposal → Onboarded)",
      "Project creation wizard",
      "Basic delivery tracking",
      "Single studio, single user login",
      "Mobile-optimized dashboard",
    ],
    bestFor: "Studios testing SnapOps or handling a handful of weddings a season.",
    ctaLabel: "Start Free",
  },
  {
    id: "studio",
    icon: "📸",
    name: "Studio",
    price: "₹1,999",
    cadence: "/ month",
    annualNote: "or ₹20,000 / year (save ~₹4,000)",
    description: "For active studios running real volume with a small team.",
    limits: ["1,000 leads / month", "100 active projects"],
    includedIntro: "Everything in Free, plus:",
    included: [
      "Multi-user team access (add your team, not just yourself)",
      "Full Accounts module — cash collected, vendor payouts, expenses",
      "WhatsApp-based client communication templates",
      "Delivery performance tracking against deadlines",
      "Priority email support",
    ],
    bestFor: "Growing studios with a small team managing multiple weddings simultaneously.",
    ctaLabel: "Start Free Trial",
    featured: true,
  },
  {
    id: "pro",
    icon: "👑",
    name: "Pro",
    price: "₹3,999",
    cadence: "/ month",
    annualNote: "or ₹40,000 / year (save ~₹8,000)",
    description:
      "For established studios and multi-photographer teams who need full operational control.",
    limits: ["5,000 leads / month", "500 active projects"],
    includedIntro: "Everything in Studio, plus:",
    included: [
      "Editor & vendor rating module — track photographer/editor quality over time",
      "Vendor performance dashboard",
      "Advanced Accounts view — per-project realized profit (cash collected − payouts − expenses)",
      "Super-admin controls with secure MFA login",
      "Priority support with faster response times",
    ],
    bestFor: "Studios with multiple photographers, editors, and a real ops backbone to manage.",
    ctaLabel: "Start Free Trial",
  },
];

export const allPlansInclude = [
  "No card required to start",
  "15-day full-access trial on signup",
  "Mobile + desktop access",
  "Bank-grade data security",
];
