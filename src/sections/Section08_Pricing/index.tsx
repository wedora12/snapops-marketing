import { Check } from "lucide-react";
import { sectionCopy, tiers, allPlansInclude } from "./constants";

export default function Section08Pricing() {
  return (
    <section id="pricing" className="relative bg-[#F7F5F2] px-8 py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#1D3539]/60">
          {sectionCopy.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-[640px] font-serif text-[34px] font-medium leading-[1.15] text-[#1D3539] md:text-[46px]">
          {sectionCopy.headline}
        </h2>
        <p className="mt-3 text-[13px] text-[#1A1814]/65">{sectionCopy.subhead}</p>

        <div className="mt-16 grid grid-cols-1 items-start gap-6 text-left md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-[20px] border p-8 ${
                tier.featured
                  ? "border-[#1D3539] bg-[#1D3539] text-[#F7F5F2] shadow-[0_20px_50px_rgba(29,53,57,0.25)]"
                  : "border-[#1D3539]/8 bg-white text-[#1D3539]"
              }`}
            >
              <p className="text-[15px] font-semibold">
                <span className="mr-1.5">{tier.icon}</span>
                {tier.name}
              </p>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-serif text-[32px] font-medium">{tier.price}</span>
                <span
                  className={`text-[13px] ${
                    tier.featured ? "text-[#F7F5F2]/60" : "text-[#1A1814]/55"
                  }`}
                >
                  {tier.cadence}
                </span>
              </div>
              {tier.annualNote && (
                <p
                  className={`mt-1 text-[12px] ${
                    tier.featured ? "text-[#C6A47F]/90" : "text-[#1A1814]/50"
                  }`}
                >
                  {tier.annualNote}
                </p>
              )}
              <p
                className={`mt-4 text-[13px] leading-relaxed ${
                  tier.featured ? "text-[#F7F5F2]/70" : "text-[#1A1814]/65"
                }`}
              >
                {tier.description}
              </p>

              <div
                className={`mt-6 border-t pt-6 ${
                  tier.featured ? "border-[#F7F5F2]/12" : "border-[#1D3539]/8"
                }`}
              >
                <p
                  className={`text-[11px] font-medium uppercase tracking-[0.14em] ${
                    tier.featured ? "text-[#F7F5F2]/45" : "text-[#1A1814]/40"
                  }`}
                >
                  Limits
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {tier.limits.map((l) => (
                    <li
                      key={l}
                      className={`text-[13px] ${
                        tier.featured ? "text-[#F7F5F2]/70" : "text-[#1A1814]/65"
                      }`}
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`mt-6 border-t pt-6 ${
                  tier.featured ? "border-[#F7F5F2]/12" : "border-[#1D3539]/8"
                }`}
              >
                <p
                  className={`text-[11px] font-medium uppercase tracking-[0.14em] ${
                    tier.featured ? "text-[#F7F5F2]/45" : "text-[#1A1814]/40"
                  }`}
                >
                  What&apos;s included
                </p>
                {tier.includedIntro && (
                  <p
                    className={`mt-3 text-[13px] italic ${
                      tier.featured ? "text-[#F7F5F2]/55" : "text-[#1A1814]/50"
                    }`}
                  >
                    {tier.includedIntro}
                  </p>
                )}
                <ul className="mt-3 flex flex-col gap-2.5">
                  {tier.included.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px]">
                      <Check
                        size={15}
                        strokeWidth={2}
                        className={`mt-0.5 shrink-0 ${
                          tier.featured ? "text-[#C6A47F]" : "text-[#3F6C4E]"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className={`mt-6 text-[12px] italic leading-relaxed ${
                  tier.featured ? "text-[#F7F5F2]/55" : "text-[#1A1814]/50"
                }`}
              >
                Best for: {tier.bestFor}
              </p>

              <a
                href="#"
                className={`mt-8 rounded-full px-5 py-2.5 text-center text-[13px] font-medium transition-opacity hover:opacity-90 ${
                  tier.featured
                    ? "bg-[#F7F5F2] text-[#1D3539]"
                    : "bg-[#1D3539] text-[#F7F5F2]"
                }`}
              >
                {tier.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
          {allPlansInclude.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={14} strokeWidth={2} className="text-[#3F6C4E]" />
              <span className="text-[12.5px] text-[#1A1814]/65">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
