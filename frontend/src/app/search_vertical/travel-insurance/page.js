"use client";

import { useState, useRef, Suspense } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EnquiryHeroForm from "../../components/search/EnquiryHeroForm";
import FloatingWhatsApp from "../../components/ui/FloatingWhatsApp";
import {
  ShieldCheck, CheckCircle2, Phone, MessageSquareShare, Search,
  Shield, Globe, Award, ChevronRight, User, Briefcase, Snowflake,
  HelpCircle, Info, Check
} from "lucide-react";

// Data parsed from single-insurance.txt, annual-insurance.txt, and business-insurance.txt
const POLICY_DETAILS = {
  single: {
    id: "single",
    title: "Single Trip Travel Insurance",
    subtitle: "Cover a last minute weekend away or the adventure of a lifetime",
    tagline: "from only £3.60",
    priceNote: "Price based on an individual aged 20 to 40 travelling to Europe for 4 days.",
    cardPrice: "£3.60",
    cardTitle: "Single Trip Travel Insurance",
    cardDesc: "Great value holiday and travel insurance for individual trips anywhere in the world.",
    bgImage: "https://www.coverwise.co.uk/App_Themes/Travel/resources/css/images/Landing/hammock.jpg",
    intro: "Travel insurance for a one-off holiday or business trip, with a choice of cover levels to suit different travel plans and budgets.",
    body: "Whether you're planning a weekend city break, a family holiday, a cruise, or a longer overseas trip, our Single Trip Travel Insurance can help protect you against unexpected events before and during your journey.",
    whatsCovered: [
      "Cancelling your trip before you travel",
      "Cutting short your trip and returning home early",
      "Emergency medical treatment and repatriation costs abroad (including access to a 24-hour Emergency Medical Assistance Service)",
      "Travel delays and disruption",
      "Missed departure",
      "Lost, stolen, damaged, or delayed baggage",
      "Loss of personal money and important travel documents",
      "Personal liability",
      "Personal accident benefits",
      "Legal expenses"
    ],
    optionalCover: [
      "Gadget protection for mobile phones, tablets, laptops, and other portable electronic devices",
      "Winter Sports for ski and snowboarding holidays"
    ],
    levelsIntro: "We offer five levels of Single Trip cover:",
    levels: ["Standard Plus", "Bronze", "Silver Plus", "Gold", "Platinum"],
    levelsDesc: "Each level provides different benefit limits and excess amounts, allowing you to choose cover that reflects the value of your trip and your individual requirements.",
    recommendation: "Before purchasing, we recommend reviewing the cover limits, exclusions, and policy documents to ensure you select the level of cover that best meets your needs."
  },
  annual: {
    id: "annual",
    title: "Annual Multi-Trip Insurance",
    subtitle: "Annual Multi-Trip Cover",
    tagline: "from just £10.95",
    priceNote: "Covers unlimited trips up to 24-31 days per trip for a full 12 months.",
    cardPrice: "£10.95",
    cardTitle: "Annual Multi-Trip Insurance",
    cardDesc: "Annual travel insurance for every journey with a choice of cover and benefits including ski.",
    bgImage: "https://www.coverwise.co.uk/App_Themes/Travel/resources/css/images/Landing/beach-scene.jpg",
    intro: "Travel insurance for multiple trips throughout the year, with a choice of cover levels to suit different travel plans and budgets.",
    body: "If you travel more than once a year, Annual Multi-Trip insurance can be a convenient way to arrange cover for multiple holidays or business trips under one policy. Our Annual Multi-Trip policies last 12 months and cover an unlimited number of eligible trips during that period.",
    tripLengthInfo: {
      title: "How long can each trip be covered for?",
      intro: "The maximum length for each trip depends on your level of cover:",
      rules: [
        "Standard Plus and Bronze - up to 24 days per trip",
        "Silver Plus, Gold, and Platinum - up to 31 days per trip",
        "Winter Sports trips (if you choose to include Winter Sports cover) - up to 17 days per trip"
      ],
      note: "If a trip is longer than the permitted limit, cover will not apply for the extra days."
    },
    whatsCovered: [
      "Cancelling your trip before you travel",
      "Cutting short your trip and returning home early",
      "Emergency medical treatment and repatriation costs abroad (including access to a 24-hour Emergency Medical Assistance Service)",
      "Travel delays and disruption",
      "Missed departure",
      "Lost, stolen, damaged, or delayed baggage",
      "Loss of personal money and important travel documents",
      "Personal liability",
      "Personal accident benefits",
      "Legal expenses"
    ],
    optionalCover: [
      "Gadget protection for mobile phones, tablets, laptops, and other portable electronic devices",
      "Winter Sports for ski and snowboarding holidays"
    ],
    levelsIntro: "We offer five levels of Annual Multi-Trip cover:",
    levels: ["Standard Plus", "Bronze", "Silver Plus", "Gold", "Platinum"],
    levelsDesc: "Each level has different benefit limits and excess amounts. When choosing a policy, consider the number of trips you plan to take, the value of your travel, accommodation and baggage.",
    recommendation: "Before purchasing, we recommend reviewing the cover limits, exclusions, and policy documents to ensure you select the level of cover that best meets your needs."
  },
  business: {
    id: "business",
    title: "Travel Insurance for Business Trips",
    subtitle: "Single Trip Travel Insurance prices",
    tagline: "from just £3.60",
    priceNote: "Comprehensive protection for business meetings, conferences and work trips.",
    cardPrice: "£3.60",
    cardTitle: "Travel Insurance for Business Trips",
    cardDesc: "Travel insurance policies that provide cover for eligible business trips in the same way they cover leisure travel.",
    bgImage: "https://www.coverwise.co.uk/App_Themes/Travel/resources/css/images/Landing/hammock.jpg",
    intro: "Whether you're travelling for a meeting, conference, training course or other work-related reason, our travel insurance policies can provide cover for eligible business trips in the same way they cover leisure travel.",
    body: "All our travel insurance policies include cover for pre-existing medical conditions, emergency medical expenses, and travel disruption for business travellers.",
    whatsCovered: [
      "Cancelling your trip before you travel",
      "Cutting short your trip and returning home early",
      "Emergency medical treatment and repatriation costs abroad (including access to a 24-hour Emergency Medical Assistance Service)",
      "Travel delays and disruption",
      "Missed departure",
      "Lost, stolen, damaged, or delayed baggage",
      "Loss of personal money and important travel documents",
      "Personal liability",
      "Personal accident benefits",
      "Legal expenses"
    ],
    optionalCover: [
      "Gadget protection for mobile phones, tablets, laptops, and other portable electronic devices"
    ],
    regularTravelNotice: {
      title: "Travelling regularly for work?",
      text: "If you take multiple business trips throughout the year, an Annual Multi-Trip policy may be a convenient option. Our Annual Multi-Trip policies last 12 months and cover an unlimited number of eligible trips during that period."
    },
    levelsIntro: "We offer five levels of travel insurance cover:",
    levels: ["Standard Plus", "Bronze", "Silver Plus", "Gold", "Platinum"],
    levelsDesc: "Each level has different benefit limits and excess amounts. When choosing a policy, consider the number of trips you plan to take and the value of your bookings.",
    recommendation: "Before purchasing, we recommend reviewing the cover limits, exclusions, and policy documents to ensure you select the level of cover that best meets your needs."
  }
};

