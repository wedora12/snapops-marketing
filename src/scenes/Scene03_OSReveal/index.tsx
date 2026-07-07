"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { osBootCopy, osObjects, BRAIN_POSITION_PCT, timing } from "./constants";

type Scene03OSRevealProps = {
  isActive?: boolean;
  // Fired the instant the convergence burst starts, so Scene 4 can begin
  // immediately — no waiting for a second manual scroll, no dead gap.
  onConverge?: () => void;
};

// Reveals text a character at a time by tweening a proxy object and
// writing the substring on each tick — GSAP has no free typewriter
// primitive. Scoped to `container` (this scene's own section) so it can
// never collide with another mounted-but-hidden scene's markup.
function typeLine(
  tl: gsap.core.Timeline,
  container: HTMLElement,
  selector: string,
  text: string
) {
  const el = container.querySelector(selector) as HTMLElement | null;
  if (!el) return;

  const proxy = { chars: 0 };
  tl.to(proxy, {
    chars: text.length,
    duration: text.length * timing.charSpeed,
    ease: "none",
    onUpdate: () => {
      el.textContent = text.slice(0, Math.round(proxy.chars));
    },
  });
}

// The blink is a real CSS `animation`, which always wins the cascade over
// a one-off inline opacity value for as long as it's attached — toggling
// the class itself (not just opacity) is what actually turns it off.
function setCursorActive(container: HTMLElement, active: boolean) {
  const el = container.querySelector(".os-cursor") as HTMLElement | null;
  if (!el) return;
  if (active) {
    el.classList.add("cursor-blink");
  } else {
    el.classList.remove("cursor-blink");
    el.style.opacity = "0";
  }
}

// One object connecting to the brain: the line draws on (via a real
// strokeDasharray/strokeDashoffset reveal, not just an opacity fade — this
// reads as "reaching out" rather than "appearing"), and the object glows
// once as the connection lands.
function connectObject(
  tl: gsap.core.Timeline,
  section: HTMLElement,
  id: string
) {
  const line = section.querySelector(
    `.connect-line[data-connect="${id}"]`
  ) as SVGLineElement | null;

  if (line) {
    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    tl.to(line, {
      strokeDashoffset: 0,
      duration: timing.lineDrawDuration,
      ease: "power2.out",
    });
  }

  tl.fromTo(
    `.os-glow[data-glow="${id}"]`,
    { opacity: 0 },
    {
      opacity: 0.85,
      duration: timing.connectGlowDuration / 2,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      immediateRender: false,
    },
    "<"
  );
  tl.to({}, { duration: timing.connectGap });
}

