"use client";

import { useEffect, useState } from "react";
import { chaosNotifications } from "./constants";

export default function Scene02Chaos() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showFinalLine, setShowFinalLine] = useState(false);

  useEffect(() => {
    const timers = chaosNotifications.map((_, index) =>
      setTimeout(() => {
        setVisibleCount(index + 1);
      }, index * 900)
    );

    const finalTimer = setTimeout(() => {
      setShowFinalLine(true);
    }, chaosNotifications.length * 900 + 500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#17363B] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#C6A47F]">
          A NORMAL WEDDING DAY
        </p>

        <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.04em] md:text-6xl">
          It starts with one message.
          <br />
          Then your day disappears.
        </h2>

        <div className="mx-auto mt-16 w-full max-w-[390px] rounded-[48px] border border-white/10 bg-black/30 p-4 shadow-2xl">
          <div className="relative min-h-[620px] overflow-hidden rounded-[36px] bg-[#0B171A] p-5">
            {chaosNotifications.slice(0, visibleCount).map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="absolute left-5 right-5 rounded-[24px] border border-white/10 bg-white/90 p-4 text-left text-[#1D3539] shadow-xl transition-all duration-700"
                  style={{
                    top: `${24 + index * 82}px`,
                    transform: `scale(${1 - index * 0.025})`,
                    zIndex: 20 - index,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EEE7]">
                      <Icon className="h-6 w-6 text-[#1D3539]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-[#667085]">
                          {item.app}
                        </p>
                        <p className="text-xs text-[#98A2B3]">{item.time}</p>
                      </div>

                      <h3 className="mt-1 text-base font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-[#667085]">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {showFinalLine && (
              <div className="absolute inset-x-5 bottom-8 rounded-[28px] bg-[#C6A47F] p-6 text-center text-[#1D3539]">
                <p className="text-2xl font-bold leading-tight">
                  And this...
                  <br />
                  is before lunch.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}