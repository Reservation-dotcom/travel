"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, User, Search, X, Plus, Minus, Sparkles, Building2 } from "lucide-react";
import DatePickerModal from "./DatePickerModal";

export default function UmrahSearch({ onSearch }) {
  const router = useRouter();

  const [origin, setOrigin] = useState("Lahore, Pakistan");
  const [destination, setDestination] = useState("Makkah & Madinah, Saudi Arabia");
  const [packageCategory, setPackageCategory] = useState("5 Star Luxury");

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [originQuery, setOriginQuery] = useState("");

  const [dateDisplay, setDateDisplay] = useState("Wed, Sep 16 - Fri, Sep 28");
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  const originRef = useRef(null);
  const dateRef = useRef(null);
  const travelersRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (originRef.current && !originRef.current.contains(e.target)) setIsOriginOpen(false);
      if (dateRef.current && !dateRef.current.contains(e.target)) setIsDateOpen(false);
      if (travelersRef.current && !travelersRef.current.contains(e.target)) setIsTravelersOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const packageOptions = [
    { full: "5 Star Luxury", short: "5 Star" },
    { full: "4 Star Premium", short: "4 Star" },
    { full: "Economy Saver", short: "Economy" },
  ];

  const departureCities = [
    { city: "Lahore", country: "Pakistan" },
    { city: "Islamabad", country: "Pakistan" },
    { city: "Karachi", country: "Pakistan" },
    { city: "Peshawar", country: "Pakistan" },
    { city: "Dubai", country: "UAE" },
    { city: "London", country: "UK" },
    { city: "New York", country: "USA" },
  ];

  const filteredCities = originQuery
    ? departureCities.filter(
        (c) =>
          c.city.toLowerCase().includes(originQuery.toLowerCase()) ||
          c.country.toLowerCase().includes(originQuery.toLowerCase())
      )
    : departureCities;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const data = { origin, destination, dates: dateDisplay, adults, children: childrenCount, packageCategory };
    if (onSearch) onSearch(data);
    router.push(
      `/umrah`
    );
  };

  return (
    <div className="w-full bg-white space-y-4">
      {/* Package Type Pills Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          {packageOptions.map((option) => (
            <button
              key={option.full}
              type="button"
              onClick={() => setPackageCategory(option.full)}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all ${
                packageCategory === option.full
                  ? "bg-[#191e3b] text-white font-bold shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="hidden md:inline">{option.full}</span>
              <span className="md:hidden">{option.short}</span>
            </button>
          ))}
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-[#006ce4] whitespace-nowrap">
          <span className="hidden md:inline">✨ Umrah Packages 2026</span>
          <span className="md:hidden">✨ Umrah</span>
        </span>
      </div>

      {/* Main Search Row */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-2.5 w-full">
          
          {/* 1. Departure City */}
          <div className="relative flex-1 w-full min-w-0" ref={originRef}>
            <div
              onClick={() => {
                setIsOriginOpen(!isOriginOpen);
                setIsDateOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isOriginOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <MapPin className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="hidden sm:hidden md:block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Departure City</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">{origin}</div>
              </div>
            </div>

            {isOriginOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-3">
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search city..."
                    value={originQuery}
                    onChange={(e) => setOriginQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                  />
                </div>
                <div className="max-h-52 overflow-y-auto space-y-0.5">
                  {filteredCities.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setOrigin(`${c.city}, ${c.country}`);
                        setIsOriginOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50/70 rounded-xl text-left transition-colors"
                    >
                      <span className="text-xs font-bold text-[#191e3b]">{c.city}</span>
                      <span className="text-[11px] text-gray-400">{c.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Destination (Fixed: Makkah & Madinah) */}
          <div className="relative flex-1 w-full min-w-0">
            <div className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl">
              <Building2 className="w-5 h-5 text-[#006ce4] shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="hidden sm:hidden md:block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Holy Destinations</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">{destination}</div>
              </div>
            </div>
          </div>

          {/* 3. Dates */}
          <div className="relative flex-1 w-full min-w-0" ref={dateRef}>
            <div
              onClick={() => {
                setIsDateOpen(!isDateOpen);
                setIsOriginOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isDateOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <Calendar className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="hidden sm:hidden md:block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Travel Dates</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">{dateDisplay}</div>
              </div>
            </div>

            {isDateOpen && (
              <DatePickerModal
                value={dateDisplay}
                onChange={(val) => setDateDisplay(val)}
                onClose={() => setIsDateOpen(false)}
              />
            )}
          </div>

          {/* 4. Pilgrims */}
          <div className="relative flex-1 w-full min-w-0" ref={travelersRef}>
            <div
              onClick={() => {
                setIsTravelersOpen(!isTravelersOpen);
                setIsOriginOpen(false);
                setIsDateOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isTravelersOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <User className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="hidden sm:hidden md:block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Pilgrims</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {adults + childrenCount} pilgrim{adults + childrenCount > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {isTravelersOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4">
                <div className="space-y-3">
                  {[
                    { label: "Adults", sub: "Ages 18+", val: adults, set: setAdults, min: 1, max: 10 },
                    { label: "Children", sub: "Ages 0-17", val: childrenCount, set: setChildrenCount, min: 0, max: 6 },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between ${i > 0 ? "pt-3 border-t border-gray-100" : ""}`}>
                      <div>
                        <div className="text-sm font-bold text-[#191e3b]">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.sub}</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button type="button" disabled={item.val <= item.min} onClick={() => item.set(item.val - 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{item.val}</span>
                        <button type="button" disabled={item.val >= item.max} onClick={() => item.set(item.val + 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
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
            aria-label="Search Umrah packages"
            className="w-12 h-12 rounded-full bg-[#006ce4] hover:bg-[#0057b8] text-white flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
}
