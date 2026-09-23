"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StaySearch from "../components/search/StaySearch";
import StayCard from "../components/stays/StayCard";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import { Search, MapPin, SlidersHorizontal, Info, ChevronDown, Sparkles, ExternalLink } from "lucide-react";

function StaysContent() {
  const searchParams = useSearchParams();
  const urlDestination = searchParams.get("destination");
  const urlDates = searchParams.get("dates");
  const urlAdults = searchParams.get("adults");

  // Search parameters
  const [currentLocation, setCurrentLocation] = useState(urlDestination || "Lahore, Punjab, Pakistan");
  const [searchCriteria, setSearchCriteria] = useState({
    location: urlDestination || "Lahore, Punjab, Pakistan",
    dates: urlDates || "Wed, Sep 16 - Fri, Sep 18",
    adults: urlAdults ? parseInt(urlAdults, 10) : 2,
    children: 0,
    rooms: 1
  });

  useEffect(() => {
    if (urlDestination) {
      setCurrentLocation(urlDestination);
    }
  }, [urlDestination]);

  // Category tab state
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'hotels', 'homes'

  // Filter states
  const [propertyNameQuery, setPropertyNameQuery] = useState("");
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedRating, setSelectedRating] = useState("any");
  const [selectedAmenities, setSelectedAmenities] = useState({
    breakfast: false,
    pool: false,
    shuttle: false,
    wifi: false
  });
  const [maxPrice, setMaxPrice] = useState(350);

  // 4 Dummy Hotels dataset matching Expedia screenshot
  const initialHotels = [
    {
      id: "1",
      name: "Pearl Continental Lahore",
      location: "Mall Road",
      type: "hotels",
      breakfastIncluded: true,
      pool: true,
      airportShuttle: true,
      freeWifi: true,
      rating: 7.6,
      ratingText: "Good",
      reviewCount: 808,
      discountTag: "$27 off",
      nightlyPrice: 105,
      originalTotal: 272,
      totalPrice: 245,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "2",
      name: "Avari Xpress Gulberg",
      location: "Lahore",
      type: "hotels",
      breakfastIncluded: true,
      pool: false,
      airportShuttle: false,
      freeWifi: true,
      rating: 8.6,
      ratingText: "Excellent",
      reviewCount: 175,
      discountTag: "$72 off",
      nightlyPrice: 63,
      originalTotal: 218,
      totalPrice: 145,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1560200353-ce0a95ef1641?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "3",
      name: "The Nishat Hotel Johar Town",
      location: "Johar Town, Lahore",
      type: "hotels",
      breakfastIncluded: true,
      pool: true,
      airportShuttle: true,
      freeWifi: true,
      rating: 9.2,
      ratingText: "Exceptional",
      reviewCount: 340,
      discountTag: "$45 off",
      nightlyPrice: 120,
      originalTotal: 310,
      totalPrice: 280,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "4",
      name: "Faletti's Hotel Lahore",
      location: "Egerton Road, Lahore",
      type: "homes",
      breakfastIncluded: true,
      pool: false,
      airportShuttle: true,
      freeWifi: true,
      rating: 8.2,
      ratingText: "Very Good",
      reviewCount: 520,
      discountTag: "$30 off",
      nightlyPrice: 85,
      originalTotal: 210,
      totalPrice: 190,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80"
      ]
    }
  ];

  // Handle Search Trigger
  const handleSearchSubmit = (newSearch) => {
    setSearchCriteria(newSearch);
    if (newSearch.location) {
      setCurrentLocation(newSearch.location);
    }
  };

  // Filtered & Sorted Hotels
  const filteredHotels = useMemo(() => {
    return initialHotels.filter((hotel) => {
      // Filter by category tab
      if (activeTab === "hotels" && hotel.type !== "hotels") return false;
      if (activeTab === "homes" && hotel.type !== "homes") return false;

      // Filter by property name input
      if (propertyNameQuery.trim() !== "") {
        const query = propertyNameQuery.toLowerCase();
        if (
          !hotel.name.toLowerCase().includes(query) &&
          !hotel.location.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Filter by rating
      if (selectedRating === "8.5" && hotel.rating < 8.5) return false;
      if (selectedRating === "9.0" && hotel.rating < 9.0) return false;

      // Filter by price
      if (hotel.nightlyPrice > maxPrice) return false;

      // Filter by amenities
      if (selectedAmenities.breakfast && !hotel.breakfastIncluded) return false;
      if (selectedAmenities.pool && !hotel.pool) return false;
      if (selectedAmenities.shuttle && !hotel.airportShuttle) return false;
      if (selectedAmenities.wifi && !hotel.freeWifi) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.nightlyPrice - b.nightlyPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default recommended
    });
  }, [activeTab, propertyNameQuery, selectedRating, maxPrice, selectedAmenities, sortBy]);

  const toggleAmenity = (key) => {
    setSelectedAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b]">
      
      {/* ── 1. Expedia Top Header ── */}
      <Header />

      {/* ── 2. Top Search Section Bar ── */}
      <section className="bg-white border-b border-gray-200 shadow-xs py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <StaySearch initialLocation={currentLocation} onSearch={handleSearchSubmit} />
        </div>
      </section>

      {/* ── 3. Main 3-Column Layout ── */}
      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ════════════ LEFT SIDEBAR (Filters & Map) ════════════ */}
          <aside className="lg:col-span-3 space-y-5">
            
            {/* 1. Map View Card */}
            <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-xs overflow-hidden group">
              <div className="relative h-32 w-full rounded-xl overflow-hidden bg-blue-50">
                {/* Visual Map graphic background */}
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                  alt="Map Location"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-[#006ce4] text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="w-full mt-2 py-2 px-3 text-xs font-bold text-[#006ce4] hover:text-[#0057b8] text-center transition-colors border border-gray-200 hover:border-[#006ce4] rounded-xl flex items-center justify-center gap-1.5"
              >
                <span>View in a map</span>
              </button>
            </div>

            {/* 2. Compare Properties Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-[#191e3b]">Compare properties</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                  Get a side-by-side view of up to 5 properties.
                </p>
              </div>
              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setCompareEnabled(!compareEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  compareEnabled ? "bg-[#191e3b]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    compareEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 3. Search by property name Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2">
              <label className="block text-sm font-bold text-[#191e3b]">
                Search by property name
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Marriott"
                  value={propertyNameQuery}
                  onChange={(e) => setPropertyNameQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006ce4] focus:border-[#006ce4] focus:outline-none"
                />
              </div>
            </div>

            {/* 4. Filter by Section */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#191e3b]">Filter by</h3>

              {/* Price Range Slider */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                  <span>Price per night</span>
                  <span className="text-[#006ce4]">Up to ${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#006ce4] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>$50</span>
                  <span>$350+</span>
                </div>
              </div>

              {/* Guest Rating Filter */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <span className="block text-xs font-bold text-[#191e3b] uppercase tracking-wider">
                  Guest rating
                </span>
                <div className="space-y-1.5">
                  {[
                    { id: "any", label: "Any rating" },
                    { id: "8.5", label: "8.5+ Excellent" },
                    { id: "9.0", label: "9.0+ Exceptional" },
                  ].map((r) => (
                    <label key={r.id} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                      <input
                        type="radio"
                        name="guestRating"
                        checked={selectedRating === r.id}
                        onChange={() => setSelectedRating(r.id)}
                        className="w-4 h-4 text-[#006ce4] focus:ring-[#006ce4]"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <span className="block text-xs font-bold text-[#191e3b] uppercase tracking-wider">
                  Amenities
                </span>
                <div className="space-y-2">
                  {[
                    { key: "breakfast", label: "Breakfast included" },
                    { key: "pool", label: "Pool" },
                    { key: "shuttle", label: "Airport shuttle included" },
                    { key: "wifi", label: "Free WiFi" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-700 hover:text-black">
                      <input
                        type="checkbox"
                        checked={selectedAmenities[item.key]}
                        onChange={() => toggleAmenity(item.key)}
                        className="w-4 h-4 rounded border-gray-300 text-[#006ce4] focus:ring-[#006ce4]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

          </aside>

          {/* ════════════ CENTER COLUMN (Hotels Results) ════════════ */}
          <section className="md:col-span-6 lg:col-span-9 xl:col-span-6 space-y-4">
            
            {/* Category Tabs Pill Bar */}
            <div className="bg-[#eef2f5] p-1 rounded-2xl flex items-center gap-1 w-full border border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "all"
                    ? "bg-white text-[#191e3b] shadow-xs"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span>🛏️</span>
                <span>All stays</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hotels")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "hotels"
                    ? "bg-white text-[#191e3b] shadow-xs"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span>🏢</span>
                <span>Hotels</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("homes")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "homes"
                    ? "bg-white text-[#191e3b] shadow-xs"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span>🏠</span>
                <span>Homes</span>
              </button>
            </div>

            {/* Results Count & Sort Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-1 px-1">
              <div className="text-sm font-bold text-[#191e3b]">
                {filteredHotels.length} properties
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button type="button" className="flex items-center gap-1 text-gray-600 hover:text-[#006ce4] font-medium">
                  <span>How our sort order works</span>
                  <Info className="w-3.5 h-3.5" />
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-xs"
                  >
                    <option value="recommended">Sort by recommended for you</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="rating">Guest rating: high to low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hotel Cards List */}
            {filteredHotels.length > 0 ? (
              <div className="space-y-4">
                {filteredHotels.map((stay) => (
                  <StayCard key={stay.id} stay={stay} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#191e3b]">No properties match your filter</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for a different property name.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPropertyNameQuery("");
                    setSelectedRating("any");
                    setMaxPrice(350);
                    setSelectedAmenities({ breakfast: false, pool: false, shuttle: false, wifi: false });
                  }}
                  className="px-4 py-2 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]"
                >
                  Reset all filters
                </button>
              </div>
            )}

          </section>

          {/* ════════════ RIGHT SIDEBAR (Ad Banner) ════════════ */}
          <aside className="block md:col-span-3 lg:hidden xl:col-span-3 xl:block">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group">
              
              {/* Ad Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="text-sm font-black tracking-widest uppercase text-[#191e3b] font-serif">
                  RIXOS
                </div>
                <span className="text-[10px] text-gray-400 font-medium">HOTELS</span>
              </div>

              {/* Luxury Pool/Ocean Image */}
              <div className="relative h-[340px] w-full bg-gray-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                  alt="Rixos Luxury Resort"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Ad Content Body */}
              <div className="p-5 text-center bg-white space-y-4">
                <p className="text-sm font-medium text-gray-700 leading-relaxed">
                  Rediscover luxury all-inclusive with Rixos in Jeddah
                </p>
                <button
                  type="button"
                  className="w-full py-2.5 px-4 bg-[#191e3b] hover:bg-black text-white text-xs font-bold rounded-full shadow-sm transition-all transform active:scale-95"
                >
                  Learn more
                </button>
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

export default function StaysPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <StaysContent />
    </Suspense>
  );
}
