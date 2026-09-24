"use client";

import { MessageSquareShare } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=442039700100"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 transition-transform group-hover:rotate-6"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157zm11.758-6.141c-.287-.143-1.697-.838-1.96-.933-.263-.096-.454-.143-.646.144-.191.286-.74 1.05-.908 1.242-.168.191-.335.215-.622.072-.287-.143-1.214-.447-2.313-1.427-.855-.763-1.433-1.706-1.601-1.993-.168-.287-.018-.442.126-.584.13-.129.287-.335.43-.502.143-.167.191-.286.287-.478.096-.191.048-.359-.024-.502-.072-.143-.646-1.555-.885-2.129-.233-.56-.47-.483-.646-.492l-.55-.009c-.191 0-.502.072-.765.359s-1.004.981-1.004 2.394 1.028 2.774 1.171 2.966c.143.191 2.023 3.088 4.901 4.332.685.296 1.22.473 1.637.605.689.219 1.316.188 1.812.114.554-.083 1.697-.694 1.936-1.363.239-.669.239-1.242.168-1.363-.072-.121-.263-.193-.55-.336z" />
      </svg>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400"></span>
      </span>
    </a>
  );
}
