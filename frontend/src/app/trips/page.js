"use client";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";

export default function TripsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9]">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-blue-50 text-[#003580] rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#191e3b] mb-2">Where to next?</h1>
          <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
            Sign in to access your saved itineraries, boarding passes, and booking confirmations.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#003580] text-white font-bold text-sm hover:bg-[#00224f] transition-all"
          >
            <span>Search stays & flights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
