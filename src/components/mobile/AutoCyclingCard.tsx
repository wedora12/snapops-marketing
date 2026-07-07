"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

// Shared by the mobile fallbacks for Scenes 2-5 and (via a thin wrapper) by
// Scene 1's MobileStoryCards — one implementation of the auto-advance +
// swipe + directional-slide transition so it can't drift between scenes.
// Outgoing and incoming card content are both mounted together and animate
// concurrently, rather than a single element unmounting/remounting through
// an opacity: 0 boundary, which produced a visible blank frame at every
// cycle — whether the transition was triggered by the timer or a swipe.
export type CyclingCardItem = {
  label: string;
  title: string;
  meta: string;
} & ({ icon: LucideIcon; image?: never } | { image: string; icon?: never });

type Props = {
  items: CyclingCardItem[];
  intervalMs?: number;
  titleClassName?: string;
  metaClassName?: string;
  // TEMPORARY: set on exactly one card instance to surface the on-screen
  // touch debug readout (gated behind ?debug=true — see debugEnabledRef
  // below). Remove alongside the debug overlay once swipe is confirmed
  // working on the physical device that CDP verification couldn't catch.
  debugLabel?: string;
};

type TouchDebugState = {
  touchStart: string;
  dx: number;
  dy: number;
  axis: "horizontal" | "vertical" | "undecided";
  goToRelative: string;
};

// Must match the card-slide-*/card-slide-in-* durations in globals.css
// exactly. Timer-driven auto-advance always uses this — there's no gesture
// to derive a direction from, so it defaults to the same right-to-left
// "forward" direction the dot indicators progress in.
const AUTO_ADVANCE_TRANSITION_MS = 420;

// Swipes get a much snappier slide than auto-advance — it's a direct
// response to the user's own gesture, so it should feel closer to instant.
const SWIPE_TRANSITION_MS = 110;

// Minimum horizontal drag distance (px) before a touch is treated as a
// swipe rather than a tap or an intended vertical scroll.
const SWIPE_THRESHOLD_PX = 40;

// Named for the direction the *current* card exits in. "slide-left" is
// also the auto-advance default (forward progression, matching the dot
// indicators moving forward) and matches swiping left to go to the next
// card; "slide-right" is swiping right to go back.
type TransitionKind = "slide-left" | "slide-right";

