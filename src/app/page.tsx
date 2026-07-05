"use client";

import { useEffect, useRef, useState } from "react";

import Hero from "@/scenes/Scene01_Problem";
import Scene02FlatlayDesk from "@/scenes/Scene02_FlatlayDesk";
import Scene03DeskAtWork from "@/scenes/Scene03_DeskAtWork";
import Scene04ScaleAndFreedom from "@/scenes/Scene04_ScaleAndFreedom";

// Scene indices whose components use the isActive + GSAP-timeline pattern
// that adds a `.is-live` class to their own root section once the entrance
// animation completes (see Scene02_FlatlayDesk, Scene03_DeskAtWork,
// Scene04_ScaleAndFreedom). Scene 1 has no gated entrance animation at all,
// so there's nothing to wait for — it just uses the floor duration below.
const SCENES_WITH_ENTRANCE_ANIMATION = new Set([1, 2, 3]);

// Minimum lock hold, and the only duration used for scenes with no entrance
// animation (or on a revisit, where the animation already played once).
const LOCK_FLOOR_MS = 450;

// Defensive upper bound in case a scene's `.is-live` signal never arrives
// (e.g. a future scene wired up incorrectly) — keeps navigation from getting
// permanently stuck rather than actually gating on real animation length.
const LOCK_SAFETY_CAP_MS = 6000;

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);

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

  const totalScenes = 4;

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
  const goToScene = (scene: number) => {
    if (lockRef.current) return;
    if (scene < 0 || scene >= totalScenes) return;

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

  useEffect(() => {
    const node = mainRef.current;
    if (!node) return;

    // Native, non-passive listener: React's onWheel is passive by default,
    // which silently no-ops preventDefault() and logs a console warning.
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 20) goToScene(activeSceneRef.current + 1);
      if (e.deltaY < -20) goToScene(activeSceneRef.current - 1);
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main
      ref={mainRef}
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#F7F5F2]"
    >
      {/* Scene 1 */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[0] = el;
        }}
        className={`absolute inset-0 transition-all duration-300 ${
          activeScene === 0
            ? "opacity-100 scale-100 z-20"
            : "opacity-0 scale-110 z-10"
        }`}
      >
        <Hero />
      </section>

      {/* Scene 2 */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[1] = el;
        }}
        className={`absolute inset-0 transition-all duration-300 ${
          activeScene === 1
            ? "opacity-100 scale-100 z-20"
            : "opacity-0 scale-90 z-10"
        }`}
      >
        <Scene02FlatlayDesk isActive={activeScene === 1} />
      </section>

      {/* Scene 3 */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[2] = el;
        }}
        className={`absolute inset-0 transition-all duration-300 ${
          activeScene === 2
            ? "opacity-100 scale-100 z-20"
            : "opacity-0 scale-90 z-10"
        }`}
      >
        <Scene03DeskAtWork isActive={activeScene === 2} />
      </section>

      {/* Scene 4 */}

      <section
        ref={(el) => {
          sceneWrapperRefs.current[3] = el;
        }}
        className={`absolute inset-0 transition-all duration-300 ${
          activeScene === 3
            ? "opacity-100 scale-100 z-20"
            : "opacity-0 scale-90 z-10"
        }`}
      >
        <Scene04ScaleAndFreedom isActive={activeScene === 3} />
      </section>
    </main>
  );
}