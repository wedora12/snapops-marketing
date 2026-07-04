export type CopySection = {
  headline: string;
  subheadline: string;
  body: string;
};

export type CopyContent = {
  scene01: CopySection;
  scene02: CopySection;
  scene03: CopySection;
  scene04: CopySection;
  scene05: CopySection;
  scene06: CopySection;
};

export const copy = {
  scene01: { headline: "", subheadline: "", body: "" },
  scene02: { headline: "", subheadline: "", body: "" },
  scene03: { headline: "", subheadline: "", body: "" },
  scene04: { headline: "", subheadline: "", body: "" },
  scene05: { headline: "", subheadline: "", body: "" },
  scene06: { headline: "", subheadline: "", body: "" },
} as const satisfies CopyContent;
