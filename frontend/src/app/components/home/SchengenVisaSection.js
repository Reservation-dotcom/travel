"use client";

import Link from "next/link";
import { CheckCircle2, Globe, ChevronRight, Phone } from "lucide-react";

const SCHENGEN_PHONE = "020 3970 0100";
const SCHENGEN_PHONE_LINK = "tel:02039703003";
const SCHENGEN_WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=447413059890";

const FEATURED_SCHENGEN = [
  {
    id: "s1",
    country: "France",
    flagImage: "https://flagcdn.com/w160/fr.png",
    destinationImage: "/france.png",
    title: "France Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    services: ["Free Assessment", "Document Checklist", "Appointment & Briefing"],
  },
  {
    id: "s2",
    country: "Germany",
    flagImage: "https://flagcdn.com/w160/de.png",
    destinationImage: "/germany.png",
    title: "Germany Schengen Visa",
    type: "Business",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    services: ["Free Assessment", "File Building", "Submission & Tracking"],
  },
  {
    id: "s3",
    country: "Spain",
    flagImage: "https://flagcdn.com/w160/es.png",
    destinationImage: "/spain.png",
    title: "Spain Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    services: ["Document Checklist", "Appointment", "Submission & Tracking"],
  },
  {
    id: "s4",
    country: "Italy",
    flagImage: "https://flagcdn.com/w160/it.png",
    destinationImage: "/italy.png",
    title: "Italy Schengen Visa",
    type: "Tourist",
    pricePerApplicant: 45,
    currency: "£",
    discountBadge: "60% OFF",
    services: ["Free Assessment", "Document Checklist", "File Building"],
  },
];

function SchengenCard({ item }) {
  return (
    <article
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={item.destinationImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Country name + flag badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-1  rounded-full shadow-md border border-gray-100 flex items-center gap-2">
          {/* <img
            src={item.flagImage}
            alt={item.country + " flag"}
            className="w-5 h-3.5 object-cover rounded-sm border border-gray-200"
          /> */}
          <span className="text-lg font-bold text-gray-900">{item.country}</span>
        </div>
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white text-lg font-black px-1 rounded-full shadow-md uppercase tracking-wide">
          {item.discountBadge}
        </div>
        {/* Price badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-1 py-1 rounded-full shadow-md border border-gray-100">
          <span className="text-base text-lg font-black text-[#191e3b]">
            {item.currency}{item.pricePerApplicant}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-bold text-base text-[#191e3b] group-hover:text-[#003399] transition-colors leading-tight">
              {item.title}
            </h3>
            <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              99%
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.services.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-blue-50 text-[#003399] text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-blue-100"
              >
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xl font-extrabold text-[#191e3b]">
            {item.currency}{item.pricePerApplicant}
            <span className="text-xs font-normal text-gray-500 ml-1">/ per person</span>
          </div>
          <Link
            href="/search_vertical/schengen"
            className="rounded-lg bg-[#003399] px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#002277] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] focus-visible:ring-offset-2"
          >
            Apply Now
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
          <a
            href={SCHENGEN_PHONE_LINK}
            aria-label={`Call ${SCHENGEN_PHONE}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-white" />
            <span className="whitespace-nowrap">Call Now</span>
          </a>
          <a
            href={SCHENGEN_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via WhatsApp"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-bold text-white hover:bg-[#20bd5a]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157zm11.758-6.141c-.287-.143-1.697-.838-1.96-.933-.263-.096-.454-.143-.646.144-.191.286-.74 1.05-.908 1.242-.168.191-.335.215-.622.072-.287-.143-1.214-.447-2.313-1.427-.855-.763-1.433-1.706-1.601-1.993-.168-.287-.018-.442.126-.584.13-.129.287-.335.43-.502.143-.167.191-.286.287-.478.096-.191.048-.359-.024-.502-.072-.143-.646-1.555-.885-2.129-.233-.56-.47-.483-.646-.492l-.55-.009c-.191 0-.502.072-.765.359s-1.004.981-1.004 2.394 1.028 2.774 1.171 2.966c.143.191 2.023 3.088 4.901 4.332.685.296 1.22.473 1.637.605.689.219 1.316.188 1.812.114.554-.083 1.697-.694 1.936-1.363.239-.669.239-1.242.168-1.363-.072-.121-.263-.193-.55-.336z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function SchengenVisaSection() {
  return (
    <section id="schengen-visa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#003399] uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5 text-[#003399]" />
            <span>Schengen Visa Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#191e3b] tracking-tight">
            Europe Schengen Visa — From £45 Only
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Expert document filing, appointment booking &amp; 99% visa success rate.
          </p>
        </div>
        <Link
          href="/search_vertical/schengen"
          className="inline-flex items-center gap-1 text-sm font-bold text-[#003399] hover:text-[#002277] hover:underline shrink-0"
        >
          <span>See all Schengen visas</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURED_SCHENGEN.map((item) => (
          <SchengenCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
