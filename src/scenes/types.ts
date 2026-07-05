import type { ComponentType } from "react";

export interface SceneProps {
  className?: string;
}

export type SceneId = "scene-01-problem" | "scene-02-chaos";

export interface SceneDefinition {
  id: SceneId;
  index: number;
  component: ComponentType<SceneProps>;
}
