import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund Policy — SnapOps AI",
};

export default function RefundPolicyPage() {
  const markdown = readFileSync(
    path.join(process.cwd(), "src/content/legal/refund-policy.md"),
    "utf-8"
  );

  return <LegalPageLayout markdown={markdown} />;
}
