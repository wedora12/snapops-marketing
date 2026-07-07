"use client";

import { useEffect, useRef, useState } from "react";

import Hero from "@/scenes/Scene01_Problem";
import Scene02FlatlayDesk from "@/scenes/Scene02_FlatlayDesk";
import Scene03OSReveal from "@/scenes/Scene03_OSReveal";
import Scene04Reveal from "@/scenes/Scene04_Reveal";
import Scene05ProductPreview from "@/scenes/Scene05_ProductPreview";
import Section07BuiltInsideStudio from "@/sections/Section07_BuiltInsideStudio";
import Section08Pricing from "@/sections/Section08_Pricing";
import Section09FinalCTA from "@/sections/Section09_FinalCTA";
import Section10Footer from "@/sections/Section10_Footer";
import Scene02MobileFallback from "@/scenes/Scene02_FlatlayDesk/MobileFallback";
import Scene03MobileFallback from "@/scenes/Scene03_OSReveal/MobileFallback";
import Scene04MobileFallback from "@/scenes/Scene04_Reveal/MobileFallback";
import Scene05MobileFallback from "@/scenes/Scene05_ProductPreview/MobileFallback";

// Below this breakpoint (matches Scene 1's own existing xl: cutover
// between MobileStoryCards and its desktop FloatingCards), the wheel-lock
// cinematic experience is dropped entirely in favor of one continuous
// scroll: `main` collapses to normal document flow showing only Scene 1
// (already responsive on its own), Scenes 2-5 are replaced by the
// lightweight fallbacks below, and Sections 7-9 are always visible
// (achieved by auto-releasing the pin on mount, not a separate mechanism —
// see the effect below).
const MOBILE_BREAKPOINT_QUERY = "(max-width: 1279px)";

// Scene indices whose components use the isActive + GSAP-timeline pattern
// that adds a `.is-live` class to their own root section once the entrance
// animation completes (see Scene02_FlatlayDesk, Scene03_OSReveal,
// Scene04_Reveal). Scene 1 has no gated entrance animation at all, so
// there's nothing to wait for — it just uses the floor duration below.
const SCENES_WITH_ENTRANCE_ANIMATION = new Set([1, 2, 3]);

// Minimum lock hold, and the only duration used for scenes with no entrance
// animation (or on a revisit, where the animation already played once).
const LOCK_FLOOR_MS = 450;

