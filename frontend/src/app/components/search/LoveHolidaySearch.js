"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Palmtree, Sun, Heart, Calendar, User, Search, Plus, Minus } from "lucide-react";

export default function LoveHolidaySearch({ onSearch }) {
  const router = useRouter();

  const [destCountry, setDestCountry] = useState("Maldives Beach Resort & Spa");
  const [holidayType, setHolidayType] = useState("All-Inclusive");

  const [isDestOpen, setIsDestOpen] = useState(false);
  const [destQuery, setDestQuery] = useState("");

  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [travelers, setTravelers] = useState(2);

  const destRef = useRef(null);
  const travelersRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (destRef.current && !destRef.current.contains(e.target)) setIsDestOpen(false);
      if (travelersRef.current && !travelersRef.current.contains(e.target)) setIsTravelersOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const holidayTypes = [
    { full: "All-Inclusive", short: "Inclusive" },
    { full: "Luxury Beach", short: "Beach" },
    { full: "City Breaks", short: "City" },
    { full: "Family Resorts", short: "Family" },
  ];

  const holidayDestinations = [
    { country: "Maldives", detail: "Overwater Villas & Private Beach", flag: "🇲🇻" },
    { country: "Bali (Indonesia)", detail: "Ubud Spa & Seminyak Luxury Resorts", flag: "🇮🇩" },
    { country: "Santorini (Greece)", detail: "Caldera Views & Romantic Sunset Suites", flag: "🇬🇷" },
    { country: "Dubai (UAE)", detail: "5-Star Desert Resorts & Palm Jumeirah", flag: "🇦🇪" },
    { country: "Antalya (Turkey)", detail: "Ultra All-Inclusive Beach Resorts", flag: "🇹🇷" },
    { country: "Mallorca (Spain)", detail: "Mediterranean Coastal Retreats", flag: "🇪🇸" },
    { country: "Phuket (Thailand)", detail: "Island Paradise & Luxury Hideaways", flag: "🇹🇭" },
  ];

  const filteredDestinations = destQuery
    ? holidayDestinations.filter(
        (v) =>
          v.country.toLowerCase().includes(destQuery.toLowerCase()) ||
          v.detail.toLowerCase().includes(destQuery.toLowerCase())
      )
    : holidayDestinations;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const data = { destCountry, holidayType, travelers };
    if (onSearch) onSearch(data);
    router.push("/love-holiday");
  };

  return (
    <div className="w-full bg-white space-y-4">
      {/* Category Pills Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          {holidayTypes.map((type) => (
            <button
              key={type.full}
              type="button"
              onClick={() => setHolidayType(type.full)}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all ${
                holidayType === type.full
                  ? "bg-[#191e3b] text-white font-bold shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="hidden md:inline">{type.full}</span>
              <span className="md:hidden">{type.short}</span>
            </button>
          ))}
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-rose-600 flex items-center gap-1 whitespace-nowrap">
          <Heart className="w-3.5 h-3.5 fill-rose-600" />
          <span className="hidden md:inline">Best Price Holiday Guarantee</span>
          <span className="md:hidden">Best Price</span>
        </span>
      </div>

      {/* Main Search Row */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-2.5 w-full">
          
          {/* 1. Destination */}
          <div className="relative flex-1 w-full min-w-0" ref={destRef}>
            <div
              onClick={() => {
                setIsDestOpen(!isDestOpen);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isDestOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <Palmtree className="w-5 h-5 text-rose-500 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="hidden sm:hidden md:block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Holiday Destination</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">{destCountry}</div>
              </div>
            </div>

            {isDestOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-3">
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search holiday destination..."
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5">
                  {filteredDestinations.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDestCountry(`${v.country} (${v.detail})`);
                        setIsDestOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-rose-50/70 rounded-xl text-left transition-colors"
                    >
                      <span className="text-base">{v.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#191e3b]">{v.country}</div>
                        <div className="text-[10px] text-gray-400 truncate">{v.detail}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Travelers */}
          <div className="relative flex-1 w-full min-w-0" ref={travelersRef}>
            <div
              onClick={() => {
                setIsTravelersOpen(!isTravelersOpen);
                setIsDestOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isTravelersOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <User className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="hidden sm:hidden md:block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Guests / Travelers</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {travelers} traveler{travelers > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {isTravelersOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#191e3b]">Guests</div>
                    <div className="text-xs text-gray-400">Adults & Children</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button type="button" disabled={travelers <= 1} onClick={() => setTravelers(travelers - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center text-sm font-bold">{travelers}</span>
                    <button type="button" disabled={travelers >= 10} onClick={() => setTravelers(travelers + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                  <button type="button" onClick={() => setIsTravelersOpen(false)}
                    className="px-4 py-1.5 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            aria-label="Search love holidays"
            className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
}
