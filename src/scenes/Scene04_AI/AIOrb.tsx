"use client";

export default function AIOrb() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Ambient Glow */}
      <div className="absolute h-[340px] w-[340px] rounded-full bg-[#C6A47F]/12 blur-[120px]" />

      {/* Outer Ring */}
      <div className="absolute h-[250px] w-[250px] rounded-full border border-[#D8C7AE]/70" />

      {/* Middle Ring */}
      <div className="absolute h-[205px] w-[205px] rounded-full border border-[#E7DDD0]" />

      {/* Inner Orb */}
      <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full bg-[#1D3539] shadow-[0_35px_90px_rgba(29,53,57,0.28)]">

        <div className="absolute inset-[14px] rounded-full border border-white/8" />

        <div className="absolute h-[95px] w-[95px] rounded-full bg-[#C6A47F]/25 blur-3xl" />

        <div className="text-center">

          <p className="text-[12px] uppercase tracking-[0.32em] text-[#C6A47F]">
            SNAPOPS
          </p>

          <p className="mt-2 font-serif text-[34px] text-white">
            AI
          </p>

        </div>

      </div>

    </div>
  );
}