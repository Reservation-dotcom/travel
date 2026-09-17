"use client";

import { useState } from "react";
import Image from "next/image";
import { Smartphone, QrCode, CheckCircle2, ShieldCheck, ArrowRight, Bell, Sparkles } from "lucide-react";

export default function AppBanner() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setPhoneNumber("");
      }, 4000);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/50 rounded-3xl border border-blue-100 p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
        
        {/* Background Accents */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left / Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003580]/10 text-[#003580] text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Expedia App</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#191e3b] tracking-tight leading-tight">
              Get the Expedia app for deeper member discounts and real-time trip alerts
            </h2>

            <ul className="space-y-2.5 text-sm text-gray-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Double OneKeyCash™ earnings on all in-app hotel bookings</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant flight delay, gate change, and baggage carousel notifications</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Access all itinerary details and booking confirmations offline</span>
              </li>
            </ul>

            {/* SMS Link Form */}
            <div className="pt-2">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md">
                <div className="flex-1 relative">
                  <span className="absolute left-3.5 top-3 text-xs font-bold text-gray-500">+1</span>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-medium focus:ring-2 focus:ring-[#003580] focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#003580] hover:bg-[#00224f] text-white font-bold text-sm rounded-full transition-colors shadow-sm flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>{isSent ? "Link Sent!" : "Get the app"}</span>
                  {!isSent && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              <p className="text-[11px] text-gray-500 mt-2">
                By providing your number, you agree to receive a one-time automated text message with a link to get the app. Standard text rates apply.
              </p>
            </div>
          </div>

          {/* Right / QR Code & Visual mockup */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            {/* QR Code Container */}
            <div className="p-3 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <div className="w-32 h-32 bg-gray-900 rounded-xl p-2 flex items-center justify-center text-white relative">
                {/* SVG QR Code Pattern */}
                <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-white rounded-lg">
                  <div className="bg-[#003580] rounded-sm col-span-2 row-span-2" />
                  <div className="bg-gray-800 rounded-sm" />
                  <div className="bg-[#003580] rounded-sm col-span-2 row-span-2" />
                  <div className="bg-[#fcd535] rounded-sm" />
                  <div className="bg-gray-800 rounded-sm" />
                  <div className="bg-gray-800 rounded-sm" />
                  <div className="bg-[#003580] rounded-sm col-span-2 row-span-2" />
                  <div className="bg-[#003580] rounded-sm" />
                  <div className="bg-gray-800 rounded-sm" />
                  <div className="bg-[#003580] rounded-sm col-span-2 row-span-2" />
                </div>
              </div>
              <span className="text-[11px] font-bold text-gray-700 mt-2 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-[#003580]" /> Scan QR Code
              </span>
            </div>

            {/* App Store Badges */}
            <div className="space-y-2.5 text-center sm:text-left">
              <div className="text-xs font-bold text-[#191e3b]">
                Scan with your phone camera to download directly
              </div>
              <div className="flex flex-col gap-2">
                <div className="px-4 py-2 bg-black text-white rounded-xl flex items-center gap-2.5 cursor-pointer hover:bg-gray-800 transition-colors">
                  <div className="text-[10px] text-gray-300 leading-tight">
                    Download on the
                    <div className="text-xs font-bold text-white">Apple App Store</div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-black text-white rounded-xl flex items-center gap-2.5 cursor-pointer hover:bg-gray-800 transition-colors">
                  <div className="text-[10px] text-gray-300 leading-tight">
                    GET IT ON
                    <div className="text-xs font-bold text-white">Google Play</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