export default function AutoCyclingCard({
  items,
  intervalMs = 2000,
  titleClassName = "text-xl tracking-[-0.03em]",
  metaClassName = "text-sm",
  debugLabel,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<CyclingCardItem | null>(null);
  const indexRef = useRef(0);
  const outgoingTimeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  // null = undecided, set on the first move past a small deadzone so a
  // vertical drag never gets hijacked into a card swipe mid-scroll.
  const touchAxisRef = useRef<"horizontal" | "vertical" | null>(null);
  // Both read during render (to pick the animation class/duration) and
  // written synchronously — before the state updates that trigger that
  // render — by advanceTo. See advanceTo and goToRelative.
  const transitionKindRef = useRef<TransitionKind>("slide-left");
  const transitionDurationRef = useRef(AUTO_ADVANCE_TRANSITION_MS);

  // TEMPORARY: on-device touch debug readout, same ?debug=true gate as
  // ErudaLoader. Only active when a debugLabel is passed in, so multiple
  // AutoCyclingCard instances on the same page don't all render an overlay.
  const debugEnabledRef = useRef(false);
  const [debugInfo, setDebugInfo] = useState<TouchDebugState | null>(null);

  useEffect(() => {
    if (!debugLabel) return;
    if (typeof window === "undefined") return;
    if (!window.location.search.includes("debug=true")) return;
    debugEnabledRef.current = true;
    setDebugInfo({
      touchStart: "no",
      dx: 0,
      dy: 0,
      axis: "undecided",
      goToRelative: "not called yet",
    });
  }, [debugLabel]);

  // Shared by both the timer tick and swipes: swaps the currently-showing
  // item into `outgoing` (so it crossfades out) and advances the active
  // index, regardless of what triggered the change.
  const advanceTo = (next: number, kind: TransitionKind, durationMs: number) => {
    const current = indexRef.current;
    if (next === current) return;

    transitionKindRef.current = kind;
    transitionDurationRef.current = durationMs;
    setOutgoing(items[current]);
    indexRef.current = next;
    setActiveIndex(next);

    if (outgoingTimeoutRef.current) window.clearTimeout(outgoingTimeoutRef.current);
    outgoingTimeoutRef.current = window.setTimeout(() => {
      setOutgoing(null);
    }, durationMs);
  };

  const startTimer = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      advanceTo((indexRef.current + 1) % items.length, "slide-left", AUTO_ADVANCE_TRANSITION_MS);
    }, intervalMs);
  };

  // A manual swipe jumps to the swiped-to card immediately and restarts the
  // auto-advance cooldown from that moment, rather than waiting out
  // whatever was left of the timer that was already running.
  const goToRelative = (delta: 1 | -1) => {
    const next = (indexRef.current + delta + items.length) % items.length;
    advanceTo(next, delta === 1 ? "slide-left" : "slide-right", SWIPE_TRANSITION_MS);
    startTimer();
    if (debugEnabledRef.current) {
      setDebugInfo((prev) =>
        prev
          ? { ...prev, goToRelative: `called (delta=${delta}) @ ${new Date().toLocaleTimeString()}` }
          : prev,
      );
    }
  };

  useEffect(() => {
    startTimer();

    // Native, non-passive listeners: React's onTouchStart/onTouchMove are
    // passive by default (same root cause as the onWheel bug fixed in
    // page.tsx's handleWheel) — a preventDefault() call inside a JSX
    // onTouchMove prop is silently ignored. Without a real, honored
    // preventDefault to claim the gesture once it's confirmed horizontal,
    // some mobile browsers' native scroll/gesture recognizer can still take
    // over (or cancel the touch sequence) before touchend ever fires,
    // which is exactly the failure mode that only shows up on a real
    // device and not under CDP-driven touch dispatch on desktop Chrome.
    const node = cardRef.current;
    if (!node) return;

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      touchAxisRef.current = null;

      if (debugEnabledRef.current) {
        setDebugInfo((prev) =>
          prev
            ? {
                ...prev,
                touchStart: `yes @ ${new Date().toLocaleTimeString()}`,
                dx: 0,
                dy: 0,
                axis: "undecided",
              }
            : prev,
        );
      }
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;

      if (!touchAxisRef.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        touchAxisRef.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
      }

      // Claim the gesture for good once we know it's horizontal, so the
      // browser doesn't try to interpret it as a scroll/rubber-band. Leave
      // vertical/undecided drags completely alone so page scroll behaves
      // natively.
      if (touchAxisRef.current === "horizontal") {
        e.preventDefault();
      }

      if (debugEnabledRef.current) {
        setDebugInfo((prev) =>
          prev ? { ...prev, dx, dy, axis: touchAxisRef.current ?? "undecided" } : prev,
        );
      }
    };

    const handleTouchEnd = (e: globalThis.TouchEvent) => {
      const start = touchStartRef.current;
      const axis = touchAxisRef.current;
      touchStartRef.current = null;
      touchAxisRef.current = null;
      if (!start || axis !== "horizontal") return;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - start.x;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;

      if (dx < 0) goToRelative(1); // swiped left -> next card
      else goToRelative(-1); // swiped right -> previous card
    };

    node.addEventListener("touchstart", handleTouchStart, { passive: false });
    node.addEventListener("touchmove", handleTouchMove, { passive: false });
    node.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (outgoingTimeoutRef.current) window.clearTimeout(outgoingTimeoutRef.current);
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, intervalMs]);

  const active = items[activeIndex];

  const renderContent = (item: CyclingCardItem) => {
    const Icon = item.icon;
    return (
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-[#F4EEE7]">
          {Icon ? (
            <Icon className="h-9 w-9 text-[#1D3539]" />
          ) : (
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B48B5A]">
            {item.label}
          </p>
          <h3 className={`mt-2 font-bold text-[#1D3539] ${titleClassName}`}>
            {item.title}
          </h3>
          <p className={`mt-1 text-[#7B7B7B] ${metaClassName}`}>{item.meta}</p>
        </div>
      </div>
    );
  };

  const outgoingClass =
    transitionKindRef.current === "slide-left"
      ? "animate-card-slide-out-left"
      : "animate-card-slide-out-right";

  const currentClass =
    transitionKindRef.current === "slide-left"
      ? "animate-card-slide-in-from-right"
      : "animate-card-slide-in-from-left";

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div
        ref={cardRef}
        className="relative touch-pan-y overflow-hidden rounded-[32px] border border-[#ECE7E0] bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)]"
      >
        {/* All items stay mounted, stacked in the same grid cell. The ones
            that aren't currently showing are `invisible` (not `hidden`),
            so they still occupy layout — CSS Grid sizes the row to the
            tallest item present, permanently pinning the container to the
            tallest card's height instead of reflowing (and visibly jumping)
            every time a shorter/taller card swaps in. */}
        <div
          className="grid"
          style={{ "--slide-duration": `${transitionDurationRef.current}ms` } as CSSProperties}
        >
          {items.map((item, index) => {
            if (item === active) {
              return (
                <div
                  key={`current-${index}`}
                  className={`col-start-1 row-start-1 ${currentClass}`}
                >
                  {renderContent(item)}
                </div>
              );
            }
            if (item === outgoing) {
              return (
                <div
                  key={`outgoing-${index}`}
                  className={`col-start-1 row-start-1 ${outgoingClass}`}
                >
                  {renderContent(item)}
                </div>
              );
            }
            return (
              <div
                key={`rest-${index}`}
                aria-hidden
                className="invisible pointer-events-none col-start-1 row-start-1"
              >
                {renderContent(item)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, index) => (
          <span
            key={item.title}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-6 bg-[#B48B5A]" : "bg-[#E3DCD3]"
            }`}
          />
        ))}
      </div>

      {debugInfo && (
        <div
          style={{
            position: "fixed",
            top: 8,
            left: 8,
            zIndex: 999999,
            background: "black",
            color: "#0f0",
            fontSize: 11,
            fontFamily: "monospace",
            padding: "6px 10px",
            borderRadius: 4,
            opacity: 0.9,
            lineHeight: 1.5,
            whiteSpace: "pre",
          }}
        >
          {`[touch debug: ${debugLabel}]\ntouchstart: ${debugInfo.touchStart}\ndx: ${debugInfo.dx}  dy: ${debugInfo.dy}\naxis: ${debugInfo.axis}\ngoToRelative: ${debugInfo.goToRelative}`}
        </div>
      )}
    </div>
  );
}
