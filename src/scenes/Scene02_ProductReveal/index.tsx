export default function Scene02ProductReveal() {
    return (
      <section className="relative bg-[#F8F6F2]">
        {/* Huge breathing space */}
        <div className="h-[35vh]" />
  
        <div className="mx-auto max-w-5xl px-8 text-center">
  
          <p className="mb-5 tracking-[0.35em] text-sm uppercase text-[#C6A47F]">
            PRODUCT
          </p>
  
          <h2 className="text-6xl font-bold leading-none tracking-[-0.05em] text-[#17363B]">
            Meet your studio.
            <br />
            Finally.
          </h2>
  
          <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-500">
            One workspace for inquiries, payments, projects,
            albums, galleries and AI.
          </p>
  
        </div>
  
        {/* Reveal Area */}
  
        <div className="mt-32 overflow-hidden">
  
          <div className="mx-auto max-w-[1450px] rounded-t-[36px] border border-[#E7DED3] bg-white shadow-[0_-40px_120px_rgba(0,0,0,0.08)]">
  
            {/* Browser Bar */}
  
            <div className="flex h-16 items-center border-b border-[#F2ECE5] px-6">
  
              <div className="flex gap-2">
  
                <div className="h-3 w-3 rounded-full bg-[#E7DED3]" />
  
                <div className="h-3 w-3 rounded-full bg-[#E7DED3]" />
  
                <div className="h-3 w-3 rounded-full bg-[#E7DED3]" />
  
              </div>
  
              <div className="mx-auto h-10 w-[420px] rounded-full bg-[#F8F6F2]" />
  
            </div>
  
            {/* Fake Dashboard */}
  
            <div className="h-[850px] bg-gradient-to-b from-white to-[#FAF9F6]" />
  
          </div>
  
        </div>
  
      </section>
    );
  }