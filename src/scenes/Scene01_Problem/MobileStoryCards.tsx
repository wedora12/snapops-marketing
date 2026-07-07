import AutoCyclingCard from "@/components/mobile/AutoCyclingCard";
import { studioChaosCards } from "./constants";

export default function MobileStoryCards() {
  return (
    <div className="relative mx-auto mb-14 mt-8 w-full max-w-[360px] md:hidden">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#B48B5A]">
        THE DAILY CHAOS
      </p>

      <AutoCyclingCard
        items={studioChaosCards}
        titleClassName="text-2xl tracking-[-0.04em]"
        metaClassName="text-base"
        debugLabel="scene1"
      />
    </div>
  );
}