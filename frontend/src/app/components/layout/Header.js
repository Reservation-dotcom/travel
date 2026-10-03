"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  MapPin,
  FileText,
  Plane,
  Bed,
  ShieldCheck,
  Palmtree,
  Menu,
  X
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Schengen Visa", href: "/schengen", icon: Globe },
    { name: "Other Visa", href: "/visa", icon: FileText },
    { name: "Holiday", href: "/love-holiday", icon: Palmtree },
    { name: "Umrah", href: "/umrah", icon: MapPin },
    { name: "Travel Insurance", href: "/travel-insurance", icon: ShieldCheck },
    { name: "Flight", href: "/flights", icon: Plane },
    { name: "Stay + Transport", href: "/stays", icon: Bed },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 text-[#191e3b] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/schengen-logo.svg"
              alt="Schengen: Visa, Umrah, Flights, Stay"
              width={610}
              height={144}
              priority
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${isActive
                      ? "bg-blue-50 text-[#006ce4] border border-blue-200/80 shadow-2xs"
                      : "text-gray-700 hover:text-[#006ce4] hover:bg-gray-100"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#006ce4]" : "text-gray-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors border border-gray-200"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#006ce4]" /> : <Menu className="w-6 h-6 text-[#191e3b]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3 px-1">
            Navigation Pages
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${isActive
                      ? "bg-blue-50 text-[#006ce4] border border-blue-200"
                      : "bg-gray-50 hover:bg-blue-50/60 text-gray-800 border border-gray-100"
                    }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-white text-[#006ce4]" : "bg-white text-gray-600"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
