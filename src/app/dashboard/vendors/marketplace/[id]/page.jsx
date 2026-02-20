"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, CheckCircle, MessageCircle, PhoneCall, Globe, IndianRupee, Heart, Share2, Info, Image as ImageIcon } from "lucide-react";
import { marketplaceVendors } from "@/lib/mockData/vendors";
import { notFound } from "next/navigation";

export default function VendorProfilePage({ params }) {
    const { id } = params;
    const vendor = marketplaceVendors.find(v => v.id === id);

    if (!vendor) return notFound();

    // Mock additional details not present in the main array
    const vendorDetails = {
        ...vendor,
        about: "We bring your dream weddings to life with exceptional service, attention to detail, and a passionate team dedicated to making your special day truly unforgettable.",
        services: ["Pre-wedding Consultation", "Day-of Coordination", "Full Event Management", "Custom Themes & Designs"],
        faqs: [
            { q: "Do you travel out of station?", a: "Yes, we handle destination weddings across India and internationally." },
            { q: "What is your payment policy?", a: "We require a 50% advance to block the dates, and the rest 1 week prior to the event." },
            { q: "How early should we book?", a: "We recommend booking at least 6 months in advance for peak wedding season." }
        ],
        gallery: [
            vendor.image,
            "https://images.unsplash.com/photo-1519225421980-715cb02151ff?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=800" // placeholder gallery
        ]
    };

    const CategoryIcon = Star; // Fallback

    return (
        <div className="space-y-6 pb-20 lg:pb-0 animate-[fadeIn_0.5s_ease]">
            {/* Nav Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/vendors/marketplace" className="p-2 hover:bg-bg-alt rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-text-muted" />
                    </Link>
                    <span className="text-sm font-medium text-text-muted">Back to Marketplace</span>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-bg-alt border border-border-light text-text-muted transition-colors">
                        <Share2 size={16} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-danger/10 border border-border-light text-text-muted hover:text-danger hover:border-danger/30 transition-colors group">
                        <Heart size={16} className="group-hover:fill-danger/20" />
                    </button>
                </div>
            </div>

            {/* Hero Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] rounded-2xl overflow-hidden bg-bg-card border border-border-light">
                <div className="md:col-span-2 relative group cursor-pointer overflow-hidden">
                    <img src={vendorDetails.gallery[0]} alt="Hero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-white flex items-center gap-2"><ImageIcon size={20} /> View Gallery</span>
                    </div>
                </div>
                <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                    <img src={vendorDetails.gallery[1]} alt="Gallery 1" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                    <img src={vendorDetails.gallery[2]} alt="Gallery 2" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                </div>
                <div className="hidden md:block relative h-full">
                    <img src={vendorDetails.gallery[3]} alt="Gallery 3" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-center justify-center cursor-pointer">
                        <span className="text-white font-medium flex flex-col items-center gap-2">
                            <ImageIcon size={24} />
                            See All Photos
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Info */}
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-semibold bg-bg-alt px-2 py-1 rounded text-text-muted uppercase tracking-wider">
                                        {vendorDetails.category}
                                    </span>
                                    {vendorDetails.featured && (
                                        <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded flex items-center gap-1">
                                            <Star size={12} className="fill-current" /> Promoted
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-heading font-bold text-text mb-2">{vendorDetails.name}</h1>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
                                    <span className="flex items-center gap-1"><MapPin size={16} className="text-primary" /> {vendorDetails.city}</span>
                                    <span className="flex items-center gap-1">
                                        <Star size={16} className="text-accent fill-accent" />
                                        <span className="font-semibold text-text">{vendorDetails.rating}</span>
                                        ({vendorDetails.reviews} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-border-light" />

                    {/* About Section */}
                    <section>
                        <h2 className="text-xl font-heading font-semibold mb-3 flex items-center gap-2">
                            <Info size={20} className="text-primary" /> About
                        </h2>
                        <p className="text-text-muted leading-relaxed">
                            {vendorDetails.description} <br /><br />
                            {vendorDetails.about}
                        </p>
                    </section>

                    <hr className="border-border-light" />

                    {/* Services/Offerings */}
                    <section>
                        <h2 className="text-xl font-heading font-semibold mb-4">What we offer</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {vendorDetails.services.map((service, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-text">
                                    <CheckCircle size={18} className="text-success shrink-0 mt-0.5" />
                                    <span className="text-sm">{service}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="border-border-light" />

                    {/* FAQs */}
                    <section>
                        <h2 className="text-xl font-heading font-semibold mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {vendorDetails.faqs.map((faq, idx) => (
                                <div key={idx} className="bg-bg-alt/50 p-4 rounded-xl border border-border-light">
                                    <h4 className="font-semibold text-sm mb-1">{faq.q}</h4>
                                    <p className="text-sm text-text-muted">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column - Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        {/* Pricing & CTA Card */}
                        <div className="bg-bg-card rounded-2xl border border-primary/20 p-6 shadow-xl shadow-primary/5">
                            <div className="mb-6 pb-6 border-b border-border-light text-center">
                                <p className="text-text-muted text-sm mb-1">Starting Price</p>
                                <h3 className="text-2xl font-bold text-primary">{vendorDetails.priceRange}</h3>
                                <p className="text-xs text-text-muted mt-2">Taxes and additional charges may apply</p>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full btn-gradient py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                                    <MessageCircle size={18} /> Request Quote
                                </button>
                                <button className="w-full bg-bg-alt hover:bg-border-light text-text py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border border-border transition-colors">
                                    <PhoneCall size={18} /> Call Vendor
                                </button>
                            </div>
                        </div>

                        {/* Quick Contact Card */}
                        <div className="bg-bg-card rounded-xl border border-border-light p-5 space-y-4">
                            <h4 className="font-semibold text-sm border-b border-border-light pb-2">Contact Information</h4>
                            <div className="flex items-center gap-3 text-sm text-text-muted">
                                <MapPin size={16} className="text-text" /> 123 Wedding Plaza, {vendorDetails.city}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-text-muted">
                                <Globe size={16} className="text-text" /> {vendorDetails.name.toLowerCase().replace(/\s/g, '')}.com
                            </div>
                            <div className="bg-indigo-50 text-indigo-700 p-3 rounded-lg text-xs leading-relaxed border border-indigo-100">
                                <strong>Tip:</strong> Mention Vivaaham to get a free consultation or upgrade on standard packages.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
