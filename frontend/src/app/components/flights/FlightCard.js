"use client";

import { Plane, Calendar, Phone, MessageSquareShare, ExternalLink } from "lucide-react";

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 mb-3.5 group text-[#191e3b]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

        {/* Left Side: Origin & Destination & Dates */}
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">

          {/* Plane Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#006ce4] flex items-center justify-center font-bold text-sm shrink-0 shadow-xs border border-blue-100 group-hover:bg-[#006ce4] group-hover:text-white transition-colors duration-300">
            <Plane className="w-6 h-6 shrink-0" />
          </div>

          {/* Flight Details */}
          <div className="flex-1 min-w-0 space-y-1">
            {/* Origin -> Destination Route */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-black text-[#191e3b]">
                {flight.origin} ({flight.originCode})
              </span>
              <span className="text-[#006ce4] font-bold">→</span>
              <span className="text-base sm:text-lg font-black text-[#191e3b]">
                {flight.destination} ({flight.destCode})
              </span>
            </div>

            {/* Travel Dates */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-200">
                <Calendar className="w-3.5 h-3.5" />
                <span>{flight.dates}</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 font-medium">Return Flight Package</span>
            </div>
          </div>
        </div>

        {/* Right Side: Price & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100">

          {/* Price Box */}
          <div className="text-left lg:text-right">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">From</div>
            <div className="text-2xl sm:text-3xl font-black text-[#191e3b] leading-tight">
              {flight.currency || "£"}{flight.price}
              <span className="text-xs font-semibold text-gray-500"> PP</span>
            </div>
          </div>

          {/* Buttons: Book Now + Phone + WhatsApp */}
          <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-wrap">


            <a
              href="tel:02039703003"
              aria-label="Contact Us"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-[#2563EB] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:flex-none sm:rounded-xl sm:text-xs sm:shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span className="whitespace-nowrap sm:hidden">Call Now</span>
              <span className="hidden sm:inline">Call Now</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=447413059890"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:flex-none sm:rounded-xl sm:text-xs"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
