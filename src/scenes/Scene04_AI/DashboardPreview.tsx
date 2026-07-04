"use client";

export default function DashboardPreview() {
  return (
    <div className="mx-auto w-full max-w-[1250px] overflow-hidden rounded-[34px] border border-[#E6DDD1] bg-white shadow-[0_30px_100px_rgba(29,53,57,0.10)]">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#EFE7DC] px-8 py-6">

        <div>
          <p className="text-[12px] uppercase tracking-[0.25em] text-[#A9875F]">
            STUDIO CONTROL ROOM
          </p>

          <h2 className="mt-2 font-serif text-[34px] text-[#1A1814]">
            Good Morning, Bharath
          </h2>
        </div>

        <div className="rounded-full bg-[#EEF4F0] px-5 py-3 text-[14px] font-medium text-[#1D3539]">
          ● Everything on track
        </div>

      </div>

      {/* Metrics */}

      <div className="grid grid-cols-4 gap-5 p-7">

        {[
          ["Hot Leads","6"],
          ["Collections","₹4.2L"],
          ["Upcoming Shoots","12"],
          ["Pending Albums","3"],
        ].map(([title,value])=>(
          <div
            key={title}
            className="rounded-[24px] border border-[#EFE7DC] bg-[#FCFBF8] p-6"
          >
            <p className="text-[13px] uppercase tracking-[0.18em] text-[#A9875F]">
              {title}
            </p>

            <p className="mt-4 font-serif text-[42px] leading-none text-[#1A1814]">
              {value}
            </p>
          </div>
        ))}

      </div>

      {/* Table */}

      <div className="px-7 pb-7">

        <div className="overflow-hidden rounded-[28px] border border-[#EFE7DC]">

          {[
            ["Karan & Soniya","Tomorrow","Booked"],
            ["Rahul & Sneha","Album","Approval"],
            ["Akash & Rachita","Lead","Hot"],
            ["Nigel & Shivani","Delivery","Pending"],
          ].map((row)=>(
            <div
              key={row[0]}
              className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center border-b border-[#EFE7DC] px-6 py-5 last:border-b-0"
            >
              <p className="font-serif text-[24px] text-[#1A1814]">
                {row[0]}
              </p>

              <p className="text-[16px] text-[#6E665D]">
                {row[1]}
              </p>

              <div className="justify-self-end rounded-full bg-[#EEF4F0] px-4 py-2 text-[14px] text-[#1D3539]">
                {row[2]}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}