"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  LayoutGrid,
  Users,
  Briefcase,
  Clapperboard,
  Wallet,
  Search,
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import {
  eyebrow,
  headlines,
  whatsappMessage,
  extractedFields,
  leadStages,
  leadFillerCards,
  travelingLead,
  projectStages,
  projectPreview,
  aiExchanges,
  ctaCopy,
  scrollCueLabel,
  timing,
  type MomentId,
} from "./constants";

type Scene05ProductPreviewProps = {
  isActive?: boolean;
  // Fired once the closing scroll-cue beat finishes appearing — hands off
  // to page.tsx's pin-release mechanism, same pattern as Scene 3's
  // `onConverge`.
  onRelease?: () => void;
};

const NAV_ICONS = [
  { id: "dashboard", Icon: LayoutGrid },
  { id: "pipeline", Icon: Users },
  { id: "projects", Icon: Briefcase },
  { id: "delivery", Icon: Clapperboard },
  { id: "accounts", Icon: Wallet },
] as const;

export default function Scene05ProductPreview({
  isActive = false,
  onRelease,
}: Scene05ProductPreviewProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const section = sceneRef.current;

    const ctx = gsap.context(() => {
      gsap.set(".headline-block", { opacity: 0 });
      gsap.set(".moment-block", { opacity: 0, scale: 0.97, filter: "blur(6px)" });
      gsap.set(".cta-buttons", { opacity: 0, y: 8 });
      gsap.set(".ambient-glow", { opacity: 0 });
      gsap.set(".sidebar-panel", { opacity: 0, x: -16 });
      gsap.set(".scroll-cue", { opacity: 0, y: 6 });

      // Moment 1 — leads.
      gsap.set(".whatsapp-bubble", { opacity: 1 });
      gsap.set(".whatsapp-message", { opacity: 0, y: 8 });
      gsap.set(".field-tag", { opacity: 0, y: 6, scale: 0.94 });
      gsap.set(".lead-board", { opacity: 0 });
      gsap.set(".lead-row, .traveling-lead-card", { opacity: 0 });

      // Moment 2 — projects.
      gsap.set(".step-dot", { scale: 1 });
      gsap.set(".step-line-fill", { scaleX: 0, transformOrigin: "left center" });

      // Moment 3 — AI. Starts slightly smaller and grows past 100% into
      // place (back.out overshoot in the play effect) — it should feel
      // like it's arriving as the star of the moment, not just fading in.
      gsap.set(".ai-search-bar", { opacity: 0, y: 8, scale: 0.96 });
      gsap.set(".ai-answer-card, .ai-confirmation", { opacity: 0, y: 8 });
      gsap.set(".ai-cursor", { opacity: 0 });

      gsap.set(".workspace-frame", {
        transformPerspective: 1200,
        rotationX: 2,
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
    const tl = gsap.timeline();

    const setActiveIcon = (id: string) => {
      section.querySelectorAll(".sidebar-icon").forEach((el) => {
        el.classList.toggle("sidebar-icon-active", el.getAttribute("data-icon") === id);
      });
    };

    // Each moment gets its own quiet ambient-glow tint — gold for leads/
    // projects, a soft green for the AI moment (echoing "the AI understood
    // this") — so consecutive moments don't all read as the same ivory
    // card, without introducing any new colors outside the brand palette.
    const setMomentAccent = (id: MomentId) => {
      const glow = section.querySelector(".ambient-glow");
      glow?.classList.remove("ambient-glow-leads", "ambient-glow-projects", "ambient-glow-ai");
      glow?.classList.add(`ambient-glow-${id}`);
    };

    const morphTo = (position: string, from: MomentId | null, to: MomentId) => {
      if (from) {
        tl.to(
          `.moment-${from}`,
          { opacity: 0, scale: 0.97, filter: "blur(6px)", duration: timing.morphOutDuration, ease: "power2.in" },
          position
        );
        tl.to(
          `.headline-${from}`,
          { opacity: 0, y: -8, duration: timing.morphOutDuration, ease: "power2.in" },
          position
        );
      }
      const inPos = from ? `${position}+=${timing.morphOutDuration - timing.morphOverlap}` : position;
      tl.fromTo(
        `.moment-${to}`,
        { opacity: 0, scale: 0.97, filter: "blur(6px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: timing.morphInDuration, ease: "power2.out", immediateRender: false },
        inPos
      );
      tl.fromTo(
        `.headline-${to}`,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: timing.morphInDuration, ease: "power2.out", immediateRender: false },
        inPos
      );
    };

    // --- Opening ------------------------------------------------------
    tl.addLabel("start");
    tl.to(".ambient-glow", { opacity: 1, duration: 0.6, ease: "power1.out" }, "start");
    tl.to(".sidebar-panel", { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "start");

    // --- Moment 1: Leads (~5s) ------------------------------------------
    // WhatsApp inquiry arrives -> AI extracts the fields that matter -> a
    // lead card assembles itself -> it moves through the pipeline on its
    // own. The visitor should read this as "leads organize themselves,"
    // not watch an explanation of it.
    tl.addLabel("leads", "start+=0.2");
    morphTo("leads", null, "leads");
    tl.call(() => {
      setActiveIcon("pipeline");
      setMomentAccent("leads");
    }, [], "leads");

    tl.to(
      ".whatsapp-message",
      { opacity: 1, y: 0, duration: timing.bubbleInDuration, ease: "power2.out" },
      "leads"
    );
    tl.to(
      ".field-tag",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.28,
        ease: "back.out(1.5)",
        stagger: timing.fieldStagger,
      },
      `leads+=${timing.fieldStart}`
    );
    tl.to(
      ".whatsapp-bubble",
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      `leads+=${timing.bubbleOutDelay}`
    );
    tl.to(
      ".lead-board",
      { opacity: 1, duration: 0.35, ease: "power2.out" },
      `leads+=${timing.bubbleOutDelay}`
    );
    tl.to(
      ".lead-row",
      { opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.06 },
      `leads+=${timing.bubbleOutDelay + 0.1}`
    );
    tl.fromTo(
      ".traveling-lead-card",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.2)", immediateRender: false },
      `leads+=${timing.cardDropDelay}`
    );

    const hopLead = (position: string, targetStage: string) => {
      tl.call(
        () => {
          const card = section.querySelector(".traveling-lead-card") as HTMLElement | null;
          const zone = section.querySelector(`[data-dropzone="${targetStage}"]`) as HTMLElement | null;
          if (!card || !zone) return;
          const cardRect = card.getBoundingClientRect();
          const zoneRect = zone.getBoundingClientRect();
          const dx = zoneRect.left - cardRect.left;
          const dy = zoneRect.top + zoneRect.height + 8 - cardRect.top;
          gsap.to(card, {
            x: `+=${dx}`,
            y: `+=${dy}`,
            duration: timing.leadHopDuration,
            ease: "power2.inOut",
          });
        },
        [],
        position
      );
    };
    hopLead(`leads+=${timing.leadHop1Delay}`, "consultation");
    hopLead(`leads+=${timing.leadHop2Delay}`, "booked");
    // A quick landing pulse at each hop — Moment 1 is the "fast" beat, so
    // every arrival gets a small, energetic confirmation rather than just
    // sliding to a stop.
    tl.fromTo(
      ".traveling-lead-card",
      { scale: 1 },
      { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: "power1.inOut" },
      `leads+=${timing.leadHop1Delay + timing.leadHopDuration}`
    );
    tl.fromTo(
      ".traveling-lead-card",
      { scale: 1 },
      { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.inOut" },
      `leads+=${timing.leadHop2Delay + timing.leadHopDuration}`
    );
    // Landing in Booked is the "won" moment — a small green accent marks
    // it distinctly from the neutral inquiry/consultation stops.
    tl.call(
      () => {
        section.querySelector(".traveling-lead-card")?.classList.add("lead-card-won");
      },
      [],
      `leads+=${timing.leadHop2Delay + timing.leadHopDuration}`
    );

    // --- Moment 2: Projects (~5s) -----------------------------------------
    // One wedding, five stages, no explanation — just the stepper advancing
    // on its own.
    tl.addLabel("projects", `leads+=${timing.leadsHold}`);
    morphTo("projects", "leads", "projects");
    tl.call(() => {
      setActiveIcon("projects");
      setMomentAccent("projects");
    }, [], "projects");

    projectStages.forEach((stage, i) => {
      const isLast = i === projectStages.length - 1;
      tl.call(
        () => {
          const dot = section.querySelector(
            `.step[data-stage="${stage.id}"] .step-dot`
          ) as HTMLElement | null;
          const line =
            i > 0
              ? (section.querySelector(`.step-line-fill[data-line="${i - 1}"]`) as HTMLElement | null)
              : null;
          if (dot) {
            // Every step fills pine as it's reached; the final step
            // ("Delivered") fills green instead — a distinct "done, for
            // real" cue rather than just one more step in progress.
            dot.classList.add(isLast ? "step-dot-delivered" : "step-dot-active");
            // Calm beat — a softer, slower settle than Moment 1's pulses,
            // no snap.
            gsap.fromTo(
              dot,
              { scale: 1 },
              { scale: 1.08, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }
            );
          }
          if (line) gsap.to(line, { scaleX: 1, duration: 0.55, ease: "power2.out" });
        },
        [],
        `projects+=${timing.stageStartDelay + i * timing.stageInterval}`
      );
    });

    // --- Moment 3: AI (~6.5s, the hero moment) ----------------------------
    tl.addLabel("ai", `projects+=${timing.projectsHold}`);
    morphTo("ai", "projects", "ai");
    tl.call(() => {
      setActiveIcon("dashboard");
      setMomentAccent("ai");
    }, [], "ai");
    tl.to(".workspace-frame", { scale: 0.97, duration: 0.4, ease: "power2.out" }, "ai");
    // Everything but the search bar quiets down — the bar is the brightest
    // thing in the frame for this moment.
    tl.to(".sidebar-panel", { opacity: 0.5, duration: 0.4, ease: "power2.out" }, "ai");
    tl.to(
      ".ai-search-bar",
      { opacity: 1, y: 0, scale: 1.04, duration: 0.45, ease: "back.out(1.15)" },
      `ai+=${timing.aiBarDelay}`
    );

    let aiCursor = timing.aiBarDelay + timing.aiFirstQueryDelay;
    aiExchanges.forEach((exchange) => {
      tl.call(
        () => {
          const q = section.querySelector(".ai-query-text") as HTMLElement | null;
          if (q) q.textContent = "";
          section.querySelector(".ai-cursor")?.classList.add("cursor-blink");
          gsap.set(".ai-cursor", { opacity: 1 });
          gsap.to(".ai-answer-card, .ai-confirmation", { opacity: 0, y: 8, duration: 0.2, ease: "power2.in" });
        },
        [],
        `ai+=${aiCursor}`
      );

      const typeDuration = exchange.query.length * timing.aiTypeCharSpeed;
      tl.call(
        () => {
          const el = section.querySelector(".ai-query-text") as HTMLElement | null;
          if (!el) return;
          const proxy = { chars: 0 };
          gsap.to(proxy, {
            chars: exchange.query.length,
            duration: typeDuration,
            ease: "none",
            onUpdate: () => {
              el.textContent = exchange.query.slice(0, Math.round(proxy.chars));
            },
          });
        },
        [],
        `ai+=${aiCursor}`
      );
      aiCursor += typeDuration;

      tl.call(
        () => {
          section.querySelector(".ai-cursor")?.classList.remove("cursor-blink");
          gsap.to(".ai-cursor", { opacity: 0, duration: 0.2 });
        },
        [],
        `ai+=${aiCursor}`
      );
      aiCursor += timing.aiPostTypeGap;

      if (exchange.kind === "answer") {
        tl.call(
          () => {
            const card = section.querySelector(".ai-answer-card") as HTMLElement | null;
            const titleEl = section.querySelector(".ai-answer-title");
            const detailEl = section.querySelector(".ai-answer-detail");
            const pill = section.querySelector(".ai-action-pill") as HTMLElement | null;
            if (titleEl) titleEl.textContent = exchange.answer!.title;
            if (detailEl) detailEl.textContent = exchange.answer!.detail;
            if (pill) pill.style.display = exchange.answer!.actionLabel ? "inline-flex" : "none";
            // Left-edge accent distinguishes "pending payment" (gold) from
            // "overdue albums" (warning) so the two answer cards don't
            // read as identical neutral boxes.
            card?.classList.remove("ai-answer-accent-gold", "ai-answer-accent-warning");
            if (exchange.answer!.accent) {
              card?.classList.add(`ai-answer-accent-${exchange.answer!.accent}`);
            }
          },
          [],
          `ai+=${aiCursor}`
        );
        tl.to(".ai-answer-card", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, `ai+=${aiCursor}`);
        aiCursor += 0.4 + timing.aiAnswerHoldDuration;
      } else {
        tl.call(
          () => {
            const el = section.querySelector(".ai-confirmation-text");
            if (el) el.textContent = exchange.confirmation!;
          },
          [],
          `ai+=${aiCursor}`
        );
        tl.to(".ai-confirmation", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, `ai+=${aiCursor}`);
        aiCursor += 0.4 + timing.aiConfirmationHoldDuration;
      }
      aiCursor += timing.aiExchangeGap;
    });

    // --- CTA: workspace settles behind the closing line -------------------
    tl.addLabel("cta", `ai+=${timing.aiHold}`);
    tl.to(".headline-ai", { opacity: 0, y: -8, duration: timing.morphOutDuration, ease: "power2.in" }, "cta");
    tl.fromTo(
      ".headline-cta",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: timing.morphInDuration, ease: "power2.out", immediateRender: false },
      "cta+=0.2"
    );
    // The workspace stays fully visible through the close — it settles
    // (a small scale-down, no opacity fade) rather than fading away, so
    // the product is still the thing on screen when the CTA lands.
    tl.to(
      ".workspace-frame",
      { scale: 0.96, duration: 0.6, ease: "power2.out" },
      "cta"
    );
    tl.to(".sidebar-panel", { opacity: 1, duration: 0.4, ease: "power2.out" }, "cta");
    tl.to(".cta-buttons", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "cta+=0.35");

    tl.call(() => {
      section.classList.add("is-live");
    });

    // --- Closing beat: scroll cue, cursor blinks once, then release -------
    tl.addLabel("settled", "cta+=1.0");
    tl.to(
      ".scroll-cue",
      { opacity: 1, y: 0, duration: timing.scrollCueFadeDuration, ease: "power2.out" },
      `settled+=${timing.scrollCueDelay}`
    );
    tl.call(
      () => {
        section.querySelector(".scroll-cue-cursor")?.classList.add("cursor-blink-once");
        section.querySelector(".scroll-cue-chevron")?.classList.add("float-slow");
      },
      [],
      `settled+=${timing.scrollCueDelay + timing.scrollCueFadeDuration}`
    );
    tl.call(
      () => {
        onRelease?.();
      },
      [],
      `settled+=${timing.scrollCueDelay + timing.scrollCueFadeDuration + timing.releaseDelay}`
    );
  }, [isActive, onRelease]);

  return (
    <section
      ref={sceneRef}
      className="relative h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <style>{`
        @keyframes cursorBlinkOnce {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink-once {
          animation: cursorBlinkOnce 0.5s ease-in-out 1;
        }
        .step-dot-active {
          border-color: #1D3539 !important;
          background-color: #1D3539 !important;
          color: #F7F5F2 !important;
        }
        .step-dot-delivered {
          border-color: #3F6C4E !important;
          background-color: #3F6C4E !important;
          color: #F7F5F2 !important;
        }
        .lead-card-won {
          border-left: 3px solid #3F6C4E !important;
          background-color: rgba(63, 108, 78, 0.05) !important;
        }
        .ai-answer-accent-gold {
          border-left: 3px solid #C6A47F !important;
        }
        .ai-answer-accent-warning {
          border-left: 3px solid #B45A3C !important;
        }
        .ambient-glow-leads,
        .ambient-glow-projects {
          background: radial-gradient(ellipse at center, rgba(198,164,127,0.26), rgba(198,164,127,0) 70%);
        }
        .ambient-glow-ai {
          background: radial-gradient(ellipse at center, rgba(63,108,78,0.20), rgba(63,108,78,0) 70%);
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F5F2_72%)]" />

      <div className="absolute inset-0 flex flex-col items-center px-8 pt-[8%] text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#1D3539]/60">
          {eyebrow}
        </p>

        <div className="relative mt-5 w-full max-w-[640px]" style={{ height: 200 }}>
          {(Object.keys(headlines) as MomentId[]).map((id) => (
            <div
              key={id}
              className={`headline-block headline-${id} absolute inset-0 flex flex-col items-center pt-1`}
            >
              <h2 className="font-serif text-[26px] font-medium leading-[1.2] text-[#1D3539] md:text-[34px]">
                {headlines[id][0]}
              </h2>
              <h2 className="font-serif text-[26px] font-medium leading-[1.2] text-[#1D3539] md:text-[34px]">
                {headlines[id][1]}
              </h2>
              {id === "cta" && (
                <div className="cta-buttons mt-6 flex items-center gap-4">
                  {/* No demo-booking or pricing destination exists yet —
                      placeholder hrefs, flagged rather than guessed. */}
                  <a
                    href="#"
                    className="rounded-full bg-[#1D3539] px-6 py-2.5 text-[13px] font-medium text-[#F7F5F2] transition-opacity hover:opacity-90"
                  >
                    {ctaCopy.primaryLabel}
                  </a>
                  <a
                    href="#"
                    className="text-[13px] font-medium text-[#1D3539]/70 underline decoration-[#1D3539]/25 underline-offset-4 transition-colors hover:text-[#1D3539]"
                  >
                    {ctaCopy.secondaryLabel}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative mt-8 w-full" style={{ maxWidth: 1200 }}>
          <div className="ambient-glow ambient-glow-leads pointer-events-none absolute -inset-10 -z-10 rounded-[50%] blur-3xl" />

          <div
            className="workspace-frame relative overflow-hidden rounded-[22px] border border-[#1D3539]/10 bg-white shadow-[0_50px_110px_-24px_rgba(29,53,57,0.24),0_18px_44px_rgba(29,53,57,0.09),inset_0_1px_0_0_rgba(255,255,255,0.9)]"
            style={{ maxWidth: 1200, height: "44vh", minHeight: 330, maxHeight: 460 }}
          >
            <div className="flex h-full">
              <div className="sidebar-panel flex w-[84px] shrink-0 flex-col items-center gap-3 border-r border-[#1D3539]/8 bg-[#F7F5F2] py-6">
                {NAV_ICONS.map(({ id, Icon }) => (
                  <div
                    key={id}
                    data-icon={id}
                    className="sidebar-icon flex h-9 w-9 items-center justify-center rounded-[10px] text-[#1D3539]/30 [&.sidebar-icon-active]:bg-[#C6A47F]/25 [&.sidebar-icon-active]:text-[#1D3539]"
                  >
                    <Icon size={17} strokeWidth={1.75} />
                  </div>
                ))}
              </div>

              <div className="relative flex-1 text-left">
                {/* Moment 1 — Leads */}
                <div className="moment-block moment-leads absolute inset-0">
                  <div className="whatsapp-bubble absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="whatsapp-message flex w-full max-w-[400px] items-start gap-2.5 rounded-[16px] border border-[#3F6C4E]/15 bg-[#3F6C4E]/6 px-4 py-3 shadow-[0_10px_30px_rgba(29,53,57,0.08)]">
                      <MessageCircle size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#3F6C4E]" />
                      <div>
                        <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#1D3539]/40">
                          {whatsappMessage.name}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-[#1D3539]">
                          {whatsappMessage.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {extractedFields.map((f) => (
                        <div
                          key={f.id}
                          className="field-tag rounded-full border border-[#C6A47F]/40 bg-[#C6A47F]/12 px-3 py-1.5 text-[10.5px] text-[#1D3539] shadow-[0_4px_12px_rgba(29,53,57,0.06)]"
                        >
                          <span className="uppercase tracking-[0.08em] text-[9px] text-[#B48B5A]">
                            {f.label}{" "}
                          </span>
                          <span className="font-medium">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lead-board absolute inset-0 flex gap-3 p-6">
                    {leadStages.map((stage) => (
                      <div
                        key={stage.id}
                        className={`flex w-1/3 flex-col rounded-[12px] p-3 ${
                          stage.id === "booked" ? "bg-[#3F6C4E]/6" : "bg-[#FBFAF8]"
                        }`}
                      >
                        <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#1D3539]/45">
                          {stage.label}
                        </span>
                        <div className="mt-2 flex flex-col gap-2" data-dropzone={stage.id}>
                          {leadFillerCards[stage.id].map((name) => (
                            <div
                              key={name}
                              className="lead-row rounded-[8px] border border-[#1D3539]/6 bg-white px-2.5 py-2 text-[11.5px] text-[#1D3539]/55"
                            >
                              {name}
                            </div>
                          ))}
                          {stage.id === "inquiry" && (
                            <div className="traveling-lead-card relative z-20 rounded-[8px] border border-[#1D3539]/8 bg-white px-2.5 py-2 text-[12px] font-medium text-[#1D3539] shadow-[0_4px_14px_rgba(29,53,57,0.1)]">
                              {travelingLead.name}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moment 2 — Projects */}
                <div className="moment-block moment-projects absolute inset-0 flex flex-col items-center justify-center p-6">
                  <p className="text-[14px] font-medium text-[#1D3539]">
                    {projectPreview.clientName}
                  </p>
                  <p className="mt-1 text-[10.5px] text-[#1D3539]/45">
                    {projectPreview.eventLabel}
                  </p>
                  <div className="mt-14 flex w-full max-w-[560px] items-center">
                    {projectStages.map((stage, i) => (
                      <div key={stage.id} className="flex flex-1 items-center last:flex-none">
                        <div
                          className="step flex flex-col items-center gap-2"
                          data-stage={stage.id}
                        >
                          <span className="step-dot flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#1D3539]/15 bg-white text-[10px] font-semibold text-[#1D3539]/30 transition-colors duration-300">
                            {i + 1}
                          </span>
                          <span className="w-[74px] text-center text-[9px] leading-tight text-[#1D3539]/45">
                            {stage.label}
                          </span>
                        </div>
                        {i < projectStages.length - 1 && (
                          <div className="relative mx-1 h-px flex-1 bg-[#1D3539]/10" style={{ marginBottom: 18 }}>
                            <div
                              className="step-line-fill absolute inset-y-0 left-0 h-full w-full bg-[#C6A47F]"
                              data-line={i}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moment 3 — AI */}
                <div className="moment-block moment-ai absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="ai-search-bar flex w-full max-w-[500px] items-center gap-3 rounded-full border border-[#C6A47F]/40 bg-white px-6 py-4 shadow-[0_18px_46px_rgba(198,164,127,0.22)]">
                    <Search size={17} strokeWidth={1.75} className="shrink-0 text-[#C6A47F]" />
                    <span className="ai-query-text text-[15.5px] text-[#1D3539]" />
                    <span className="ai-cursor font-mono text-[15.5px] text-[#1D3539]">▌</span>
                  </div>
                  <div className="relative mt-5 w-full max-w-[500px]" style={{ height: 64 }}>
                    <div className="ai-answer-card absolute inset-0 flex items-center justify-between rounded-[12px] border border-[#1D3539]/8 bg-[#FBFAF8] px-4 py-3">
                      <div>
                        <p className="ai-answer-title text-[13px] font-medium text-[#1D3539]" />
                        <p className="ai-answer-detail text-[11px] text-[#B45A3C]" />
                      </div>
                      <span className="ai-action-pill inline-flex shrink-0 items-center gap-1 rounded-full bg-[#1D3539] px-2.5 py-1 text-[9px] font-medium text-white">
                        <Send size={10} strokeWidth={1.75} />
                        Send reminder
                      </span>
                    </div>
                    <div className="ai-confirmation absolute inset-0 flex items-center gap-2 rounded-[12px] border border-[#3F6C4E]/20 bg-[#3F6C4E]/8 px-4 py-3 text-[12.5px] font-medium text-[#3F6C4E]">
                      <CheckCircle2 size={15} strokeWidth={1.75} className="shrink-0" />
                      <span className="ai-confirmation-text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing beat — a quiet invitation to keep scrolling, not a
            feature. Cursor blinks exactly once (finite keyframe, distinct
            from the infinite blink utilities used elsewhere), the chevron
            settles into a gentle idle float. */}
        <div className="scroll-cue mt-6 flex flex-col items-center gap-1.5 font-mono text-[12px] text-[#1D3539]/50">
          <span>
            <span className="scroll-cue-cursor">▌</span> {scrollCueLabel}
          </span>
          <ChevronDown size={14} strokeWidth={1.75} className="scroll-cue-chevron" />
        </div>
      </div>
    </section>
  );
}
