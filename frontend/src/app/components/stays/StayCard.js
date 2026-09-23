"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Coffee, Waves, Bus, Wifi, Phone, MessageCircle } from "lucide-react";

export default function StayCard({ stay }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row group mb-4 w-full min-w-0">
      
      {/* ── Left Column: Image Carousel ── */}
      <div className="relative md:w-[300px] lg:w-[360px] xl:w-[400px] shrink-0 h-[220px] md:h-auto overflow-hidden bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={stay.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Country flag badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-[#191e3b] shadow-md backdrop-blur-sm border border-white/80">
          <img
            src={stay.flagImage || `https://flagcdn.com/w160/${(stay.country || "sa").toLowerCase().slice(0, 2)}.png`}
            alt={`${stay.country || "Saudi Arabia"} Flag`}
            className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shadow-sm"
          />
          <span>{stay.country || "Saudi Arabia"}</span>
        </div>

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
      <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between text-[#191e3b]">
        
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

          {/* Premium highlight labels */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {stay.pool && (
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-[#006ce4] border border-blue-100">
                <Waves className="w-3.5 h-3.5" />
                <span>Luxury Pool</span>
              </div>
            )}
            {stay.breakfastIncluded && (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1.5 text-[10px] font-bold text-amber-700 border border-amber-100">
                <Coffee className="w-3.5 h-3.5" />
                <span>Breakfast Included</span>
              </div>
            )}
            {stay.freeWifi && (
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700 border border-emerald-100">
                <Wifi className="w-3.5 h-3.5" />
                <span>Free Wi‑Fi</span>
              </div>
            )}
            {!stay.pool && !stay.breakfastIncluded && !stay.freeWifi && (
              <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1.5 text-[10px] font-bold text-gray-600 border border-gray-200">
                <span>Premium Stay</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Row: Price left, contact right */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between gap-4">
          
          {/* Left: Price + discount */}
          <div className="text-left">
            {stay.discountTag && (
              <div className="inline-block bg-[#ff4d4f] text-white text-[11px] font-black px-2 py-0.5 rounded-md mb-2 shadow-sm">
                {stay.discountTag}
              </div>
            )}

            <div className="text-2xl sm:text-3xl font-black text-[#191e3b] leading-none">
              ${stay.totalPrice}
            </div>
          </div>

          {/* Right: Contact Details */}
          <div className="text-right space-y-2">
            {stay.phone && (
              <a
                href={`tel:${stay.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-[11px] font-semibold text-[#191e3b] hover:border-[#006ce4] hover:text-[#006ce4]"
                aria-label={`Call ${stay.phone}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{stay.phone}</span>
              </a>
            )}

            {stay.whatsapp && (
              <a
                href={`https://wa.me/${stay.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1.5 text-[11px] font-semibold text-green-700 hover:bg-green-100 block"
                aria-label="WhatsApp contact"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
