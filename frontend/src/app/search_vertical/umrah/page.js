"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import UmrahSearch from "../../components/search/UmrahSearch";
import {
  Search, Star, MapPin, Calendar, Users, CheckCircle2, Clock,
  Plane, Hotel, SlidersHorizontal, ChevronDown, Sparkles, Shield, Phone
} from "lucide-react";

const UMRAH_PACKAGES = [
  {
    id: "u1",
    name: "Al-Safwa Royal Orchid",
    location: "Al-Shisheh District, Makkah (100m from Haram)",
    stars: 5,
    category: "5 Star Luxury",
    duration: "14 Days / 13 Nights",
    nights_makkah: 7,
    nights_madinah: 6,
    airline: "Saudi Airlines",
    flightClass: "Business",
    rating: 9.4,
    ratingText: "Exceptional",
    reviews: 1240,
    pricePerPerson: 2850,
    originalPrice: 3400,
    discount: "PKR 16,000 off",
    badge: "Best Seller",
    includes: ["5-Star Hotel", "Return Flights", "Visa Fees", "Transport", "Guided Ziyarat"],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "u2",
    name: "Swissôtel Makkah",
    location: "Abraj Al-Bait Towers, Adjacent to Masjid Al-Haram",
    stars: 5,
    category: "5 Star Luxury",
    duration: "12 Days / 11 Nights",
    nights_makkah: 6,
    nights_madinah: 5,
    airline: "Emirates",
    flightClass: "Economy",
    rating: 9.1,
    ratingText: "Exceptional",
    reviews: 980,
    pricePerPerson: 2350,
    originalPrice: 2800,
    discount: "PKR 12,500 off",
    badge: "Top Rated",
    includes: ["5-Star Hotel", "Return Flights", "Visa Fees", "Meals (B&D)", "Ziyarat Tour"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "u3",
    name: "Dar Al Tawhid Intercontinental",
    location: "Ajyad Street, Makkah (50m from Haram)",
    stars: 5,
    category: "5 Star Luxury",
    duration: "10 Days / 9 Nights",
    nights_makkah: 5,
    nights_madinah: 4,
    airline: "Qatar Airways",
    flightClass: "Economy",
    rating: 8.8,
    ratingText: "Excellent",
    reviews: 760,
    pricePerPerson: 1950,
    originalPrice: 2300,
    discount: "PKR 9,800 off",
    badge: "Great Value",
    includes: ["5-Star Hotel", "Return Flights", "Visa Fees", "Breakfast", "Group Ziyarat"],
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "u4",
    name: "Madinah Hilton Hotel",
    location: "Central Area, Madinah (200m from Masjid Nabawi)",
    stars: 4,
    category: "4 Star Premium",
    duration: "12 Days / 11 Nights",
    nights_makkah: 6,
    nights_madinah: 5,
    airline: "Fly Dubai",
    flightClass: "Economy",
    rating: 8.4,
    ratingText: "Very Good",
    reviews: 532,
    pricePerPerson: 1650,
    originalPrice: 1950,
    discount: "PKR 8,200 off",
    badge: "Popular",
    includes: ["4-Star Hotel", "Return Flights", "Visa Fees", "Breakfast"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "u5",
    name: "Al Ansar Hotel Madinah",
    location: "Near Masjid Nabawi, Madinah",
    stars: 4,
    category: "4 Star Premium",
    duration: "10 Days / 9 Nights",
    nights_makkah: 5,
    nights_madinah: 4,
    airline: "Air Arabia",
    flightClass: "Economy",
    rating: 7.9,
    ratingText: "Good",
    reviews: 415,
    pricePerPerson: 1250,
    originalPrice: 1480,
    discount: "PKR 5,600 off",
    badge: null,
    includes: ["4-Star Hotel", "Return Flights", "Visa Fees"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "u6",
    name: "Rawabi Al Mashaer Hotel",
    location: "Aziziyah District, Makkah",
    stars: 3,
    category: "Economy Saver",
    duration: "15 Days / 14 Nights",
    nights_makkah: 8,
    nights_madinah: 6,
    airline: "PIA",
    flightClass: "Economy",
    rating: 7.2,
    ratingText: "Good",
    reviews: 310,
    pricePerPerson: 850,
    originalPrice: 1050,
    discount: "PKR 4,200 off",
    badge: "Budget Pick",
    includes: ["3-Star Hotel", "Return Flights", "Visa Fees", "Group Transport"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
  },
];

function UmrahPackageCard({ pkg }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
      {/* Image */}
      <div className="relative w-full sm:w-64 h-52 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {pkg.badge && (
          <span className="absolute top-3 left-3 bg-[#006ce4] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
            {pkg.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex gap-0.5">
          {Array.from({ length: pkg.stars }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#191e3b] leading-tight">{pkg.name}</h3>
              <div className="flex items-center gap-1 mt-0.5 text-gray-500 text-xs">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{pkg.location}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1 bg-[#006ce4] text-white text-xs font-bold px-2.5 py-1 rounded-xl">
                <span>{pkg.rating}</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">{pkg.ratingText} · {pkg.reviews.toLocaleString()} reviews</div>
            </div>
          </div>

          {/* Meta info chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-green-100">
              <Clock className="w-3 h-3" /> {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-50 text-[#006ce4] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              <Hotel className="w-3 h-3" /> {pkg.nights_makkah}N Makkah · {pkg.nights_madinah}N Madinah
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-purple-100">
              <Plane className="w-3 h-3" /> {pkg.airline} · {pkg.flightClass}
            </span>
          </div>

          {/* Includes */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
            {pkg.includes.map((inc, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                {inc}
              </span>
            ))}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <div className="text-[10px] text-orange-600 font-semibold">{pkg.discount}</div>
            <div className="text-sm text-gray-400 line-through">${pkg.originalPrice.toLocaleString()}/person</div>
            <div className="text-2xl font-black text-[#191e3b]">${pkg.pricePerPerson.toLocaleString()}<span className="text-sm font-normal text-gray-500">/person</span></div>
          </div>
          <button
            onClick={() => router.push(`/umrah/${pkg.id}`)}
            className="px-5 py-2.5 bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95"
          >
            View Package
          </button>
        </div>
      </div>
    </div>
  );
}

function UmrahContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "Lahore, Pakistan";
  const dates = searchParams.get("dates") || "Wed, Sep 16 - Fri, Sep 28";
  const adults = searchParams.get("adults") || "2";
  const category = searchParams.get("category") || "All";

  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3500);
  const [minRating, setMinRating] = useState("any");

  const categories = ["All", "5 Star Luxury", "4 Star Premium", "Economy Saver"];

  const filtered = useMemo(() => {
    return UMRAH_PACKAGES.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (p.pricePerPerson > maxPrice) return false;
      if (minRating === "8.5" && p.rating < 8.5) return false;
      if (minRating === "9.0" && p.rating < 9.0) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, maxPrice, minRating, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b]">
      <Header />

      {/* Search Bar Strip */}
      <section className="bg-white border-b border-gray-200 shadow-xs py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <UmrahSearch />
        </div>
      </section>

      {/* Search Context Banner */}
      <div className="bg-gradient-to-r from-[#1a1a3e] to-[#006ce4] py-4 px-4">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-3 text-white text-sm">
          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="font-semibold">Umrah Packages 2026</span>
          <span className="text-blue-200">·</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> From: <b>{origin}</b></span>
          <span className="text-blue-200">·</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {dates}</span>
          <span className="text-blue-200">·</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {adults} Pilgrims</span>
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:col-span-3 space-y-5">

            {/* Package Category */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Package Category</h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-700 hover:text-black">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 text-[#006ce4] focus:ring-[#006ce4]"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                <span>Price per person</span>
                <span className="text-[#006ce4]">Up to ${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range" min="500" max="3500" step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#006ce4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>$500</span><span>$3,500+</span>
              </div>
            </div>

            {/* Guest Rating */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Guest Rating</h3>
              <div className="space-y-1.5">
                {[{ id: "any", label: "Any rating" }, { id: "8.5", label: "8.5+ Excellent" }, { id: "9.0", label: "9.0+ Exceptional" }].map((r) => (
                  <label key={r.id} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input type="radio" name="rating" checked={minRating === r.id} onChange={() => setMinRating(r.id)}
                      className="w-4 h-4 text-[#006ce4] focus:ring-[#006ce4]" />
                    {r.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-[#1a1a3e] to-[#006ce4] rounded-2xl p-5 text-white space-y-3">
              <Shield className="w-8 h-8 text-yellow-300" />
              <h4 className="font-bold text-sm">100% Trusted Umrah Partner</h4>
              <p className="text-[10px] text-blue-200 leading-relaxed">All packages include MOFA-approved hotels, licensed guides & 24/7 support.</p>
              <button className="flex items-center gap-1 text-xs font-bold text-yellow-300 hover:text-yellow-100">
                <Phone className="w-3.5 h-3.5" /> Call Us Now
              </button>
            </div>
          </aside>

          {/* ── CENTER: Results ── */}
          <section className="lg:col-span-9 space-y-4">

            {/* Results header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-black text-[#191e3b]">{filtered.length} Umrah Packages Found</h1>
                <p className="text-xs text-gray-500">Departing from {origin} · {dates}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-xs"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Pill Bar */}
            <div className="bg-[#eef2f5] p-1 rounded-2xl flex items-center gap-1 flex-wrap border border-gray-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-1 min-w-fit py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat ? "bg-white text-[#191e3b] shadow-xs" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cards */}
            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((pkg) => <UmrahPackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold">No packages match your filters</h3>
                <p className="text-xs text-gray-500">Try adjusting the price range or category.</p>
                <button onClick={() => { setSelectedCategory("All"); setMaxPrice(3500); setMinRating("any"); }}
                  className="px-5 py-2 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]">
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function UmrahSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <UmrahContent />
    </Suspense>
  );
}