// Defensive upper bound in case a scene's `.is-live` signal never arrives
// (e.g. a future scene wired up incorrectly) — keeps navigation from getting
// permanently stuck rather than actually gating on real animation length.
// Must stay comfortably above Scene 3's real entrance duration (~9.5-10s,
// including its network-flow-pulse hold) — if this cap fires before Scene
// 3's own `onConverge` does, navigation unlocks early, a user can scroll
// past it, and the scene's real (delayed) forced `onConverge` call then
// yanks them backward once it finally fires. Was 6000 (too short); this
// was invisible while Scene 4 was the last scene (the stray forced call
// just re-entered the same scene) but became a visible bug once Scene 5
// existed to be yanked back from.
const LOCK_SAFETY_CAP_MS = 11000;

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  // Once Scene 5's closing beat fires `onRelease` (or the user manually
  // scrolls past an already-played Scene 5 — see handleWheel), the
  // cinematic pinned experience ends: the wheel handler stops hijacking
  // scroll and the pinned container rejoins normal document flow so
  // Sections 6-10 become reachable via ordinary scrolling. Not one-way —
  // scrolling back up to the very top of the document re-engages the pin
  // and steps back into Scene 4, so the reverse journey through Scenes
  // 4→3→2→1 still works after release (see handleWheel).
  const [pinReleased, setPinReleased] = useState(false);
  const pinReleasedRef = useRef(false);

  // Mirrors activeScene synchronously. handleWheel reads this instead of the
  // `activeScene` state value directly, so a rapid string of wheel events
  // can never compute "next scene" off of a not-yet-committed render — the
  // ref is updated in the same tick a transition is accepted, independent of
  // React's render/commit timing.
  const activeSceneRef = useRef(0);
  const lockRef = useRef(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const sceneWrapperRefs = useRef<Array<HTMLElement | null>>([]);
  const cleanupPendingWaitRef = useRef<(() => void) | null>(null);

  const totalScenes = 5;

  const releaseLock = () => {
    cleanupPendingWaitRef.current?.();
    cleanupPendingWaitRef.current = null;
    lockRef.current = false;
  };

  // Lock hold = however long the scene we're entering actually takes to
  // finish its own entrance animation (signaled via `.is-live`), floored at
  // LOCK_FLOOR_MS. This replaces the old flat 450ms-regardless-of-scene
  // timer, which could release before Scene 2/3's GSAP timeline had actually
  // finished, letting the next transition cut the animation off mid-play.
  //
  // `force` bypasses the lock check — used only by Scene 3's `onConverge`
  // callback, which fires the instant its own convergence burst starts
  // (i.e. before the floor delay from *entering* Scene 3 has necessarily
  // elapsed). Since that call is a deliberate one-shot handoff, not a rapid
  // user scroll, forcing through is safe; any pending wait from the scene
  // being left is cleaned up via releaseLock() before the new one begins.
  const goToScene = (scene: number, opts?: { force?: boolean }) => {
    if (lockRef.current && !opts?.force) return;
    if (scene < 0 || scene >= totalScenes) return;

    releaseLock();
    lockRef.current = true;
    activeSceneRef.current = scene;
    setActiveScene(scene);

    const entryTime = performance.now();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      releaseLock();
    };

    if (!SCENES_WITH_ENTRANCE_ANIMATION.has(scene)) {
      const floorId = window.setTimeout(finish, LOCK_FLOOR_MS);
      cleanupPendingWaitRef.current = () => window.clearTimeout(floorId);
      return;
    }

    const wrapper = sceneWrapperRefs.current[scene];
    const alreadyPlayed = !!wrapper?.querySelector(".is-live");

    if (alreadyPlayed) {
      // Revisiting a scene whose entrance already played (hasPlayedRef
      // guards it from replaying) — nothing new to protect, just the floor.
      const floorId = window.setTimeout(finish, LOCK_FLOOR_MS);
      cleanupPendingWaitRef.current = () => window.clearTimeout(floorId);
      return;
    }

    let signaled = false;
    const observer = wrapper
      ? new MutationObserver(() => {
          if (signaled || !wrapper.querySelector(".is-live")) return;
          signaled = true;
          const elapsed = performance.now() - entryTime;
          const remaining = Math.max(LOCK_FLOOR_MS - elapsed, 0);
          window.setTimeout(finish, remaining);
        })
      : null;

    observer?.observe(wrapper as HTMLElement, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });

    const safetyCapId = window.setTimeout(finish, LOCK_SAFETY_CAP_MS);

    cleanupPendingWaitRef.current = () => {
      observer?.disconnect();
      window.clearTimeout(safetyCapId);
    };
  };

  // Below the mobile breakpoint there's no wheel-lock experience at all
  // (see the responsive classes on `main` and the scene wrappers below) —
  // release immediately on mount so Sections 7-9 mount unconditionally and
  // the page behaves as one continuous scroll. A mount-time check only
  // (not a resize listener): this targets phones/tablets loading the page,
  // not a desktop window being resized mid-session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches) {
      pinReleasedRef.current = true;
      setPinReleased(true);
    }
  }, []);

  useEffect(() => {
    const node = mainRef.current;
    if (!node) return;

    // Native, non-passive listener: React's onWheel is passive by default,
    // which silently no-ops preventDefault() and logs a console warning.
    const handleWheel = (e: WheelEvent) => {
      if (pinReleasedRef.current) {
        // Released: normally let the browser's native scroll handle
        // everything (never trap it). The one exception is scrolling up
        // while already at the very top of the document — that's the
        // user asking to go back into the cinematic experience, and
        // there's nothing above scrollY 0 for native scroll to reveal, so
        // without this the site would just look permanently stuck on
        // Scene 5. Re-engage the pin and step back into Scene 4.
        const atTop = window.scrollY <= 0;
        if (e.deltaY < -20 && atTop) {
          e.preventDefault();
          pinReleasedRef.current = false;
          setPinReleased(false);
          goToScene(activeSceneRef.current - 1, { force: true });
        }
        return;
      }

      e.preventDefault();

      if (e.deltaY > 20) {
        const atLastScene = activeSceneRef.current >= totalScenes - 1;
        const lastWrapper = sceneWrapperRefs.current[totalScenes - 1];
        const lastAlreadyPlayed = !!lastWrapper?.querySelector(".is-live");
        if (atLastScene && lastAlreadyPlayed) {
          // Already sat through Scene 5 once (its entrance is done) and
          // the user is actively asking to continue — release immediately
          // rather than making them wait for the timed onRelease cue.
          pinReleasedRef.current = true;
          setPinReleased(true);
          return;
        }
        goToScene(activeSceneRef.current + 1);
      }
      if (e.deltaY < -20) goToScene(activeSceneRef.current - 1);
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
    <main
      ref={mainRef}
      className={`w-full bg-[#F7F5F2] xl:h-screen xl:w-screen xl:overflow-hidden ${
        pinReleased ? "xl:relative" : "xl:fixed xl:inset-0"
      }`}
    >
      {/* Scene 1 */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[0] = el;
        }}
        className={`relative xl:absolute xl:inset-0 transition-all duration-300 ${
          activeScene === 0
            ? "opacity-100 scale-100 z-20 pointer-events-auto"
            : "opacity-0 scale-110 z-10 pointer-events-none"
        }`}
      >
        <Hero />
      </section>

      {/* Scene 2 */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[1] = el;
        }}
        className={`hidden xl:block absolute inset-0 transition-all duration-300 ${
          activeScene === 1
            ? "opacity-100 scale-100 z-20 pointer-events-auto"
            : "opacity-0 scale-90 z-10 pointer-events-none"
        }`}
      >
        <Scene02FlatlayDesk isActive={activeScene === 1} />
      </section>

      {/* Scene 3 — AI Operating System Reveal */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[2] = el;
        }}
        className={`hidden xl:block absolute inset-0 transition-all duration-300 ${
          activeScene === 2
            ? "opacity-100 scale-100 z-20 pointer-events-auto"
            : "opacity-0 scale-90 z-10 pointer-events-none"
        }`}
      >
        <Scene03OSReveal
          isActive={activeScene === 2}
          onConverge={() => goToScene(3, { force: true })}
        />
      </section>

      {/* Scene 4 — Final Reveal */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[3] = el;
        }}
        className={`hidden xl:block absolute inset-0 transition-all duration-300 ${
          activeScene === 3
            ? "opacity-100 scale-100 z-20 pointer-events-auto"
            : "opacity-0 scale-90 z-10 pointer-events-none"
        }`}
      >
        <Scene04Reveal isActive={activeScene === 3} />
      </section>

      {/* Scene 5 — Product Preview */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[4] = el;
        }}
        className={`hidden xl:block absolute inset-0 transition-all duration-300 ${
          activeScene === 4
            ? "opacity-100 scale-100 z-20 pointer-events-auto"
            : "opacity-0 scale-90 z-10 pointer-events-none"
        }`}
      >
        <Scene05ProductPreview
          isActive={activeScene === 4}
          onRelease={() => {
            pinReleasedRef.current = true;
            setPinReleased(true);
          }}
        />
      </section>
    </main>
    <Scene02MobileFallback />
    <Scene03MobileFallback />
    <Scene04MobileFallback />
    <Scene05MobileFallback />
    {pinReleased && (
      <>
        <Section07BuiltInsideStudio />
        <Section08Pricing />
        <Section09FinalCTA />
        <Section10Footer />
      </>
    )}
    </>
  );
}