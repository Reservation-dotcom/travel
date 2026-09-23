"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Search, Star, MapPin, Calendar, Users, CheckCircle2, Clock,
  Plane, Hotel, FileText, Sparkles, Shield, Phone, MessageSquareShare
} from "lucide-react";

const UMRAH_PACKAGES = [
  {
    id: "u2",
    name: "10 Days 3 Star Umrah Package",
    category: "3 Star",
    stars: 3,
    duration: "10 Days",
    nights_makkah: 5,
    nights_madinah: 5,
    price: 695,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    rating: 8.9,
    ratingText: "Very Good",
    reviews: 380,
    badge: "Best Value"
  },
  {
    id: "u3",
    name: "14 Days 3 Star Ramzan Umrah Package",
    category: "3 Star",
    stars: 3,
    duration: "14 Days",
    nights_makkah: 7,
    nights_madinah: 7,
    price: 795,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80",
    rating: 9.1,
    ratingText: "Exceptional",
    reviews: 510,
    badge: "Ramzan Special"
  },
  {
    id: "u4",
    name: "07 Days 4 Star Umrah Package",
    category: "4 Star",
    stars: 4,
    duration: "7 Days",
    nights_makkah: 4,
    nights_madinah: 3,
    price: 695,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://i.pinimg.com/1200x/f9/67/67/f967673096d31252dced546e0809ea0b.jpg",
    rating: 9.0,
    ratingText: "Exceptional",
    reviews: 630,
    badge: "Popular"
  },
  {
    id: "u5",
    name: "10 Days 4 Star Ramzan Umrah Package",
    category: "4 Star",
    stars: 4,
    duration: "10 Days",
    nights_makkah: 5,
    nights_madinah: 5,
    price: 795,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://i.pinimg.com/1200x/c6/27/83/c62783fc7679e8a756a36064508de74b.jpg",
    rating: 9.2,
    ratingText: "Exceptional",
    reviews: 450,
    badge: "Ramzan Special"
  },
  {
    id: "u6",
    name: "14 Days 4 Star December Umrah Package",
    category: "4 Star",
    stars: 4,
    duration: "14 Days",
    nights_makkah: 7,
    nights_madinah: 7,
    price: 895,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    rating: 9.1,
    ratingText: "Exceptional",
    reviews: 720,
    badge: "December Special"
  },
  {
    id: "u7",
    name: "07 Days 5 Star Umrah Package",
    category: "5 Star",
    stars: 5,
    duration: "7 Days",
    nights_makkah: 4,
    nights_madinah: 3,
    price: 795,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/06/10-days-5-star-umrah-package-840-visahotelsreturn-flight-560x400-1.jpg",
    rating: 9.4,
    ratingText: "Exceptional",
    reviews: 890,
    badge: "Luxury Pick"
  },
  {
    id: "u8",
    name: "10 Days 5 Star Umrah Package",
    category: "5 Star",
    stars: 5,
    duration: "10 Days",
    nights_makkah: 5,
    nights_madinah: 5,
    price: 895,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/06/12-days-5-star-umrah-package-895-visareturn-flighthotels-560x400-1.jpg",
    rating: 9.5,
    ratingText: "Exceptional",
    reviews: 940,
    badge: "Top Luxury"
  },
  {
    id: "u9",
    name: "14 Days 5 Star Umrah Package",
    category: "5 Star",
    stars: 5,
    duration: "14 Days",
    nights_makkah: 7,
    nights_madinah: 7,
    price: 995,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/makkah-2-beautiful-wallpaper-1024x768-1.jpg",
    rating: 9.6,
    ratingText: "Exceptional",
    reviews: 1120,
    badge: "VIP Premium"
  },
  {
    id: "u10",
    name: "07 Days 3 Star December & Ramadan Umrah",
    category: "3 Star",
    stars: 3,
    duration: "7 Days",
    nights_makkah: 4,
    nights_madinah: 3,
    price: 995,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/makkah_al_mukarramah_and_high_resolution_wallpaper.jpg",
    rating: 8.9,
    ratingText: "Very Good",
    reviews: 340,
    badge: "Dec & Ramadan"
  },
  {
    id: "u11",
    name: "10 Days 3 Star December & Ramadan Umrah",
    category: "3 Star",
    stars: 3,
    duration: "10 Days",
    nights_makkah: 5,
    nights_madinah: 5,
    price: 1095,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1605553378313-22d0dc541393?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2thaHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 9.0,
    ratingText: "Exceptional",
    reviews: 410,
    badge: "Dec & Ramadan"
  },
  {
    id: "u12",
    name: "14 Days 3 Star December & Ramadan Umrah",
    category: "3 Star",
    stars: 3,
    duration: "14 Days",
    nights_makkah: 7,
    nights_madinah: 7,
    price: 1195,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/umrah-hajj.jpg",
    rating: 9.1,
    ratingText: "Exceptional",
    reviews: 580,
    badge: "Dec & Ramadan"
  },
  {
    id: "u1",
    name: "7 Days 3 Star Umrah Package",
    category: "3 Star",
    stars: 3,
    duration: "7 Days",
    nights_makkah: 4,
    nights_madinah: 3,
    price: 595,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://i.pinimg.com/736x/bd/09/aa/bd09aa5b48c02fbf6e79b39528d9f43a.jpg",
    rating: 8.8,
    ratingText: "Very Good",
    reviews: 420,
    badge: "Budget Saver"
  },
  {
    id: "u13",
    name: "07 Days 4 Star December & Ramadan Umrah",
    category: "4 Star",
    stars: 4,
    duration: "7 Days",
    nights_makkah: 4,
    nights_madinah: 3,
    price: 1095,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/images-3.jpg",
    rating: 9.2,
    ratingText: "Exceptional",
    reviews: 620,
    badge: "Dec & Ramadan"
  },
  {
    id: "u14",
    name: "10 Days 4 Star December & Ramadan Umrah",
    category: "4 Star",
    stars: 4,
    duration: "10 Days",
    nights_makkah: 5,
    nights_madinah: 5,
    price: 1195,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFra2FofGVufDB8fDB8fHww",
    rating: 9.3,
    ratingText: "Exceptional",
    reviews: 710,
    badge: "Dec & Ramadan"
  },
  {
    id: "u15",
    name: "14 Days 4 Star December & Ramadan Umrah",
    category: "4 Star",
    stars: 4,
    duration: "14 Days",
    nights_makkah: 7,
    nights_madinah: 7,
    price: 1295,
    currency: "£",
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906",
    includes: ["Flight", "Visa", "Accommodation"],
    image: "https://images.unsplash.com/photo-1667454872134-c25973237138?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFkaW5haCUyMG1vc3F1ZXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 9.4,
    ratingText: "Exceptional",
    reviews: 850,
    badge: "Dec & Ramadan"
  }
];

