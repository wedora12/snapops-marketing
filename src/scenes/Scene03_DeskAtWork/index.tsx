"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  deskAtWorkCopy,
  scatterObjects,
  noiseChips,
  resolvedObjects,
} from "./constants";

type Scene03DeskAtWorkProps = {
  isActive?: boolean;
};

// Resolved-phase grid: uniform square cells, no rotation, no overlap —
// the deliberate visual opposite of the chaos phase. Sized up from prior
// attempts to fill more of the right-hand canvas (844x844 vs ~550-820
// before). Grid left-edge (520) stays clear of the copy block; grid
// vertical midpoint (RESOLVED_GRID_MIDPOINT_Y) is where the copy block is
// vertically centered against, so the two columns balance as one composition.
const RESOLVED_CELL_SIZE = 410;
const RESOLVED_GRID_GAP = 24;
const RESOLVED_GRID_LEFT = 520;
const RESOLVED_GRID_TOP = 30;
const RESOLVED_GRID_SIZE = RESOLVED_CELL_SIZE * 2 + RESOLVED_GRID_GAP;
const RESOLVED_GRID_MIDPOINT_Y = RESOLVED_GRID_TOP + RESOLVED_GRID_SIZE / 2;

export default function Scene03DeskAtWork({
  isActive = false,
}: Scene03DeskAtWorkProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const section = sceneRef.current;

    const ctx = gsap.context(() => {
      gsap.set(".copy-block > *", { opacity: 0, y: 14 });

      gsap.set(".scatter-object", { opacity: 0, scale: 0.5, y: -140 });
      gsap.set(".impact-ring", { opacity: 0, scale: 0.3 });
      gsap.set(".resolved-object", { opacity: 0, y: 16 });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (!isActive) return;
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;

    const section = sceneRef.current;
    const stageEl = section.querySelector(".desk-stage") as HTMLElement;

    const tl = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        section.classList.add("is-live");
      },
    });

    tl.to(
      ".copy-block > *",
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 },
      0
    );

    // Beat 1 — scatter arrival: dense, overlapping, no bounce. Stretched to
    // ~1.0s total arrival span (0.9-1.1s target) so the density from the
    // noise tier is actually perceivable, not just present for a few frames.
    const totalScatterCount = scatterObjects.length + noiseChips.length;
    const scatterStagger = 0.05;
    const scatterDuration = 0.4;
    const beat1 = 0.1;
    tl.to(
      ".scatter-object",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: scatterDuration,
        ease: "power3.out",
        stagger: scatterStagger,
      },
      beat1
    );

    // Beat 2 — hold: ~0.7s (0.6-0.8s target) — long enough to register
    // "this is genuinely a lot" before the snap, roughly double the
    // previous build's hold.
    const holdDuration = 0.7;
    const holdEnd =
      beat1 +
      scatterDuration +
      (totalScatterCount - 1) * scatterStagger +
      holdDuration;

    // Beat 3 — the snap: all scatter objects converge on the stage center
    // together (same start, duration, ease), then the impact ring flashes.
    tl.to(
      ".scatter-object",
      {
        opacity: 0,
        scale: 0.15,
        x: (_i, el) => {
          const stageRect = stageEl.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          return (
            stageRect.left +
            stageRect.width / 2 -
            (elRect.left + elRect.width / 2)
          );
        },
        y: (_i, el) => {
          const stageRect = stageEl.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          return (
            stageRect.top +
            stageRect.height / 2 -
            (elRect.top + elRect.height / 2)
          );
        },
        duration: 0.3,
        ease: "power3.in",
      },
      holdEnd
    );

    tl.fromTo(
      ".impact-ring",
      { opacity: 1, scale: 0.3 },
      { opacity: 0, scale: 1.4, duration: 0.2, ease: "power1.out" },
      holdEnd + 0.28
    );

    // Beat 4 — resolve: exactly 4 objects, arriving together, calm and aligned.
    const resolveStart = holdEnd + 0.32;
    tl.to(
      ".resolved-object",
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      resolveStart
    );
  }, [isActive]);

  return (
    <section
      ref={sceneRef}
      className="relative h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F5F2_72%)]" />

      {/* Vertically centered against the resolved grid's midpoint, not
          top-aligned, so the two columns read as one balanced composition
          like Scene 2's. */}
      <div
        className="copy-block absolute left-6 z-30 max-w-[460px] -translate-y-1/2 md:left-16"
        style={{ top: RESOLVED_GRID_MIDPOINT_Y }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#B48B5A] md:text-sm">
          {deskAtWorkCopy.eyebrow}
        </p>

        <h2 className="mt-6 text-[52px] font-bold leading-[1.0] tracking-[-0.045em] text-[#1D3539] md:text-[72px]">
          {deskAtWorkCopy.headline}
        </h2>

        <p className="mt-6 max-w-[420px] text-[16px] leading-[1.7] text-[#667085] md:text-[18px]">
          {deskAtWorkCopy.subhead}
        </p>
      </div>

      <div className="desk-stage relative mx-auto h-full w-full max-w-[1400px]">
        {/* Beats 1-3: dense scatter, then converge + vanish */}
        {scatterObjects.map((obj) => (
          <div
            key={obj.id}
            className="scatter-object absolute select-none"
            style={{
              left: obj.left,
              top: obj.top,
              width: obj.width,
              zIndex: obj.z,
              transform: `rotate(${obj.rotate}deg)`,
            }}
          >
            <img src={obj.src} alt="" className="w-full" />
          </div>
        ))}

        {/* Noise tier: texture-only chips, scatter phase only, never resolve */}
        {noiseChips.map((chip) => {
          const Icon = chip.icon;
          return (
            <div
              key={chip.id}
              className="scatter-object absolute flex select-none items-center gap-3 whitespace-nowrap rounded-2xl border border-[#ECE7E0] bg-white px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.07)]"
              style={{
                left: chip.left,
                top: chip.top,
                zIndex: chip.z,
                transform: `rotate(${chip.rotate}deg)`,
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4EEE7]">
                <Icon className="h-[18px] w-[18px] text-[#1D3539]" />
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#B48B5A]">
                  {chip.eyebrow}
                </p>
                <p className="mt-0.5 text-[13px] font-medium text-[#1D3539]">
                  {chip.text}
                </p>
              </div>
            </div>
          );
        })}

        {/* Impact cue at the moment of the snap */}
        <div className="impact-ring pointer-events-none absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#B48B5A]" />

        {/* Beat 4: exactly 4 resolved objects, uniform grid, no rotation, no
            overlap — the deliberate visual opposite of the chaos phase, not
            a variation on it. All 4 cells share the same width AND height
            (not just a shared height with variable width, which is what
            made earlier grid attempts feel uneven), so they tile cleanly
            regardless of each asset's own aspect ratio. */}
        <div
          className="absolute grid grid-cols-2"
          style={{
            left: RESOLVED_GRID_LEFT,
            top: RESOLVED_GRID_TOP,
            gap: RESOLVED_GRID_GAP,
          }}
        >
          {resolvedObjects.map(renderResolvedCard)}
        </div>
      </div>
    </section>
  );
}

function renderResolvedCard(obj: (typeof resolvedObjects)[number]) {
  // Fit the image into the square cell via object-contain math, then anchor
  // it to the cell's bottom-left corner. Whichever dimension is the
  // constraining one (width for landscape lead/album, height for portrait
  // contract/receipt), the rendered image's bottom-left corner always ends
  // up flush with the cell's — so every badge below can use the exact same
  // "bottom-3 left-3 of this wrapper" rule regardless of the asset's own
  // aspect ratio, instead of needing a per-asset override.
  const aspect = obj.nativeWidth / obj.nativeHeight;
  const renderWidth =
    aspect >= 1 ? RESOLVED_CELL_SIZE : RESOLVED_CELL_SIZE * aspect;
  const renderHeight =
    aspect >= 1 ? RESOLVED_CELL_SIZE / aspect : RESOLVED_CELL_SIZE;

  return (
    <div
      key={obj.id}
      className="resolved-object relative select-none"
      style={{ width: RESOLVED_CELL_SIZE, height: RESOLVED_CELL_SIZE }}
    >
      <div
        className="absolute bottom-0 left-0"
        style={{ width: renderWidth, height: renderHeight }}
      >
        <img src={obj.src} alt="" className="h-full w-full" />

        {obj.variant === "pill-below" && (
          <div className="absolute bottom-3 left-3 whitespace-nowrap rounded-full border border-[#C6A47F]/50 bg-[#FBFAF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D3539] shadow-[0_10px_30px_rgba(29,53,57,0.14)]">
            {obj.status}
          </div>
        )}

        {obj.variant === "receipt-paid" && (
          <div className="absolute left-[23%] top-[49.5%] flex h-[6.5%] w-[54%] items-center justify-center rounded-full bg-[#1D3539] text-[11px] font-bold uppercase tracking-[0.16em] text-[#EFE0C4]">
            {obj.status}
          </div>
        )}

        {obj.variant === "album-delivered" && (
          <div className="absolute -bottom-4 -right-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-[#C6A47F]/50 bg-[#FBFAF7] px-4 py-2 text-[12px] font-semibold text-[#1D3539] shadow-[0_10px_30px_rgba(29,53,57,0.14)]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D3539] text-[11px] text-[#EFE0C4]">
              ✓
            </span>
            {obj.status}
          </div>
        )}
      </div>
    </div>
  );
}
