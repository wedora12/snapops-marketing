"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  scaleAndFreedomCopy,
  gridObjects,
  calendarFillMarks,
  releasePhotoSrc,
} from "./constants";

type Scene04ScaleAndFreedomProps = {
  isActive?: boolean;
};

// Same uniform-grid architecture as Scene03_DeskAtWork's resolved phase —
// square cells, no rotation, no overlap, each image bottom-left-anchored so
// badge placement is identical logic regardless of asset aspect ratio.
// Reused deliberately, per brief: "reuse that established grid logic."
const GRID_CELL_SIZE = 410;
const GRID_GAP = 24;
const GRID_LEFT = 520;
const GRID_TOP = 30;
const GRID_SIZE = GRID_CELL_SIZE * 2 + GRID_GAP;
const GRID_MIDPOINT_Y = GRID_TOP + GRID_SIZE / 2;

// Beat 3 tuning — per brief §3, there's no way to know the right tilt angle
// without seeing it rendered live. These are the values to adjust first if
// the tilt reads too subtle (fails to disguise the cut) or too extreme
// (objects visibly flatten/skew instead of reading as a plane on a camera
// that's moving). Hinge point is the bottom edge (see transformOrigin below)
// so the top of the desk recedes while the near edge holds — combined with
// the scale-up, that reads as the camera pitching down and pushing forward,
// which is why the motion-streak sweeps downward: it matches that direction.
const TILT_ROTATION_X = 68;
const TILT_ROTATION_Y = -5;
const TILT_SCALE = 1.28;
const TILT_PERSPECTIVE = 1500;
const RELEASE_PHOTO_ENTRY_SCALE = 1.08;
const RELEASE_PHOTO_SETTLE_SCALE = 1;
// Nice-to-have from brief §4: slow, one-directional drift once the photo is
// resting — explicitly "not a loop of movement," so this never reverses.
const RELEASE_PHOTO_DRIFT_SCALE = 1.05;

