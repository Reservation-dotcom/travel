"use client";

import Link from "next/link";
import { CheckCircle2, Globe, ChevronRight } from "lucide-react";

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
    <Link
      href="/search_vertical/schengen"
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
          <span className="text-xs font-bold text-[#003399] group-hover:underline">
            Apply Now →
          </span>
        </div>
      </div>
    </Link>
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
