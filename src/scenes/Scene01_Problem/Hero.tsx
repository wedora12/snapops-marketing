import MobileStoryCards from "./MobileStoryCards";

export default function Hero() {
  return (
    <div className="relative z-20 flex min-h-screen items-center justify-center px-6 pt-28">
      <div className="mx-auto max-w-[900px] text-center">
        <div className="md:hidden">
          <MobileStoryCards />
        </div>

        <p className="mb-8 mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-[#B48B5A] md:mt-0 md:text-sm">
          FOR WEDDING STUDIOS
        </p>

        <h1 className="text-[44px] font-bold leading-[0.9] tracking-[-0.06em] text-[#1D3539] sm:text-[64px] md:text-[92px]">
          Running a
          <br />
          wedding studio
          <br />
          shouldn't feel
          <br />
          like <span className="font-medium italic text-[#B48B5A]">this.</span>
        </h1>

        <p className="mx-auto mt-10 max-w-[680px] text-[19px] leading-[1.7] text-[#667085] md:mt-12 md:text-[24px]">
          Every inquiry. Every payment.
          <br />
          Every album. Every client conversation.
          <br />
          Finally, everything in one place.
        </p>

        <button className="group mt-12 inline-flex h-[64px] items-center gap-4 rounded-[22px] bg-[#1D3539] px-8 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:mt-16 md:h-[72px] md:px-12 md:text-xl">
          <span>Start Organizing Your Studio</span>
          <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}