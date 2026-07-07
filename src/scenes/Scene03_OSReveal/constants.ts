// Scene 3 — AI Operating System Reveal (v5). Order, per latest correction:
// greeting/analyzing type out, THEN a 400ms still hold, THEN the neural
// network forms in distinct stages — one tiny center node appears and
// pulses alone first, then satellite nodes appear near each desk object
// one by one, and only once every node is visible do connection lines
// grow outward from center to each one (each object glowing as its line
// lands). Only after ALL connections land does the brain pulse a second,
// more pronounced time and send that pulse back out through the lines.
// This is meant to read as "intelligence forming in stages," not lines
// just appearing everywhere at once.
//
// Object -> product-category mapping (for context, not a rendering
// change — still 6 individual desk objects each connecting/glowing on
// their own, since Contract and Receipt are two physically separate
// objects even though they're the same product category):
//   Phone            -> communication / leads
//   Calendar         -> shoots
//   Contract/Receipt -> payments
//   Album            -> albums
//   Folders          -> projects
//
// Scene 3 no longer ends by growing a workspace card — that final reveal
// (hero positioning copy + compact dashboard preview) is now its own
// scene, Scene04_Reveal, which Scene 3 auto-advances into the instant its
// convergence burst fires (see `onConverge` in index.tsx) rather than
// waiting for another manual scroll.

export const osBootCopy = {
  greeting: "Good morning, Boss.",
  analyzing: "Analyzing your studio...",
  synchronized: "Studio synchronized.",
  building: "Building workspace...",
};

export type OSObject = {
  id: "phone" | "calendar" | "contract" | "album" | "folders" | "receipt";
  src: string;
  left: string;
  top?: string;
  bottom?: string;
  width: number;
  rotate: number;
  z: number;
  // Independent of the image's own left/top/bottom box — this is roughly
  // the visual center of the object, used only for where the connecting
  // line and pulse-travel dot terminate. Approximate is fine for a thin,
  // low-opacity decorative line.
  anchor: { left: string; top: string };
};

// Connection order matches the brief's list exactly: Phone -> Calendar ->
// Contract -> Album -> Folder stack -> Receipt.
export const osObjects: OSObject[] = [
  {
    id: "phone",
    src: "/assets/flatlay/phone-whatsapp.png",
    left: "9%",
    top: "20%",
    width: 300,
    rotate: -8,
    z: 30,
    anchor: { left: "20%", top: "30%" },
  },
  {
    id: "calendar",
    src: "/assets/flatlay/calendar.png",
    left: "58%",
    top: "10%",
    width: 320,
    rotate: 4,
    z: 20,
    anchor: { left: "70%", top: "20%" },
  },
  {
    id: "contract",
    src: "/assets/flatlay/contract.png",
    left: "46%",
    top: "46%",
    width: 240,
    rotate: -3,
    z: 40,
    anchor: { left: "54%", top: "58%" },
  },
  {
    id: "album",
    src: "/assets/flatlay/album-contact-sheet.png",
    left: "7%",
    bottom: "10%",
    width: 420,
    rotate: -4,
    z: 25,
    anchor: { left: "20%", top: "73%" },
  },
  {
    id: "folders",
    src: "/assets/flatlay/folders.png",
    left: "66%",
    bottom: "12%",
    width: 380,
    rotate: 3,
    z: 20,
    anchor: { left: "80%", top: "73%" },
  },
  {
    id: "receipt",
    src: "/assets/flatlay/receipt.png",
    left: "30%",
    top: "12%",
    width: 170,
    rotate: 6,
    z: 35,
    anchor: { left: "36%", top: "24%" },
  },
];

// The brain sits roughly at the visual center of the spread of objects
// above — used both as the shared line/pulse-dot origin and as the point
// everything converges to in the final phase.
export const BRAIN_POSITION_PCT = { x: 48, y: 48 };

// Centralized timings (seconds).
export const timing = {
  scenePause: 0.2,
  dimDuration: 0.6,
  dimOpacity: 0.18,

  // Neural network build, in stages: center node appears + pulses alone,
  // satellite nodes appear one by one, then lines grow outward and each
  // object connects/glows, then a second (bigger) pulse travels back out.
  brainAppearDuration: 0.32,
  firstPulseDuration: 0.3,
  // Loosened from the original 0.09/0.24/0.09 so each object's connection
  // is individually legible ("reading this object, then this one") rather
  // than firing in a quick technical burst — postAnalyzingHold below is
  // trimmed to compensate so the scene's total length doesn't balloon.
  satelliteNodeStagger: 0.12,
  satelliteNodeDuration: 0.24,
  lineDrawDuration: 0.3,
  connectGlowDuration: 0.32,
  connectGap: 0.12,
  brainPulseDuration: 0.35,
  pulseTravelDuration: 0.42,
  networkSettleDuration: 0.3,
  networkRestOpacity: 0.12,

  // Faint continuous flow along each line once the network settles — small
  // gold pulses traveling object -> hub, so the resting network reads as
  // "data quietly moving," not a static diagram. Finite repeats (not -1)
  // so they end on their own without needing manual cleanup elsewhere.
  flowDotTravelDuration: 0.55,
  flowDotEdgeFade: 0.15,
  flowDotRepeat: 2,
  flowDotRepeatDelay: 0.15,
  flowDotStagger: 0.15,
  flowDotOpacity: 0.38,

  // Console boot.
  consoleFadeIn: 0.35,
  cursorPreBlink: 0.5,
  charSpeed: 0.022,
  linePause: 0.16,
  // Distinct, longer still-hold right after "Analyzing your studio..." —
  // per brief, nothing but text and stillness before the network begins.
  postAnalyzingHold: 0.22,

  // Final convergence + burst.
  convergeDuration: 0.5,
  convergeScale: 0.12,
  burstDuration: 0.3,
};
