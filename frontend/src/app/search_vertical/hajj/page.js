"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Search, Star, MapPin, Calendar, Users, CheckCircle2, Clock,
  Plane, Hotel, FileText, Sparkles, Shield, Phone, MessageSquareShare, Landmark
} from "lucide-react";

const HAJJ_PACKAGES = [
  {
    id: "h1",
    name: "21 Days Economy Hajj Packages Visa + Flight + Hotel",
    category: "Economy Hajj",
    stars: 3,
    duration: "21 Days",
    nights_makkah: 9,
    nights_madinah: 12,
    price: 6730,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://media.istockphoto.com/id/482206266/photo/kaaba-in-mecca.webp?a=1&b=1&s=612x612&w=0&k=20&c=YWHRjAp4EQi7gwiWgnmSwh9m8ez2fUTiJFFTSGlx0Pg=",
    rating: 8.9,
    ratingText: "Very Good",
    reviews: 580,
    badge: "Most Popular"
  },
  {
    id: "h2",
    name: "17 Days Economy Hajj Packages Visa + Flight + Hotel",
    category: "Economy Hajj",
    stars: 3,
    duration: "17 Days",
    nights_makkah: 9,
    nights_madinah: 8,
    price: 6000,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/images-1.jpg",
    rating: 8.7,
    ratingText: "Very Good",
    reviews: 420,
    badge: "Great Value"
  },
  {
    id: "h3",
    name: "14 Days Economy Hajj Packages Visa + Flight + Hotel",
    category: "Economy Hajj",
    stars: 3,
    duration: "14 Days",
    nights_makkah: 7,
    nights_madinah: 7,
    price: 5700,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/makkah-2-beautiful-wallpaper-1024x768-1.jpg",
    rating: 8.8,
    ratingText: "Very Good",
    reviews: 390,
    badge: "Express Option"
  },
  {
    id: "h4",
    name: "5 Star Hajj Packages Visa + Flight + Hotel",
    category: "5 Star Luxury",
    stars: 5,
    duration: "6 Days",
    nights_makkah: 3,
    nights_madinah: 3,
    price: 7000,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1ha2thaHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 9.6,
    ratingText: "Exceptional",
    reviews: 840,
    badge: "5 Star VIP"
  },
  {
    id: "h5",
    name: "4 Star Hajj Packages Visa + Flight + Hotel",
    category: "4 Star Premium",
    stars: 4,
    duration: "6 Days",
    nights_makkah: 3,
    nights_madinah: 3,
    price: 6000,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/images-3.jpg",
    rating: 9.2,
    ratingText: "Exceptional",
    reviews: 610,
    badge: "4 Star Premium"
  },
  {
    id: "h6",
    name: "3 Star Hajj Packages Visa + Flight + Hotel",
    category: "Economy Hajj",
    stars: 3,
    duration: "6 Days",
    nights_makkah: 3,
    nights_madinah: 3,
    price: 5200,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/al-haram-mosque.jpg",
    rating: 8.6,
    ratingText: "Good",
    reviews: 310,
    badge: "Saver Hajj"
  }
];

function HajjPackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-col md:flex-row group">
      {/* Image */}
      <div className="relative w-full h-56 sm:h-52 md:w-72 md:h-auto shrink-0 overflow-hidden">
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
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#191e3b] leading-tight">{pkg.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#006ce4]" />
                <span className="truncate">{pkg.nights_makkah} Days in Makkah · {pkg.nights_madinah} Days in Madinah</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1 bg-[#006ce4] text-white text-xs font-bold px-2.5 py-1 rounded-xl">
                <span>{pkg.rating}</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">{pkg.ratingText} · {pkg.reviews} reviews</div>
            </div>
          </div>

          {/* Meta Info Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> {pkg.duration} Total
            </span>
            <span className="inline-flex items-center gap-1 bg-[#ebf5ff] text-[#006ce4] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              <Landmark className="w-3.5 h-3.5" /> {pkg.nights_makkah} Days Makkah
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-purple-100">
              <Hotel className="w-3.5 h-3.5" /> {pkg.nights_madinah} Days Madinah
            </span>
          </div>

          {/* Inclusions */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
              <Plane className="w-3.5 h-3.5 text-[#006ce4]" /> Flight Included
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
              <FileText className="w-3.5 h-3.5 text-emerald-600" /> Visa Included
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
              <Hotel className="w-3.5 h-3.5 text-amber-600" /> Accommodation Included
            </span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <div>
            <div className="text-2xl font-black text-[#191e3b]">
              {pkg.currency}{pkg.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-500"> / per person</span>
            </div>
          </div>

          {/* Phone & WhatsApp CTAs */}
          <div className="flex items-center gap-2">
            {pkg.phone && (
              <a
                href={`tel:${pkg.phone}`}
                className="px-3.5 py-2 border border-gray-300 hover:border-[#006ce4] text-[#191e3b] hover:text-[#006ce4] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#006ce4]" />
                <span>{pkg.phone}</span>
              </a>
            )}

            {pkg.whatsapp && (
              <a
                href={pkg.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HajjContent() {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(8000);

  const categories = ["All", "5 Star Luxury", "4 Star Premium", "Economy Hajj"];

  const filtered = useMemo(() => {
    return HAJJ_PACKAGES.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, maxPrice, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b] relative">
      <Header />

      {/* Hero Form Section with Background Image */}
      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://cheapestumrah.co.uk/wp-content/uploads/2023/01/Makkah_7_sept_08.jpg"
        pageType="Hajj"
      />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:col-span-3 space-y-5">

            {/* Package Category */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Hajj Package Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-700 hover:text-black">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 text-[#006ce4] focus:ring-[#006ce4]"
                    />
                    {cat === "All" ? "All Packages" : cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                <span>Price per person</span>
                <span className="text-[#006ce4]">Up to £{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range" min="5000" max="8000" step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#006ce4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>£5,000</span><span>£8,000+</span>
              </div>
            </div>

            {/* Direct Support Card */}
            <div className="bg-gradient-to-br from-[#191e3b] to-[#005e73] rounded-2xl p-5 text-white space-y-3">
              <Shield className="w-8 h-8 text-amber-300" />
              <h4 className="font-bold text-sm">Hajj Visa & Guidance</h4>
              <p className="text-[11px] text-gray-200 leading-relaxed">
                Direct quota booking with Saudi Ministry clearance, flight tickets, hotel stay & ground guidance in Makkah & Madinah.
              </p>
              <a
                href="tel:02039700100"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-100"
              >
                <Phone className="w-4 h-4" /> 02039700100
              </a>
            </div>
          </aside>

          {/* ── CENTER: Results ── */}
          <section className="lg:col-span-9 space-y-4">

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-black text-[#191e3b]">{filtered.length} Hajj Packages Available</h1>
                <p className="text-xs text-gray-500">Visa + Flight + Accommodation included</p>
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
                  {cat === "All" ? "All Packages" : cat}
                </button>
              ))}
            </div>

            {/* Cards List */}
            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((pkg) => <HajjPackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold">No Hajj packages match your filters</h3>
                <p className="text-xs text-gray-500">Try adjusting the price range or category.</p>
                <button onClick={() => { setSelectedCategory("All"); setMaxPrice(8000); }}
                  className="px-5 py-2 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]">
                  Reset Filters
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      <Footer />
    </div>
  );
}

export default function HajjSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <HajjContent />
    </Suspense>
  );
}