function PageHeaderIcon({ src, alt }) {
  return (
    <div
      aria-label={alt}
      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-white/60"
    >
      <img src={src} alt={alt} className="h-full w-full object-contain bg-white" />
    </div>
  );
}

function UmrahPackageCard({ pkg }) {
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
                <span className="truncate">{pkg.nights_makkah} Nights Makkah · {pkg.nights_madinah} Nights Madinah</span>
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
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-green-100">
              <Clock className="w-3.5 h-3.5" /> {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-50 text-[#006ce4] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              <Hotel className="w-3.5 h-3.5" /> {pkg.nights_makkah}N Makkah
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-purple-100">
              <Hotel className="w-3.5 h-3.5" /> {pkg.nights_madinah}N Madinah
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
              {pkg.currency}{pkg.price}
              <span className="text-xs font-normal text-gray-500"> / per person</span>
            </div>
          </div>

          {/* Phone & WhatsApp CTAs */}
          <div className="flex items-center gap-2">
            {pkg.phone && (
              <a
                href={`tel:${pkg.phone}`}
                aria-label={`Call ${pkg.phone}`}
                className="px-2.5 py-2.5 sm:px-3.5 sm:py-2 border border-gray-300 hover:border-[#006ce4] text-[#191e3b] hover:text-[#006ce4] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#006ce4] shrink-0" />
                <span className="hidden sm:inline">{pkg.phone}</span>
              </a>
            )}

            {pkg.whatsapp && (
              <a
                href={pkg.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact via WhatsApp"
                className="px-2.5 py-2.5 sm:px-4 sm:py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <MessageSquareShare className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UmrahContent() {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1500);

  const categories = ["All", "3 Star", "4 Star", "5 Star"];

  const filtered = useMemo(() => {
    return UMRAH_PACKAGES.filter((p) => {
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
        bgImage="https://cheapestumrah.co.uk/wp-content/uploads/2023/01/makkah-2-beautiful-wallpaper-1024x768-1.jpg"
        pageType="Umrah"
      />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="lg:col-span-3 space-y-5">

            {/* Package Category */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Hotel Star Rating</h3>
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
                    {cat === "All" ? "All Packages" : `${cat} Packages`}
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
                type="range" min="500" max="1500" step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#006ce4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>£500</span><span>£1,500+</span>
              </div>
            </div>

            {/* Direct Support Card */}
            <div className="bg-gradient-to-br from-[#191e3b] to-[#006ce4] rounded-2xl p-5 text-white space-y-3">
              <Shield className="w-8 h-8 text-yellow-300" />
              <h4 className="font-bold text-sm">Need Custom Umrah Package?</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                Contact our Umrah advisors directly via Phone or WhatsApp for customized flight dates, family discounts & ground transport.
              </p>
              <a
                href="tel:02039700100"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-yellow-100"
              >
                <Phone className="w-4 h-4" /> 02039700100
              </a>
            </div>
          </aside>

          {/* ── CENTER: Results ── */}
          <section className="lg:col-span-9 space-y-4">

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <PageHeaderIcon src="/masjid-al-nabawi.png" alt="Umrah Madina icon" />
                <div>
                  <h1 className="text-xl font-black text-[#191e3b]">{filtered.length} Umrah Packages Available</h1>
                  <p className="text-xs text-gray-500">Flight + Visa + Accommodation included</p>
                </div>
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
                  className={`flex-1 min-w-fit py-2 px-3 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? "bg-white text-[#191e3b] shadow-xs" : "text-gray-600 hover:text-black"
                    }`}
                >
                  {cat === "All" ? "All Packages" : `${cat} Packages`}
                </button>
              ))}
            </div>

            {/* Cards List */}
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
                <p className="text-xs text-gray-500">Try adjusting the price range or star rating.</p>
                <button onClick={() => { setSelectedCategory("All"); setMaxPrice(1500); }}
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

export default function UmrahSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <UmrahContent />
    </Suspense>
  );
}