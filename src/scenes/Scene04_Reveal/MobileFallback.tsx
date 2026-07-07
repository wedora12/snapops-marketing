import { eyebrow, heroCopy, metrics } from "./constants";

// Mobile fallback for Scene 4 (Reveal). The desktop scene builds a full
// recreated workspace (sidebar, pipeline column, projects list) piece by
// piece over several seconds. Mobile reuses the real headline/subhead
// verbatim and shows the same real metrics as one static grid — no
// construction animation, no sidebar/pipeline/projects recreation.
export default function Scene04MobileFallback() {
  return (
    <section className="relative bg-[#1D3539] px-6 py-20 xl:hidden">
      <div className="mx-auto max-w-[420px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#C6A47F]">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#F7F5F2]">
          {heroCopy.headlineLines.join(" ")}
        </h2>
        <p className="mx-auto mt-4 max-w-[340px] text-[14px] leading-relaxed text-[#F7F5F2]/70">
          {heroCopy.subheadLines.join(" ")}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 rounded-[24px] border border-[#F7F5F2]/10 bg-[#F7F5F2]/[0.04] p-5">
          {metrics.map((m) => (
            <div key={m.id} className="text-left">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#F7F5F2]/45">
                {m.label}
              </p>
              <p
                className={`mt-1.5 text-[19px] font-semibold ${
                  m.tone === "positive" ? "text-[#8FBC9C]" : "text-[#F7F5F2]"
                }`}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
