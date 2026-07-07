import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — SnapOps AI",
};

export default function PrivacyPage() {
  const markdown = readFileSync(
    path.join(process.cwd(), "src/content/legal/privacy.md"),
    "utf-8"
  );

  return <LegalPageLayout markdown={markdown} />;
}
