"use client";

import { useState } from "react";
import Image from "next/image";
import SearchTab from "../search/SearchTab";
import StaySearch from "../search/StaySearch";
import FlightSearch from "../search/FlightSearch";
import UmrahSearch from "../search/UmrahSearch";
import HajjSearch from "../search/HajjSearch";
import VisaSearch from "../search/VisaSearch";
import SchengenVisaSearch from "../search/SchengenVisaSearch";

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState("stays");

  return (
    <div className="relative w-full bg-white">

      {/* ── SECTION 1: Background Image strip — tall enough to bleed behind the card ── */}
      <div className="relative w-full" style={{ height: "260px" }}>
        <Image
          src="https://forever.travel-assets.com/flex/flexmanager/mediaasset/1445686-0_2-BEX00141_BBM_GoingPlaces_CL_Landscapes_Provoste_0009_V02_QC_FNL.jpg?impolicy=fcrop&w=1920&h=345&q=mediumHigh"
          alt="Expedia Landscape Background"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Title — vertically centered in upper ~60% of the bg strip */}
        <div className="absolute inset-0 z-10 flex items-start justify-center px-4 pt-12 sm:pt-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white text-center font-normal tracking-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.28)" }}>
            The one place you go to go places
          </h1>
        </div>
      </div>

      {/* ── SECTION 2: Search Card — pulled UP so it overlaps the bottom of the bg image ── */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[90px]">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-visible relative z-30">

          {/* 6 Tabs — icons centered equally */}
          <SearchTab activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Search form content */}
          <div className="w-full p-4 sm:p-6 rounded-b-2xl relative z-30">
            {activeTab === "stays" && <StaySearch />}
            {activeTab === "flights" && <FlightSearch />}
            {activeTab === "umrah" && <UmrahSearch />}
            {activeTab === "hajj" && <HajjSearch />}
            {activeTab === "schengen" && <SchengenVisaSearch />}
            {activeTab === "visa" && <VisaSearch />}
          </div>

        </div>
      </div>

      {/* Extra bottom spacing so popovers don't overlap next section */}
      <div className="h-3 bg-white" />

    </div>
  );
}
