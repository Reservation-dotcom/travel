"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Search, ShieldCheck, Globe, CheckCircle2, Shield, Phone, MessageSquareShare
} from "lucide-react";

const SCHENGEN_SERVICES = [
  {
    id: "s1",
    country: "France",
    flagImage: "https://flagcdn.com/w160/fr.png",
    destinationImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    title: "France Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Free Assessment", "Document Checklist", "Appointment & Briefing"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "s2",
    country: "Germany",
    flagImage: "https://flagcdn.com/w160/de.png",
    destinationImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80",
    title: "Germany Schengen Visa",
    type: "Business",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Free Assessment", "File Building", "Submission & Tracking"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "s3",
    country: "Spain",
    flagImage: "https://flagcdn.com/w160/es.png",
    destinationImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80",
    title: "Spain Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Document Checklist", "Appointment & Briefing", "Submission & Tracking"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "s4",
    country: "Italy",
    flagImage: "https://flagcdn.com/w160/it.png",
    destinationImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
    title: "Italy Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Free Assessment", "Document Checklist", "File Building"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "s5",
    country: "Netherlands",
    flagImage: "https://flagcdn.com/w160/nl.png",
    destinationImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=900&q=80",
    title: "Netherlands Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Free Assessment", "Appointment & Briefing", "Submission & Tracking"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "s6",
    country: "Switzerland",
    flagImage: "https://flagcdn.com/w160/ch.png",
    destinationImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80",
    title: "Switzerland Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Document Checklist", "File Building", "Submission & Tracking"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },

  {
    id: "s8",
    country: "Austria",
    flagImage: "https://flagcdn.com/w160/at.png",
    destinationImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=80",
    title: "Austria Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Free Assessment", "File Building", "Submission & Tracking"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  }
];

function SchengenServiceCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
      {/* 1. Country Flag & 2. Famous Destination Image */}
      <div className="relative w-full sm:w-72 h-52 sm:h-auto shrink-0 overflow-hidden">
        {/* Famous Destination Image */}
        <img
          src={item.destinationImage}
          alt={`${item.country} Famous Destination`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Country Flag Badge (Image 1) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-2 border border-gray-100">
          <img
            src={item.flagImage}
            alt={`${item.country} Flag`}
            className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shadow-2xs"
          />
          <span className="text-xs font-bold text-gray-900">{item.country}</span>
        </div>

        {/* 60% OFF Badge on Image */}
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
          {item.discountBadge}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        <div>
          {/* Top Row: Country Title & 99% Success Ratio */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#191e3b] leading-tight">{item.title}</h3>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {item.successRatio}
              </span>
            </div>
          </div>

          {/* 3 Important Services */}
          <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Included Services:</span>
            <div className="flex flex-wrap gap-2">
              {item.services.map((service, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-blue-50 text-[#003399] text-[10px] md:text-[12px] font-semibold px-3 py-1.5 rounded-xl border border-blue-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#003399] shrink-0" />
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Contact Action Buttons (No Start Filing Button) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <div>
            <div className="text-2xl font-black text-[#191e3b]">
              {item.currency}{item.pricePerApplicant}
              <span className="text-xs font-normal text-gray-500"> / per person</span>
            </div>
          </div>

          {/* Contact Buttons: Phone & WhatsApp */}
          <div className="flex items-center gap-2">
            {item.phone && (
              <a
                href={`tel:${item.phone}`}
                className="px-3.5 py-2 border border-gray-300 hover:border-[#003399] text-[#191e3b] hover:text-[#003399] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#003399]" />
                <span>{item.phone}</span>
              </a>
            )}

            {item.whatsapp && (
              <a
                href={item.whatsapp}
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

function SchengenContent() {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("recommended");
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);

  const types = ["All", "Tourist", "Business", "Family Visit", "Student"];

  const filtered = useMemo(() => {
    return SCHENGEN_SERVICES.filter((v) => {
      if (selectedType !== "All" && v.type !== selectedType) return false;
      if (v.pricePerApplicant > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerApplicant - b.pricePerApplicant;
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
                <span className="text-[#003399]">Up to £{maxPrice}</span>
              </div>
              <input
                type="range" min="30" max="100" step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#003399] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>£30</span><span>£100+</span>
              </div>
            </div>

            {/* Schengen Guarantee Card */}
            <div className="bg-gradient-to-br from-[#002277] to-[#003399] rounded-2xl p-5 text-white space-y-3">
              <Shield className="w-8 h-8 text-yellow-300" />
              <h4 className="font-bold text-sm">EU Official VFS / BLS Partners</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                Guaranteed slot assistance, customized file preparation & appointment booking support across Europe.
              </p>
              <a
                href="tel:02039700100"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-yellow-100"
              >
                <Phone className="w-4 h-4" /> 02039700100
              </a>
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
              </select>
            </div>

            {/* Type Pills */}
            <div className="bg-[#eef2f5] p-1 rounded-2xl flex items-center gap-1 flex-wrap border border-gray-200">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex-1 min-w-fit py-2 px-3 rounded-xl text-xs font-bold transition-all ${selectedType === t ? "bg-white text-[#191e3b] shadow-xs" : "text-gray-600 hover:text-black"
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
                <button onClick={() => { setSelectedType("All"); setMaxPrice(100); }}
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

