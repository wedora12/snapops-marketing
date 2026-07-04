export default function Header() {
    return (
      <header className="fixed inset-x-0 top-0 z-50 pt-8">
        <div className="mx-auto flex w-[92%] max-w-[1320px] items-center justify-between rounded-full border border-[#ECE7E0]/80 bg-white/70 px-8 py-5 backdrop-blur-2xl">
  
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D3539] text-sm font-bold text-white">
              S
            </div>
  
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-[#1D3539]">
                SnapOps
              </h2>
              <p className="-mt-1 text-xs text-[#8B8B8B]">
                Wedding Studio OS
              </p>
            </div>
          </div>
  
          <nav className="hidden items-center gap-10 text-[15px] font-medium text-[#667085] md:flex">
            <a href="#problem" className="hover:text-[#1D3539]">Problem</a>
            <a href="#product" className="hover:text-[#1D3539]">Product</a>
            <a href="#pricing" className="hover:text-[#1D3539]">Pricing</a>
            <a href="#faq" className="hover:text-[#1D3539]">FAQ</a>
          </nav>
  
          <button className="rounded-full bg-[#1D3539] px-6 py-3 text-sm font-semibold text-white transition hover:scale-105">
            Join Waitlist
          </button>
  
        </div>
      </header>
    );
  }