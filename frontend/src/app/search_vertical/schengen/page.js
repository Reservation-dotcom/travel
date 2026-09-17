"use client";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SchengenVisaSearch from "../../components/search/SchengenVisaSearch";

export default function SchengenVisaSearchPage() {
  return (
    <div className="min-h-screen bg-[#f5f7f9] text-[#191e3b]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006ce4]">Travel documents</p>
              <h1 className="mt-2 text-2xl font-black sm:text-3xl">Schengen Visa</h1>
            </div>
            <div className="rounded-full bg-[#eaf7ee] px-3 py-1.5 text-xs font-semibold text-[#1c7b41]">
              Fast processing • 27 countries
            </div>
          </div>

          <SchengenVisaSearch />
        </div>
      </main>

      <Footer />
    </div>
  );
}
