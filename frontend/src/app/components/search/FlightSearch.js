"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlaneTakeoff, PlaneLanding, Calendar, User, Search, ArrowRightLeft, X, ChevronDown, Plus, Minus } from "lucide-react";
import DatePickerModal from "./DatePickerModal";

export default function FlightSearch({ onSearch }) {
  const router = useRouter();

  const [tripType, setTripType] = useState("roundtrip");
  const [origin, setOrigin] = useState("Lahore (LHE)");
  const [destination, setDestination] = useState("Dubai (DXB)");
  const [cabinClass, setCabinClass] = useState("Economy");

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");

  const [dateDisplay, setDateDisplay] = useState("Wed, Sep 16 - Fri, Sep 18");
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const originRef = useRef(null);
  const destRef = useRef(null);
  const dateRef = useRef(null);
  const travelersRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (originRef.current && !originRef.current.contains(e.target)) setIsOriginOpen(false);
      if (destRef.current && !destRef.current.contains(e.target)) setIsDestOpen(false);
      if (dateRef.current && !dateRef.current.contains(e.target)) setIsDateOpen(false);
      if (travelersRef.current && !travelersRef.current.contains(e.target)) setIsTravelersOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const popularAirports = [
    { city: "Lahore", code: "LHE", airport: "Allama Iqbal Intl", country: "Pakistan" },
    { city: "Islamabad", code: "ISB", airport: "Islamabad Intl", country: "Pakistan" },
    { city: "Karachi", code: "KHI", airport: "Jinnah Intl", country: "Pakistan" },
    { city: "Dubai", code: "DXB", airport: "Dubai Intl", country: "UAE" },
    { city: "New York", code: "JFK", airport: "John F. Kennedy Intl", country: "USA" },
    { city: "London", code: "LHR", airport: "Heathrow", country: "UK" },
    { city: "Paris", code: "CDG", airport: "Charles de Gaulle", country: "France" },
    { city: "Tokyo", code: "HND", airport: "Haneda", country: "Japan" },
    { city: "Istanbul", code: "IST", airport: "Istanbul Airport", country: "Turkey" },
    { city: "Bangkok", code: "BKK", airport: "Suvarnabhumi", country: "Thailand" },
  ];

  const filteredOrigin = originQuery
    ? popularAirports.filter(
        (a) =>
          a.city.toLowerCase().includes(originQuery.toLowerCase()) ||
          a.code.toLowerCase().includes(originQuery.toLowerCase())
      )
    : popularAirports;

  const filteredDest = destQuery
    ? popularAirports.filter(
        (a) =>
          a.city.toLowerCase().includes(destQuery.toLowerCase()) ||
          a.code.toLowerCase().includes(destQuery.toLowerCase())
      )
    : popularAirports;

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const data = { origin, destination, dates: dateDisplay, adults, children: childrenCount, cabinClass, tripType };
    if (onSearch) onSearch(data);
    router.push(`/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&dates=${encodeURIComponent(dateDisplay)}`);
  };

  return (
    <div className="w-full bg-white space-y-4">
      {/* ── Top Bar: Trip type pills & Cabin select ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: "roundtrip", label: "Roundtrip" },
            { id: "one-way", label: "One Way" },
            { id: "multi-city", label: "Multi City" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTripType(item.id)}
              className={`px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs transition-all ${
                tripType === item.id
                  ? "bg-[#191e3b] text-white shadow-xs font-bold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Passengers & Class dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="text-[10px] sm:text-xs font-bold bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer"
          >
            <option value="Economy">Economy</option>
            <option value="Premium economy">Premium economy</option>
            <option value="Business class">Business class</option>
            <option value="First class">First class</option>
          </select>
        </div>
      </div>

      {/* ── Main Inputs Row ── */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-2.5 w-full">
          
          {/* 1. Leaving From */}
          <div className="relative flex-1 w-full min-w-0" ref={originRef}>
            <div
              onClick={() => {
                setIsOriginOpen(!isOriginOpen);
                setIsDestOpen(false);
                setIsDateOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isOriginOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <PlaneTakeoff className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Leaving from</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">{origin}</div>
              </div>
            </div>

            {/* Origin Dropdown */}
            {isOriginOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-3">
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search city or airport code..."
                    value={originQuery}
                    onChange={(e) => setOriginQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5">
                  {filteredOrigin.map((a, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setOrigin(`${a.city} (${a.code})`);
                        setIsOriginOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50/70 rounded-xl text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#191e3b] group-hover:text-[#006ce4]">{a.city} ({a.code})</div>
                        <div className="text-[11px] text-gray-400">{a.airport}</div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 group-hover:bg-[#006ce4] group-hover:text-white">
                        {a.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap origin and destination"
            className="p-2.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-transform active:rotate-180 shrink-0 hidden lg:flex items-center justify-center"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* 2. Going To */}
          <div className="relative flex-1 w-full min-w-0" ref={destRef}>
            <div
              onClick={() => {
                setIsDestOpen(!isDestOpen);
                setIsOriginOpen(false);
                setIsDateOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isDestOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <PlaneLanding className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Going to</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">{destination}</div>
              </div>
            </div>

            {/* Destination Dropdown */}
            {isDestOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-3">
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search city or airport code..."
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5">
                  {filteredDest.map((a, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDestination(`${a.city} (${a.code})`);
                        setIsDestOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-blue-50/70 rounded-xl text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#191e3b] group-hover:text-[#006ce4]">{a.city} ({a.code})</div>
                        <div className="text-[11px] text-gray-400">{a.airport}</div>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 group-hover:bg-[#006ce4] group-hover:text-white">
                        {a.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Dates */}
          <div className="relative flex-1 w-full min-w-0" ref={dateRef}>
            <div
              onClick={() => {
                setIsDateOpen(!isDateOpen);
                setIsOriginOpen(false);
                setIsDestOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isDateOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <Calendar className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Dates</div>
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

          {/* 4. Travelers */}
          <div className="relative flex-1 w-full min-w-0" ref={travelersRef}>
            <div
              onClick={() => {
                setIsTravelersOpen(!isTravelersOpen);
                setIsOriginOpen(false);
                setIsDestOpen(false);
                setIsDateOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isTravelersOpen ? "border-[#006ce4] ring-2 ring-[#006ce4]/20" : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <User className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Travelers</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {adults + childrenCount} traveler{adults + childrenCount > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {isTravelersOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4">
                <div className="space-y-3">
                  {[
                    { label: "Adults", sub: "Ages 18+", val: adults, set: setAdults, min: 1, max: 9 },
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
            aria-label="Search flights"
            className="w-12 h-12 rounded-full bg-[#006ce4] hover:bg-[#0057b8] text-white flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
}
