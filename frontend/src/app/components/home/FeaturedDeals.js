"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, MapPin, Sparkles, ChevronRight, ShieldCheck } from "lucide-react";

export default function FeaturedDeals() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deals = [
    {
      id: "deal-1",
      name: "The Manhattan Grand Hotel & Suites",
      location: "Midtown, New York",
      rating: 4.8,
      reviewsCount: 2450,
      scoreText: "Exceptional",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      originalPrice: 340,
      memberPrice: 229,
      discount: "32% off",
      badge: "Member Price",
      tag: "Free cancellation",
      featured: true,
    },
    {
      id: "deal-2",
      name: "Azure Bay Luxury Beachfront Resort",
      location: "South Beach, Miami",
      rating: 4.9,
      reviewsCount: 1820,
      scoreText: "Wonderful",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      originalPrice: 420,
      memberPrice: 289,
      discount: "31% off",
      badge: "Top Rated",
      tag: "Ocean view pool",
    },
    {
      id: "deal-3",
      name: "Bellagio View Palazzo & Casino",
      location: "The Strip, Las Vegas",
      rating: 4.7,
      reviewsCount: 5120,
      scoreText: "Very Good",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      originalPrice: 210,
      memberPrice: 139,
      discount: "33% off",
      badge: "Member Price",
      tag: "No prepayment needed",
    },
    {
      id: "deal-4",
      name: "Le Marais Boutique Hotel & Spa",
      location: "Paris City Centre, France",
      rating: 4.8,
      reviewsCount: 980,
      scoreText: "Exceptional",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      originalPrice: 380,
      memberPrice: 255,
      discount: "32% off",
      badge: "Member Price",
      tag: "Breakfast included",
    },
  ];

  return (
    <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#003580] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 fill-[#fcd535] text-[#fcd535]" />
            <span>Exclusive Discounts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#191e3b] tracking-tight">
            Save 20% or more with Member Prices
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Lock in special rates on top-rated hotels, handpicked for this week.
          </p>
        </div>
        <Link
          href="/stays"
          className="inline-flex items-center gap-1 text-sm font-bold text-[#003580] hover:text-[#00224f] hover:underline"
        >
          <span>See all member deals</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {deals.map((deal) => {
          const isFav = favorites[deal.id];
          return (
            <Link
              key={deal.id}
              href="/stays"
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-[#003580] text-white text-[11px] font-bold shadow-md">
                    {deal.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-md w-fit">
                    {deal.discount}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => toggleFavorite(deal.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md backdrop-blur-sm transition-transform active:scale-90 z-10"
                  aria-label="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? "fill-red-500 text-red-500" : "text-gray-700"
                    }`}
                  />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{deal.location}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#191e3b] group-hover:text-[#003580] transition-colors line-clamp-1 mb-2">
                    {deal.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="px-1.5 py-0.5 rounded bg-[#003580] text-white font-bold text-xs">
                      {deal.rating}
                    </span>
                    <span className="text-xs font-bold text-[#191e3b]">{deal.scoreText}</span>
                    <span className="text-xs text-gray-400">({deal.reviewsCount.toLocaleString()})</span>
                  </div>

                  {/* Feature tag */}
                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md mb-4">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{deal.tag}</span>
                  </div>
                </div>

                {/* Price block */}
                <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-1.5">
                      ${deal.originalPrice}
                    </span>
                    <div className="text-xl font-extrabold text-[#191e3b]">
                      ${deal.memberPrice}
                      <span className="text-xs font-normal text-gray-500 ml-1">/ night</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">includes taxes & fees</span>
                    <span className="text-xs font-bold text-[#003580] group-hover:underline">
                      View deal &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
