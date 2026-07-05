// Copy is a DRAFT placeholder only — not finalized (see brief §7). Flag back
// to Bharath before treating any of this as locked.
export const scaleAndFreedomCopy = {
  eyebrow: "MORE WEDDINGS, SAME CALM",
  headline: "Busier didn't mean messier.",
  subhead:
    "More bookings. Same system. Nothing falls through — while you're still the one behind the camera.",
};

export type GridObject = {
  id: string;
  src: string;
  status?: string;
  variant: "calendar-marks" | "pill-below" | "receipt-paid" | "album-delivered";
  nativeWidth: number;
  nativeHeight: number;
  // Z-depth (px) for beat 3's CSS 3D tilt — real layered depth so the
  // rotateX reveals parallax between cards instead of one flat plane
  // rotating as a single sticker. Small, varied, not load-bearing for
  // beats 1-2 (no perspective is applied until beat 3).
  depth: number;
};

// Beat 1-2 opening composition: continuity callback to Scene 3's resolved
// grid — same calendar asset, same contract/receipt/album, same uniform
// axis-aligned grid logic (see Scene03_DeskAtWork/index.tsx). The Instagram
// lead card does NOT carry over — Scene 4 escalates from "one wedding" to
// "many," so that single-lead callback has done its job.
export const gridObjects: GridObject[] = [
  { id: "calendar", src: "/assets/flatlay/calendar.png", variant: "calendar-marks", nativeWidth: 2500, nativeHeight: 1900, depth: 0 },
  { id: "contract", src: "/assets/flatlay/contract.png", status: "Signed", variant: "pill-below", nativeWidth: 1000, nativeHeight: 1220, depth: 26 },
  { id: "payment", src: "/assets/flatlay/receipt.png", status: "Paid", variant: "receipt-paid", nativeWidth: 1800, nativeHeight: 2600, depth: 14 },
  { id: "album", src: "/assets/flatlay/album-contact-sheet.png", status: "143 photos — Delivered", variant: "album-delivered", nativeWidth: 1660, nativeHeight: 1178, depth: 40 },
];

// Beat 3: the release photograph. Locked asset per brief §4 — photographer's
// shoulder/raised camera in soft-focus foreground, couple in a close posed
// moment behind. Flagged trade-off carried over from the brief: this asset
// reads warm/golden-hour rather than the "cool-to-neutral" grade originally
// described — composition matches, color grade doesn't quite; worth a look
// before this is locked.
export const releasePhotoSrc = "/assets/scene4/scene4-release-moment.png";

export type CalendarMark = {
  id: string;
  left: string;
  top: string;
};

// Beat 1: booking rings landing across the calendar face, fast and light —
// growth being celebrated, not chaos. Positions are percentages within the
// calendar image's own rendered box (mapped from its day-grid: 7 columns
// S-S, 5 visible rows), spread across every row/column so it reads as
// "filling up" rather than clustering in one spot. December 12 already has
// a ring baked into the source asset — these are additional dates, spread
// around it, not on it.
export const calendarFillMarks: CalendarMark[] = [
  { id: "day-3", left: "46.9%", top: "46.6%" },
  { id: "day-6", left: "67.5%", top: "46.6%" },
  { id: "day-9", left: "40.1%", top: "54.3%" },
  { id: "day-14", left: "74.4%", top: "54.3%" },
  { id: "day-17", left: "46.9%", top: "62.0%" },
  { id: "day-20", left: "67.5%", top: "62.0%" },
  { id: "day-23", left: "40.1%", top: "69.7%" },
  { id: "day-27", left: "67.5%", top: "69.7%" },
  { id: "day-30", left: "40.1%", top: "77.4%" },
];
