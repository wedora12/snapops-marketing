// Delete this file (and its one usage in LegalPageLayout) once real,
// lawyer-reviewed copy replaces the draft legal pages.
export const LEGAL_CONTENT_IS_DRAFT = true;

export default function DraftBanner() {
  if (!LEGAL_CONTENT_IS_DRAFT) return null;

  return (
    <div className="mb-10 rounded-lg border border-[#B45309]/30 bg-[#FEF3C7] px-5 py-4 text-[13px] leading-relaxed text-[#92400E]">
      <p className="font-semibold">Draft — pending legal review</p>
      <p className="mt-1 text-[#92400E]/90">
        This page is a draft pending legal review and is not yet finalized.
      </p>
    </div>
  );
}
