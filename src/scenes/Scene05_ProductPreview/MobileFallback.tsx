import { Users, Briefcase, Sparkles } from "lucide-react";
import AutoCyclingCard from "@/components/mobile/AutoCyclingCard";
import { headlines, ctaCopy } from "./constants";

// Mobile fallback for Scene 5 (Product Preview). The desktop scene morphs
// one workspace through 3 GSAP-choreographed capability moments over
// ~15s. Mobile reuses the same 3 real headlines as a cycling card, then
// closes with the same real closing headline + CTA (verbatim, same
// placeholder href as desktop's own CTA — no destination page exists
// yet). No workspace recreation, no morph animation.
const items = [
  {
    icon: Users,
    label: "Leads",
    title: headlines.leads.join(" "),
    meta: "WhatsApp inquiries become leads automatically",
  },
  {
    icon: Briefcase,
    label: "Projects",
    title: headlines.projects.join(" "),
    meta: "Booked → Shoot → Editing → Delivered",
  },
  {
    icon: Sparkles,
    label: "AI Assistant",
    title: headlines.ai.join(" "),
    meta: "Instant answers on payments, albums and more",
  },
];

export default function Scene05MobileFallback() {
  return (
    <section className="relative bg-[#F7F5F2] px-6 py-20 xl:hidden">
      <div className="mx-auto max-w-[420px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B48B5A]">
          SnapOps AI
        </p>
        <div className="mt-10">
          <AutoCyclingCard items={items} />
        </div>

        <h2 className="mt-14 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1D3539]">
          {headlines.cta.join(" ")}
        </h2>
        <a
          href="#"
          className="mt-8 inline-flex h-[56px] items-center justify-center rounded-[18px] bg-[#1D3539] px-8 text-[15px] font-semibold text-white"
        >
          {ctaCopy.primaryLabel}
        </a>
      </div>
    </section>
  );
}
