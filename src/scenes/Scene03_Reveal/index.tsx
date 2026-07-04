import { SCENE_ID } from "@/scenes/Scene03_Reveal/constants";
import type { SceneProps } from "@/scenes/types";

export default function Scene03Reveal({ className }: SceneProps) {
  return <section data-scene={SCENE_ID} className={className} />;
}
