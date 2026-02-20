"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, MapPin, Star, Filter, Heart, Building2, Utensils, Camera, Palette, User, Handshake } from "lucide-react";
import { marketplaceVendors } from "@/lib/mockData/vendors";
import Image from "next/image";

const CATEGORY_MAP = {
    "Venue": Building2,
    "Catering": Utensils,
    "Photography": Camera,
    "Decoration": Palette,
    "Planner": Handshake,
    "Makeup": User
};

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [cityFilter, setCityFilter] = useState("All");

    const categories = ["All", ...new Set(marketplaceVendors.map(v => v.category))];
    const cities = ["All", ...new Set(marketplaceVendors.map(v => v.city))];

    const filteredVendors = marketplaceVendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(search.toLowerCase()) || vendor.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || vendor.category === categoryFilter;
        const matchesCity = cityFilter === "All" || vendor.city === cityFilter;
        return matchesSearch && matchesCategory && matchesCity;
    });

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/vendors" className="p-2 hover:bg-bg-alt rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-text-muted" />
                </Link>
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        Vendor Marketplace
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Discover and connect with top-rated wedding vendors</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-bg-card rounded-xl border border-border-light p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search vendors..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                    />
                </div>
                <div className="flex gap-3">
                    <div className="relative min-w-[140px]">
                        <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-border bg-bg text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                        </select>
                    </div>
                    <div className="relative min-w-[140px]">
                        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <select
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                            className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-border bg-bg text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Vendor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map(vendor => {
                    const CategoryIcon = CATEGORY_MAP[vendor.category] || Star;
                    return (
                        <Link href={`/dashboard/vendors/marketplace/${vendor.id}`} key={vendor.id} className="group block">
                            <div className="bg-bg-card rounded-2xl border border-border-light overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                {/* Image Container */}
                                <div className="relative h-48 w-full overflow-hidden bg-bg-alt">
                                    <img
                                        src={vendor.image}
                                        alt={vendor.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold px-2 py-1 rounded shadow-sm flex items-center gap-1.5">
                                            <CategoryIcon size={12} className="text-primary" />
                                            {vendor.category}
                                        </span>
                                        {vendor.featured && (
                                            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded shadow-sm">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <button className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-md hover:bg-white rounded-full text-gray-700 transition-colors shadow-sm">
                                        <Heart size={16} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-heading font-semibold text-lg text-text group-hover:text-primary transition-colors">
                                            {vendor.name}
                                        </h3>
                                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold">
                                            <Star size={12} className="fill-current" />
                                            {vendor.rating}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                                        <span className="flex items-center gap-1"><MapPin size={13} /> {vendor.city}</span>
                                        <span className="w-1 h-1 rounded-full bg-border"></span>
                                        <span>{vendor.reviews} reviews</span>
                                    </div>

                                    <p className="text-sm text-text-muted line-clamp-2 mb-4">
                                        {vendor.description}
                                    </p>

                                    <div className="pt-4 border-t border-border-light flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-text-muted">Starting from</p>
                                            <p className="font-semibold text-text">{vendor.priceRange}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {filteredVendors.length === 0 && (
                <div className="text-center py-16 bg-bg-card rounded-2xl border border-border border-dashed">
                    <Search size={32} className="mx-auto text-text-muted opacity-50 mb-4" />
                    <h3 className="text-lg font-medium text-text">No vendors found</h3>
                    <p className="text-text-muted mt-1">Try adjusting your filters or search term.</p>
                </div>
            )}
        </div>
    );
}
