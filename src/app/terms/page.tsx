import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service — SnapOps AI",
};

export default function TermsPage() {
  const markdown = readFileSync(
    path.join(process.cwd(), "src/content/legal/terms.md"),
    "utf-8"
  );

  return <LegalPageLayout markdown={markdown} />;
}
