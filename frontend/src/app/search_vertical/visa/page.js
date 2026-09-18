"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  Search, ShieldCheck, Globe, FileText, CheckCircle2, Clock,
  Sparkles, User, ArrowRight, FileCheck
} from "lucide-react";

const OTHER_VISA_SERVICES = [
  {
    id: "v1",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    title: "Dubai 30-Days Express Tourist E-Visa",
    type: "Tourist Visa",
    processingTime: "24 - 48 Hours",
    validity: "60 Days from issue",
    stayDuration: "30 Days Single Entry",
    pricePerApplicant: 145,
    originalPrice: 180,
    discount: "Save $35 per applicant",
    badge: "Fast Track",
    approvalRate: "99.2%",
    requirements: ["Passport Scan (6m validity)", "Passport Size Photo (White BG)", "CNIC / ID Copy"],
    description: "Instant 30-day Dubai tourist e-visa with zero hassle. Fully digital process without embassy visit.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v2",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    title: "Saudi 1-Year Multiple Entry Tourist E-Visa",
    type: "Tourist Visa",
    processingTime: "1 - 3 Business Days",
    validity: "1 Year Multiple Entry",
    stayDuration: "90 Days per visit",
    pricePerApplicant: 220,
    originalPrice: 260,
    discount: "Save $40 per applicant",
    badge: "Bestseller",
    approvalRate: "98.8%",
    requirements: ["Passport Scan", "Digital Photo", "Mandatory Covid/Health Insurance Included"],
    description: "Official tourist e-visa valid for Umrah, leisure, and family visit across Saudi Arabia.",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v3",
    country: "United Kingdom",
    flag: "🇬🇧",
    title: "UK Standard Visitor Visa (6 Months Consultation & Slot)",
    type: "Tourist Visa",
    processingTime: "15 - 20 Business Days",
    validity: "6 Months Multiple Entry",
    stayDuration: "Up to 180 Days",
    pricePerApplicant: 290,
    originalPrice: 340,
    discount: "Save $50 per applicant",
    badge: "Full Assistance",
    approvalRate: "96.5%",
    requirements: ["Bank Statement (6m)", "Employment / Business Proof", "VFS Appointment Booking", "Cover Letter"],
    description: "Complete UK visitor visa package including file preparation, appointment booking & biometric guidance.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v4",
    country: "Turkey",
    flag: "🇹🇷",
    title: "Turkey 30-Days Single Entry E-Visa",
    type: "Tourist Visa",
    processingTime: "12 - 24 Hours",
    validity: "180 Days from issue",
    stayDuration: "30 Days Single Entry",
    pricePerApplicant: 95,
    originalPrice: 120,
    discount: "Save $25 per applicant",
    badge: "Instant Approval",
    approvalRate: "99.5%",
    requirements: ["Valid Schengen/USA/UK/Ireland Visa or Residence Permit", "Passport Scan"],
    description: "Instant Turkey e-visa for valid passport holders with prerequisite visa or residency.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v5",
    country: "Thailand",
    flag: "🇹🇭",
    title: "Thailand Tourist Sticker Visa Complete File",
    type: "Tourist Visa",
    processingTime: "5 - 7 Business Days",
    validity: "3 Months",
    stayDuration: "60 Days Entry",
    pricePerApplicant: 110,
    originalPrice: 140,
    discount: "Save $30 per applicant",
    badge: "Sticker Visa",
    approvalRate: "97.8%",
    requirements: ["Original Passport", "Bank Statement ($1000 minimum)", "Confirmed Hotel & Return Flight"],
    description: "Hassle-free Thai embassy sticker visa filing service with ticket & hotel itinerary support.",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v6",
    country: "United States",
    flag: "🇺🇸",
    title: "USA B1/B2 Tourist Visa Prep & Interview Slot",
    type: "Business Visa",
    processingTime: "Appointment Dependent",
    validity: "10 Years Multiple Entry",
    stayDuration: "6 Months per visit",
    pricePerApplicant: 350,
    originalPrice: 420,
    discount: "Save $70 per applicant",
    badge: "Expert Prep",
    approvalRate: "94.2%",
    requirements: ["DS-160 Form Filing", "Consulate Appointment Slot", "Mock Interview Training", "Financial Documents"],
    description: "End-to-end US B1/B2 visitor visa guidance including early appointment tracking & interview prep.",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=80",
  },
];

function VisaServiceCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
      {/* Image */}
      <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#191e3b] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
          <span>{item.flag}</span>
          <span>{item.country}</span>
        </span>
        {item.badge && (
          <span className="absolute bottom-3 left-3 bg-[#006ce4] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
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
              <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-xl border border-emerald-200">
                {item.approvalRate} Approval Rate
              </span>
            </div>
          </div>

          {/* Meta Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 bg-blue-50 text-[#006ce4] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              <Clock className="w-3 h-3" /> Processing: {item.processingTime}
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-purple-100">
              <Globe className="w-3 h-3" /> Validity: {item.validity}
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-amber-100">
              <FileCheck className="w-3 h-3" /> Stay: {item.stayDuration}
            </span>
          </div>

          {/* Requirements list */}
          <div className="mt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Key Requirements:</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {item.requirements.map((req, i) => (
                <span key={i} className="flex items-center gap-1 text-[11px] text-gray-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
            onClick={() => alert(`Starting visa application for ${item.title}. Our consultant will connect with you shortly!`)}
            className="px-5 py-2.5 bg-[#006ce4] hover:bg-[#0057b8] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
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
              <div>
                <h1 className="text-xl font-black text-[#191e3b]">{filtered.length} Visa Options Available</h1>
                <p className="text-xs text-gray-500">Global travel visa processing & file support</p>
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
