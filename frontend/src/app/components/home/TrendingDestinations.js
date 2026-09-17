"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, ArrowUpRight, Flame, Palmtree, Building2, Mountain, Heart } from "lucide-react";

export default function TrendingDestinations() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Trending Now", icon: Flame },
    { id: "beach", label: "Beach Vacations", icon: Palmtree },
    { id: "city", label: "City Breaks", icon: Building2 },
    { id: "nature", label: "Mountain Escapes", icon: Mountain },
    { id: "romantic", label: "Romantic Getaways", icon: Heart },
  ];

  const destinations = [
    {
      id: "dest-1",
      city: "Cancun",
      country: "Mexico",
      category: "beach",
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
      staysCount: "1,420+ stays",
      priceFrom: "$124",
      highlight: "White sand beaches & crystal waters",
    },
    {
      id: "dest-2",
      city: "Tokyo",
      country: "Japan",
      category: "city",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      staysCount: "3,890+ stays",
      priceFrom: "$98",
      highlight: "Vibrant neon districts & culinary gems",
    },
    {
      id: "dest-3",
      city: "Maui, Hawaii",
      country: "United States",
      category: "beach",
      image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80",
      staysCount: "860+ stays",
      priceFrom: "$249",
      highlight: "Tropical sunsets & coastal resorts",
    },
    {
      id: "dest-4",
      city: "Banff & Rocky Mountains",
      country: "Canada",
      category: "nature",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      staysCount: "430+ stays",
      priceFrom: "$165",
      highlight: "Glacial lakes & cozy mountain chalets",
    },
    {
      id: "dest-5",
      city: "Amalfi Coast & Positano",
      country: "Italy",
      category: "romantic",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      staysCount: "680+ stays",
      priceFrom: "$210",
      highlight: "Cliffside villas & Mediterranean views",
    },
    {
      id: "dest-6",
      city: "London",
      country: "United Kingdom",
      category: "city",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      staysCount: "5,120+ stays",
      priceFrom: "$145",
      highlight: "Historic landmarks & world-class museums",
    },
  ];

  const filtered = activeCategory === "all"
    ? destinations
    : destinations.filter((d) => d.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#003580] uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover your next trip</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#191e3b] tracking-tight">
            Trending destinations for your next getaway
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Travelers from around the world are booking these top spots right now.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                isActive
                  ? "bg-[#003580] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#fcd535]" : "text-gray-500"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <Link
            key={dest.id}
            href={`/stays?destination=${encodeURIComponent(dest.city)}`}
            className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 block"
          >
            {/* Image with gradient overlay */}
            <Image
              src={dest.image}
              alt={dest.city}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                {dest.staysCount}
              </span>
            </div>

            {/* Quick Arrow on Hover */}
            <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-white">
              <div className="text-xs font-semibold text-[#fcd535] uppercase tracking-wider mb-0.5">
                {dest.country}
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-1">
                {dest.city}
              </h3>
              <p className="text-xs text-gray-200 line-clamp-1 mb-3">
                {dest.highlight}
              </p>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-300 block">Stays from</span>
                  <span className="text-lg font-extrabold text-white">{dest.priceFrom}</span>
                  <span className="text-xs text-gray-300 font-normal"> / night avg</span>
                </div>
                <span className="text-xs font-bold text-[#fcd535] group-hover:underline">
                  Explore Stays &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
