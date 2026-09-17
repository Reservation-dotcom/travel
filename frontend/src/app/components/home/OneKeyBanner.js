"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Coins, Gift } from "lucide-react";

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
              One Key™ Rewards Program
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              One loyalty program. <br className="hidden sm:inline" />
              <span className="text-[#fcd535]">3 brands.</span> Limitless travel rewards.
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
              Earn and use OneKeyCash™ across <strong className="text-white">Expedia</strong>,{" "}
              <strong className="text-white">Hotels.com</strong>, and <strong className="text-white">Vrbo</strong>.
              Members save 10% or more on over 100,000 hotels worldwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/stays"
                className="px-6 py-3 rounded-full bg-[#fcd535] hover:bg-[#ffe169] text-[#0a1128] font-bold text-sm transition-all shadow-md flex items-center gap-2 hover:gap-3"
              >
                <span>Join One Key for free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/stays"
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all backdrop-blur-sm border border-white/20"
              >
                Sign in to view perks
              </Link>
            </div>
          </div>

          {/* Right Brand Badges & Benefits */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#fcd535]/20 text-[#fcd535] shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Earn 2% OneKeyCash™</div>
                <div className="text-xs text-blue-200">On eligible hotels, packages, and activities</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-400/20 text-blue-300 shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Member Prices</div>
                <div className="text-xs text-blue-200">Instant discounts on stays worldwide</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-400/20 text-emerald-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Price Drop Protection</div>
                <div className="text-xs text-blue-200">We refund the difference if prices drop</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
