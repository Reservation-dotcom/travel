"use client";

import { ShieldCheck, Clock, Award, Headphones, Sparkles, Check } from "lucide-react";

export default function TrustSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Free cancellation on most stays",
      desc: "Because plans change. Book flexible rates so you can cancel or change without penalty if needed.",
    },
    {
      icon: Award,
      title: "Price match & drop protection",
      desc: "Find a lower price on another site within 24 hours of booking? We will refund the difference.",
    },
    {
      icon: Headphones,
      title: "24/7 live traveler support",
      desc: "Get instant assistance around the clock via live chat or phone for modifications and questions.",
    },
    {
      icon: Sparkles,
      title: "One Key™ universal rewards",
      desc: "Earn OneKeyCash™ rewards that you can redeem directly across Expedia, Hotels.com, and Vrbo.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#191e3b] tracking-tight">
            Plan with peace of mind
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Expedia gives you total confidence from initial search through your return trip.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-[#003580]/30 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-[#003580] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-[#191e3b] mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
