"use client";

import { Palmtree, ShieldCheck } from "lucide-react";

const tabIcons = {
  schengen: "/schengen.png",
  visa: "/visa.png",
  umrah: "/masjid-al-nabawi.png",
  flights: "/light__flight.svg",
  stays: "/stay.svg",
};

export default function SearchTab({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "schengen",
      label: "Schengen Visa",
      shortLabel: "Schengen",
      icon: tabIcons.schengen,
      isCustomIcon: true
    },
    {
      id: "visa",
      label: "Other Visa",
      shortLabel: "Visa",
      icon: tabIcons.visa,
      isCustomIcon: true
    },
    {
      id: "love-holiday",
      label: "Holiday",
      shortLabel: "Holiday",
      icon: Palmtree,
      isCustomIcon: false
    },
    {
      id: "umrah",
      label: "Umrah",
      shortLabel: "Umrah",
      icon: tabIcons.umrah,
      isCustomIcon: true
    },
    {
      id: "travel-insurance",
      label: "Travel Insurance",
      shortLabel: "Insurance",
      icon: ShieldCheck,
      isCustomIcon: false
    },
    {
      id: "flights",
      label: "Flight",
      shortLabel: "Flight",
      icon: tabIcons.flights,
      isCustomIcon: true
    },
    {
      id: "stays",
      label: "Stay + Transport",
      shortLabel: "Stays",
      icon: tabIcons.stays,
      isCustomIcon: true
    },
  ];

  return (
    <div className="w-full bg-white rounded-t-2xl overflow-hidden">
      {/* 7 tabs container: flex with scrollbar on < xl, 7-col grid on xl */}
      <div className="flex xl:grid xl:grid-cols-7 overflow-x-auto divide-x divide-gray-100 w-full min-w-0 scroll-smooth">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const LucideIcon = !tab.isCustomIcon ? tab.icon : null;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-3 px-3 sm:px-4 min-w-[95px] xl:min-w-0 flex-1 shrink-0 xl:shrink transition-all cursor-pointer group ${isActive ? "text-[#006ce4] bg-blue-50/40" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50/60"
                }`}
            >
              {/* Icon */}
              <div
                className={`mb-1 transition-transform group-hover:scale-110 flex items-center justify-center overflow-hidden rounded-full border shadow-2xs w-8 h-8 sm:w-9 sm:h-9 ${isActive ? "border-[#006ce4] bg-blue-50/80" : "border-gray-200 bg-white"
                  }`}
              >
                {tab.isCustomIcon ? (
                  <img src={tab.icon} alt={`${tab.label} icon`} className="h-4 w-4 sm:h-6 sm:w-6 object-contain" />
                ) : (
                  <LucideIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-[#006ce4]" : "text-gray-600"}`} />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] sm:text-xs font-bold leading-tight text-center whitespace-nowrap ${isActive ? "text-[#006ce4]" : "text-[#191e3b]"
                  }`}
              >
                <span className="xl:hidden">{tab.shortLabel}</span>
                <span className="hidden xl:inline">{tab.label}</span>
              </span>

              {/* Active underline indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1 right-1 h-[3px] bg-[#006ce4] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
      {/* Bottom border divider */}
      <div className="border-b border-gray-200" />
    </div>
  );
}
