// Scene 5 — Product In Motion. The last pinned/cinematic beat: one
// recreated workspace morphs through three capability moments (leads ->
// projects -> AI) and settles on a CTA + scroll cue, which hands off to
// normal document scroll (see `onRelease` in index.tsx and the pin-release
// mechanism in src/app/page.tsx). Each moment sells an outcome ("how does
// this make my life easier"), not a feature tour — no explanatory copy
// beyond the headline.

export const eyebrow = "SNAPOPS AI";

export type MomentId = "leads" | "projects" | "ai" | "cta";

export const headlines: Record<MomentId, [string, string]> = {
  leads: ["Never lose", "another lead."],
  projects: ["Every wedding.", "Perfectly managed."],
  ai: ["Ask SnapOps AI", "anything."],
  cta: ["Everything your studio needs.", "One operating system."],
};

export const activeIconByMoment: Record<MomentId, "dashboard" | "pipeline" | "projects"> = {
  leads: "pipeline",
  projects: "projects",
  ai: "dashboard",
  cta: "dashboard",
};

// --- Moment 1: Leads ------------------------------------------------------
// A WhatsApp inquiry arrives -> AI extracts the fields that matter -> a
// lead card assembles itself -> it moves through the pipeline on its own.

export const whatsappMessage = {
  name: "Instagram Inquiry",
  text: "Hi! We loved your work — we're Rahul & Sneha, getting married 14th Dec in Goa. Are you free?",
};

export const extractedFields = [
  { id: "names", label: "Couple", value: "Rahul & Sneha" },
  { id: "date", label: "Date", value: "14 Dec" },
  { id: "venue", label: "Venue", value: "Goa" },
];

export type LeadStageId = "inquiry" | "consultation" | "booked";

export const leadStages: { id: LeadStageId; label: string }[] = [
  { id: "inquiry", label: "INQUIRY" },
  { id: "consultation", label: "CONSULTATION" },
  { id: "booked", label: "BOOKED" },
];

// Static filler cards so the board reads as a real, populated pipeline —
// the auto-created lead card is rendered separately in index.tsx.
export const leadFillerCards: Record<LeadStageId, string[]> = {
  inquiry: ["Priya & Arjun"],
  consultation: ["Meera K."],
  booked: ["Divya & Karan"],
};

export const travelingLead = { name: "Rahul & Sneha" };

// --- Moment 2: Projects ---------------------------------------------------

export type ProjectStageId =
  | "booked"
  | "shoot"
  | "editing"
  | "approval"
  | "delivered";

export const projectStages: { id: ProjectStageId; label: string }[] = [
  { id: "booked", label: "Booked" },
  { id: "shoot", label: "Shoot Complete" },
  { id: "editing", label: "Editing" },
  { id: "approval", label: "Album Approval" },
  { id: "delivered", label: "Delivered" },
];

export const projectPreview = {
  clientName: "Ananya & Vikram",
  eventLabel: "Wedding · 14 Dec 2025",
};

// --- Moment 3: AI (the section's hero moment) ------------------------------

export const aiExchanges = [
  {
    id: "payments",
    query: "Who hasn't paid?",
    kind: "answer" as const,
    answer: {
      title: "Rahul & Sneha",
      detail: "₹80,000 · Pending",
      actionLabel: "Send reminder",
      accent: "gold" as const,
    },
  },
  {
    id: "reminder",
    query: "Send reminder.",
    kind: "confirmation" as const,
    confirmation: "Reminder sent to Rahul & Sneha",
  },
  {
    id: "albums",
    query: "Which albums are overdue?",
    kind: "answer" as const,
    answer: {
      title: "2 albums overdue",
      detail: "Mandara · 12 days   —   Priya & Arjun · 5 days",
      accent: "warning" as const,
    },
  },
];

// --- CTA --------------------------------------------------------------

export const ctaCopy = {
  primaryLabel: "Book a Demo",
  secondaryLabel: "See Pricing",
};

export const scrollCueLabel = "Scroll to explore";

// Centralized timings (seconds). Every transition uses power1/2/3 eases or
// a very light back.out — no linear/mechanical curves, no bounce, matching
// every other scene's motion rules.
export const timing = {
  morphOutDuration: 0.35,
  morphInDuration: 0.5,
  morphOverlap: 0.15,

  // Moment 1 — Leads, ~4.6s total. Fast energy: everything here happens a
  // touch quicker and with a bit more overshoot than the other two moments
  // — this is the "automation just happened in front of you" beat.
  leadsHold: 4.6,
  bubbleInDuration: 0.3,
  fieldStagger: 0.2,
  fieldStart: 0.45,
  bubbleOutDelay: 1.3,
  cardDropDelay: 1.5,
  leadHop1Delay: 2.3,
  leadHop2Delay: 3.4,
  leadHopDuration: 0.4,

  // Moment 2 — Projects, ~4.8s total. Calm energy: stages land slightly
  // slower and with a softer settle than Moment 1's snappier pace —
  // editorial, not urgent.
  projectsHold: 4.8,
  stageStartDelay: 0.6,
  stageInterval: 1.0,

  // Moment 3 — AI, ~6.2s total (the hero moment — search bar dominant,
  // everything else in the frame quiets down while this plays).
  aiHold: 6.2,
  aiBarDelay: 0.3,
  aiFirstQueryDelay: 0.2,
  aiTypeCharSpeed: 0.045,
  aiPostTypeGap: 0.1,
  aiAnswerHoldDuration: 0.45,
  aiConfirmationHoldDuration: 0.3,
  aiExchangeGap: 0.12,

  // Settle: tiny overshoot, then a real pause, then ambient breathing.
  lockDuration: 0.35,
  lockPauseBeforeBreathe: 0.5,
  readyFadeDuration: 0.35,

  // Closing beat — scroll cue appears, cursor blinks once, then release.
  scrollCueDelay: 0.6,
  scrollCueFadeDuration: 0.4,
  releaseDelay: 0.6,
};
