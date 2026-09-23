"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import EnquiryHeroForm from "../components/search/EnquiryHeroForm";
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

  // Famous international hotel stays with rich travel details
  const initialHotels = [
    {
      id: "saudi-1",
      name: "The Ritz-Carlton, Riyadh",
      location: "Riyadh, Saudi Arabia",
      country: "Saudi Arabia",
      countryFlag: "🇸🇦",
      flagImage: "https://flagcdn.com/w160/sa.png",
      type: "hotels",
      breakfastIncluded: true,
      pool: true,
      airportShuttle: true,
      freeWifi: true,
      rating: 9.4,
      ratingText: "Exceptional",
      reviewCount: 1324,
      discountTag: "60% OFF",
      nightlyPrice: 299,
      originalTotal: 820,
      totalPrice: 299,
      phone: "+966 11 800 8888",
      whatsapp: "+966555123456",
      features: ["Royal spa", "Sky lounge", "Private valet"],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "italy-1",
      name: "Hotel Eden Rome",
      location: "Rome, Italy",
      country: "Italy",
      countryFlag: "🇮🇹",
      flagImage: "https://flagcdn.com/w160/it.png",
      type: "hotels",
      breakfastIncluded: true,
      pool: false,
      airportShuttle: true,
      freeWifi: true,
      rating: 9.2,
      ratingText: "Exceptional",
      reviewCount: 980,
      discountTag: "60% OFF",
      nightlyPrice: 289,
      originalTotal: 760,
      totalPrice: 289,
      phone: "+39 06 4784 8888",
      whatsapp: "+393331234567",
      features: ["Historic charm", "Rooftop terrace", "Fine dining"],
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "france-1",
      name: "Le Bristol Paris",
      location: "Paris, France",
      country: "France",
      countryFlag: "🇫🇷",
      flagImage: "https://flagcdn.com/w160/fr.png",
      type: "hotels",
      breakfastIncluded: true,
      pool: true,
      airportShuttle: false,
      freeWifi: true,
      rating: 9.5,
      ratingText: "Exceptional",
      reviewCount: 1140,
      discountTag: "60% OFF",
      nightlyPrice: 349,
      originalTotal: 920,
      totalPrice: 349,
      phone: "+33 1 4567 9000",
      whatsapp: "+33611223344",
      features: ["Luxury spa", "Garden retreat", "VIP concierge"],
      images: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "swiss-1",
      name: "Bürgenstock Resort",
      location: "Lake Lucerne, Switzerland",
      country: "Switzerland",
      countryFlag: "🇨🇭",
      flagImage: "https://flagcdn.com/w160/ch.png",
      type: "homes",
      breakfastIncluded: true,
      pool: true,
      airportShuttle: true,
      freeWifi: true,
      rating: 9.3,
      ratingText: "Exceptional",
      reviewCount: 875,
      discountTag: "60% OFF",
      nightlyPrice: 319,
      originalTotal: 880,
      totalPrice: 319,
      phone: "+41 41 612 5000",
      whatsapp: "+41791234567",
      features: ["Lake view", "Thermal spa", "Panoramic gym"],
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    {
      id: "turkey-1",
      name: "The Peninsula Istanbul",
      location: "Istanbul, Turkey",
      country: "Turkey",
      countryFlag: "🇹🇷",
      flagImage: "https://flagcdn.com/w160/tr.png",
      type: "hotels",
      breakfastIncluded: true,
      pool: true,
      airportShuttle: true,
      freeWifi: true,
      rating: 9.1,
      ratingText: "Exceptional",
      reviewCount: 1045,
      discountTag: "60% OFF",
      nightlyPrice: 279,
      originalTotal: 700,
      totalPrice: 279,
      phone: "+90 212 355 9010",
      whatsapp: "+905551234567",
      features: ["Bosporus view", "Infinity pool", "Turkish bath"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1560200353-ce0a95ef1641?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
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
  }, [activeTab, propertyNameQuery, selectedRating, maxPrice, selectedAmenities, sortBy, initialHotels]);

  const toggleAmenity = (key) => {
    setSelectedAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b]">
      
      {/* ── 1. Expedia Top Header ── */}
      <Header />

      {/* ── 2. Enquiry Hero Form ── */}
      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
        pageType="Stay"
      />

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
          <section className="md:col-span-6 lg:col-span-9 space-y-4">
            
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
