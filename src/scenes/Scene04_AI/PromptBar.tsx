"use client";

export default function PromptBar() {
  return (
    <div className="mx-auto flex h-[82px] w-full items-center rounded-[28px] border border-[#E7DDD0] bg-white px-8 shadow-[0_18px_60px_rgba(29,53,57,0.08)]">

      <svg
        className="mr-5 h-6 w-6 text-[#C6A47F]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 21l-4.3-4.3" />
        <circle cx="10" cy="10" r="7" />
      </svg>

      <p className="flex-1 text-[20px] text-[#8A8178]">
        Ask anything about your studio…
      </p>

      <button className="rounded-full bg-[#1D3539] px-7 py-3 text-[15px] font-medium text-white transition hover:scale-[1.02]">
        Ask AI
      </button>

    </div>
  );
}