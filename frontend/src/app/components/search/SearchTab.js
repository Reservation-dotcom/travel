"use client";

const tabIcons = {
  stays: "/stay.svg",
  flights: "/light__flight.svg",
  umrah: "/masjid-al-nabawi.png",
  hajj: "/mecca.png",
  schengen: "/schengen.png",
  visa: "/visa.png",
};

export default function SearchTab({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "stays", label: "Stays", icon: tabIcons.stays },
    { id: "flights", label: "Flights", icon: tabIcons.flights },
    { id: "umrah", label: "Umrah", icon: tabIcons.umrah },
    { id: "hajj", label: "Hajj", icon: tabIcons.hajj },
    { id: "schengen", label: "Schengen", icon: tabIcons.schengen },
    { id: "visa", label: "Other Visa", icon: tabIcons.visa },
  ];

  return (
    <div className="w-full">
      {/* 6 equal-width columns — icons centered */}
      <div className="grid grid-cols-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-4 px-1 transition-colors cursor-pointer group ${
                isActive ? "text-[#006ce4]" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {/* Icon */}
              <div className="mb-1.5 transition-transform group-hover:scale-110 flex items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                <img src={tab.icon} alt={`${tab.label} icon`} className="h-8 w-8 sm:h-9 sm:w-9 object-contain" />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] font-semibold leading-tight text-center whitespace-nowrap ${
                  isActive ? "text-[#006ce4]" : "text-[#191e3b]"
                }`}
              >
                {tab.label}
              </span>

              {/* Active underline */}
              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#006ce4] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
      {/* Divider */}
      <div className="border-b border-gray-200" />
    </div>
  );
}
