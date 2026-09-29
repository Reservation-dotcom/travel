"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Calendar, Utensils, Info, Heart, ChevronLeft, ChevronRight,
  Star, MapPin, Phone, MessageSquareShare, ChevronDown, ChevronUp,
  SlidersHorizontal, Check, Search, Globe, Shield
} from "lucide-react";

const LOVE_HOLIDAY_PACKAGES = [
  {
    id: "lh1",
    name: "Sol Pelícanos Ocas",
    stars: 3,
    location: "Benidorm, Costa Blanca, Spain · Close to the beach",
    lhReviews: "1,008 reviews",
    taReviews: "11,975 reviews",
    datesNights: "12 Dec 2026 · 7 nights",
    boardBasis: "Breakfast included",
    deposit: "£19 pp deposit",
    saving: "Save £33",
    wasPrice: "£346 pp",
    price: "£329 pp",
    rawPrice: 329,
    localFees: "No local fees due",
    badge: "Payday deal",
    image: "https://a.loveholidays.com/fc0/fc01388470419af9e7121145013da903032b1072.jpg?auto=avif%2Cwebp&quality=70&dpr=2&optimize=high&fit=crop&width=350&height=250",
    imageCount: "1/49",
    region: "Costa Blanca",
    promotion: "Payday deal",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "lh2",
    name: "Las Palmeras Hotel affiliated by Fergus",
    stars: 4,
    location: "Fuengirola, Costa del Sol, Spain · Close to the beach",
    lhReviews: "679 reviews",
    taReviews: "2,311 reviews",
    datesNights: "20 Nov 2026 · 7 nights",
    boardBasis: "Breakfast included",
    deposit: "£19 pp deposit",
    saving: "£290 below peak price",
    wasPrice: null,
    price: "£219 pp",
    rawPrice: 219,
    localFees: "No local fees due",
    badge: null,
    image: "https://a.loveholidays.com/hotels/1620/32e830473cbed86f569fe01bb6690b1e2996baec.jpg?auto=avif%2Cwebp&quality=70&dpr=2&optimize=high&fit=crop&width=350&height=250",
    imageCount: "1/84",
    region: "Costa del Sol",
    promotion: null,
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "lh3",
    name: "Melia Benidorm",
    stars: 4,
    location: "Benidorm, Costa Blanca, Spain · 1.3km from the beach",
    lhReviews: "421 reviews",
    taReviews: "7,692 reviews",
    datesNights: "15 Jan 2027 · 7 nights",
    boardBasis: "Breakfast included",
    deposit: "£19 pp deposit",
    saving: "£435 below peak price",
    wasPrice: null,
    price: "£329 pp",
    rawPrice: 329,
    localFees: "No local fees due",
    badge: "Most loved",
    image: "https://a.loveholidays.com/9be/9be926b6b77502eb563d802819bc8d559fd4bb31.jpg?auto=avif%2Cwebp&quality=70&dpr=2&optimize=high&fit=crop&width=350&height=250",
    imageCount: "1/56",
    region: "Costa Blanca",
    promotion: "Most loved",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "lh4",
    name: "Blue Bay Beach Resort",
    stars: 4,
    location: "Ialyssos, Rhodes, Greek Islands · 1.4km from the beach",
    lhReviews: "402 reviews",
    taReviews: "5,454 reviews",
    datesNights: "20 Apr 2027 · 7 nights",
    boardBasis: "All inclusive",
    deposit: "£19 pp deposit",
    saving: "Save £48",
    wasPrice: "£433 pp",
    price: "£409 pp",
    rawPrice: 409,
    localFees: "An additional £31 pp in local fees is due at this hotel, making the total £440 pp.",
    badge: null,
    image: "https://a.loveholidays.com/a45/a453667eba820b332e5d7c6d7d90b02f7a205b3d.jpg?auto=avif%2Cwebp&quality=70&dpr=2&optimize=high&fit=crop&width=350&height=250",
    imageCount: "1/62",
    region: "Rhodes",
    promotion: null,
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "lh5",
    name: "The Ixian Grand & All Suites",
    stars: 5,
    location: "Ixia, Rhodes, Greek Islands · 1.3km from the beach",
    lhReviews: "447 reviews",
    taReviews: "4,951 reviews",
    datesNights: "10 May 2027 · 7 nights",
    boardBasis: "All inclusive",
    deposit: "£19 pp deposit",
    saving: "Save £39",
    wasPrice: "£589 pp",
    price: "£569 pp",
    rawPrice: 569,
    localFees: "An additional £46 pp in local fees is due at this hotel, making the total £615 pp.",
    badge: "Most loved",
    image: "https://a.loveholidays.com/hotels/6230/50e37e9f03726ce6b51e7629684b801cb87434e1.jpg?auto=avif%2Cwebp&quality=70&dpr=2&optimize=high&fit=crop&width=350&height=250",
    imageCount: "1/78",
    region: "Rhodes",
    promotion: "Most loved",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  }
];

function LoveHolidayCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  const locationParts = useMemo(() => {
    const split = item.location.split("·");
    return {
      area: split[0] ? split[0].trim() : item.location,
      beach: split[1] ? split[1].trim() : ""
    };
  }, [item.location]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">

      {/* ── LEFT IMAGE AREA ── */}
      <div className="relative w-full h-56 sm:h-60 md:w-72 lg:w-80 md:h-auto shrink-0 overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Left Badge (Payday deal / Most loved) */}
        {item.badge && (
          <span
            className={`absolute top-3 left-3 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md backdrop-blur-xs tracking-wide ${item.badge === "Payday deal" ? "bg-[#e6005c]" : "bg-[#c4004f]"
              }`}
          >
            {item.badge}
          </span>
        )}

        {/* Top Right Heart Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Save to favorites"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-rose-600 flex items-center justify-center shadow-md border border-gray-200/50 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600 text-rose-600" : ""}`} />
        </button>

        {/* Image Navigation Arrows (Hover) */}
        <button
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Image Count Badge */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
          {item.imageCount}
        </span>
      </div>

      {/* ── RIGHT CONTENT AREA ── */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-4">
        <div>
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#191e3b] leading-tight">
                {item.name}
                <span className="inline-flex items-center gap-0.5 ml-2 text-amber-500 align-middle">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </span>
              </h3>

              {/* Location & Beach distance */}
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1 flex-wrap">
                <span>{locationParts.area}</span>
                {locationParts.beach && (
                  <>
                    <span>·</span>
                    <span className="text-[#006ce4] font-semibold hover:underline cursor-pointer">
                      {locationParts.beach}
                    </span>
                  </>
                )}
              </div>

              {/* Review Ratings Line */}
              <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-600 flex-wrap">
                {/* LoveHolidays Smile Rating */}
                <div className="flex items-center gap-1 font-medium">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[9px] font-black">♥</span>
                  <span className="flex gap-0.5 text-rose-500 text-xs">••••○</span>
                  <span className="text-gray-700 font-bold ml-0.5">{item.lhReviews}</span>
                </div>
                {/* TripAdvisor Rating */}
                <div className="flex items-center gap-1 font-medium">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">🦉</span>
                  <span className="flex gap-0.5 text-emerald-600 text-xs">••••○</span>
                  <span className="text-gray-700 font-bold ml-0.5">{item.taReviews}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Pricing Box */}
          <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">

            {/* Left Info Column */}
            <div className="space-y-2 text-xs text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                <span>{item.datesNights}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-gray-500 shrink-0" />
                <span>{item.boardBasis}</span>
              </div>
              {/* Note: Flights line completely removed as requested */}
            </div>

            {/* Right Pricing Column */}
            <div className="text-left sm:text-right space-y-1">
              {/* Badges */}
              <div className="flex items-center justify-start sm:justify-end gap-1.5 flex-wrap">
                <span className="bg-blue-50 text-[#006ce4] text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-100">
                  {item.deposit}
                </span>
                {item.saving && (
                  <span className="bg-[#e6005c] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
                    {item.saving}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="pt-1">
                <span className="text-xs text-gray-500 mr-1.5 font-semibold">From</span>
                {item.wasPrice && (
                  <span className="text-xs text-gray-400 line-through mr-1 font-medium">
                    Was {item.wasPrice}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black text-[#191e3b] inline-block align-baseline">
                  {item.price}
                </span>
              </div>

              {/* Local fees note */}
              <div className="text-[11px] text-gray-500 flex items-center justify-start sm:justify-end gap-1 leading-tight">
                <span>{item.localFees}</span>
                <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM ACTION BAR: Contact Phone & WhatsApp (Replaces View Deal Button) ── */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          {item.phone && (
            <a
              href={`tel:${item.phone}`}
              aria-label={`Call ${item.phone}`}
              className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 hover:border-[#006ce4] text-[#191e3b] hover:text-[#006ce4] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-[#006ce4]"
            >
              <Phone className="w-3.5 h-3.5 text-[#006ce4] shrink-0" />
              <span className="hidden sm:inline">{item.phone}</span>
            </a>
          )}

          {item.whatsapp && (
            <a
              href={item.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              className="px-3 py-2 sm:px-5 sm:py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5"
            >
              <MessageSquareShare className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

function LoveHolidayContent() {
  const [priceMode, setPriceMode] = useState("pp"); // "pp" or "total"
  const [sortBy, setSortBy] = useState("recommended");

  // Accordion Section Toggle States
  const [isPopularOpen, setIsPopularOpen] = useState(true);
  const [isPromotionsOpen, setIsPromotionsOpen] = useState(true);
  const [isRegionsOpen, setIsRegionsOpen] = useState(true);

  // Filter Selection States
  const [selectedPopular, setSelectedPopular] = useState([]);
  const [selectedPromos, setSelectedPromos] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const togglePopularFilter = (filter) => {
    setSelectedPopular((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const togglePromo = (promo) => {
    setSelectedPromos((prev) =>
      prev.includes(promo) ? prev.filter((p) => p !== promo) : [...prev, promo]
    );
  };

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const popularFiltersList = [
    "4-star hotel",
    "5-star hotel",
    "4+ Tripadvisor rating",
    "All inclusive",
    "Beach",
    "Payday deal"
  ];

  const promotionsList = [
    { name: "Payday deal", count: 486 },
    { name: "Most loved", count: 171 },
    { name: "Free child stays", count: 94 }
  ];

  const popularRegionsList = [
    { name: "Costa Blanca", count: 334 },
    { name: "Costa del Sol", count: 448 },
    { name: "Rhodes", count: 189 },
    { name: "Greek Islands", count: 250 }
  ];

  // Filtering Logic
  const filteredPackages = useMemo(() => {
    return LOVE_HOLIDAY_PACKAGES.filter((item) => {
      // Popular filters
      if (selectedPopular.includes("4-star hotel") && item.stars !== 4) return false;
      if (selectedPopular.includes("5-star hotel") && item.stars !== 5) return false;
      if (selectedPopular.includes("All inclusive") && item.boardBasis !== "All inclusive") return false;
      if (selectedPopular.includes("Payday deal") && item.badge !== "Payday deal") return false;

      // Promotions filter
      if (selectedPromos.length > 0) {
        if (!selectedPromos.includes(item.badge) && !(selectedPromos.includes(item.promotion))) {
          return false;
        }
      }

      // Regions filter
      if (selectedRegions.length > 0 && !selectedRegions.includes(item.region)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.rawPrice - b.rawPrice;
      if (sortBy === "rating") return b.stars - a.stars;
      return 0;
    });
  }, [selectedPopular, selectedPromos, selectedRegions, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#191e3b] relative font-sans">
      <Header />

      {/* Hero Form Section */}
      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        pageType="Love Holiday"
      />

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* ────────────────── LEFT SIDEBAR FILTERS (xlg & lg sidebar) ────────────────── */}
          <aside className="md:col-span-12 lg:col-span-12 space-y-4">

            {/* Price Per Person / Total Price Toggle */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Price Per Person</span>
              <button
                onClick={() => setPriceMode(priceMode === "pp" ? "total" : "pp")}
                aria-label="Toggle price mode"
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${priceMode === "total" ? "bg-[#006ce4]" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${priceMode === "total" ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
              <span className="text-xs font-bold text-gray-700">Total Price</span>
            </div>

            {/* Popular Filters Accordion */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
              <button
                onClick={() => setIsPopularOpen(!isPopularOpen)}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[#191e3b] hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                  <span>Popular filters</span>
                </div>
                {isPopularOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              {isPopularOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {popularFiltersList.map((filter) => {
                      const isSelected = selectedPopular.includes(filter);
                      return (
                        <button
                          key={filter}
                          onClick={() => togglePopularFilter(filter)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${isSelected
                            ? "bg-[#191e3b] text-white border-[#191e3b]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Promotions Accordion */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
              <button
                onClick={() => setIsPromotionsOpen(!isPromotionsOpen)}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[#191e3b] hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span>Promotions</span>
                </div>
                {isPromotionsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              {isPromotionsOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 space-y-3">
                  {promotionsList.map((promo) => {
                    const isChecked = selectedPromos.includes(promo.name);
                    return (
                      <label
                        key={promo.name}
                        className="flex items-center justify-between text-xs font-semibold text-gray-700 cursor-pointer hover:text-black"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePromo(promo.name)}
                            className="w-4 h-4 rounded text-[#006ce4] focus:ring-[#006ce4] border-gray-300"
                          />
                          <span>{promo.name}</span>
                        </div>
                        <span className="text-gray-400 font-normal">{promo.count}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Popular Regions Accordion */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
              <button
                onClick={() => setIsRegionsOpen(!isRegionsOpen)}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-[#191e3b] hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span>Popular regions</span>
                </div>
                {isRegionsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              {isRegionsOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 space-y-3">
                  {popularRegionsList.map((reg) => {
                    const isChecked = selectedRegions.includes(reg.name);
                    return (
                      <label
                        key={reg.name}
                        className="flex items-center justify-between text-xs font-semibold text-gray-700 cursor-pointer hover:text-black"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRegion(reg.name)}
                            className="w-4 h-4 rounded text-[#006ce4] focus:ring-[#006ce4] border-gray-300"
                          />
                          <span>{reg.name}</span>
                        </div>
                        <span className="text-gray-400 font-normal">{reg.count}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

          </aside>

          {/* ────────────────── RIGHT CARDS LIST SECTION ────────────────── */}
          <section className="md:col-span-12 lg:col-span-12 space-y-4">

            {/* Results Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h1 className="text-lg font-black text-[#191e3b]">
                  {filteredPackages.length} Love Holiday Packages Available
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Best price guarantee on hand-picked luxury resorts & beach holidays
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-2xs w-full sm:w-auto"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Cards List */}
            {filteredPackages.length > 0 ? (
              <div className="space-y-4">
                {filteredPackages.map((item) => (
                  <LoveHolidayCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#191e3b]">No holiday options match your filters</h3>
                <p className="text-xs text-gray-500">Try adjusting your region or filter options.</p>
                <button
                  onClick={() => {
                    setSelectedPopular([]);
                    setSelectedPromos([]);
                    setSelectedRegions([]);
                  }}
                  className="px-5 py-2 bg-[#191e3b] text-white text-xs font-bold rounded-full hover:bg-black"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </section>

        </div>
      </main>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

export default function LoveHolidaySearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f6f2]" />}>
      <LoveHolidayContent />
    </Suspense>
  );
}