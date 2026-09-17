"use client";

export default function SearchTab({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "stays",
      label: "Stays",
      icon: (
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <rect x="4" y="16" width="28" height="11" rx="2.5" fill="#008099" />
          <rect x="6" y="11" width="8" height="5" rx="1.5" fill="#005e73" />
          <rect x="22" y="11" width="8" height="5" rx="1.5" fill="#005e73" />
          <rect x="3" y="20" width="30" height="5" rx="1.5" fill="#00a8cc" opacity="0.65" />
          <rect x="5" y="27" width="3" height="4" rx="1" fill="#005e73" />
          <rect x="28" y="27" width="3" height="4" rx="1" fill="#005e73" />
        </svg>
      ),
    },
    {
      id: "flights",
      label: "Flights",
      icon: (
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <path
            d="M18 4L20.5 14L30 18.5V22L20.5 19.5L20 27.5L23.5 30V31.5L18 30.5L12.5 31.5V30L16 27.5L15.5 19.5L6 22V18.5L15.5 14L18 4Z"
            fill="#008099"
          />
        </svg>
      ),
    },
    {
      id: "umrah",
      label: "Umrah",
      icon: (
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          {/* Crescent Moon & Star */}
          <path d="M14 6C9.58 6 6 9.58 6 14C6 18.42 9.58 22 14 22C16.8 22 19.25 20.56 20.66 18.38C19.86 18.78 18.96 19 18 19C13.58 19 10 15.42 10 11C10 8.5 11.15 6.27 12.95 4.81C13.3 5.18 13.67 5.57 14 6Z" fill="#fcd535" />
          {/* Kaaba cube structure */}
          <rect x="18" y="14" width="14" height="15" rx="2" fill="#005e73" />
          <line x1="18" y1="19" x2="32" y2="19" stroke="#fcd535" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "hajj",
      label: "Hajj",
      icon: (
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          {/* Mosque Dome & Minaret */}
          <path d="M18 5C14.5 5 12 9 12 14H24C24 9 21.5 5 18 5Z" fill="#008099" />
          <path d="M18 2L19.2 4.5L16.8 4.5L18 2Z" fill="#fcd535" />
          <rect x="10" y="14" width="16" height="16" rx="1.5" fill="#005e73" />
          <path d="M15 30V22C15 20.3 16.3 19 18 19C19.7 19 21 20.3 21 22V30H15Z" fill="#fcd535" />
        </svg>
      ),
    },
    {
      id: "schengen",
      label: "Schengen",
      icon: (
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          {/* EU Passport / Schengen */}
          <rect x="7" y="5" width="22" height="27" rx="3" fill="#003399" />
          <circle cx="18" cy="14" r="5" stroke="#fcd535" strokeWidth="1.5" fill="none" />
          <path d="M18 9 L18.8 11.5 L21.5 11.5 L19.3 13.1 L20.1 15.6 L18 14 L15.9 15.6 L16.7 13.1 L14.5 11.5 L17.2 11.5 Z" fill="#fcd535" />
          <line x1="10" y1="22" x2="26" y2="22" stroke="#fcd535" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="25" x2="24" y2="25" stroke="#fcd535" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="28" x2="22" y2="28" stroke="#fcd535" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "visa",
      label: "Other Visa",
      icon: (
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          {/* Passport / Document */}
          <rect x="8" y="6" width="20" height="25" rx="3" fill="#008099" />
          <circle cx="18" cy="16" r="4.5" stroke="#fcd535" strokeWidth="2" fill="none" />
          <line x1="12" y1="24" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="27" x2="22" y2="27" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
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
              <div className="mb-1.5 transition-transform group-hover:scale-110 flex items-center justify-center">
                {tab.icon}
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
