"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Scene02FlatlayDeskProps = {
  isActive?: boolean;
};

export default function Scene02FlatlayDesk({
  isActive = false,
}: Scene02FlatlayDeskProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const section = sceneRef.current;

    const ctx = gsap.context(() => {
      const objects = gsap.utils.toArray<HTMLElement>(".desk-object");

      gsap.set(".desk-stage", {
        scale: 0.88,
        opacity: 1,
        transformOrigin: "center center",
      });

      gsap.set(objects, {
        opacity: 0,
        scale: 0.03,
        x: (_i, el) => {
          const rect = el.getBoundingClientRect();
          return window.innerWidth / 2 - (rect.left + rect.width / 2);
        },
        y: (_i, el) => {
          const rect = el.getBoundingClientRect();
          return window.innerHeight / 2 - (rect.top + rect.height / 2);
        },
        transformOrigin: "center center",
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
    const objects = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll(".desk-object")
    );

    const tl = gsap.timeline({
      delay: 0.03,
      onComplete: () => {
        section.classList.add("is-live");
      },
    });

    tl.to(".desk-stage", {
      scale: 1,
      duration: 0.38,
      ease: "power4.out",
    });

    tl.to(
      objects,
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "back.out(2.15)",
        stagger: {
          each: 0.035,
          from: "center",
        },
      },
      0.04
    );

    tl.fromTo(
      ".contract-object",
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.08"
    );

    tl.fromTo(
      ".instagram-object",
      { scale: 1 },
      {
        scale: 1.07,
        duration: 0.18,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.06"
    );
  }, [isActive]);

  return (
    <section
      ref={sceneRef}
      className="relative h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <style>{`
        @keyframes phoneNudge {
          0%, 68%, 100% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
          72% {
            transform: translate3d(4px,-2px,0) rotate(0.8deg);
          }
          76% {
            transform: translate3d(-4px,2px,0) rotate(-0.8deg);
          }
          80% {
            transform: translate3d(2px,-1px,0) rotate(0.4deg);
          }
          84% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
        }

        @keyframes contractLift {
          0%, 100% {
            transform: translate3d(0,0,0) scale(1);
          }
          50% {
            transform: translate3d(0,-14px,0) scale(1.026);
          }
        }

        @keyframes calendarDrift {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
          50% {
            transform: translate3d(0,-11px,0) rotate(0.9deg);
          }
        }

        @keyframes sdFloat {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
          50% {
            transform: translate3d(0,-13px,0) rotate(5deg);
          }
        }

        @keyframes instagramPop {
          0%, 62%, 100% {
            transform: translate3d(0,0,0) scale(1);
          }
          72% {
            transform: translate3d(0,-12px,0) scale(1.05);
          }
          84% {
            transform: translate3d(0,0,0) scale(1);
          }
        }

        @keyframes receiptGlow {
          0%, 100% {
            opacity: 0;
          }
          40%, 58% {
            opacity: 0.28;
          }
        }

        @keyframes albumFloat {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
          50% {
            transform: translate3d(0,-9px,0) rotate(0.45deg);
          }
        }

        @keyframes timelineSlide {
          0%, 100% {
            transform: translate3d(0,0,0);
          }
          50% {
            transform: translate3d(0,12px,0);
          }
        }

        @keyframes foldersBreathe {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
          50% {
            transform: translate3d(0,-10px,0) rotate(0.55deg);
          }
        }

        .is-live .phone-inner {
          animation: phoneNudge 3.8s ease-in-out infinite;
        }

        .is-live .contract-inner {
          animation: contractLift 3.8s ease-in-out infinite;
        }

        .is-live .calendar-inner {
          animation: calendarDrift 4.2s ease-in-out infinite;
        }

        .is-live .sd-inner {
          animation: sdFloat 3.6s ease-in-out infinite;
        }

        .is-live .instagram-inner {
          animation: instagramPop 3.9s ease-in-out infinite;
        }

        .is-live .receipt-light {
          animation: receiptGlow 3.5s ease-in-out infinite;
        }

        .is-live .album-inner {
          animation: albumFloat 4.4s ease-in-out infinite;
        }

        .is-live .timeline-inner {
          animation: timelineSlide 4s ease-in-out infinite;
        }

        .is-live .folders-inner {
          animation: foldersBreathe 4.2s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F5F2_72%)]" />

      <div className="desk-stage relative mx-auto h-full w-full max-w-[1680px]">
        <div className="desk-object absolute left-[120px] top-[100px] z-50 w-[500px] -rotate-[10deg] select-none">
          <img
            src="/assets/flatlay/phone-whatsapp.png"
            alt=""
            className="phone-inner relative w-full"
          />
        </div>

        <div className="desk-object absolute left-[560px] top-[165px] z-60 w-[215px] rotate-[8deg] select-none">
          <img
            src="/assets/flatlay/sd-card.png"
            alt=""
            className="sd-inner w-full"
          />
        </div>

        <div className="desk-object instagram-object absolute left-[360px] top-[330px] z-70 w-[390px] rotate-[2deg] select-none">
          <img
            src="/assets/flatlay/instagram-card.png"
            alt=""
            className="instagram-inner w-full"
          />
        </div>

        <div className="desk-object absolute left-[850px] top-[115px] z-30 w-[445px] rotate-[3deg] select-none">
          <img
            src="/assets/flatlay/calendar.png"
            alt=""
            className="calendar-inner w-full"
          />
        </div>

        <div className="desk-object absolute right-[105px] top-[105px] z-40 w-[280px] rotate-[5deg] select-none">
          <div className="receipt-light absolute inset-0 rounded-3xl bg-[#C6A47F]/30 blur-2xl" />
          <img
            src="/assets/flatlay/receipt.png"
            alt=""
            className="relative w-full"
          />
        </div>

        <div className="desk-object absolute left-[690px] bottom-[-20px] z-50 w-[305px] rotate-[1deg] select-none">
          <img
            src="/assets/flatlay/timeline.png"
            alt=""
            className="timeline-inner w-full"
          />
        </div>

        <div className="desk-object contract-object absolute left-[745px] top-[310px] z-80 w-[350px] -rotate-[2deg] select-none">
          <img
            src="/assets/flatlay/contract.png"
            alt=""
            className="contract-inner w-full"
          />
        </div>

        <div className="desk-object absolute left-[85px] bottom-[55px] z-50 w-[610px] -rotate-[5deg] select-none">
          <img
            src="/assets/flatlay/album-contact-sheet.png"
            alt=""
            className="album-inner w-full"
          />
        </div>

        <div className="desk-object absolute right-[65px] bottom-[45px] z-40 w-[565px] -rotate-[3deg] select-none">
          <img
            src="/assets/flatlay/folders.png"
            alt=""
            className="folders-inner w-full"
          />
        </div>
      </div>
    </section>
  );
}