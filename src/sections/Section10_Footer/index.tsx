import Link from "next/link";

import { navigation } from "@/content";

export default function Section10Footer() {
  return (
    <footer className="relative bg-[#1D3539] px-8 py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-[13px] text-[#F7F5F2]/50">
          &copy; {new Date().getFullYear()} SnapOps AI. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[#F7F5F2]/60">
          {navigation.footer.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="transition-colors hover:text-[#F7F5F2]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
