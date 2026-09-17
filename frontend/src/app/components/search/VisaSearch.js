"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, ShieldCheck, User, Search, FileText, Plus, Minus } from "lucide-react";

export default function VisaSearch({ onSearch }) {
  const router = useRouter();

  const [passportCountry, setPassportCountry] = useState("Pakistan");
  const [destCountry, setDestCountry] = useState("United Arab Emirates (Dubai 30 Days)");
  const [visaType, setVisaType] = useState("Tourist Visa");

  const [isDestOpen, setIsDestOpen] = useState(false);
  const [destQuery, setDestQuery] = useState("");

  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [applicants, setApplicants] = useState(1);

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

  const visaDestinations = [
    { country: "United Arab Emirates", detail: "Dubai 30 / 60 Days E-Visa", flag: "🇦🇪" },
    { country: "Saudi Arabia", detail: "Umrah / Tourist E-Visa 1 Year", flag: "🇸🇦" },
    { country: "United Kingdom", detail: "Standard Visitor Visa 6 Months", flag: "🇬🇧" },
    { country: "Turkey", detail: "E-Visa 30 Days Single Entry", flag: "🇹🇷" },
    { country: "Thailand", detail: "Tourist Visa On Arrival / Sticker", flag: "🇹🇭" },
    { country: "Malaysia", detail: "E-Visa 30 Days", flag: "🇲🇾" },
    { country: "Schengen Area (Europe)", detail: "Tourist C-Type Visa", flag: "🇪🇺" },
    { country: "United States", detail: "B1/B2 Tourist Visitor Visa", flag: "🇺🇸" },
    { country: "Canada", detail: "Visitor Visa V-1", flag: "🇨🇦" },
  ];

  const filteredVisas = destQuery
    ? visaDestinations.filter(
        (v) =>
          v.country.toLowerCase().includes(destQuery.toLowerCase()) ||
          v.detail.toLowerCase().includes(destQuery.toLowerCase())
      )
    : visaDestinations;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const data = { passportCountry, destCountry, visaType, applicants };
    if (onSearch) onSearch(data);
    router.push(
      `/search_vertical/visa?passport=${encodeURIComponent(passportCountry)}&dest=${encodeURIComponent(destCountry)}&type=${encodeURIComponent(visaType)}&applicants=${applicants}`
    );
  };

  return (
    <div className="w-full bg-white space-y-4">
      {/* Visa Category Header Pills */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          {["Tourist Visa", "Business Visa", "Family Visit", "Student Visa"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setVisaType(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                visaType === type
                  ? "bg-[#191e3b] text-white font-bold shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="text-xs font-bold text-[#007837] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Fast Visa Processing
        </span>
      </div>

      {/* Main Search Row */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-2.5 w-full">
          
          {/* 1. Passport Country */}
          <div className="relative flex-1 w-full min-w-0">
            <div className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white border border-gray-400 rounded-xl">
              <Globe className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Passport Country</div>
                <select
                  value={passportCountry}
                  onChange={(e) => setPassportCountry(e.target.value)}
                  className="w-full text-sm font-bold text-[#191e3b] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="Pakistan">🇵🇰 Pakistan</option>
                  <option value="India">🇮🇳 India</option>
                  <option value="United Arab Emirates">🇦🇪 UAE</option>
                  <option value="United Kingdom">🇬🇧 UK</option>
                  <option value="United States">🇺🇸 USA</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Destination Country for Visa */}
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
              <FileText className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Visa Destination</div>
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
                    placeholder="Search destination country..."
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto space-y-0.5">
                  {filteredVisas.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDestCountry(`${v.country} (${v.detail})`);
                        setIsDestOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-blue-50/70 rounded-xl text-left transition-colors"
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

          {/* 3. Applicants */}
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
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Applicants</div>
                <div className="text-sm font-bold text-[#191e3b] truncate leading-snug">
                  {applicants} applicant{applicants > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {isTravelersOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#191e3b]">Applicants</div>
                    <div className="text-xs text-gray-400">Total passport holders</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button type="button" disabled={applicants <= 1} onClick={() => setApplicants(applicants - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 disabled:opacity-30">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center text-sm font-bold">{applicants}</span>
                    <button type="button" disabled={applicants >= 10} onClick={() => setApplicants(applicants + 1)}
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
            aria-label="Search visa requirements"
            className="w-12 h-12 rounded-full bg-[#006ce4] hover:bg-[#0057b8] text-white flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
}
