const deskItems = [
    {
      eyebrow: "WHATSAPP",
      title: "Rahul & Sneha",
      text: "Available on Dec 12?",
      className: "left-[4%] top-[8%] -rotate-6",
    },
    {
      eyebrow: "PAYMENT",
      title: "₹25,000 Pending",
      text: "Due before wedding week.",
      className: "right-[8%] top-[16%] rotate-5",
    },
    {
      eyebrow: "ALBUM",
      title: "143 Photos Waiting",
      text: "Client approval pending.",
      className: "left-[13%] top-[48%] rotate-3",
    },
    {
      eyebrow: "TIMELINE",
      title: "Wedding Tomorrow",
      text: "Crew plan not finalized.",
      className: "right-[15%] top-[52%] -rotate-4",
    },
    {
      eyebrow: "CALL",
      title: "Bride's Father",
      text: "Called twice today.",
      className: "left-[42%] bottom-[8%] -rotate-2",
    },
  ];
  
  export default function Scene02EditorialDesk() {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#F7F5F2] px-6 py-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#B48B5A]">
            A NORMAL WEDDING DAY
          </p>
  
          <h2 className="mx-auto mt-6 max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-[#1D3539] md:text-7xl">
            Everything is important.
            <br />
            Nothing lives together.
          </h2>
        </div>
  
        <div className="relative mx-auto mt-24 h-[620px] max-w-6xl">
          {deskItems.map((item) => (
            <div
              key={item.eyebrow}
              className={`absolute w-[300px] rounded-[30px] border border-[#E8E3DC] bg-white p-6 shadow-[0_35px_90px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:rotate-0 ${item.className}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B48B5A]">
                {item.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-[#1D3539]">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-[#667085]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }