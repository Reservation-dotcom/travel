"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import EnquiryHeroForm from "../components/search/EnquiryHeroForm";
import StayCard from "../components/stays/StayCard";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import { Search, MapPin, Info, Car, ShieldCheck, Phone, MessageSquareShare } from "lucide-react";

function StaysContent() {
  const searchParams = useSearchParams();
  const urlDestination = searchParams.get("destination");
  const urlDates = searchParams.get("dates");
  const urlAdults = searchParams.get("adults");

  const [currentLocation, setCurrentLocation] = useState(urlDestination || "London, UK");
  const [propertyNameQuery, setPropertyNameQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedTransport, setSelectedTransport] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500);

  // Famous luxury stay + transport packages
  const initialHotels = [
    {
      id: "stay-1",
      name: "The Ritz-Carlton, Riyadh",
      location: "Riyadh, Saudi Arabia",
      country: "Saudi Arabia",
      countryFlag: "🇸🇦",
      flagImage: "https://flagcdn.com/w160/sa.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Executive Chauffeur Airport Transfer",
      freeWifi: true,
      rating: 9.4,
      ratingText: "Exceptional",
      reviewCount: 1324,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 299,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Royal spa access", "Executive Chauffeur pick & drop", "Private valet"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLoikZNgtlAYqszbAg9s776cU5H1STelK-h3UCCOw_g&s=10",
              ]
    },
    {
      id: "stay-2",
      name: "Hotel Eden Rome",
      location: "Rome, Italy",
      country: "Italy",
      countryFlag: "🇮🇹",
      flagImage: "https://flagcdn.com/w160/it.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport & City Chauffeur Transport",
      freeWifi: true,
      rating: 9.2,
      ratingText: "Exceptional",
      reviewCount: 980,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 289,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Historic city center", "Private airport pickup", "Rooftop terrace"],
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
              ]
    },
    {
      id: "stay-3",
      name: "Le Bristol Paris Palace",
      location: "Paris, France",
      country: "France",
      countryFlag: "🇫🇷",
      flagImage: "https://flagcdn.com/w160/fr.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "VIP Private Mercedes Airport Transfer",
      freeWifi: true,
      rating: 9.5,
      ratingText: "Exceptional",
      reviewCount: 1140,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 349,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Palace Hotel stay", "Private airport chauffeur", "VIP concierge"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrTv_u6ASDRLd7NgUvPznfwlKXyXX7fJgtpBDd3-_ZDg&s=10",
             ]
    },
    {
      id: "stay-4",
      name: "Bürgenstock Alpine Resort",
      location: "Lake Lucerne, Switzerland",
      country: "Switzerland",
      countryFlag: "🇨🇭",
      flagImage: "https://flagcdn.com/w160/ch.png",
      type: "homes",
      breakfastIncluded: true,
      transportType: "Private Funicular & Lake Shuttle Transport",
      freeWifi: true,
      rating: 9.3,
      ratingText: "Exceptional",
      reviewCount: 875,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 319,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Panoramic Lake view", "Private shuttle & train pass", "Thermal spa"],
      images: [
        "https://static-new.lhw.com/HotelImages/Final/LW1630/lw1630_91240046_960x540.jpg",
            ]
    },
    {
      id: "stay-5",
      name: "The Peninsula Bosphorus",
      location: "Istanbul, Turkey",
      country: "Turkey",
      countryFlag: "🇹🇷",
      flagImage: "https://flagcdn.com/w160/tr.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport Chauffeur & Bosphorus Shuttle",
      freeWifi: true,
      rating: 9.1,
      ratingText: "Exceptional",
      reviewCount: 1045,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 279,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Bosphorus view suite", "Private airport pickup", "Turkish bath"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
       ]
    },
    {
      id: "stay-6",
      name: "Jumeirah Burj Al Arab",
      location: "Dubai, United Arab Emirates",
      country: "United Arab Emirates",
      countryFlag: "🇦🇪",
      flagImage: "https://flagcdn.com/w160/ae.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport Chauffeur Transfer",
      freeWifi: true,
      rating: 9.6,
      ratingText: "Exceptional",
      reviewCount: 1450,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 449,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Iconic sail-shaped hotel", "Private beach access", "Luxury chauffeur pickup"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1rDdRST3ed4-GvXWIgjsg9TQhqn0mlKyeZ84Wtb-Xg&s=10",
       ]
    },
    {
      id: "stay-7",
      name: "Marina Bay Sands",
      location: "Singapore",
      country: "Singapore",
      countryFlag: "🇸🇬",
      flagImage: "https://flagcdn.com/w160/sg.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport and City Chauffeur Transfer",
      freeWifi: true,
      rating: 9.4,
      ratingText: "Exceptional",
      reviewCount: 1260,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 429,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["SkyPark infinity pool", "Marina Bay views", "Private airport pickup"],
      images: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/647111401.jpg?k=2c05478b869ed2864722c36383b89a46db66ccfcf6a456d4abc3e57927592542&o=",
     ]
    },
    {
      id: "stay-8",
      name: "The Taj Mahal Palace",
      location: "Mumbai, India",
      country: "India",
      countryFlag: "🇮🇳",
      flagImage: "https://flagcdn.com/w160/in.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport Chauffeur and City Transfer",
      freeWifi: true,
      rating: 9.3,
      ratingText: "Exceptional",
      reviewCount: 1180,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 389,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Heritage sea-view rooms", "Near the Gateway of India", "Private airport pickup"],
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
             ]
    },
    {
      id: "stay-9",
      name: "The Beverly Hills Hotel",
      location: "Beverly Hills, United States",
      country: "United States",
      countryFlag: "🇺🇸",
      flagImage: "https://flagcdn.com/w160/us.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport and City Chauffeur Transfer",
      freeWifi: true,
      rating: 9.2,
      ratingText: "Exceptional",
      reviewCount: 1025,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 479,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Iconic Pink Palace", "Sunset Boulevard location", "Private airport pickup"],
      images: [
        "https://www.dorchestercollection.com/media/ctvnuk1r/thebeverlyhillshotel-superiorguestroom-dorchestercollection-2.jpg?width=1050&height=615&format=webp&rmode=crop"
      ]
    },
    {
      id: "stay-10",
      name: "Mandarin Oriental, Bangkok",
      location: "Bangkok, Thailand",
      country: "Thailand",
      countryFlag: "🇹🇭",
      flagImage: "https://flagcdn.com/w160/th.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport Chauffeur and Riverside Transfer",
      freeWifi: true,
      rating: 9.5,
      ratingText: "Exceptional",
      reviewCount: 1100,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 399,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Chao Phraya river views", "Luxury riverside stay", "Private airport pickup"],
      images: [
        "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Tig2qnyqN7SjIcdZOh86Nx-qruUtr8UufiY-k49vq80e8emHYYjLHY1w3ECbp3Kp6y52PJ2daaq5ljXm4M3aUrxv-KuAnFd2_PEAH49B9Xle-_GdcJBam7wZFjFHm-cKGK0nk1xjH1eHuT=s680-w680-h510-rw",
             ]
    },
    {
      id: "stay-11",
      name: "The Savoy",
      location: "London, United Kingdom",
      country: "United Kingdom",
      countryFlag: "🇬🇧",
      flagImage: "https://flagcdn.com/w160/gb.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Heathrow Airport Chauffeur Transfer",
      freeWifi: true,
      rating: 9.4,
      ratingText: "Exceptional",
      reviewCount: 1210,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 459,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Historic Thames-side hotel", "Near Covent Garden", "Private airport pickup"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSnRBs6SwY95dbIy6oy2dT7pgtiQ--SiIVEXSsMme5Lg&s=10",
      ]
    },
    {
      id: "stay-12",
      name: "Park Hyatt Sydney",
      location: "Sydney, Australia",
      country: "Australia",
      countryFlag: "🇦🇺",
      flagImage: "https://flagcdn.com/w160/au.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport and Harbour Chauffeur Transfer",
      freeWifi: true,
      rating: 9.3,
      ratingText: "Exceptional",
      reviewCount: 1080,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 449,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Sydney Harbour views", "Steps from the Opera House", "Private airport pickup"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_PvjREhbW4XduuLmGdv1aHR_mjjLgVXAdg0W-KVc62Q&s=10",
      ]
    },
    {
      id: "stay-13",
      name: "Islamabad Serena Hotel",
      location: "Islamabad, Pakistan",
      country: "Pakistan",
      countryFlag: "🇵🇰",
      flagImage: "https://flagcdn.com/w160/pk.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport and City Chauffeur Transfer",
      freeWifi: true,
      rating: 9.1,
      ratingText: "Exceptional",
      reviewCount: 930,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 259,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Margalla Hills views", "Pakistani-inspired architecture", "Private airport pickup"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcKri8MldQJ4kMndiMY2o_qNIJNy7SyLM7lHAUocSYA&s=10",
      ]
    },
    {
      id: "stay-14",
      name: "Fairmont Le Château Frontenac",
      location: "Quebec City, Canada",
      country: "Canada",
      countryFlag: "🇨🇦",
      flagImage: "https://flagcdn.com/w160/ca.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport and Old Quebec Chauffeur Transfer",
      freeWifi: true,
      rating: 9.2,
      ratingText: "Exceptional",
      reviewCount: 1150,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 399,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Iconic Old Quebec landmark", "Views over the St. Lawrence River", "Private airport pickup"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedYAvYcSKqnmAQ6vAWG-mEt_Oukt5T0ijxMq_AN4Kxg&s=10",
      ]
    },
    {
      id: "stay-15",
      name: "Imperial Hotel, Tokyo",
      location: "Tokyo, Japan",
      country: "Japan",
      countryFlag: "🇯🇵",
      flagImage: "https://flagcdn.com/w160/jp.png",
      type: "hotels",
      breakfastIncluded: true,
      transportType: "Private Airport and Tokyo City Chauffeur Transfer",
      freeWifi: true,
      rating: 9.3,
      ratingText: "Exceptional",
      reviewCount: 1040,
      discountTag: "STAY + TRANSPORT",
      totalPrice: 479,
      phone: "02039703003",
      whatsapp: "https://api.whatsapp.com/send?phone=447413059890",
      features: ["Landmark Ginza location", "Near the Imperial Palace", "Private airport pickup"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTepM5M7Novz3VxZF0k__CyfQUgZCceYr_rUi0kVE5nZg&s=10",
      ]
    }
  ];

  const filteredHotels = useMemo(() => {
    return initialHotels.filter((hotel) => {
      if (propertyNameQuery.trim() !== "") {
        const query = propertyNameQuery.toLowerCase();
        if (
          !hotel.name.toLowerCase().includes(query) &&
          !hotel.location.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (hotel.totalPrice > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.totalPrice - b.totalPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [propertyNameQuery, maxPrice, sortBy, initialHotels]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b]">
      <Header />

      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
        pageType="Stay"
      />

      <main className="flex-1 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-5">
            {/* Search by property name Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2">
              <label className="block text-sm font-bold text-[#191e3b]">
                Search Stay or Destination
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Riyadh, Paris, Rome..."
                  value={propertyNameQuery}
                  onChange={(e) => setPropertyNameQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006ce4] focus:outline-none"
                />
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#191e3b]">
                <span>Price per stay package</span>
                <span className="text-[#006ce4]">Up to £{maxPrice}</span>
              </div>
              <input
                type="range" min="150" max="600" step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#006ce4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>£150</span><span>£600+</span>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="bg-gradient-to-br from-[#191e3b] to-[#006ce4] rounded-2xl p-5 text-white space-y-3">
              <Car className="w-8 h-8 text-yellow-300" />
              <h4 className="font-bold text-sm">Stay + Transport Included</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                All packages include verified 5-star hotel accommodation and private chauffeur airport pick &amp; drop ground transport.
              </p>
              <a
                href="tel:02039703003"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-yellow-100"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </aside>

          {/* Center Column */}
          <section className="lg:col-span-9 space-y-4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
              <div>
                <h1 className="text-xl font-black text-[#191e3b]">
                  {filteredHotels.length} Stay + Transport Packages
                </h1>
                <p className="text-xs text-gray-500">
                  Includes luxury hotel accommodation + private chauffeur airport ground transfer
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-2xs"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Cards List */}
            {filteredHotels.length > 0 ? (
              <div className="space-y-4">
                {filteredHotels.map((stay) => (
                  <StayCard key={stay.id} stay={stay} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#191e3b]">No stay packages match your search</h3>
                <p className="text-xs text-gray-500">Try adjusting your price range or property search.</p>
                <button
                  type="button"
                  onClick={() => { setPropertyNameQuery(""); setMaxPrice(500); }}
                  className="px-5 py-2 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function StaysPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <StaysContent />
    </Suspense>
  );
}