function TravelInsuranceContent() {
  const [activeTab, setActiveTab] = useState("single");
  const detailSectionRef = useRef(null);

  const handleCardClick = (policyKey) => {
    setActiveTab(policyKey);
    if (detailSectionRef.current) {
      detailSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activePolicy = POLICY_DETAILS[activeTab] || POLICY_DETAILS.single;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-[#191e3b] relative font-sans">
      <Header />

      {/* Hero Form Section (Preserved intact) */}
      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80"
        pageType="Travel Insurance"
      />

      {/* Main Section */}
      <main className="flex-1 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#191e3b] tracking-tight">
              Travel Insurance & Embassy Medical Policies
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Schengen VFS/BLS & Worldwide approved travel insurance protection
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-800 text-xs font-bold shadow-2xs self-start sm:self-auto">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant PDF Email in 5 Minutes</span>
          </div>
        </div>

        {/* ── IMAGE 1 CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Single Trip */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div>
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900">
                <img
                  src={POLICY_DETAILS.single.bgImage}
                  alt="Single Trip Travel Insurance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Price & Label on Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                    {POLICY_DETAILS.single.cardPrice}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-right drop-shadow-md max-w-[140px] leading-tight">
                    {POLICY_DETAILS.single.cardTitle}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {POLICY_DETAILS.single.cardDesc}
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleCardClick("single")}
                className="w-auto px-5 py-2 bg-gradient-to-r from-[#0088cc] to-[#0066bb] hover:from-[#0077bb] hover:to-[#0055aa] text-white text-xs font-bold rounded-full shadow-sm transition-all flex items-center gap-1.5 transform active:scale-95"
              >
                <ChevronRight className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
                <span>read more</span>
              </button>
            </div>
          </div>

          {/* Card 2: Annual Multi Trip */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div>
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900">
                <img
                  src={POLICY_DETAILS.annual.bgImage}
                  alt="Annual Multi Trip Insurance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                    {POLICY_DETAILS.annual.cardPrice}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-right drop-shadow-md max-w-[140px] leading-tight">
                    {POLICY_DETAILS.annual.cardTitle}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {POLICY_DETAILS.annual.cardDesc}
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleCardClick("annual")}
                className="w-auto px-5 py-2 bg-gradient-to-r from-[#0088cc] to-[#0066bb] hover:from-[#0077bb] hover:to-[#0055aa] text-white text-xs font-bold rounded-full shadow-sm transition-all flex items-center gap-1.5 transform active:scale-95"
              >
                <ChevronRight className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
                <span>read more</span>
              </button>
            </div>
          </div>

          {/* Card 3: Business Travel */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            <div>
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900">
                <img
                  src={POLICY_DETAILS.business.bgImage}
                  alt="Business Travel Insurance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                    {POLICY_DETAILS.business.cardPrice}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-right drop-shadow-md max-w-[150px] leading-tight">
                    {POLICY_DETAILS.business.cardTitle}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {POLICY_DETAILS.business.cardDesc}
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleCardClick("business")}
                className="w-auto px-5 py-2 bg-gradient-to-r from-[#0088cc] to-[#0066bb] hover:from-[#0077bb] hover:to-[#0055aa] text-white text-xs font-bold rounded-full shadow-sm transition-all flex items-center gap-1.5 transform active:scale-95"
              >
                <ChevronRight className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
                <span>read more</span>
              </button>
            </div>
          </div>

        </div>

        {/* ── IMAGE 2 DETAILED POLICY VIEW & TABS SECTION ── */}
        <div ref={detailSectionRef} className="pt-4 scroll-mt-20">

          {/* Top Blue Navigation Bar (Single / Annual / Business / Winter) */}
          <div className="bg-[#0088cc] p-2 rounded-t-2xl flex flex-wrap items-center justify-between gap-3 text-white shadow-md">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab("single")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${activeTab === "single"
                  ? "bg-white text-[#0088cc] shadow-xs"
                  : "bg-white/15 text-white hover:bg-white/25"
                  }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Single</span>
              </button>

              <button
                onClick={() => setActiveTab("annual")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${activeTab === "annual"
                  ? "bg-white text-[#0088cc] shadow-xs"
                  : "bg-white/15 text-white hover:bg-white/25"
                  }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span>Annual</span>
              </button>

              <button
                onClick={() => setActiveTab("business")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${activeTab === "business"
                  ? "bg-white text-[#0088cc] shadow-xs"
                  : "bg-white/15 text-white hover:bg-white/25"
                  }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Business</span>
              </button>


            </div>

            {/* Need Help Search Bar */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="need help?"
                className="w-full sm:w-52 pl-3 pr-8 py-1.5 text-xs bg-white text-gray-800 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Large Hero Banner with Hammock/Beach Scene Background */}
          <div className="relative min-h-[220px] sm:min-h-[280px] w-full overflow-hidden bg-gray-900 flex flex-col justify-end p-6 sm:p-8">
            <img
              src={activePolicy.bgImage}
              alt={activePolicy.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Banner Text Overlays */}
            <div className="relative z-10 text-white max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black leading-tight drop-shadow-md">
                {activePolicy.subtitle}
              </h2>
              <div className="text-xl sm:text-3xl font-extrabold text-blue-100 drop-shadow-md">
                {activePolicy.tagline}
              </div>
              <p className="text-[11px] sm:text-xs text-blue-100/90 font-medium">
                {activePolicy.priceNote}
              </p>
            </div>
          </div>

          {/* Green "Did you know?" Notice Bar */}
          <div className="bg-[#99d68c] text-[#1c4714] px-5 py-3 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-inner">
            <HelpCircle className="w-4 h-4 text-[#1c4714] shrink-0" />
            <div>
              <span className="font-black">Did you know?</span> To save time, you can submit popular policy requests (such as resending documents and correcting traveller details) quickly and securely <span className="underline font-bold cursor-pointer">online</span>.
            </div>
          </div>

          {/* Detailed Policy Text Article Box */}
          <div className="bg-white border-x border-b border-gray-200 rounded-b-2xl p-6 sm:p-8 space-y-8 shadow-sm">

            {/* Main Title & Intro */}
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-[#0088cc] border-b border-gray-100 pb-3">
                {activePolicy.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                {activePolicy.intro}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activePolicy.body}
              </p>
            </div>

            {/* Annual Specific: Trip Length Rules */}
            {activePolicy.tripLengthInfo && (
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-bold text-[#0066bb] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#0066bb]" />
                  <span>{activePolicy.tripLengthInfo.title}</span>
                </h3>
                <p className="text-xs text-gray-700 font-medium">{activePolicy.tripLengthInfo.intro}</p>
                <ul className="space-y-1 pl-4 list-disc text-xs text-gray-700 font-medium">
                  {activePolicy.tripLengthInfo.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
                <p className="text-[11px] text-gray-500 italic mt-1">{activePolicy.tripLengthInfo.note}</p>
              </div>
            )}

            {/* Business Specific: Regular Travel Notice */}
            {activePolicy.regularTravelNotice && (
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 space-y-1">
                <h3 className="text-sm font-bold text-[#0066bb]">
                  {activePolicy.regularTravelNotice.title}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {activePolicy.regularTravelNotice.text}
                </p>
              </div>
            )}

            {/* What's Covered List */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#191e3b]">What's covered?</h3>
              <p className="text-xs text-gray-500 font-medium">All our policies include comprehensive cover for:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {activePolicy.whatsCovered.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#0088cc] shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Cover */}
            {activePolicy.optionalCover && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#191e3b]">Optional Cover Options:</h3>
                <div className="space-y-2">
                  {activePolicy.optionalCover.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 bg-blue-50/40 p-3 rounded-xl border border-blue-100 font-medium">
                      <Check className="w-4 h-4 text-[#0088cc] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Level of Cover Tier Badges */}
            <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h3 className="text-base font-bold text-[#191e3b]">Choose the level of cover that's right for you</h3>
              <p className="text-xs text-gray-600 font-medium">{activePolicy.levelsIntro}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {activePolicy.levels.map((level, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white border border-[#0088cc] text-[#0088cc] text-xs font-bold rounded-full shadow-2xs"
                  >
                    {level}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-600 font-medium pt-1">
                {activePolicy.levelsDesc}
              </p>
            </div>

            {/* Important Information Warning Box */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 space-y-2 text-amber-900">
              <h4 className="text-sm font-bold flex items-center gap-2 text-amber-950">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Important Information & Medical Declaration</span>
              </h4>
              <p className="text-xs leading-relaxed font-medium">
                Our travel insurance is designed for permanent residents of the United Kingdom who are registered with a UK medical practitioner.
              </p>
              <p className="text-xs leading-relaxed font-medium">
                You must declare any pre-existing medical conditions for all travellers you wish to insure. Failure to provide accurate and complete information may affect your cover and any future claim.
              </p>
              <p className="text-[11px] text-amber-800 font-semibold pt-1">
                Coverwise Limited is an independent Insurance Intermediary authorised and regulated by the Financial Services Commission. FSC Registration Number: FSC1107B.
              </p>
            </div>

            {/* Direct Contact CTA Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#191e3b] to-[#0088cc] p-6 rounded-2xl text-white shadow-md">
              <div>
                <h4 className="font-extrabold text-base">Need Assistance or Custom Medical Cover?</h4>
                <p className="text-xs text-blue-100 mt-0.5 font-medium">
                  Speak directly with our UK travel insurance specialists for instant policy issuance.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:02039703003"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-transparent bg-[#2563EB] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#191e3b] sm:flex-initial sm:rounded-xl sm:border-white/30 sm:bg-white/10 sm:px-4 sm:text-xs sm:hover:bg-white/20"
                >
                  <Phone className="w-4 h-4 text-white sm:text-yellow-300" />
                  <span className="whitespace-nowrap sm:hidden">Call Now</span>
                  <span className="hidden sm:inline">Call Now</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=447413059890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#191e3b] sm:flex-initial sm:rounded-xl sm:px-5 sm:text-xs"
                >
                  <MessageSquareShare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

export default function TravelInsuranceSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f6f9]" />}>
      <TravelInsuranceContent />
    </Suspense>
  );
}
