import AutoCyclingCard from "@/components/mobile/AutoCyclingCard";

// Mobile fallback for Scene 2 (Flatlay Desk). The desktop scene is
// wordless — objects fly onto a desk to visually say "here's everything a
// studio juggles at once." Mobile gets the same idea with an explicit
// headline plus a cycling card using the actual flatlay photos, instead of
// porting the fly-in choreography down in scale.
const items = [
  {
    image: "/assets/flatlay/phone-whatsapp.png",
    label: "Inquiries",
    title: "Coming in on WhatsApp",
    meta: "Instagram, calls and walk-ins too",
  },
  {
    image: "/assets/flatlay/calendar.png",
    label: "Shoots",
    title: "Every wedding on the calendar",
    meta: "Dates, venues, logistics",
  },
  {
    image: "/assets/flatlay/contract.png",
    label: "Payments",
    title: "Contracts and payments",
    meta: "Tracked across every client",
  },
  {
    image: "/assets/flatlay/album-contact-sheet.png",
    label: "Albums",
    title: "Photos waiting for approval",
    meta: "Client reviews, edits, delivery",
  },
  {
    image: "/assets/flatlay/folders.png",
    label: "Projects",
    title: "Every project, its own folder",
    meta: "Files scattered everywhere",
  },
];

export default function Scene02MobileFallback() {
  return (
    <section className="relative bg-[#F7F5F2] px-6 py-20 xl:hidden">
      <div className="mx-auto max-w-[420px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B48B5A]">
          The daily reality
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1D3539]">
          Every wedding studio juggles a dozen moving parts.
        </h2>
        <div className="mt-10">
          <AutoCyclingCard items={items} />
        </div>
      </div>
    </section>
  );
}
