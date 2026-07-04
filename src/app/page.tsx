"use client";

import { useRef, useState } from "react";

import Hero from "@/scenes/Scene01_Problem";
import Scene02FlatlayDesk from "@/scenes/Scene02_FlatlayDesk";
import Scene02Transformation from "@/scenes/Scene02_Transformation";
import Scene04AI from "@/scenes/Scene04_AI";

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const lockRef = useRef(false);

  const totalScenes = 4;

  const goToScene = (scene: number) => {
    if (lockRef.current) return;
    if (scene < 0 || scene >= totalScenes) return;

    lockRef.current = true;
    setActiveScene(scene);

    setTimeout(() => {
      lockRef.current = false;
    }, 450);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 20) goToScene(activeScene + 1);
    if (e.deltaY < -20) goToScene(activeScene - 1);
  };

  return (
    <main
      onWheel={handleWheel}
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#F7F5F2]"
    >
      {/* Scene 1 */}

      <section
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
        className={`absolute inset-0 transition-all duration-300 ${
          activeScene === 2
            ? "opacity-100 scale-100 z-20"
            : "opacity-0 scale-90 z-10"
        }`}
      >
        <Scene02Transformation />
      </section>

      {/* Scene 4 */}

      <section
        className={`absolute inset-0 transition-all duration-300 ${
          activeScene === 3
            ? "opacity-100 scale-100 z-20"
            : "opacity-0 scale-90 z-10"
        }`}
      >
        <Scene04AI />
      </section>
    </main>
  );
}