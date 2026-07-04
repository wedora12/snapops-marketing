import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  title: string;
  meta: string;
  icon: LucideIcon;
  className: string;
};

export default function FloatingCard({
  label,
  title,
  meta,
  icon: Icon,
  className,
}: Props) {
  return (
    <div
      className={`
        absolute
        hidden
        xl:flex
        w-[300px]
        rounded-[28px]
        border
        border-[#ECE7E0]
        bg-white
        p-5
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        backdrop-blur-sm
        float-slow
        ${className}
      `}
    >
      <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4EEE7]">
        <Icon className="h-7 w-7 text-[#1D3539]" />
      </div>

      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B48B5A]">
          {label}
        </p>

        <h3 className="mt-2 text-lg font-semibold text-[#1D3539]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-[#7B7B7B]">
          {meta}
        </p>
      </div>
    </div>
  );
}