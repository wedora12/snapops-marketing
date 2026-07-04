import type { ComponentType } from "react";

export interface SceneProps {
  className?: string;
}

export type SceneId =
  | "scene-01-problem"
  | "scene-02-chaos"
  | "scene-03-reveal"
  | "scene-04-product"
  | "scene-05-trust"
  | "scene-06-final-cta";

export interface SceneDefinition {
  id: SceneId;
  index: number;
  component: ComponentType<SceneProps>;
}
