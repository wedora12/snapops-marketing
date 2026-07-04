"use client";

const cards = [
  {
    title: "Payment Pending",
    value: "₹52,000",
    top: "6%",
    left: "-150px",
    rotate: "-8deg",
  },
  {
    title: "Album Approval",
    value: "Rahul & Sneha",
    top: "24%",
    right: "-180px",
    rotate: "7deg",
  },
  {
    title: "Shoot Tomorrow",
    value: "Karan & Soniya",
    bottom: "18%",
    left: "-170px",
    rotate: "5deg",
  },
  {
    title: "Hot Lead",
    value: "Akash & Rachita",
    bottom: "4%",
    right: "-170px",
    rotate: "-6deg",
  },
];

export default function FloatingCards() {
  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className="absolute w-[220px] rounded-[24px] border border-[#E8DFD3] bg-white p-5 shadow-[0_20px_60px_rgba(29,53,57,0.08)]"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            bottom: card.bottom,
            transform: `rotate(${card.rotate})`,
          }}
        >
          <p className="text-[13px] uppercase tracking-[0.18em] text-[#A9875F]">
            {card.title}
          </p>

          <p className="mt-3 font-serif text-[28px] leading-none text-[#1A1814]">
            {card.value}
          </p>
        </div>
      ))}
    </>
  );
}