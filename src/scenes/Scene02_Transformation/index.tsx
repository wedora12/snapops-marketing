"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Scene02TransformationProps = {
  isActive?: boolean;
};

const terminalLines = [
  "> Good morning, Bharath.",
  "> Scanning your studio...",
  "✓ 4 payments found",
  "✓ 3 shoots today",
  "✓ 2 albums awaiting approval",
  "✓ 18 active clients",
  "> Building today's workspace...",
];

const tasks = [
  {
    time: "09:00",
    title: "Rahul & Sneha",
    sub: "Wedding shoot briefing",
  },
  {
    time: "11:30",
    title: "Collect ₹80,000",
    sub: "Payment follow-up",
  },
  {
    time: "04:00",
    title: "Album Approval",
    sub: "Karan & Soniya waiting",
  },
  {
    time: "Today",
    title: "₹4.2L",
    sub: "Expected collections",
  },
  {
    time: "Priority",
    title: "3 items",
    sub: "Need your attention",
  },
];

export default function Scene02Transformation({
  isActive = false,
}: Scene02TransformationProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const section = sceneRef.current;

    const ctx = gsap.context(() => {
      gsap.set(".terminal-line", {
        width: 0,
        opacity: 1,
      });

      gsap.set(".cursor-block", {
        opacity: 0,
      });

      gsap.set(".terminal-wrap", {
        x: 0,
        y: 0,
        scale: 1,
      });

      gsap.set(".workspace-shell", {
        opacity: 0,
        scale: 0.88,
        y: 36,
      });

      gsap.set(".task-pill", {
        opacity: 0,
        x: 90,
        y: 18,
        scale: 0.88,
      });

      gsap.set(".final-status", {
        opacity: 0,
        y: 18,
        scale: 0.94,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (!isActive) return;
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;

    const section = sceneRef.current;
    const lines = Array.from(
      section.querySelectorAll<HTMLElement>(".terminal-line")
    );

    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        section.classList.add("is-live");
      },
    });

    tl.to(".cursor-block", {
      opacity: 1,
      duration: 0.12,
      ease: "power2.out",
    });

    lines.forEach((line, index) => {
      tl.to(
        line,
        {
          width: line.scrollWidth,
          duration: index === 0 ? 0.62 : 0.38,
          ease: "steps(24)",
        },
        index === 0 ? "+=0.18" : "+=0.1"
      );

      if (index === 0) {
        tl.to(".cursor-block", {
          opacity: 0,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "none",
        });
      }
    });

    tl.to(".terminal-wrap", {
      x: -220,
      scale: 0.92,
      duration: 0.62,
      ease: "power4.inOut",
    });

    tl.to(
      ".workspace-shell",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.55,
        ease: "power4.out",
      },
      "-=0.45"
    );

    tl.to(
      ".task-pill",
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.75)",
        stagger: 0.08,
      },
      "-=0.28"
    );

    tl.to(
      ".final-status",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.36,
        ease: "back.out(1.8)",
      },
      "-=0.1"
    );
  }, [isActive]);

  return (
    <section
      ref={sceneRef}
      className="relative h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <style>{`
        @keyframes cursorBlink {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }

        @keyframes softFloat {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-8px,0); }
        }

        @keyframes pillBreathe {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-4px,0) scale(1.012); }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .cursor-block {
          animation: cursorBlink 0.85s infinite;
        }

        .is-live .workspace-shell {
          animation: softFloat 5.5s ease-in-out infinite;
        }

        .is-live .task-pill {
          animation: pillBreathe 4.2s ease-in-out infinite;
        }

        .is-live .status-dot {
          animation: statusPulse 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F5F2_76%)]" />
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A47F]/8 blur-[160px]" />

      <div className="relative mx-auto grid h-full max-w-[1540px] grid-cols-[0.88fr_1.12fr] items-center gap-16 px-24">
        <div className="terminal-wrap relative z-20">
          <p className="mb-8 font-mono text-[13px] uppercase tracking-[0.32em] text-[#B38A5D]">
            SNAPOPS SYSTEM / MORNING BRIEF
          </p>

          <div className="rounded-[34px] border border-[#E4D9CB] bg-[#FBFAF7]/80 p-8 shadow-[0_32px_100px_rgba(29,53,57,0.10)] backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#C6A47F]" />
              <span className="h-3 w-3 rounded-full bg-[#D8C7AE]" />
              <span className="h-3 w-3 rounded-full bg-[#1D3539]/30" />
            </div>

            <div className="space-y-4 font-mono text-[16px] leading-none text-[#1D3539]">
              {terminalLines.map((line, index) => (
                <div key={line} className="flex items-center">
                  <span
                    className={`terminal-line inline-block overflow-hidden whitespace-nowrap ${
                      index >= 2 && index <= 5
                        ? "text-[#6F8A74]"
                        : "text-[#1D3539]"
                    }`}
                  >
                    {line}
                  </span>

                  {index === 0 && (
                    <span className="cursor-block ml-1 inline-block h-5 w-2 bg-[#1D3539]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-[520px] text-[18px] leading-[1.7] text-[#6B645D]">
            SnapOps reads the moving parts of your studio and builds the day
            before you start chasing it.
          </p>
        </div>

        <div className="relative z-10">
          <div className="workspace-shell rounded-[44px] border border-[#E4D9CB] bg-[#FBFAF7] p-7 shadow-[0_54px_150px_rgba(29,53,57,0.16)]">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-[#B38A5D]">
                  Today&apos;s Workspace
                </p>
                <h2 className="mt-2 font-serif text-[52px] leading-none tracking-[-0.05em] text-[#1A1814]">
                  Mission Control
                </h2>
              </div>

              <div className="final-status flex items-center gap-3 rounded-full bg-[#1D3539] px-5 py-3 text-[14px] text-white">
                <span className="status-dot h-2.5 w-2.5 rounded-full bg-[#C6A47F]" />
                Built for today
              </div>
            </div>

            <div className="grid gap-4">
              {tasks.map((task, index) => (
                <div
                  key={task.title}
                  className={`task-pill rounded-[28px] border border-[#EFE7DC] p-6 shadow-[0_18px_54px_rgba(29,53,57,0.07)] ${
                    index === 3
                      ? "bg-[#1D3539] text-white"
                      : "bg-white text-[#1A1814]"
                  }`}
                >
                  <div className="grid grid-cols-[110px_1fr] items-center gap-5">
                    <p
                      className={`font-mono text-[13px] uppercase tracking-[0.18em] ${
                        index === 3 ? "text-[#C6A47F]" : "text-[#B38A5D]"
                      }`}
                    >
                      {task.time}
                    </p>

                    <div>
                      <p className="font-serif text-[34px] leading-none tracking-[-0.035em]">
                        {task.title}
                      </p>
                      <p
                        className={`mt-2 text-[16px] ${
                          index === 3 ? "text-white/65" : "text-[#756D64]"
                        }`}
                      >
                        {task.sub}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="final-status mt-6 rounded-[28px] border border-[#E6DCCF] bg-[#FFF8EA] px-6 py-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-[#B38A5D]">
                AI Summary
              </p>
              <p className="mt-2 font-serif text-[30px] leading-tight text-[#1A1814]">
                3 priorities need attention. Your team is on track.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}