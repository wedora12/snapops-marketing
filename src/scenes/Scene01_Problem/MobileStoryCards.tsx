"use client";

import { useEffect, useState } from "react";
import { studioChaosCards } from "./constants";

export default function MobileStoryCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % studioChaosCards.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const activeCard = studioChaosCards[activeIndex];
  const Icon = activeCard.icon;

  return (
    <div className="relative mx-auto mb-14 mt-8 w-full max-w-[360px] md:hidden">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#B48B5A]">
        THE DAILY CHAOS
      </p>

      <div className="relative overflow-hidden rounded-[32px] border border-[#ECE7E0] bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)]">
        <div
          key={activeCard.label}
          className="flex animate-mobile-card items-center gap-5"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-[#F4EEE7]">
            <Icon className="h-9 w-9 text-[#1D3539]" />
          </div>

          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B48B5A]">
              {activeCard.label}
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#1D3539]">
              {activeCard.title}
            </h3>

            <p className="mt-1 text-base text-[#7B7B7B]">
              {activeCard.meta}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {studioChaosCards.map((card, index) => (
          <span
            key={card.label}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-[#B48B5A]"
                : "bg-[#E3DCD3]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}