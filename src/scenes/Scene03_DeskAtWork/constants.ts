import {
  Phone,
  PhoneMissed,
  MessageCircle,
  Mail,
  Image as ImageIcon,
  CreditCard,
  Heart,
  Users,
  Clock,
  type LucideIcon,
} from "lucide-react";

export const deskAtWorkCopy = {
  eyebrow: "ONE WEDDING, START TO FINISH",
  headline: "The desk does the following up.",
  subhead:
    "You shoot. SnapOps tracks the lead, the date, the payment, the delivery — while you're behind the camera, not the keyboard.",
};

export type ScatterObject = {
  id: string;
  src: string;
  width: number;
  top: number;
  left: number;
  rotate: number;
  z: number;
};

// Scatter phase, hero tier: the 4 objects that also appear resolved.
// These stay recognizable (esp. the Instagram lead, a callback to Scene 1)
// and are sized larger than the noise tier so they anchor the pile.
// Spread across the full stage — copy block occupies roughly x:0-470,y:0-380,
// so scatter avoids only that corner.
export const scatterObjects: ScatterObject[] = [
  { id: "lead", src: "/assets/flatlay/instagram-card.png", width: 280, top: 40, left: 1000, rotate: 14, z: 70 },
  { id: "receipt", src: "/assets/flatlay/receipt.png", width: 220, top: 230, left: 920, rotate: -3, z: 60 },
  { id: "contract", src: "/assets/flatlay/contract.png", width: 250, top: 470, left: 70, rotate: -13, z: 55 },
  { id: "album", src: "/assets/flatlay/album-contact-sheet.png", width: 370, top: 520, left: 520, rotate: -6, z: 20 },
];

export type NoiseChip = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  text: string;
  top: number;
  left: number;
  rotate: number;
  z: number;
};

// Scatter phase, noise tier: texture-only chips in Scene 1's chaos-card
// visual language (icon + eyebrow + one line), not the hero document style.
// These exist only in the scatter — they vanish in the snap and never
// resolve into anything.
export const noiseChips: NoiseChip[] = [
  { id: "call-bride", icon: Phone, eyebrow: "CALL", text: "Bride's father", top: 40, left: 560, rotate: 8, z: 75 },
  { id: "whatsapp-followups", icon: MessageCircle, eyebrow: "WHATSAPP", text: "14 follow-ups pending", top: 90, left: 780, rotate: -10, z: 65 },
  { id: "dms-unread", icon: Mail, eyebrow: "DMS", text: "3 unread messages", top: 180, left: 1180, rotate: 15, z: 80 },
  { id: "album-comment", icon: ImageIcon, eyebrow: "ALBUM", text: "New comment", top: 340, left: 1080, rotate: -9, z: 35 },
  { id: "payment-reminder", icon: CreditCard, eyebrow: "PAYMENT", text: "Reminder due", top: 420, left: 640, rotate: 5, z: 50 },
  { id: "call-missed", icon: PhoneMissed, eyebrow: "CALL", text: "Missed — vendor", top: 620, left: 280, rotate: -16, z: 65 },
  { id: "instagram-comment", icon: Heart, eyebrow: "INSTAGRAM", text: "New comment", top: 600, left: 900, rotate: 11, z: 45 },
  { id: "guests-update", icon: Users, eyebrow: "GUESTS", text: "List update needed", top: 520, left: 1150, rotate: -6, z: 30 },
  { id: "timeline-change", icon: Clock, eyebrow: "TIMELINE", text: "Change requested", top: 760, left: 380, rotate: 9, z: 40 },
];

export type ResolvedObject = {
  id: string;
  src: string;
  status: string;
  variant: "pill-below" | "receipt-paid" | "album-delivered";
  // Native asset dimensions, used to fit each image into the shared square
  // grid cell (see RESOLVED_CELL_SIZE in index.tsx) without distortion.
  nativeWidth: number;
  nativeHeight: number;
};

// Resolved phase: exactly 4, in a true uniform grid — same cell width AND
// height for all four (not just a shared height with variable width, which
// is what made earlier grid attempts feel uneven: lead/album are wide
// landscape, contract/receipt are narrow portrait, so a shared-height row
// never lines up into real columns). Each image is fit into its square cell
// via object-contain and anchored to the cell's bottom-left corner (see
// index.tsx), so every card's badge can use the exact same placement logic
// regardless of the asset's own aspect ratio.
export const resolvedObjects: ResolvedObject[] = [
  { id: "lead", src: "/assets/flatlay/instagram-card.png", status: "Booked", variant: "pill-below", nativeWidth: 1700, nativeHeight: 1250 },
  { id: "contract", src: "/assets/flatlay/contract.png", status: "Signed", variant: "pill-below", nativeWidth: 1000, nativeHeight: 1220 },
  { id: "payment", src: "/assets/flatlay/receipt.png", status: "Paid", variant: "receipt-paid", nativeWidth: 1800, nativeHeight: 2600 },
  { id: "album", src: "/assets/flatlay/album-contact-sheet.png", status: "143 photos — Delivered", variant: "album-delivered", nativeWidth: 1660, nativeHeight: 1178 },
];