export default function Scene04ScaleAndFreedom({
  isActive = false,
}: Scene04ScaleAndFreedomProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const section = sceneRef.current;

    const ctx = gsap.context(() => {
      gsap.set(".copy-block > *", { opacity: 0, y: 14 });
      gsap.set(".grid-object", { opacity: 0, y: 16 });
      // Static per-object z-depth for beat 3's tilt — baked in at mount via
      // GSAP (rather than a plain inline transform) so GSAP's own transform
      // model already knows about it before anything else touches these
      // elements' transforms.
      gsap.set(".grid-object", {
        z: (_i: number, el: Element) =>
          Number((el as HTMLElement).dataset.depth) || 0,
      });
      gsap.set(".calendar-mark", { opacity: 0, scale: 0 });
      gsap.set(".release-photo-layer", {
        opacity: 0,
        scale: RELEASE_PHOTO_ENTRY_SCALE,
      });
      gsap.set(".motion-streak", { opacity: 0, y: "-130%" });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (!isActive) return;
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;

    const section = sceneRef.current;

    const tl = gsap.timeline({ delay: 0.05 });

    // Continuity beat: the desk arrives already calm, exactly as Scene 3
    // left it (minus the lead card) — this is not a new "reveal," just a
    // quiet establishing moment before beat 1 starts.
    tl.to(
      ".copy-block > *",
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 },
      0
    );

    const gridSettleStart = 0.1;
    const gridSettleDuration = 0.5;
    tl.to(
      ".grid-object",
      { opacity: 1, y: 0, duration: gridSettleDuration, ease: "power2.out" },
      gridSettleStart
    );

    // Beat 1 — the calendar fills: booking rings land fast and light across
    // many dates, a touch of pop/energy (this is growth being celebrated,
    // not the no-bounce chaos register from Scene 3). Contract/receipt/album
    // are never targeted here — they stay completely undisturbed.
    const beat1Start = gridSettleStart + gridSettleDuration + 0.3;
    const markStagger = 0.09;
    const markDuration = 0.25;
    tl.to(
      ".calendar-mark",
      {
        opacity: 1,
        scale: 1,
        duration: markDuration,
        ease: "back.out(1.8)",
        stagger: markStagger,
      },
      beat1Start
    );

    // Beat 2 — resolves calm: a brief settle, not a long hold. Nothing new
    // animates here — the calm reads through the absence of further motion
    // right after beat 1's energy, then the scene rests.
    const beat1End =
      beat1Start + (calendarFillMarks.length - 1) * markStagger + markDuration;
    const beat2End = beat1End + 0.5;
    tl.to({}, { duration: 0.5 }, beat1End);

    // Beat 3 — the transition and release. Copy leaves with the desk (the
    // film is leaving the desk metaphor entirely, per brief §3's protect-the-
    // vantage-point constraint), the plane tilts via a real CSS 3D rotateX +
    // push-in scale, and the cut to the photograph happens entirely under a
    // downward motion-streak — never as a bare crossfade.
    const copyExitStart = beat2End;
    tl.to(
      ".copy-block > *",
      { opacity: 0, y: -10, duration: 0.3, ease: "power1.in", stagger: 0.03 },
      copyExitStart
    );

    const tiltStart = beat2End + 0.15;
    const tiltDuration = 0.62;
    tl.to(
      ".desk-stage",
      {
        rotationX: TILT_ROTATION_X,
        rotationY: TILT_ROTATION_Y,
        scale: TILT_SCALE,
        transformPerspective: TILT_PERSPECTIVE,
        duration: tiltDuration,
        ease: "power2.in",
      },
      tiltStart
    );

    // The streak enters ~80% into the tilt so its peak coverage lands right
    // as the tilt reaches its steepest angle — the desk/photo swap below
    // happens entirely underneath it, timed to land inside the streak's
    // fully-opaque window, not visible as a crossfade.
    const cutStart = tiltStart + tiltDuration * 0.8;
    tl.fromTo(
      ".motion-streak",
      { y: "-130%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.16, ease: "power1.in" },
      cutStart
    );
    tl.to(
      ".motion-streak",
      { y: "130%", opacity: 0, duration: 0.22, ease: "power1.in" },
      cutStart + 0.16
    );

    const swapTime = cutStart + 0.17;
    tl.set(".desk-stage", { opacity: 0 }, swapTime);
    tl.set(".release-photo-layer", { opacity: 1 }, swapTime);

    // Unlock scroll shortly after the cut clears rather than waiting for the
    // full settle + slow drift below — those keep running, but nothing past
    // this point needs to gate navigation.
    tl.call(() => section.classList.add("is-live"), [], cutStart + 0.5);

    tl.to(
      ".release-photo-layer",
      { scale: RELEASE_PHOTO_SETTLE_SCALE, duration: 1.3, ease: "power2.out" },
      swapTime
    );

    tl.to(
      ".release-photo-layer",
      { scale: RELEASE_PHOTO_DRIFT_SCALE, duration: 12, ease: "none" },
      swapTime + 1.3
    );
  }, [isActive]);

  return (
    <section
      ref={sceneRef}
      className="relative h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F5F2_72%)]" />

      <div
        className="copy-block absolute left-6 z-30 max-w-[460px] -translate-y-1/2 md:left-16"
        style={{ top: GRID_MIDPOINT_Y }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#B48B5A] md:text-sm">
          {scaleAndFreedomCopy.eyebrow}
        </p>

        <h2 className="mt-6 text-[52px] font-bold leading-[1.0] tracking-[-0.045em] text-[#1D3539] md:text-[72px]">
          {scaleAndFreedomCopy.headline}
        </h2>

        <p className="mt-6 max-w-[420px] text-[16px] leading-[1.7] text-[#667085] md:text-[18px]">
          {scaleAndFreedomCopy.subhead}
        </p>
      </div>

      <div
        className="desk-stage relative mx-auto h-full w-full max-w-[1400px]"
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
      >
        <div
          className="absolute grid grid-cols-2"
          style={{
            left: GRID_LEFT,
            top: GRID_TOP,
            gap: GRID_GAP,
            transformStyle: "preserve-3d",
          }}
        >
          {gridObjects.map(renderGridCard)}
        </div>
      </div>

      {/* Beat 3 destination: full-bleed, not another card on the desk — the
          film leaves the desk metaphor entirely here, per brief §3. */}
      <div className="release-photo-layer pointer-events-none absolute inset-0 z-40">
        <img
          src={releasePhotoSrc}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "60% 32%" }}
        />
      </div>

      {/* Cut-disguise: a soft, blurred band that sweeps top-to-bottom across
          the whole frame, matching the tilt's downward pitch direction —
          the desk-to-photo swap happens entirely under its opaque peak. */}
      <div className="motion-streak pointer-events-none absolute inset-0 z-50">
        <div
          className="absolute inset-x-0 top-1/2 h-[70%] -translate-y-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(247,245,242,0) 0%, rgba(252,250,247,0.4) 28%, rgba(255,253,250,0.98) 50%, rgba(252,250,247,0.4) 72%, rgba(247,245,242,0) 100%)",
            filter: "blur(24px)",
          }}
        />
      </div>
    </section>
  );
}

function renderGridCard(obj: (typeof gridObjects)[number]) {
  const aspect = obj.nativeWidth / obj.nativeHeight;
  const renderWidth = aspect >= 1 ? GRID_CELL_SIZE : GRID_CELL_SIZE * aspect;
  const renderHeight = aspect >= 1 ? GRID_CELL_SIZE / aspect : GRID_CELL_SIZE;

  return (
    <div
      key={obj.id}
      className="grid-object relative select-none"
      data-depth={obj.depth}
      style={{ width: GRID_CELL_SIZE, height: GRID_CELL_SIZE }}
    >
      <div
        className="absolute bottom-0 left-0"
        style={{ width: renderWidth, height: renderHeight }}
      >
        <img src={obj.src} alt="" className="h-full w-full" />

        {obj.variant === "calendar-marks" &&
          calendarFillMarks.map((mark) => (
            <div
              key={mark.id}
              className="calendar-mark pointer-events-none absolute h-[13%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#B48B5A]"
              style={{ left: mark.left, top: mark.top }}
            />
          ))}

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
