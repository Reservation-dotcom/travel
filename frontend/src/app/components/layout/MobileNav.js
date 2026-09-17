"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Briefcase, User, Compass } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Search", icon: Search, href: "/" },
    { label: "Explore", icon: Compass, href: "/stays" },
    { label: "Saved", icon: Heart, href: "/stays" },
    { label: "Trips", icon: Briefcase, href: "/trips" },
    { label: "Account", icon: User, href: "/trips" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-4 z-40 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href && item.label === "Search";
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
                isActive ? "text-[#003580]" : "text-gray-500 hover:text-[#003580]"
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? "bg-blue-50" : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
