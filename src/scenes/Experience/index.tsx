"use client";

import { useEffect, useState } from "react";
import Header from "@/components/navigation/Header";
import FloatingCard from "@/components/cards/FloatingCard";
import { studioChaosCards } from "@/scenes/Scene01_Problem/constants";

export default function Experience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 2.2;
      setProgress(Math.min(window.scrollY / max, 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroFade = progress < 0.28 ? 1 : Math.max(1 - (progress - 0.28) / 0.18, 0);
  const cardsMove = Math.min(Math.max((progress - 0.25) / 0.35, 0), 1);
  const snap = Math.min(Math.max((progress - 0.62) / 0.18, 0), 1);
  const dashboard = Math.min(Math.max((progress - 0.72) / 0.2, 0), 1);

  return (
    <section className="relative min-h-[280vh] bg-[#F7F5F2]">
      <Header />

      <div className="sticky top-0 h-screen overflow-hidden px-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-center"
            style={{
              opacity: heroFade,
              transform: `scale(${1 - progress * 0.08})`,
            }}
          >
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.4em] text-[#B48B5A]">
              FOR WEDDING STUDIOS
            </p>

            <h1 className="text-[92px] font-bold leading-[0.9] tracking-[-0.06em] text-[#1D3539]">
              Running a
              <br />
              wedding studio
              <br />
              shouldn't feel
              <br />
              like <span className="font-medium italic text-[#B48B5A]">this.</span>
            </h1>

            <p className="mx-auto mt-10 max-w-[680px] text-[24px] leading-[1.7] text-[#667085]">
              Every inquiry. Every payment.
              <br />
              Every album. Every client conversation.
              <br />
              Finally, everything in one place.
            </p>
          </div>
        </div>

        {studioChaosCards.map((card, index) => {
          const x = ["38vw", "-38vw", "34vw", "-34vw"][index] || "0vw";
          const y = ["22vh", "22vh", "-22vh", "-22vh"][index] || "0vh";

          return (
            <div
              key={card.label}
              className="absolute left-1/2 top-1/2 z-30 hidden xl:block"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translate(${`calc(${x} * ${1 - cardsMove})`}, ${`calc(${y} * ${1 - cardsMove})`})
                  scale(${1 - snap * 0.75})
                  rotate(${snap * 25}deg)
                `,
                opacity: 1 - dashboard,
                transition: "transform 120ms linear, opacity 120ms linear",
              }}
            >
              <FloatingCard
                label={card.label}
                title={card.title}
                meta={card.meta}
                icon={card.icon}
                className="!relative !flex !w-[300px]"
              />
            </div>
          );
        })}

        <div
          className="absolute left-1/2 top-1/2 z-20 w-[88vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-[#E8E3DC] bg-white p-6 shadow-[0_40px_140px_rgba(0,0,0,0.14)]"
          style={{
            opacity: dashboard,
            transform: `translate(-50%, -50%) scale(${0.82 + dashboard * 0.18})`,
          }}
        >
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <aside className="rounded-[28px] bg-[#1D3539] p-6 text-white">
              <h3 className="text-xl font-bold">SnapOps</h3>
              <div className="mt-8 space-y-3">
                {["Leads", "Projects", "Albums", "Payments", "AI"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            <main className="grid gap-5 md:grid-cols-2">
              {["Rahul & Sneha", "Payment Received", "Album Approved", "AI Follow-up"].map((item) => (
                <div key={item} className="rounded-[28px] bg-[#F7F5F2] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B48B5A]">
                    Organized
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-[#1D3539]">
                    {item}
                  </h3>
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}