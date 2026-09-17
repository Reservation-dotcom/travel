"use client";

import { useState } from "react";
import { Plane, Info } from "lucide-react";

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 mb-3.5 group cursor-pointer text-[#191e3b]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left Side: Logo + Times + Duration */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          
          {/* Branded Airline Logo Badge */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs ${
              flight.airlineColor || "bg-red-600"
            }`}
          >
            {flight.airlineLogoText || "FJ"}
          </div>

          {/* Flight Details */}
          <div className="flex-1 min-w-0">
            {/* Departure & Arrival Times with connecting line */}
            <div className="flex items-center gap-3">
              <span className="text-base sm:text-lg font-bold text-[#191e3b]">
                {flight.departureTime}
              </span>
              
              <div className="relative flex-1 max-w-[120px] sm:max-w-[160px] h-[2px] bg-gray-300 my-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400" />
              </div>

              <span className="text-base sm:text-lg font-bold text-[#191e3b]">
                {flight.arrivalTime}
              </span>
            </div>

            {/* Airport Route & Airline Name */}
            <div className="text-xs text-gray-500 font-semibold mt-1 truncate">
              <span>{flight.originCode || "LHE"} - {flight.destCode || "ISB"}</span>
              <span className="mx-1.5">•</span>
              <span className="text-gray-700 font-bold">{flight.airline}</span>
            </div>
          </div>
        </div>

        {/* Middle: Duration & Nonstop Badge */}
        <div className="text-left sm:text-center sm:px-4 shrink-0">
          <div className="text-xs font-bold text-[#007837] flex items-center gap-1">
            <span>{flight.duration}</span>
            <span>•</span>
            <span>{flight.stops || "Nonstop"}</span>
          </div>
          <div className="text-[11px] text-gray-400 font-medium mt-0.5">
            {flight.flightNumber || "Direct"}
          </div>
        </div>

        {/* Right Side: Price & Per traveler info */}
        <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto flex sm:block items-center justify-between">
          <div>
            <div className={`text-xl sm:text-2xl font-bold tracking-tight ${flight.isLowest ? "text-[#007837]" : "text-[#191e3b]"}`}>
              ${flight.price}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              {flight.tripLabel || "Roundtrip per traveler"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
