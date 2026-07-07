import FloatingCard from "@/components/cards/FloatingCard";
import Hero from "./Hero";
import { studioChaosCards } from "./constants";

export default function Scene01Problem() {
  return (
    <section
      id="problem"
      className="relative min-h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A47F]/10 blur-[90px]" />

      {studioChaosCards.map((card) => (
        <FloatingCard
          key={card.label}
          label={card.label}
          title={card.title}
          meta={card.meta}
          icon={card.icon}
          className={card.className}
        />
      ))}

      <Hero />
    </section>
  );
}