"use client";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import StaySearch from "../components/search/StaySearch";

export default function CarsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9]">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-200 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191e3b] mb-4">Rental Cars & Airport Transfers</h1>
          <StaySearch />
        </div>
      </main>
      <Footer />
    </div>
  );
}
