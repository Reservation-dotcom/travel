"use client";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileNav from "./components/layout/MobileNav";
import HeroBanner from "./components/home/HeroBanner";
import AnniversarySaleBanner from "./components/home/AnniversarySaleBanner";
import FeaturedDeals from "./components/home/FeaturedDeals";
import TrendingDestinations from "./components/home/TrendingDestinations";
import PropertyTypes from "./components/home/PropertyTypes";
import AppBanner from "./components/home/AppBanner";
import TrustSection from "./components/home/TrustSection";
import { MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#191e3b] font-sans pb-16 md:pb-0 relative">
      {/* Top Navbar */}
      <Header />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section with Mountain Backdrop & Search Box */}
        <HeroBanner />

        {/* 30th Anniversary Sale Banner */}
        <AnniversarySaleBanner />

        {/* Featured Member Deals */}
        <FeaturedDeals />

        {/* Trending Destinations */}
        <TrendingDestinations />

        {/* Explore Property Types */}
        <PropertyTypes />

        {/* Trust Guarantees */}
        <TrustSection />

        {/* Mobile App Download */}
        <AppBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Floating Help Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#191e3b] font-semibold text-xs rounded-full border border-gray-300 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-[#006ce4]" />
          <span>Help</span>
        </button>
      </div>
    </div>
  );
}
