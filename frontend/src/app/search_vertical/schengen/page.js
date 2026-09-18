"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Search, ShieldCheck, Globe, FileText, CheckCircle2, Clock,
  Sparkles, User, ArrowRight, Shield, Calendar, Award, Building
} from "lucide-react";

const SCHENGEN_SERVICES = [
  {
    id: "s1",
    country: "France",
    flag: "🇫🇷",
    title: "France (Paris) Tourist C-Type Visa & VFS Priority Slot",
    type: "Tourist",
    embassyCity: "Embassy / Consulate of France",
    processingTime: "10 - 15 Business Days",
    validity: "90 Days within 180 Days",
    stayDuration: "Up to 90 Days",
    pricePerApplicant: 210,
    originalPrice: 260,
    discount: "Save $50 per applicant",
    badge: "Most Popular",
    approvalRate: "97.4%",
    requirements: ["Passport Valid for 6 Months", "6 Months Bank Statement", "VFS Appointment Booking", "€30,000 Travel Insurance Included", "Cover Letter & Itinerary"],
    description: "Complete France Schengen filing with guaranteed VFS appointment tracking, dummy tickets, hotel voucher & travel insurance.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "s2",
    country: "Germany",
    flag: "🇩🇪",
    title: "Germany (Berlin / Munich) Business & Tourist Schengen Visa",
    type: "Business",
    embassyCity: "German Embassy / VFS Global",
    processingTime: "12 - 18 Business Days",
    validity: "Up to 1 Year Multiple Entry",
    stayDuration: "90 Days per visit",
    pricePerApplicant: 240,
    originalPrice: 290,
    discount: "Save $50 per applicant",
    badge: "Business Choice",
    approvalRate: "96.8%",
    requirements: ["Bank Statement with Tax Returns", "Invitation Letter Support", "Travel Insurance (€30k)", "Flight & Hotel Proof"],
    description: "Full service for German tourist & trade fair business visas including invitation letter formatting and VFS slot.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "s3",
    country: "Spain",
    flag: "🇪🇸",
    title: "Spain (Madrid / Barcelona) BLS Fast-Track Tourist Package",
    type: "Tourist",
    embassyCity: "BLS International Spain Visa Centre",
    processingTime: "7 - 12 Business Days",
    validity: "90 Days",
    stayDuration: "Up to 90 Days",
    pricePerApplicant: 225,
    originalPrice: 270,
    discount: "Save $45 per applicant",
    badge: "Fast Track",
    approvalRate: "98.1%",
    requirements: ["BLS Slot Booking", "Bank Statement", "Travel Insurance", "Schengen Cover Letter"],
    description: "Express Spain Schengen visa application assistance with BLS appointment priority booking.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "s4",
    country: "Italy",
    flag: "🇮🇹",
    title: "Italy (Rome / Milan) Tourist Visa File Prep & VFS Assistance",
    type: "Tourist",
    embassyCity: "Italian Embassy / VFS Global",
    processingTime: "10 - 14 Business Days",
    validity: "90 Days",
    stayDuration: "Up to 90 Days",
    pricePerApplicant: 195,
    originalPrice: 240,
    discount: "Save $45 per applicant",
    badge: "Great Value",
    approvalRate: "96.9%",
    requirements: ["Bank Statement (6 Months)", "Job / Business Evidence", "Travel Insurance €30k", "Day-by-Day Itinerary"],
    description: "Professional Italian tourist visa application filing with custom itinerary & flight reservation vouchers.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "s5",
    country: "Netherlands",
    flag: "🇳🇱",
    title: "Netherlands (Amsterdam) Tourist & Transit Schengen Visa",
    type: "Tourist",
    embassyCity: "VFS Netherlands Visa Desk",
    processingTime: "8 - 14 Business Days",
    validity: "90 Days",
    stayDuration: "Up to 90 Days",
    pricePerApplicant: 215,
    originalPrice: 255,
    discount: "Save $40 per applicant",
    badge: "Top Rated",
    approvalRate: "97.5%",
    requirements: ["Passport", "Financial Proof", "Insurance Coverage", "Confirmed Hotel Reservation"],
    description: "Dedicated file setup for Dutch Schengen visa with high approval success rate and document translation guidance.",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "s6",
    country: "Switzerland",
    flag: "🇨🇭",
    title: "Switzerland (Zurich / Geneva) Premium Travel Visa Package",
    type: "Tourist",
    embassyCity: "Embassy of Switzerland / VFS",
    processingTime: "10 - 15 Business Days",
    validity: "90 Days Multiple Entry",
    stayDuration: "Up to 90 Days",
    pricePerApplicant: 260,
    originalPrice: 320,
    discount: "Save $60 per applicant",
    badge: "VIP Service",
    approvalRate: "98.5%",
    requirements: ["Comprehensive Insurance (€50k)", "Detailed Swiss Rail/Hotel Pass", "Bank Statement", "VFS Appointment"],
    description: "Luxury Swiss travel visa consultation with custom alpine travel itinerary, ticket bookings & insurance.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80",
  },
];

function SchengenServiceCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
      {/* Image */}
      <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#003399] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
          <span>{item.flag}</span>
          <span>{item.country}</span>
        </span>
        {item.badge && (
          <span className="absolute bottom-3 left-3 bg-amber-500 text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow">
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#191e3b] leading-tight">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block bg-blue-50 text-[#003399] text-xs font-bold px-2.5 py-1 rounded-xl border border-blue-200">
                {item.approvalRate} Success Rate
              </span>
            </div>
          </div>

          {/* Meta Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 bg-blue-50 text-[#003399] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              <Clock className="w-3 h-3" /> Processing: {item.processingTime}
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-purple-100">
              <Globe className="w-3 h-3" /> Validity: {item.validity}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-100">
              <Building className="w-3 h-3" /> {item.embassyCity}
            </span>
          </div>

          {/* Inclusions */}
          <div className="mt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Included Services:</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {item.requirements.map((req, i) => (
                <span key={i} className="flex items-center gap-1 text-[11px] text-gray-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  {req}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <div className="text-[10px] text-emerald-600 font-bold">{item.discount}</div>
            <div className="text-xs text-gray-400 line-through">${item.originalPrice}/applicant</div>
            <div className="text-2xl font-black text-[#191e3b]">
              ${item.pricePerApplicant}
              <span className="text-xs font-normal text-gray-500"> / applicant</span>
            </div>
          </div>
          <button
            onClick={() => alert(`Schengen visa filing requested for ${item.title}. Our Schengen visa specialist will contact you.`)}
            className="px-5 py-2.5 bg-[#003399] hover:bg-[#002277] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Start Filing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SchengenContent() {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("recommended");
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(400);

  const types = ["All", "Tourist", "Business", "Family Visit", "Student"];

  const filtered = useMemo(() => {
    return SCHENGEN_SERVICES.filter((v) => {
      if (selectedType !== "All" && v.type !== selectedType) return false;
      if (v.pricePerApplicant > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerApplicant - b.pricePerApplicant;
      if (sortBy === "fastest") return parseInt(a.processingTime) - parseInt(b.processingTime);
      return 0;
    });
  }, [selectedType, maxPrice, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b] relative">
      <Header />

      {/* Hero Form Section with Background Image */}
      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80"
        pageType="Schengen Visa"
      />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Category Filter */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Visa Purpose</h3>
              <div className="space-y-2">
                {types.map((t) => (
                  <label key={t} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-700 hover:text-black">
                    <input
                      type="radio"
                      name="visaType"
                      checked={selectedType === t}
                      onChange={() => setSelectedType(t)}
                      className="w-4 h-4 text-[#003399] focus:ring-[#003399]"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                <span>Price per applicant</span>
                <span className="text-[#003399]">Up to ${maxPrice}</span>
              </div>
              <input
                type="range" min="150" max="400" step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#003399] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>$150</span><span>$400+</span>
              </div>
            </div>

            {/* Schengen Guarantee Card */}
            <div className="bg-gradient-to-br from-[#002277] to-[#003399] rounded-2xl p-5 text-white space-y-3">
              <Shield className="w-8 h-8 text-yellow-300" />
              <h4 className="font-bold text-sm">EU Official VFS / BLS Partners</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                Includes mandatory Schengen travel insurance (€30,000 minimal coverage), verifiable flight itineraries & hotel voucher guarantee.
              </p>
            </div>
          </aside>

          {/* Results List */}
          <section className="lg:col-span-9 space-y-4">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-black text-[#191e3b]">{filtered.length} Schengen Visa Packages</h1>
                <p className="text-xs text-gray-500">Fast-track appointments & document filing for Schengen countries</p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#003399] cursor-pointer shadow-xs"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="fastest">Processing: Fastest First</option>
              </select>
            </div>

            {/* Type Pills */}
            <div className="bg-[#eef2f5] p-1 rounded-2xl flex items-center gap-1 flex-wrap border border-gray-200">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex-1 min-w-fit py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedType === t ? "bg-white text-[#191e3b] shadow-xs" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* List Cards */}
            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((item) => <SchengenServiceCard key={item.id} item={item} />)}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#003399] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold">No Schengen options match your filter</h3>
                <p className="text-xs text-gray-500">Try adjusting your price limit or visa purpose.</p>
                <button onClick={() => { setSelectedType("All"); setMaxPrice(400); }}
                  className="px-5 py-2 bg-[#003399] text-white text-xs font-bold rounded-full hover:bg-[#002277]">
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

export default function SchengenVisaSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <SchengenContent />
    </Suspense>
  );
}
