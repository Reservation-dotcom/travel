"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  MessageSquare,
  Menu,
  X,
  Bed,
  Plane,
  MapPin,
  ShieldCheck,
  FileText,
  Globe
} from "lucide-react";

export default function Header() {
  const [isShopTravelOpen, setIsShopTravelOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const shopTravelRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shopTravelRef.current && !shopTravelRef.current.contains(event.target)) {
        setIsShopTravelOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shopCategories = [
    { name: "Stays", icon: Bed, href: "/stays", desc: "Hotels, resorts, vacation rentals" },
    { name: "Flights", icon: Plane, href: "/flights", desc: "Domestic and international airlines" },
    { name: "Umrah", icon: MapPin, href: "/umrah", desc: "Complete Umrah packages and pilgrimage support" },
    { name: "Hajj", icon: ShieldCheck, href: "/hajj", desc: "Hajj packages with guided planning" },
    { name: "Schengen", icon: Globe, href: "/schengen", desc: "Schengen visa appointments and requirements" },
    { name: "Other Visa", icon: FileText, href: "/visa", desc: "Tourist, business, and visit visa options" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 text-[#191e3b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Exact Expedia Logo + Shop travel dropdown */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Expedia Yellow Icon with Up-Right Arrow */}
              <div className="w-8 h-8 rounded-lg bg-[#fcd535] flex items-center justify-center text-[#191e3b] font-black shadow-xs">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M5 19L19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#191e3b]">
                Expedia
              </span>
            </Link>

            {/* Shop travel dropdown */}
            <div className="relative hidden md:block" ref={shopTravelRef}>
              <button
                onClick={() => setIsShopTravelOpen(!isShopTravelOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#191e3b] hover:bg-gray-100 rounded-full transition-colors"
                aria-expanded={isShopTravelOpen}
              >
                <span>Shop travel</span>
                <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform ${isShopTravelOpen ? "rotate-180" : ""}`} />
              </button>

              {isShopTravelOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">All Travel Categories</p>
                  </div>
                  <div className="py-2">
                    {shopCategories.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setIsShopTravelOpen(false)}
                          className="flex items-start gap-3.5 px-4 py-2.5 hover:bg-blue-50/70 transition-colors group"
                        >
                          <div className="p-2 rounded-xl bg-gray-100 text-gray-700 group-hover:bg-[#003580] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#191e3b] group-hover:text-[#003580]">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: USD • US Flag, List your property, Support, Trips, Feedback, Sign in */}
          <div className="flex items-center gap-1 sm:gap-4 lg:gap-6 text-sm font-medium text-[#191e3b]">
            
            {/* Open app button */}
            <button className="hidden lg:flex items-center gap-1.5 hover:bg-gray-100 transition-colors py-1.5 px-3 rounded-full border border-gray-300 text-xs font-semibold text-[#191e3b]">
              <span>Open app</span>
              <svg className="w-3.5 h-3.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            {/* USD • Flag */}
            <button className="hidden lg:flex items-center gap-1.5 hover:text-[#003580] transition-colors py-1.5 px-2 rounded-lg hover:bg-gray-50">
              <span className="font-semibold text-xs text-gray-700">USD</span>
              <span className="text-gray-400">•</span>
              <span className="text-base" role="img" aria-label="US Flag">🇺🇸</span>
            </button>

            {/* List your property */}
            <Link
              href="/stays"
              className="hidden md:inline-flex hover:text-[#003580] transition-colors text-sm"
            >
              List your property
            </Link>

            {/* Support */}
            <Link
              href="/trips"
              className="hidden sm:inline-flex hover:text-[#003580] transition-colors text-sm"
            >
              Support
            </Link>

            {/* Trips */}
            <Link
              href="/trips"
              className="inline-flex hover:text-[#003580] transition-colors text-sm"
            >
              Trips
            </Link>

            {/* Feedback message icon */}
            <button
              className="hidden sm:flex items-center justify-center p-1.5 text-gray-700 hover:text-[#003580] hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Feedback"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Sign in */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hover:text-[#003580] font-semibold text-sm transition-colors py-1.5 px-3 rounded-full hover:bg-gray-100"
              >
                Sign in
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg text-[#191e3b]">Sign in to your account</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Save up to 30% on hotels and manage your trips in one place.
                    </p>
                  </div>

                  <Link
                    href="/signin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block w-full py-2.5 px-4 bg-[#006ce4] hover:bg-[#0057b8] text-white font-bold rounded-full text-sm transition-colors shadow-sm text-center"
                  >
                    Sign in
                  </Link>

                  <div className="mt-3 text-center">
                    <Link
                      href="/signup"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="text-sm font-semibold text-[#006ce4] hover:underline"
                    >
                      Create a free account
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 my-4 pt-3 space-y-2">
                    <Link
                      href="/trips"
                      className="block px-2 py-1.5 text-sm text-gray-700 hover:text-[#003580] font-medium"
                    >
                      List of favorites
                    </Link>
                    <Link
                      href="/trips"
                      className="block px-2 py-1.5 text-sm text-gray-700 hover:text-[#003580] font-medium"
                    >
                      Feedback & Support
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="py-2 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Travel Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {shopCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={i}
                    href={cat.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 text-sm font-semibold text-gray-800"
                  >
                    <Icon className="w-4 h-4 text-[#006ce4]" />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              href="/stays"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span>List your property</span>
            </Link>
            <Link
              href="/trips"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span>Support</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
