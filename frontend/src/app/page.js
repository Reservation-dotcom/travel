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
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp";

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

      <FloatingWhatsApp />
    </div>
  );
}
