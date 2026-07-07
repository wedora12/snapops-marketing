"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { sectionCopy, photo, founderNote, timelineSteps } from "./constants";

// Tries to load the real photo; if it 404s (not added to the project yet),
// falls back to a premium placeholder at the same dimensions instead of a
// broken-image icon. Once the real file exists at public/images/, it just
// loads — no code change needed.
function PhotoOrPlaceholder() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-[8/5] w-full flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-[#C6A47F]/40 bg-[#F7F5F2]/[0.04] shadow-[0_30px_70px_rgba(0,0,0,0.28)]">
        <ImageIcon size={26} strokeWidth={1.5} className="text-[#C6A47F]/70" />
        <div className="text-center">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#F7F5F2]/55">
            Image Placeholder
          </p>
          <p className="mt-1 text-[10.5px] text-[#F7F5F2]/30">
            Recommended 1600 × 1000 — public/images/founder-story.jpg
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={photo.src}
      alt={photo.alt}
      onError={() => setFailed(true)}
      className="aspect-[8/5] w-full rounded-[20px] border border-[#F7F5F2]/10 object-cover shadow-[0_30px_70px_rgba(0,0,0,0.28)]"
    />
  );
}

export default function Section07BuiltInsideStudio() {
  return (
    <section className="relative bg-[#1D3539] px-8 py-24 md:py-32">
      <div className="mx-auto max-w-[1000px] text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#C6A47F]/90">
          {sectionCopy.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-[640px] font-serif text-[34px] font-medium leading-[1.15] text-[#F7F5F2] md:text-[46px]">
          {sectionCopy.headline}
        </h2>
        <div className="mx-auto mt-6 flex max-w-[600px] flex-col gap-4 text-[15px] leading-relaxed text-[#F7F5F2]/70">
          {sectionCopy.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 text-left md:grid-cols-2 md:gap-14">
          <PhotoOrPlaceholder />
          <div className="flex flex-col gap-5">
            <span className="text-[32px] leading-none text-[#C6A47F]">“</span>
            <p className="-mt-4 font-serif text-[20px] italic leading-relaxed text-[#F7F5F2] md:text-[23px]">
              {founderNote.quote}
            </p>
            <p className="text-[13px] font-medium text-[#C6A47F]/90">
              {founderNote.attribution}
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
          {timelineSteps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-2 sm:w-[150px]">
                <span className="h-2 w-2 rounded-full bg-[#C6A47F]" />
                <span className="text-center text-[11.5px] leading-tight text-[#F7F5F2]/60">
                  {step}
                </span>
              </div>
              {i < timelineSteps.length - 1 && (
                <span className="mx-2 hidden h-px w-10 bg-[#F7F5F2]/15 sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
