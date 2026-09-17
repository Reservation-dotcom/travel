"use client";

import Link from "next/link";

export default function AnniversarySaleBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-6">
      <div className="bg-[#0b1124] rounded-2xl text-white px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg border border-slate-800">
        
        {/* Left Side: Tag Icon + Text */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
          {/* Cyan Discount Coupon Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[#0b1124] shrink-0 shadow-md">
            <svg className="w-7 h-7 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V5a2 2 0 012-2z" />
              <circle cx="13" cy="11" r="1.5" fill="currentColor" />
              <circle cx="9" cy="15" r="1.5" fill="currentColor" />
              <path d="M14 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-normal font-normal">
              30th Anniversary Sale: <span className="font-serif">Members save up to 30%</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
              Enjoy savings on select hotels and vacation rentals.
            </p>
          </div>
        </div>

        {/* Right Side: Book now button */}
        <div className="w-full md:w-auto flex justify-end shrink-0">
          <Link
            href="/stays"
            className="w-full md:w-auto text-center px-6 py-2.5 bg-[#006ce4] hover:bg-[#0057b8] text-white font-semibold text-sm rounded-full transition-all shadow-md active:scale-95"
          >
            Book now
          </Link>
        </div>

      </div>
    </section>
  );
}
