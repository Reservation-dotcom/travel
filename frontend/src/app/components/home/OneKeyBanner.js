"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Plane, FileText, Headphones } from "lucide-react";

export default function OneKeyBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a1128] via-[#12234e] to-[#003580] text-white p-6 sm:p-10 shadow-xl border border-blue-900/50">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-[#fcd535]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left copy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcd535]/20 border border-[#fcd535]/30 text-[#fcd535] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-[#fcd535]" />
              Schengen Masters
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              One place for <br className="hidden sm:inline" />
              <span className="text-[#fcd535]">every journey.</span>
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
              Plan visa services, flights, stays, holidays, Hajj, and Umrah with Schengen Masters.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/flights"
                className="px-6 py-3 rounded-full bg-[#fcd535] hover:bg-[#ffe169] text-[#0a1128] font-bold text-sm transition-all shadow-md flex items-center gap-2 hover:gap-3"
              >
                <span>Explore flights</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/love-holiday"
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all backdrop-blur-sm border border-white/20"
              >
                Browse holidays
              </Link>
            </div>
          </div>

          {/* Travel services */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#fcd535]/20 text-[#fcd535] shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Flights and stays</div>
                <div className="text-xs text-blue-200">Compare options for your next trip</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-400/20 text-blue-300 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Visa assistance</div>
                <div className="text-xs text-blue-200">Support with documents and appointments</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-400/20 text-emerald-300 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Travel support</div>
                <div className="text-xs text-blue-200">Help with planning and travel questions</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
