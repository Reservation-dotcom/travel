"use client";

import Link from "next/link";
import { Globe, Lock, Shield, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Company: [
      { name: "About Expedia", href: "#" },
      { name: "Jobs & Careers", href: "#" },
      { name: "Investor Relations", href: "#" },
      { name: "Expedia Group Media", href: "#" },
      { name: "Advertising & Partner Solutions", href: "#" },
      { name: "One Key™ Rewards Details", href: "#" },
    ],
    Explore: [
      { name: "Hotels in United States", href: "/stays" },
      { name: "Vacation Rentals", href: "/stays" },
      { name: "Vacation Packages", href: "/trips" },
      { name: "Domestic Flights", href: "/flights" },
      { name: "Car Rental Deals", href: "/cars" },
      { name: "All Unique Stays & Cabins", href: "/stays" },
    ],
    Policies: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Use", href: "#" },
      { name: "Vrbo Terms & Conditions", href: "#" },
      { name: "One Key Terms & Conditions", href: "#" },
      { name: "Accessibility Statement", href: "#" },
      { name: "Your Privacy Choices", href: "#" },
    ],
    Help: [
      { name: "Customer Support & FAQs", href: "#" },
      { name: "Cancel your hotel booking", href: "#" },
      { name: "Cancel your flight", href: "#" },
      { name: "Refund timelines & policies", href: "#" },
      { name: "Use an Expedia coupon", href: "#" },
      { name: "Travel documents & advisories", href: "#" },
    ],
  };

  const partnerBrands = [
    "Hotels.com",
    "Vrbo",
    "Orbitz",
    "Travelocity",
    "trivago",
    "Wotif",
    "CarRentals.com",
    "CheapTickets",
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-20 text-gray-700">
      {/* Back to top button */}
      <div className="border-b border-gray-100 py-3 text-center bg-gray-50/70">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003580] hover:underline"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to top</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Brand & 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Logo & Summary */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-[#003580] flex items-center">
                Expedia
                <span className="w-2.5 h-2.5 rounded-full bg-[#fcd535] ml-1 mb-2"></span>
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore the world with Expedia. Compare cheap hotels, flights, vacation packages, and rental cars with One Key™ rewards.
            </p>
          </div>

          {/* Cols 2-5: Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#191e3b]">
                {title}
              </h4>
              <ul className="space-y-2 text-xs">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#003580] hover:underline transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Expedia Group Brands Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center sm:text-left">
            Explore Expedia Group Brands
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs font-semibold text-gray-500">
            {partnerBrands.map((brand, i) => (
              <span key={i} className="hover:text-[#003580] cursor-pointer transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            © 2026 Expedia, Inc., an Expedia Group company. All rights reserved. Expedia and the Expedia Logo are trademarks or registered trademarks of Expedia, Inc.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-1 text-gray-600">
              <Lock className="w-3 h-3 text-emerald-600" /> Secure 256-bit SSL Booking
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
