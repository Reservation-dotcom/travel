"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import EnquiryHeroForm from "../components/search/EnquiryHeroForm";
import FlightCard from "../components/flights/FlightCard";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import { Bell, Info, Search, ShieldCheck, Briefcase, Star } from "lucide-react";

function FlightsContent() {
  const searchParams = useSearchParams();
  const urlOrigin = searchParams.get("origin");
  const urlDest = searchParams.get("destination");
  const urlDates = searchParams.get("dates");

  const [currentOrigin, setCurrentOrigin] = useState(urlOrigin || "Lahore (LHE)");
  const [currentDest, setCurrentDest] = useState(urlDest || "Islamabad (ISB)");
  const [currentDates, setCurrentDates] = useState(urlDates || "Wed, Sep 30 - Wed, Oct 7");

  // Selected date in 7-day matrix strip
  const [selectedMatrixIndex, setSelectedMatrixIndex] = useState(3); // Wed, Sep 30

  // Filter states
  const [watchPrices, setWatchPrices] = useState(false);
  const [nonstopOnly, setNonstopOnly] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState({
    flyJinnah: false,
    pia: false,
    airblue: false,
  });
  const [basicEconomyOnly, setBasicEconomyOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    if (urlOrigin) setCurrentOrigin(urlOrigin);
    if (urlDest) setCurrentDest(urlDest);
    if (urlDates) setCurrentDates(urlDates);
  }, [urlOrigin, urlDest, urlDates]);

  // 7-Day Date Matrix dataset
  const dateMatrix = [
    { day: "Sun, Sep 27", price: 71 },
    { day: "Mon, Sep 28", price: 70 },
    { day: "Tue, Sep 29", price: 70 },
    { day: "Wed, Sep 30", price: 69, isLowest: true },
    { day: "Thu, Oct 1", price: 71 },
    { day: "Fri, Oct 2", price: 70 },
    { day: "Sat, Oct 3", price: 68 },
  ];

  // 4 Realistic Dummy Flights dataset matching screenshot
  const initialFlights = [
    {
      id: "f1",
      airline: "Fly Jinnah",
      airlineCode: "FJ",
      airlineLogoText: "FJ",
      airlineColor: "bg-red-600",
      departureTime: "8:40am",
      arrivalTime: "9:25am",
      originCode: currentOrigin.includes("(") ? currentOrigin.split("(")[1].replace(")", "") : "LHE",
      destCode: currentDest.includes("(") ? currentDest.split("(")[1].replace(")", "") : "ISB",
      duration: "45m",
      stops: "Nonstop",
      price: 69,
      isLowest: true,
      tripLabel: "Roundtrip per traveler",
    },
    {
      id: "f2",
      airline: "Fly Jinnah",
      airlineCode: "FJ",
      airlineLogoText: "FJ",
      airlineColor: "bg-red-600",
      departureTime: "7:25pm",
      arrivalTime: "8:10pm",
      originCode: currentOrigin.includes("(") ? currentOrigin.split("(")[1].replace(")", "") : "LHE",
      destCode: currentDest.includes("(") ? currentDest.split("(")[1].replace(")", "") : "ISB",
      duration: "45m",
      stops: "Nonstop",
      price: 74,
      isLowest: false,
      tripLabel: "Roundtrip per traveler",
    },
    {
      id: "f3",
      airline: "PIA (Pakistan International)",
      airlineCode: "PK",
      airlineLogoText: "PK",
      airlineColor: "bg-emerald-800",
      departureTime: "1:15pm",
      arrivalTime: "2:05pm",
      originCode: currentOrigin.includes("(") ? currentOrigin.split("(")[1].replace(")", "") : "LHE",
      destCode: currentDest.includes("(") ? currentDest.split("(")[1].replace(")", "") : "ISB",
      duration: "50m",
      stops: "Nonstop",
      price: 82,
      isLowest: false,
      tripLabel: "Roundtrip per traveler",
    },
    {
      id: "f4",
      airline: "Airblue",
      airlineCode: "PA",
      airlineLogoText: "PA",
      airlineColor: "bg-[#0057b8]",
      departureTime: "6:00pm",
      arrivalTime: "6:55pm",
      originCode: currentOrigin.includes("(") ? currentOrigin.split("(")[1].replace(")", "") : "LHE",
      destCode: currentDest.includes("(") ? currentDest.split("(")[1].replace(")", "") : "ISB",
      duration: "55m",
      stops: "Nonstop",
      price: 89,
      isLowest: false,
      tripLabel: "Roundtrip per traveler",
    },
  ];

  // Handle Search Trigger from Search Bar
  const handleSearchSubmit = (data) => {
    if (data.origin) setCurrentOrigin(data.origin);
    if (data.destination) setCurrentDest(data.destination);
    if (data.dates) setCurrentDates(data.dates);
  };

  // Filtered & Sorted Flights
  const filteredFlights = useMemo(() => {
    return initialFlights.filter((flight) => {
      if (nonstopOnly && flight.stops !== "Nonstop") return false;
      if (selectedAirlines.flyJinnah && !flight.airline.includes("Fly Jinnah")) return false;
      if (selectedAirlines.pia && !flight.airline.includes("PIA")) return false;
      if (selectedAirlines.airblue && !flight.airline.includes("Airblue")) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "duration") return parseInt(a.duration) - parseInt(b.duration);
      return 0; // default recommended
    });
  }, [nonstopOnly, selectedAirlines, sortBy]);

  const toggleAirline = (key) => {
    setSelectedAirlines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b]">
      
      {/* ── 1. Expedia Top Header ── */}
      <Header />

      {/* ── 2. Enquiry Hero Form ── */}
      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
        pageType="Flight"
      />

      {/* ── 3. Main 3-Column Layout ── */}
      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ════════════ LEFT SIDEBAR (Filters & Watch Prices) ════════════ */}
          <aside className="lg:col-span-3 space-y-5">
            
            {/* 1. Watch Prices Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center shrink-0">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#191e3b]">Watch prices</h4>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Get notified when prices change
                  </p>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setWatchPrices(!watchPrices)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  watchPrices ? "bg-[#191e3b]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    watchPrices ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 2. Filter by Section */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#191e3b]">Filter by</h3>

              {/* Stops Filter */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                  <span>Stops</span>
                  <span className="text-gray-400 font-normal">From</span>
                </div>
                <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-gray-700 hover:text-black">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={nonstopOnly}
                      onChange={(e) => setNonstopOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#006ce4] focus:ring-[#006ce4]"
                    />
                    <span>Nonstop (2)</span>
                  </div>
                  <span className="font-bold text-[#191e3b]">$69</span>
                </label>
              </div>

              {/* Airlines Filter */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                  <span>Airlines</span>
                  <span className="text-gray-400 font-normal">From</span>
                </div>
                <div className="space-y-2">
                  {[
                    { key: "flyJinnah", label: "Fly Jinnah (2)", price: "$69" },
                    { key: "pia", label: "PIA (1)", price: "$82" },
                    { key: "airblue", label: "Airblue (1)", price: "$89" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer text-xs font-medium text-gray-700 hover:text-black">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAirlines[item.key]}
                          onChange={() => toggleAirline(item.key)}
                          className="w-4 h-4 rounded border-gray-300 text-[#006ce4] focus:ring-[#006ce4]"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-bold text-[#191e3b]">{item.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Class Filter */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                  <span>Preferred class</span>
                  <span className="text-gray-400 font-normal">From</span>
                </div>
                <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-gray-700 hover:text-black">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={basicEconomyOnly}
                      onChange={(e) => setBasicEconomyOnly(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#006ce4] focus:ring-[#006ce4]"
                    />
                    <div>
                      <div>Basic economy (2)</div>
                      <div className="text-[10px] text-gray-400">Fares may not include seats or bags</div>
                    </div>
                  </div>
                  <span className="font-bold text-[#191e3b]">$69</span>
                </label>
              </div>

            </div>

          </aside>

          {/* ════════════ CENTER COLUMN (Flight Results) ════════════ */}
          <section className="lg:col-span-6 space-y-4">
            
            {/* 7-Day Date Price Matrix Strip */}
            <div className="grid grid-cols-7 gap-1.5 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs text-center">
              {dateMatrix.map((item, idx) => {
                const isSelected = idx === selectedMatrixIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMatrixIndex(idx)}
                    className={`py-2 px-1 rounded-xl transition-all border ${
                      isSelected
                        ? "border-[#191e3b] bg-white shadow-xs"
                        : "border-gray-200 hover:border-gray-400 bg-gray-50/50"
                    }`}
                  >
                    <div className="text-[10px] font-bold text-gray-600 truncate">{item.day}</div>
                    <div className={`text-xs font-bold mt-0.5 ${item.isLowest ? "text-[#007837]" : "text-[#191e3b]"}`}>
                      ${item.price}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Results Title & Sort Dropdown Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-1 px-1">
              <div>
                <h2 className="text-xl font-bold text-[#191e3b]">Departing flights</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  How our sort order and personalized savings work <Info className="w-3 h-3 inline text-gray-400" />
                </p>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-xs"
                >
                  <option value="recommended">Sort by Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="duration">Duration: Shortest</option>
                </select>
              </div>
            </div>

            {/* 4 Flight Result Cards */}
            {filteredFlights.length > 0 ? (
              <div className="space-y-3">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
                <h3 className="text-base font-bold text-[#191e3b]">No flights match your filters</h3>
                <p className="text-xs text-gray-500">Try clearing some filters to see available flights.</p>
                <button
                  type="button"
                  onClick={() => {
                    setNonstopOnly(false);
                    setSelectedAirlines({ flyJinnah: false, pia: false, airblue: false });
                  }}
                  className="px-4 py-2 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Bundle & Save Promo Banner */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#006ce4] flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191e3b]">
                    Bundle &amp; Save in Islamabad!
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Save up to $974 by booking your flight + stay together <Info className="w-3 h-3 inline text-gray-400" />
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="px-5 py-2.5 bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold rounded-full shadow-xs transition-colors shrink-0"
              >
                Shop flight + stay
              </button>
            </div>

            {/* OneKeyCash Rewards Banner */}
            <div className="bg-[#0a1128] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-[#0a1128] flex items-center justify-center font-black text-xs shrink-0">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs sm:text-sm font-semibold">
                  Earn OneKeyCash on top of air miles when you sign in and book a flight
                </div>
              </div>
              <button
                type="button"
                className="px-5 py-2 bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold rounded-full transition-colors shrink-0"
              >
                Sign in
              </button>
            </div>

          </section>

          {/* ════════════ RIGHT SIDEBAR (Ad Banner) ════════════ */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group">
              
              {/* Ad Header */}
              <div className="p-4 bg-[#003580] text-white text-center">
                <div className="text-lg font-black tracking-widest uppercase font-serif">
                  EXPLORE AFRICA
                </div>
              </div>

              {/* Ocean / Tropical Beach Resort Photo */}
              <div className="relative h-[360px] w-full bg-gray-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Nosy Be Madagascar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-center">
                  <div className="text-sm font-black tracking-wider uppercase">
                    📍 NOSY BE, MADAGASCAR
                  </div>
                </div>
              </div>

              {/* Ethiopian Airlines Footer Banner */}
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-center gap-2">
                <div className="text-xs font-bold text-[#007837]">
                  Ethiopian Airlines
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* ── 4. Expedia Footer ── */}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <FlightsContent />
    </Suspense>
  );
}
