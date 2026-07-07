import { MessageCircle, Calendar, Wallet, Images, Folder } from "lucide-react";
import AutoCyclingCard from "@/components/mobile/AutoCyclingCard";
import { osBootCopy } from "./constants";

// Mobile fallback for Scene 3 (OS Reveal). The desktop scene is a ~10s
// GSAP sequence: boot text types out, then a neural network converges the
// same 5 studio categories from Scene 2 into one hub. Mobile keeps the
// boot line as a simple static callback and re-presents the same 5
// categories reframed as "connected" (the before/after from Scene 2's
// "scattered" framing is the point) — no network/converge animation.
const items = [
  {
    icon: MessageCircle,
    label: "Leads",
    title: "Every inquiry, tracked",
    meta: "Connected to your pipeline",
  },
  {
    icon: Calendar,
    label: "Shoots",
    title: "Every shoot, scheduled",
    meta: "Connected to your calendar",
  },
  {
    icon: Wallet,
    label: "Payments",
    title: "Every payment, recorded",
    meta: "Connected to your accounts",
  },
  {
    icon: Images,
    label: "Albums",
    title: "Every album, tracked",
    meta: "Connected to delivery status",
  },
  {
    icon: Folder,
    label: "Projects",
    title: "Every project, organized",
    meta: "Connected to one workspace",
  },
];

export default function Scene03MobileFallback() {
  return (
    <section className="relative bg-[#F7F5F2] px-6 py-20 xl:hidden">
      <div className="mx-auto max-w-[420px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B48B5A]">
          {osBootCopy.synchronized}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-[#1D3539]">
          One system connects everything.
        </h2>
        <div className="mt-10">
          <AutoCyclingCard items={items} />
        </div>
      </div>
    </section>
  );
}
