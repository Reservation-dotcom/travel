"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Bus, Phone, MessageSquareShare, ShieldCheck, Car, Building2, Wifi, Coffee } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row group mb-4 w-full min-w-0">

      {/* ── Left Column: Image Carousel ── */}
      <div className="relative md:w-[300px] lg:w-[360px] xl:w-[400px] shrink-0 h-[220px] md:h-auto overflow-hidden bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={stay.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Stay + Transport Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-[#191e3b] px-3 py-1 text-[11px] font-extrabold text-white shadow-md border border-white/20">
          <Car className="w-3.5 h-3.5 text-yellow-400" />
          <span>Stay + Transport Included</span>
        </div>

        {/* Country flag badge */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-[#191e3b] shadow-md backdrop-blur-xs border border-gray-200">
          <img
            src={stay.flagImage || `https://flagcdn.com/w160/${(stay.country || "sa").toLowerCase().slice(0, 2)}.png`}
            alt={`${stay.country || "Saudi Arabia"} Flag`}
            className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shadow-2xs"
          />
          <span>{stay.country || "Saudi Arabia"}</span>
        </div>

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <button
              type="button"
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white pointer-events-auto transition-transform active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white pointer-events-auto transition-transform active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 bg-black/50 px-2 py-0.5 rounded-full">
            <span className="text-[10px] text-white font-bold">{currentImageIndex + 1}/{images.length}</span>
          </div>
        )}
      </div>

      {/* ── Right Column: Hotel & Transport Info ── */}
      <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between text-[#191e3b]">

        {/* Top Info */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#191e3b] leading-tight group-hover:text-[#006ce4] transition-colors">
                {stay.name}
              </h3>
              <p className="text-xs font-semibold text-gray-500 mt-1">{stay.location}</p>
            </div>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {stay.ratingText || "Exceptional"}
            </span>
          </div>

          {/* Stay + Transport Inclusions Chips */}
          <div className="mt-3.5 pt-3 border-t border-gray-100 space-y-2">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Package Inclusions:</div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#006ce4] border border-blue-100">
                <Building2 className="w-4 h-4 text-[#006ce4]" />
                <span>Luxury Stay</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-100">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>{stay.transportType || "Private Airport Chauffeur Transfer Included"}</span>
              </div>
              {stay.breakfastIncluded && (
                <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 border border-amber-100">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Breakfast Included</span>
                </div>
              )}
            </div>
          </div>

          {/* Features list */}
          {stay.features && stay.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {stay.features.map((feat, i) => (
                <span key={i} className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md">
                  • {feat}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Bottom Row: Price left, contact right */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">

          {/* Left: Price */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">Stay + Transport Deal</span>
            <div className="text-2xl sm:text-3xl font-black text-[#191e3b] leading-tight">
              £{stay.totalPrice}
              <span className="text-xs font-normal text-gray-500"> / per stay package</span>
            </div>
          </div>

          {/* Right: Contact Details (Phone + WhatsApp) */}
          <div className="flex items-center gap-2">
            <a
              href="tel:02039700100"
              className="px-3.5 py-2.5 border border-gray-300 hover:border-[#006ce4] text-[#191e3b] hover:text-[#006ce4] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
              aria-label="Contact Us"
            >
              <Phone className="w-3.5 h-3.5 text-[#006ce4]" />
              <span className="hidden sm:inline">Contact Us</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=4407821030906"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-sm transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-1.5"
              aria-label="WhatsApp contact"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