export default function Scene03OSReveal({
  isActive = false,
  onConverge,
}: Scene03OSRevealProps) {
  const sceneRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const section = sceneRef.current;

    const ctx = gsap.context(() => {
      gsap.set(".os-console", { opacity: 0, y: -8 });
      gsap.set(".os-cursor", { opacity: 0 });
      gsap.set(".os-glow", { opacity: 0 });
      gsap.set(".convergence-burst", { opacity: 0, scale: 0.3 });
      gsap.set(".brain-icon", { opacity: 0, scale: 0.4 });
      gsap.set(".brain-pulse-ring", { opacity: 0, scale: 1 });
      gsap.set(".satellite-node", { opacity: 0, scale: 0.3 });
      gsap.set(".pulse-dot", { opacity: 0 });
      gsap.set(".flow-dot", { opacity: 0 });
      // Connect-lines keep a static baseline opacity set directly in JSX —
      // their visibility comes entirely from strokeDashoffset (the
      // draw-on reveal in connectObject below), not from opacity.
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (!isActive) return;
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;

    const section = sceneRef.current;
    const brainEl = section.querySelector(".brain-icon") as HTMLElement;
    const flowTimelines: gsap.core.Timeline[] = [];

    const tl = gsap.timeline({ delay: 0.05 });

    // Scene 2 ends — hold, silence, no motion.
    tl.to({}, { duration: timing.scenePause });

    // Dim the world. Objects stay put, just recede — the desk is still
    // there, it's just become background.
    tl.to(".os-object-image", {
      opacity: timing.dimOpacity,
      duration: timing.dimDuration,
      ease: "power2.out",
      stagger: 0.03,
    });

    // The AI greeting leads — this is the first emotional beat, before
    // anything neural happens.
    tl.to(".os-console", {
      opacity: 1,
      y: 0,
      duration: timing.consoleFadeIn,
      ease: "power2.out",
    });
    tl.call(() => setCursorActive(section, true));
    tl.to({}, { duration: timing.cursorPreBlink });
    typeLine(tl, section, ".text-greeting", osBootCopy.greeting);
    tl.to({}, { duration: timing.linePause });
    typeLine(tl, section, ".text-analyzing", osBootCopy.analyzing);

    // Nothing but text and stillness for a beat — the network hasn't
    // started yet, and shouldn't feel like it's rushing in.
    tl.to({}, { duration: timing.postAnalyzingHold });

    // One tiny neural node appears at the desk's center, alone, and
    // pulses once — "intelligence waking up," before anything else exists.
    tl.to(".brain-icon", {
      opacity: 1,
      scale: 1,
      duration: timing.brainAppearDuration,
      ease: "power2.out",
    });
    tl.fromTo(
      ".brain-pulse-ring",
      { opacity: 0.6, scale: 1 },
      {
        opacity: 0,
        scale: 1.8,
        duration: timing.firstPulseDuration,
        ease: "power1.out",
        immediateRender: false,
      }
    );
    tl.to(
      ".brain-center-dot",
      {
        scale: 1.3,
        duration: timing.firstPulseDuration / 2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
      "<"
    );

    // Then — and only then — satellite nodes appear near each desk
    // object, one by one. No lines yet.
    tl.to(".satellite-node", {
      opacity: 0.6,
      scale: 1,
      duration: timing.satelliteNodeDuration,
      ease: "back.out(1.1)",
      stagger: timing.satelliteNodeStagger,
    });

    // Only once every node is visible do connection lines grow outward
    // from the center to each one — each object glows once as its line
    // lands, per the brief's object -> category mapping.
    osObjects.forEach((obj) => {
      connectObject(tl, section, obj.id);
    });

    // Now that everything is connected, the brain pulses a second,
    // stronger time — "understanding achieved," not just "waking up"...
    tl.fromTo(
      ".brain-pulse-ring",
      { opacity: 0.7, scale: 1 },
      {
        opacity: 0,
        scale: 2.4,
        duration: timing.brainPulseDuration,
        ease: "power1.out",
        immediateRender: false,
      }
    );
    tl.to(
      ".brain-center-dot",
      {
        scale: 1.5,
        duration: timing.brainPulseDuration / 2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
      "<"
    );

    // ...and that pulse travels back out through every connection at once —
    // each object gets one more soft glow as its pulse arrives.
    osObjects.forEach((obj) => {
      tl.fromTo(
        `.pulse-dot[data-connect="${obj.id}"]`,
        { opacity: 1, attr: { cx: `${BRAIN_POSITION_PCT.x}%`, cy: `${BRAIN_POSITION_PCT.y}%` } },
        {
          opacity: 0,
          attr: { cx: obj.anchor.left, cy: obj.anchor.top },
          duration: timing.pulseTravelDuration,
          ease: "power2.out",
          immediateRender: false,
        },
        "<"
      );
    });
    osObjects.forEach((obj) => {
      tl.fromTo(
        `.os-glow[data-glow="${obj.id}"]`,
        { opacity: 0 },
        {
          opacity: 0.6,
          duration: timing.pulseTravelDuration / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          immediateRender: false,
        },
        `-=${timing.pulseTravelDuration}`
      );
    });

    // The network settles to a quiet resting state — still visible, just
    // no longer the focus, while the console confirms what just happened.
    tl.to(".connect-line, .satellite-node", {
      opacity: timing.networkRestOpacity,
      duration: timing.networkSettleDuration,
      ease: "power1.out",
    });

    // While the network rests, faint pulses keep traveling from each
    // object into the hub — "data quietly moving," not a static diagram.
    // Each dot fades in near the object, travels, and fades out near the
    // hub, so the loop's instant reset always happens while invisible —
    // no snap. A few finite repeats, staggered per object, so this reads
    // as ambient life during the "synchronized / building" text rather
    // than a decoration that has to be manually stopped.
    tl.call(() => {
      osObjects.forEach((obj, i) => {
        const dot = section.querySelector(
          `.flow-dot[data-flow="${obj.id}"]`
        );
        if (!dot) return;
        const dotTl = gsap.timeline({
          repeat: timing.flowDotRepeat,
          repeatDelay: timing.flowDotRepeatDelay,
          delay: i * timing.flowDotStagger,
        });
        dotTl
          .set(dot, { attr: { cx: obj.anchor.left, cy: obj.anchor.top }, opacity: 0 })
          .to(dot, {
            opacity: timing.flowDotOpacity,
            duration: timing.flowDotEdgeFade,
            ease: "power1.out",
          })
          .to(
            dot,
            {
              attr: { cx: `${BRAIN_POSITION_PCT.x}%`, cy: `${BRAIN_POSITION_PCT.y}%` },
              duration: timing.flowDotTravelDuration,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            dot,
            { opacity: 0, duration: timing.flowDotEdgeFade, ease: "power1.in" },
            `-=${timing.flowDotEdgeFade}`
          );
        flowTimelines.push(dotTl);
      });
    });

    typeLine(tl, section, ".text-synchronized", osBootCopy.synchronized);
    tl.to({}, { duration: timing.linePause });
    typeLine(tl, section, ".text-building", osBootCopy.building);
    tl.to({}, { duration: timing.linePause });
    tl.call(() => setCursorActive(section, false));

    tl.to(".os-console", {
      opacity: 0,
      y: -8,
      duration: 0.3,
      ease: "power1.in",
    });
    tl.to(
      ".connect-line, .brain-icon, .satellite-node",
      { opacity: 0, duration: 0.25, ease: "power1.in" },
      "<"
    );
    // Stop the ambient flow loops in the same beat — killed rather than
    // left to finish on their own, so none can flash back to life over
    // the convergence that follows.
    tl.call(
      () => {
        flowTimelines.forEach((t) => t.kill());
        gsap.set(".flow-dot", { opacity: 0 });
      },
      [],
      "<"
    );

    // Final convergence — objects don't fade, they brighten and get pulled
    // to the same point the brain sat at, then a burst marks the handoff
    // to the next scene.
    tl.to(".os-object", {
      x: (_i, el) => {
        const targetRect = brainEl.getBoundingClientRect();
        const elRect = (el as HTMLElement).getBoundingClientRect();
        return (
          targetRect.left +
          targetRect.width / 2 -
          (elRect.left + elRect.width / 2)
        );
      },
      y: (_i, el) => {
        const targetRect = brainEl.getBoundingClientRect();
        const elRect = (el as HTMLElement).getBoundingClientRect();
        return (
          targetRect.top +
          targetRect.height / 2 -
          (elRect.top + elRect.height / 2)
        );
      },
      scale: timing.convergeScale,
      duration: timing.convergeDuration,
      ease: "power3.in",
    });
    tl.to(
      ".os-object-image",
      { opacity: 1, duration: timing.convergeDuration, ease: "power3.in" },
      "<"
    );

    tl.fromTo(
      ".convergence-burst",
      { opacity: 1, scale: 0.3 },
      {
        opacity: 0,
        scale: 1.6,
        duration: timing.burstDuration,
        ease: "power1.out",
        immediateRender: false,
      },
      "-=0.05"
    );
    tl.to(
      ".os-object",
      { opacity: 0, duration: timing.burstDuration * 0.6, ease: "power1.in" },
      "<"
    );

    // The instant the burst fires, hand off to Scene 4 — no waiting for
    // the flash to finish, no second scroll, no dead gap. The burst itself
    // becomes the transition into the reveal.
    tl.call(
      () => {
        section.classList.add("is-live");
        onConverge?.();
      },
      [],
      "<"
    );
  }, [isActive]);

  return (
    <section
      ref={sceneRef}
      className="relative h-screen overflow-hidden bg-[#F7F5F2]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#F7F5F2_72%)]" />

      {/* The AI console. Centered, monospace, minimal. The block's top is
          pinned (not vertically re-centered as content grows) so earlier
          lines never visibly drift as later lines are appended below —
          width is fixed too, so horizontal centering is stable from the
          very first (empty) frame. */}
      <div
        className="os-console absolute left-1/2 z-40 w-[440px] -translate-x-1/2 text-left"
        style={{ top: "40%" }}
      >
        <div className="font-mono text-[15px] leading-relaxed text-[#1D3539]">
          <span className="text-greeting" />
          <span className="os-cursor">▌</span>
        </div>
        <div className="font-mono text-[15px] leading-relaxed text-[#1D3539]">
          <span className="text-analyzing" />
        </div>

        <div className="mt-3 font-mono text-[15px] leading-relaxed text-[#1D3539]">
          <span className="text-synchronized" />
        </div>
        <div className="font-mono text-[15px] leading-relaxed text-[#1D3539]">
          <span className="text-building" />
        </div>
      </div>

      {/* The desk — dims, then each object connects to the central brain,
          glows, and finally everything converges into it. */}
      <div className="desk-stage-os relative mx-auto h-full w-full max-w-[1600px]">
        {osObjects.map((obj) => (
          <div
            key={obj.id}
            data-object={obj.id}
            className="os-object absolute select-none"
            style={{
              left: obj.left,
              top: obj.top,
              bottom: obj.bottom,
              width: obj.width,
              zIndex: obj.z,
              transform: `rotate(${obj.rotate}deg)`,
            }}
          >
            <div
              data-glow={obj.id}
              className="os-glow pointer-events-none absolute rounded-[28px] bg-[#C6A47F]/60 blur-2xl"
              style={{ inset: "-18px" }}
            />
            <img
              src={obj.src}
              alt=""
              className="os-object-image relative w-full"
            />
          </div>
        ))}

        {/* Neural network overlay: thin lines from every object straight
            to one central brain — never object-to-object, so it always
            reads as "feeding one intelligence," not a random mesh. Plain
            SVG with percentage coordinates — no viewBox, so strokes and
            the pulse dots never distort. Lines are gold-tinted and blurred
            slightly softer than a flat 1px stroke so they read as "light
            reaching out," not a wireframe/circuit-board diagram. */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <filter id="os-soft-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          {osObjects.map((obj) => (
            <line
              key={obj.id}
              data-connect={obj.id}
              className="connect-line"
              x1={`${BRAIN_POSITION_PCT.x}%`}
              y1={`${BRAIN_POSITION_PCT.y}%`}
              x2={obj.anchor.left}
              y2={obj.anchor.top}
              stroke="#C6A47F"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.4}
            />
          ))}
          {osObjects.map((obj) => (
            <circle
              key={`${obj.id}-glow`}
              className="pulse-dot"
              data-connect={obj.id}
              r={7}
              fill="#C6A47F"
              opacity={0.5}
              filter="url(#os-soft-glow)"
              cx={`${BRAIN_POSITION_PCT.x}%`}
              cy={`${BRAIN_POSITION_PCT.y}%`}
            />
          ))}
          {osObjects.map((obj) => (
            <circle
              key={obj.id}
              data-connect={obj.id}
              className="pulse-dot"
              r={3}
              fill="#F7F5F2"
              cx={`${BRAIN_POSITION_PCT.x}%`}
              cy={`${BRAIN_POSITION_PCT.y}%`}
            />
          ))}
          {/* Faint continuous flow, added once the network is at rest —
              small, unblurred, low-opacity gold dots only (no glow filter,
              per "no neon / no sci-fi glow") traveling object -> hub. */}
          {osObjects.map((obj) => (
            <circle
              key={`${obj.id}-flow`}
              data-flow={obj.id}
              className="flow-dot"
              r={1.6}
              fill="#C6A47F"
              cx={obj.anchor.left}
              cy={obj.anchor.top}
            />
          ))}
        </svg>

        {/* Satellite nodes: small markers near each object, appearing one
            by one before any line exists — "the network noticing things,"
            not lines just materializing everywhere at once. */}
        {osObjects.map((obj) => (
          <div
            key={obj.id}
            data-node={obj.id}
            className="satellite-node pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: obj.anchor.left, top: obj.anchor.top }}
          >
            <span className="absolute -inset-2 rounded-full bg-[#C6A47F]/50 blur-md" />
            <span className="relative block h-2 w-2 rounded-full bg-[#C6A47F]" />
            <span className="absolute inset-0 h-2 w-2 rounded-full border border-[#1D3539]/40" />
          </div>
        ))}

        {/* The brain: two thin static rings + a center dot, premium and
            minimal — not a sci-fi orb, just enough geometry to read as
            "a hub." A soft ambient glow breathes continuously behind it
            (reusing globals.css's .glow-pulse-slow) so it feels alive
            between the discrete pulse beats, not a static outline. */}
        <div
          className="brain-icon pointer-events-none absolute"
          style={{ left: `${BRAIN_POSITION_PCT.x}%`, top: `${BRAIN_POSITION_PCT.y}%` }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="glow-pulse-slow absolute -inset-3 rounded-full bg-[#C6A47F]/30 blur-xl" />
            <div className="brain-pulse-ring absolute inset-0 h-14 w-14 rounded-full border border-[#C6A47F]" />
            <div className="h-14 w-14 rounded-full border border-[#1D3539]/25" />
            <div className="absolute inset-[10px] rounded-full border border-[#C6A47F]/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="brain-center-dot h-2 w-2 rounded-full bg-[#C6A47F]" />
            </div>
          </div>
        </div>

        <div className="convergence-burst pointer-events-none absolute h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6A47F]" style={{ left: `${BRAIN_POSITION_PCT.x}%`, top: `${BRAIN_POSITION_PCT.y}%` }} />
      </div>
    </section>
  );
}
