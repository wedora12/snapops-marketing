import Link from "next/link";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";

import Section10Footer from "@/sections/Section10_Footer";
import DraftBanner from "@/components/legal/DraftBanner";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-[32px] font-medium leading-[1.15] text-[#1D3539] md:text-[40px]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 font-serif text-[22px] font-medium leading-[1.25] text-[#1D3539] md:text-[26px]">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-[15px] leading-relaxed text-[#1A1814]/75">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#1D3539]">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#1A1814]/75">
      {children}
    </ul>
  ),
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-[#1D3539] underline underline-offset-2 hover:text-[#B48B5A]"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="mt-10 border-t border-[#1D3539]/10" />,
};

export default function LegalPageLayout({ markdown }: { markdown: string }) {
  return (
    <>
      <div className="min-h-screen bg-[#F7F5F2] px-8 py-16 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#1D3539]/60 transition-colors hover:text-[#1D3539]"
          >
            &larr; Back to SnapOps AI
          </Link>

          <div className="mt-8">
            <DraftBanner />
            <Markdown components={markdownComponents}>{markdown}</Markdown>
          </div>
        </div>
      </div>
      <Section10Footer />
    </>
  );
}
