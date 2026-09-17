"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, User, Search, X, Plus, Minus } from "lucide-react";
import DatePickerModal from "./DatePickerModal";

export default function StaySearch({ initialLocation = "Lahore, Punjab, Pakistan", onSearch }) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialLocation);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  const [dateDisplay, setDateDisplay] = useState("Wed, Sep 16 - Fri, Sep 18");
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  const destRef = useRef(null);
  const dateRef = useRef(null);
  const travelersRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (destRef.current && !destRef.current.contains(e.target)) setIsDestinationOpen(false);
      if (dateRef.current && !dateRef.current.contains(e.target)) setIsDateOpen(false);
      if (travelersRef.current && !travelersRef.current.contains(e.target)) setIsTravelersOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const popularDestinations = [
    { name: "Lahore, Punjab", country: "Pakistan" },
    { name: "Islamabad, ICT", country: "Pakistan" },
    { name: "Karachi, Sindh", country: "Pakistan" },
    { name: "Dubai, Dubai Emirate", country: "United Arab Emirates" },
    { name: "New York, New York", country: "United States of America" },
    { name: "London, Greater London", country: "United Kingdom" },
    { name: "Paris, Île-de-France", country: "France" },
    { name: "Tokyo, Tokyo Prefecture", country: "Japan" },
    { name: "Istanbul, Marmara", country: "Turkey" },
    { name: "Bangkok, Central", country: "Thailand" },
  ];

  const filteredDestinations = searchQuery
    ? popularDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularDestinations;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const searchData = {
      location: destination,
      dates: dateDisplay,
      adults,
      children: childrenCount,
      rooms
    };

    if (onSearch) {
      onSearch(searchData);
    }
    
    // Always navigate to /stays if not already on /stays page with query parameters
    const targetUrl = `/stays?destination=${encodeURIComponent(destination)}&dates=${encodeURIComponent(dateDisplay)}&adults=${adults}&children=${childrenCount}&rooms=${rooms}`;
    router.push(targetUrl);
  };

  return (
    <div className="w-full bg-white">
      <form onSubmit={handleSubmit} className="w-full">
        {/* Horizontal Inputs Bar */}
        <div className="flex flex-col md:flex-row items-center gap-2.5 w-full">
          
          {/* 1. Where to? */}
          <div className="relative flex-1 w-full min-w-0" ref={destRef}>
            <div
              onClick={() => {
                setIsDestinationOpen(!isDestinationOpen);
                setIsDateOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isDestinationOpen
                  ? "border-[#006ce4] ring-2 ring-[#006ce4]/20 shadow-sm"
                  : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <MapPin className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[11px] font-semibold text-gray-500 leading-tight">Where to?</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {destination || "Search destination"}
                </div>
              </div>
              {destination && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDestination("");
                    setSearchQuery("");
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Destination Autocomplete Dropdown */}
            {isDestinationOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="relative mb-2.5">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Type city or airport..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1 mb-1">
                  Popular destinations
                </p>
                <div className="max-h-60 overflow-y-auto space-y-0.5">
                  {filteredDestinations.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDestination(`${item.name}, ${item.country}`);
                        setIsDestinationOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50/70 rounded-xl text-left transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-[#006ce4] group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4 shrink-0" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#191e3b] group-hover:text-[#006ce4]">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">{item.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Dates */}
          <div className="relative flex-1 w-full min-w-0" ref={dateRef}>
            <div
              onClick={() => {
                setIsDateOpen(!isDateOpen);
                setIsDestinationOpen(false);
                setIsTravelersOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isDateOpen
                  ? "border-[#006ce4] ring-2 ring-[#006ce4]/20 shadow-sm"
                  : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <Calendar className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[11px] font-semibold text-gray-500 leading-tight">Dates</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {dateDisplay}
                </div>
              </div>
            </div>

            {/* Date Picker Modal */}
            {isDateOpen && (
              <DatePickerModal
                value={dateDisplay}
                onChange={(newVal) => setDateDisplay(newVal)}
                onClose={() => setIsDateOpen(false)}
              />
            )}
          </div>

          {/* 3. Travelers */}
          <div className="relative flex-1 w-full min-w-0" ref={travelersRef}>
            <div
              onClick={() => {
                setIsTravelersOpen(!isTravelersOpen);
                setIsDestinationOpen(false);
                setIsDateOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 bg-white border rounded-xl cursor-pointer transition-all ${
                isTravelersOpen
                  ? "border-[#006ce4] ring-2 ring-[#006ce4]/20 shadow-sm"
                  : "border-gray-400 hover:border-gray-700"
              }`}
            >
              <User className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[11px] font-semibold text-gray-500 leading-tight">Travelers</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {adults + childrenCount} traveler{adults + childrenCount > 1 ? "s" : ""}, {rooms} room
                </div>
              </div>
            </div>

            {/* Travelers Selector Popover */}
            {isTravelersOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-76 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150 text-[#191e3b]">
                <div className="space-y-4">
                  {[
                    { label: "Rooms", sub: "Max 8", val: rooms, set: setRooms, min: 1, max: 8 },
                    { label: "Adults", sub: "Ages 18+", val: adults, set: setAdults, min: 1, max: 14 },
                    { label: "Children", sub: "Ages 0–17", val: childrenCount, set: setChildrenCount, min: 0, max: 6 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between ${
                        i > 0 ? "pt-3.5 border-t border-gray-100" : ""
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-[#191e3b]">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.sub}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={item.val <= item.min}
                          onClick={() => item.set(Math.max(item.min, item.val - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{item.val}</span>
                        <button
                          type="button"
                          disabled={item.val >= item.max}
                          onClick={() => item.set(Math.min(item.max, item.val + 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    Total: {adults + childrenCount} guest(s)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsTravelersOpen(false)}
                    className="px-5 py-2 bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold rounded-full shadow-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Circular Blue Search Button */}
          <button
            type="submit"
            aria-label="Search stays"
            className="w-12 h-12 rounded-full bg-[#006ce4] hover:bg-[#0057b8] text-white flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
}
