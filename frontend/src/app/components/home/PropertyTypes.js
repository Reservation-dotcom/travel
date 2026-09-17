"use client";

import Image from "next/image";
import Link from "next/link";
import { Building, Home, Palmtree, Trees, Sparkles, BedDouble } from "lucide-react";

export default function PropertyTypes() {
  const propertyTypes = [
    {
      id: "resorts",
      name: "All-Inclusive Resorts",
      count: "8,500+ properties",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "hotels",
      name: "Luxury & Boutique Hotels",
      count: "95,000+ properties",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "villas",
      name: "Private Villas & Houses",
      count: "42,000+ properties",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "apartments",
      name: "City Apartments & Condos",
      count: "68,000+ properties",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cabins",
      name: "Cabins & Mountain Lodges",
      count: "15,000+ properties",
      image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cottages",
      name: "Glamping & Unique Stays",
      count: "11,000+ properties",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#191e3b] tracking-tight">
          Explore stays by property type
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Whether you want a five-star hotel, a cozy mountain cabin, or a beachfront villa with a private pool.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {propertyTypes.map((prop) => (
          <Link
            key={prop.id}
            href={`/stays?type=${prop.id}`}
            className="group block bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-lg transition-all text-left"
          >
            <div className="relative h-36 w-full overflow-hidden bg-gray-100">
              <Image
                src={prop.image}
                alt={prop.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-[#191e3b] group-hover:text-[#003580] transition-colors leading-snug line-clamp-1">
                {prop.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{prop.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
