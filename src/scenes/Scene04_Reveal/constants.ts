// Scene 4 — the final reveal. Scene 3's convergence burst hands off here
// immediately (see Scene03_OSReveal's `onConverge`) — this scene opens with
// a residual echo of that same burst (same position/color as Scene 3's
// `.convergence-burst`) instead of an internal pause, so the cut reads as
// one continuous flash-to-content event rather than two flashes with a
// gap between them.
//
// The workspace below the headline is a single recreated product shot —
// real React/HTML (sidebar, metrics, one pipeline column, one projects
// list) composed into one continuous window, not screenshots. Copy and
// numbers are styled from :references:ui:/Dashboard.jpg, Pipeline.jpg and
// Project.jpg as visual/data reference only. No legible studio wordmark is
// shown in the mini sidebar — it should read as "the product," not a
// specific customer's screenshot, matching the site's established
// "watch, don't read" quality.

export const eyebrow = "SNAPOPS AI";
export const aiBadgeLabel = "AI Insight";

export const heroCopy = {
  readyLine: "Ready.",
  headlineLines: ["THE OPERATING SYSTEM", "FOR WEDDING STUDIOS."],
  subheadLines: [
    "One intelligent workspace for every client, every shoot,",
    "every payment and every album.",
  ],
};

export type NavIcon =
  | "dashboard"
  | "pipeline"
  | "projects"
  | "delivery"
  | "accounts";

export type NavItem = { id: string; icon: NavIcon; active?: boolean };

// Pipeline + Projects are shown active since those are the two sections
// on display in the workspace below.
export const navItems: NavItem[] = [
  { id: "dashboard", icon: "dashboard" },
  { id: "pipeline", icon: "pipeline", active: true },
  { id: "projects", icon: "projects", active: true },
  { id: "delivery", icon: "delivery" },
  { id: "accounts", icon: "accounts" },
];

export type Metric = {
  id: string;
  label: string;
  value: string;
  tone?: "positive" | "warning";
  // If set, this metric counts up from 0 to `value` during construction,
  // then — once the workspace has settled and is breathing — ticks up once
  // more to `liveValue`, as if a new lead just came in. Kept to a single
  // metric so the workspace feels alive without feeling busy.
  liveValue?: string;
};

// Real numbers from :references:ui:/Dashboard.jpg, for authenticity.
export const metrics: Metric[] = [
  { id: "active-leads", label: "ACTIVE LEADS", value: "37", liveValue: "38" },
  { id: "new-week", label: "NEW THIS WEEK", value: "8" },
  { id: "pipeline-value", label: "PIPELINE VALUE", value: "₹1,70,000" },
  {
    id: "won",
    label: "WON (ONBOARDED)",
    value: "₹5,48,000",
    tone: "positive",
  },
];

export type PipelineLead = {
  id: string;
  name: string;
  tag?: string;
  // Held back from the initial construction stagger — slides into place
  // on its own after the workspace has settled, like a lead just came in.
  liveAdd?: true;
};

export const pipelineStage = {
  name: "FOLLOWUP",
  count: 34,
  leads: [
    { id: "l1", name: "Sreekumar", tag: "QUEEN" },
    { id: "l2", name: "Piyusha", tag: "QUEEN" },
    { id: "l3", name: "Teja" },
    { id: "l4", name: "Rushna" },
    { id: "l5", name: "Shanth Kumar", liveAdd: true },
  ] as PipelineLead[],
};

export type ProjectRow = {
  id: string;
  name: string;
  status: string;
  amount: string;
};

export const projectRows: ProjectRow[] = [
  { id: "p1", name: "Shashank & Rhea", status: "SHOOT DONE", amount: "₹92,200" },
  { id: "p2", name: "Tanuja & Sandeep", status: "SHOOT DONE", amount: "₹30,000" },
  { id: "p3", name: "Harsha", status: "SHOOT DONE", amount: "₹44,000" },
  { id: "p4", name: "Mandara", status: "CONFIRMED", amount: "₹1,10,000" },
];

// Centralized timings (seconds). Entrances use power2/power3 eases — the
// one deliberate exception is the workspace's final settle, which gets a
// tiny back.out overshoot (a few px) for a physical "it just landed" feel
// rather than a hard stop.
export const timing = {
  burstEchoDuration: 0.45,

  eyebrowDuration: 0.4,
  headlineBlurPx: 10,
  headlineScaleFrom: 0.96,
  headlineStagger: 0.09,
  headlineDuration: 0.6,
  subheadDuration: 0.5,

  // Workspace assembly. Sidebar starts before the headline build finishes
  // (see the "headline" -> "workspace" label offset in index.tsx) so
  // there's always something visibly in motion — never a blank hold
  // waiting for its turn.
  sidebarDuration: 0.5,
  metricsStagger: 0.07,
  metricsDuration: 0.4,
  pipelineDuration: 0.45,
  projectsDuration: 0.45,
  // Individual lead/project rows assemble with their own quick stagger on
  // top of the column entrance, so the workspace reads as "constructing
  // itself piece by piece" rather than one block fading in.
  rowStagger: 0.055,
  rowDuration: 0.32,
  badgeDelay: 0.2,
  badgeDuration: 0.4,

  // Settle: tiny overshoot, then a real pause, then ambient breathing.
  lockDuration: 0.35,
  lockPauseBeforeBreathe: 0.5,
  readyFadeDuration: 0.35,

  // Post-settle "living" beats — exactly three, sparse and causal (a lead
  // arrives, the count reacts, the system notices), plus the cursor's own
  // continuous blink — nothing more, so the workspace reads as alive
  // without ever feeling busy.
  liveRowDelay: 0.6,
  liveMetricDelay: 1.1,
  liveBadgeDelay: 1.9,
};
