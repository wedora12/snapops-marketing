import { SCENE_ID } from "@/scenes/Scene04_Product/constants";
import type { SceneProps } from "@/scenes/types";

export default function Scene04Product({ className }: SceneProps) {
  return <section data-scene={SCENE_ID} className={className} />;
}
