export default function Section09FinalCTA() {
  return (
    <section className="relative bg-[#1D3539] px-8 py-28 md:py-36">
      <div className="mx-auto max-w-[720px] text-center">
        <h2 className="font-serif text-[34px] font-medium leading-[1.15] text-[#F7F5F2] md:text-[48px]">
          Ready to run your studio differently?
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-relaxed text-[#F7F5F2]/70">
          See how SnapOps AI can simplify your studio, save hours every
          week, and help your team stay focused on creating unforgettable
          weddings.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {/* "Book a Demo" has no real destination yet on this single-page
              site — placeholder href, flagged rather than guessed. "See
              Pricing" is a real in-page link to Section 8. */}
          <a
            href="#"
            className="rounded-full bg-[#C6A47F] px-7 py-3 text-[14px] font-medium text-[#1D3539] transition-opacity hover:opacity-90"
          >
            Book a Demo
          </a>
          <a
            href="#pricing"
            className="rounded-full border border-[#F7F5F2]/25 px-7 py-3 text-[14px] font-medium text-[#F7F5F2] transition-colors hover:bg-[#F7F5F2]/10"
          >
            See Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
