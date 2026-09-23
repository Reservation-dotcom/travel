"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Search, ShieldCheck, Globe, FileText, CheckCircle2, Clock,
  Sparkles, User, ArrowRight, FileCheck, Phone, MessageSquareShare
} from "lucide-react";

const OTHER_VISA_SERVICES = [
  {
    id: "v1",
    country: "UAE",
    flagImage: "https://flagcdn.com/w160/ae.png",
    destinationImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    title: "UAE",
    type: "Tourist Visa",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Assessment", "Checklist", "Support"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "v2",
    country: "Saudi",
    flagImage: "https://flagcdn.com/w160/sa.png",
    destinationImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80",
    title: "Saudi",
    type: "Tourist Visa",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Review", "Interview", "Support"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "v3",
    country: "UK",
    flagImage: "https://flagcdn.com/w160/gb.png",
    destinationImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
    title: "UK",
    type: "Tourist Visa",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Advice", "Checklist", "Support"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "v4",
    country: "Turkey",
    flagImage: "https://flagcdn.com/w160/tr.png",
    destinationImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
    title: "Turkey",
    type: "Tourist Visa",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Checklist", "Review", "Support"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "v5",
    country: "Thailand",
    flagImage: "https://flagcdn.com/w160/th.png",
    destinationImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
    title: "Thailand",
    type: "Tourist Visa",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Guide", "Checklist", "Support"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
  {
    id: "v6",
    country: "USA",
    flagImage: "https://flagcdn.com/w160/us.png",
    destinationImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=80",
    title: "USA",
    type: "Business Visa",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    successRatio: "99% Success Ratio",
    services: ["Review", "Checklist", "Support"],
    phone: "02039700100",
    whatsapp: "https://api.whatsapp.com/send?phone=4407821030906"
  },
];

function PageHeaderIcon({ src, alt, href = "#" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={alt}
      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-white/60 transition-transform duration-200 hover:scale-105"
    >
      <img src={src} alt={alt} className="h-full w-full object-contain bg-white" />
    </a>
  );
}

function VisaServiceCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-col md:flex-row group">
      <div className="relative w-full h-52 sm:h-52 md:w-72 md:h-auto shrink-0 overflow-hidden">
        <img
          src={item.destinationImage}
          alt={`${item.country} destination`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-2 border border-gray-100">
          <img
            src={item.flagImage}
            alt={`${item.country} Flag`}
            className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shadow-2xs"
          />
          <span className="text-xs font-bold text-gray-900">{item.country}</span>
        </div>

        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
          {item.discountBadge}
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        <div>
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

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <div>
            <div className="text-2xl font-black text-[#191e3b]">
              {item.currency}{item.pricePerApplicant}
              <span className="text-xs font-normal text-gray-500"> / per person</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.phone && (
              <a
                href={`tel:${item.phone}`}
                aria-label={`Call ${item.phone}`}
                className="px-2.5 py-2.5 sm:px-3.5 sm:py-2 border border-gray-300 hover:border-[#003399] text-[#191e3b] hover:text-[#003399] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#003399] shrink-0" />
                <span className="hidden sm:inline">{item.phone}</span>
              </a>
            )}

            {item.whatsapp && (
              <a
                href={item.whatsapp}
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

function VisaContent() {
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("recommended");
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);

  const types = ["All", "Tourist Visa", "Business Visa", "Family Visit", "Student Visa"];

  const filtered = useMemo(() => {
    return OTHER_VISA_SERVICES.filter((v) => {
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
        bgImage="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1920&q=80"
        pageType="Other Visa"
      />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Category Filter */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Visa Type</h3>
              <div className="space-y-2">
                {types.map((t) => (
                  <label key={t} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-700 hover:text-black">
                    <input
                      type="radio"
                      name="visaType"
                      checked={selectedType === t}
                      onChange={() => setSelectedType(t)}
                      className="w-4 h-4 text-[#006ce4] focus:ring-[#006ce4]"
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
                <span className="text-[#006ce4]">Up to ${maxPrice}</span>
              </div>
              <input
                type="range" min="50" max="500" step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#006ce4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>$50</span><span>$500+</span>
              </div>
            </div>

            {/* Guaranteed Service Banner */}
            <div className="bg-gradient-to-br from-[#191e3b] to-[#006ce4] rounded-2xl p-5 text-white space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-sm">100% Money Back Assurance</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                If your visa application is rejected due to processing errors on our end, we provide a 100% service fee refund.
              </p>
            </div>
          </aside>

          {/* Main Results Column */}
          <section className="lg:col-span-9 space-y-4">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <PageHeaderIcon src="/visa.png" alt="Other visa icon" href="https://www.google.com/search?q=visa+application+icon" />
                <div>
                  <h1 className="text-xl font-black text-[#191e3b]">{filtered.length} Visa Options Available</h1>
                  <p className="text-xs text-gray-500">Global travel visa processing & file support</p>
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-xs"
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

            {/* List */}
            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((item) => <VisaServiceCard key={item.id} item={item} />)}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold">No visa options match your filter</h3>
                <p className="text-xs text-gray-500">Try adjusting your price filter or selecting all visa types.</p>
                <button onClick={() => { setSelectedType("All"); setMaxPrice(500); }}
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

export default function VisaSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <VisaContent />
    </Suspense>
  );
}
