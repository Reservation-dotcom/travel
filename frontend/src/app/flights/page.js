"use client";

import { useState, useMemo, Suspense } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import EnquiryHeroForm from "../components/search/EnquiryHeroForm";
import FlightCard from "../components/flights/FlightCard";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import { Plane, Search, ShieldCheck, Phone, MessageSquareShare } from "lucide-react";

const FLIGHT_PACKAGES = [
  {
    id: "f1",
    origin: "London Gatwick",
    originCode: "LGW",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Wed 02 Dec - Mon 14 Dec",
    price: 401,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901471323&checksum=29f4ae8f62bfb0938a79c4ada9942a8729db7860&group_id=1"
  },
  {
    id: "f2",
    origin: "Manchester",
    originCode: "MAN",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Fri 06 Nov - Sat 21 Nov",
    price: 401,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901451385&checksum=7dc7508d58743de6ebba2161f3df3f51f10cfdd6&group_id=1"
  },
  {
    id: "f3",
    origin: "London Heathrow",
    originCode: "LHR",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Sun 08 Nov - Tue 24 Nov",
    price: 429,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901582683&checksum=d14d286e106f8cc545a1777db42271a9dfd8f1e3&group_id=1"
  },
  {
    id: "f4",
    origin: "London Heathrow",
    originCode: "LHR",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Thu 05 Nov - Wed 25 Nov",
    price: 478,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901517290&checksum=783a237b0a537188c31214d0041ce64227267f8e&group_id=1"
  },
  {
    id: "f5",
    origin: "London Gatwick",
    originCode: "LGW",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Thu 05 Nov - Mon 23 Nov",
    price: 501,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901195455&checksum=316d56e3fe6bca79e9fe066f99fedf9e9ff915d5&group_id=1"
  },
  {
    id: "f6",
    origin: "London Gatwick",
    originCode: "LGW",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Wed 25 Nov - Wed 16 Dec",
    price: 506,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901049726&checksum=bac45aeef7be5fae0cca67479c08773ae714df82&group_id=1"
  },
  {
    id: "f7",
    origin: "Manchester",
    originCode: "MAN",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Sun 08 Nov - Wed 18 Nov",
    price: 510,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901446509&checksum=97ad6a85a0ca9ab1a88e64519556e9915b9c7681&group_id=1"
  },
  {
    id: "f8",
    origin: "London Heathrow",
    originCode: "LHR",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Thu 05 Nov - Wed 25 Nov",
    price: 515,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901111797&checksum=1e4d2d5cf871f3385c840b8a28484e458e9302c6&group_id=1"
  },
  {
    id: "f9",
    origin: "London Heathrow",
    originCode: "LHR",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Tue 03 Nov - Mon 23 Nov",
    price: 536,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901176054&checksum=f5f4afa4b0a394763c02177c685a7325fb64afc6&group_id=1"
  },
  {
    id: "f10",
    origin: "London Heathrow",
    originCode: "LHR",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Mon 09 Nov - Tue 24 Nov",
    price: 537,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901301597&checksum=13b86e452310d44288e70649aeb92aa5ac68b22b&group_id=1"
  },
  {
    id: "f11",
    origin: "Manchester",
    originCode: "MAN",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Mon 09 Nov - Tue 17 Nov",
    price: 541,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901026252&checksum=a868d8649be30a4ae74330dc8322053c88250057&group_id=1"
  },
  {
    id: "f12",
    origin: "Manchester",
    originCode: "MAN",
    destination: "Islamabad",
    destCode: "ISB",
    dates: "Sun 08 Nov - Tue 24 Nov",
    price: 552,
    currency: "£",
    bookUrl: "https://www.flightcatchers.com/search.php?searchoffer=1&offer_flight=901423320&checksum=31ecd3072f7e80e47fcaef85f6e7f71a64fd2fd5&group_id=1"
  }
];

function FlightsContent() {
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [sortBy, setSortBy] = useState("price-low");

  const origins = ["All", "London Gatwick", "London Heathrow", "Manchester"];

  const filteredFlights = useMemo(() => {
    return FLIGHT_PACKAGES.filter((flight) => {
      if (selectedOrigin !== "All" && flight.origin !== selectedOrigin) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [selectedOrigin, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f9] text-[#191e3b]">
      <Header />

      <EnquiryHeroForm
        title="For More Cheapest Offers, Fill the Form"
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
        pageType="Flight"
      />

      <main className="flex-1 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 gap-6">

          {/* Sidebar Filter */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#191e3b]">Departure Airport</h3>
              <div className="space-y-2">
                {origins.map((orig) => (
                  <label key={orig} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-700 hover:text-black">
                    <input
                      type="radio"
                      name="originFilter"
                      checked={selectedOrigin === orig}
                      onChange={() => setSelectedOrigin(orig)}
                      className="w-4 h-4 text-[#006ce4] focus:ring-[#006ce4]"
                    />
                    <span>{orig === "All" ? "All Departure Airports" : orig}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#191e3b] to-[#006ce4] rounded-2xl p-5 text-white space-y-3">
              <ShieldCheck className="w-8 h-8 text-yellow-300" />
              <h4 className="font-bold text-sm">Best Flight Fare Guarantee</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed">
                Direct flights and best connection fares to Islamabad (ISB) from UK airports with flexible rebooking options.
              </p>
              <a
                href="tel:02039703003"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-yellow-100"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </aside>

          {/* Center Results Section */}
          <section className="space-y-4">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
              <div>
                <h1 className="text-xl font-black text-[#191e3b]">
                  {filteredFlights.length} Flights to Islamabad (ISB)
                </h1>
                <p className="text-xs text-gray-500">
                  Exclusive UK flight deals from London Gatwick, Heathrow &amp; Manchester
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-[#191e3b] focus:outline-none focus:ring-2 focus:ring-[#006ce4] cursor-pointer shadow-2xs"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* List Cards */}
            {filteredFlights.length > 0 ? (
              <div className="space-y-3">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#006ce4] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold">No flights match your filter</h3>
                <p className="text-xs text-gray-500">Try selecting all airports to see all available deals.</p>
                <button
                  type="button"
                  onClick={() => setSelectedOrigin("All")}
                  className="px-5 py-2 bg-[#006ce4] text-white text-xs font-bold rounded-full hover:bg-[#0057b8]"
                >
                  Reset Airport Filter
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

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f7f9]" />}>
      <FlightsContent />
    </Suspense>
  );
}