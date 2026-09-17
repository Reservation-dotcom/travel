"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Coffee, Waves, Bus, Wifi, ShieldCheck, MapPin } from "lucide-react";

export default function StayCard({ stay }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = stay.images && stay.images.length > 0 ? stay.images : [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
  ];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row group mb-4">
      
      {/* ── Left Column: Image Carousel ── */}
      <div className="relative md:w-[320px] lg:w-[340px] shrink-0 h-[220px] md:h-auto overflow-hidden bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={stay.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Favorite Heart Icon */}
        <button
          type="button"
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-transform active:scale-90 z-10"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700 hover:text-red-500"
            }`}
          />
        </button>

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <button
              type="button"
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/75 text-white pointer-events-auto transition-transform active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/75 text-white pointer-events-auto transition-transform active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Right Column: Hotel Info & Pricing ── */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between text-[#191e3b]">
        
        {/* Top Info */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#191e3b] leading-snug group-hover:text-[#006ce4] transition-colors">
                {stay.name}
              </h3>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">{stay.location}</p>
            </div>
          </div>

          {/* Amenities / Feature Badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-gray-700 font-medium">
            {stay.breakfastIncluded && (
              <div className="flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-gray-600" />
                <span>Breakfast included</span>
              </div>
            )}
            {stay.pool && (
              <div className="flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-gray-600" />
                <span>Pool</span>
              </div>
            )}
            {stay.airportShuttle && (
              <div className="flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-gray-600" />
                <span>Airport shuttle included</span>
              </div>
            )}
            {stay.freeWifi && (
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-gray-600" />
                <span>Free WiFi</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Score & Pricing Row */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between gap-4">
          
          {/* Bottom Left: Guest Rating */}
          <div className="flex items-center gap-2.5">
            <div className="bg-[#191e3b] text-white text-xs font-bold px-2 py-1 rounded-md">
              {stay.rating.toFixed(1)}
            </div>
            <div>
              <div className="text-xs font-bold text-[#191e3b] leading-tight">
                {stay.ratingText || "Good"}
              </div>
              <div className="text-[11px] text-gray-500">
                {stay.reviewCount} reviews
              </div>
            </div>
          </div>

          {/* Bottom Right: Pricing Details */}
          <div className="text-right">
            {stay.discountTag && (
              <div className="inline-block bg-[#007837] text-white text-[11px] font-bold px-2 py-0.5 rounded-md mb-1">
                {stay.discountTag}
              </div>
            )}

            <div className="text-xs text-gray-600 font-semibold">
              ${stay.nightlyPrice} nightly
            </div>

            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              {stay.originalTotal && (
                <span className="text-xs text-gray-400 line-through">
                  ${stay.originalTotal}
                </span>
              )}
              <span className="text-lg sm:text-xl font-bold text-[#191e3b]">
                ${stay.totalPrice} total
              </span>
            </div>

            <div className="text-[10px] text-gray-500">
              Total with taxes and fees
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
