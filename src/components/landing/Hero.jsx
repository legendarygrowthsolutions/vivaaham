"use client";

import { Sparkles, CalendarCheck, PlayCircle, Users, CheckCircle, IndianRupee, Heart, Music, Camera, Loader, Circle, Check } from "lucide-react";

export default function Hero() {
    return (
        <section className="pt-[140px] pb-20 bg-gradient-to-b from-bg to-bg-alt relative overflow-hidden" id="hero">
            {/* Decorative gradient blob */}
            <div className="absolute -top-1/2 -right-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,168,67,0.08)_0%,transparent_70%)] rounded-full" />

            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Content */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/[0.06] to-accent/[0.06] border border-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 animate-[fadeInDown_0.8s_ease]">
                        <Sparkles size={16} className="text-accent" />
                        <span>India&apos;s #1 Wedding Command Centre</span>
                    </div>

                    <h1 className="font-heading text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.15] mb-5 animate-[fadeInUp_0.8s_ease_0.2s_both]">
                        Stop Managing Weddings on<br />
                        <span className="gradient-text">WhatsApp Groups.</span>
                    </h1>

                    <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-[520px] animate-[fadeInUp_0.8s_ease_0.4s_both]">
                        From <strong>haldi</strong> to <strong>vidaai</strong>, Vivaaham replaces your 47 spreadsheets,
                        12 WhatsApp groups, and that one cousin&apos;s &quot;I&apos;ll handle it&quot; with one powerful platform.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-10 animate-[fadeInUp_0.8s_ease_0.6s_both]">
                        <a href="#demo" className="btn-gradient px-8 py-4 text-base font-semibold rounded-lg inline-flex items-center gap-2">
                            <CalendarCheck size={18} /> Book a Demo
                        </a>
                        <a href="#features" className="px-8 py-4 text-base font-semibold rounded-lg inline-flex items-center gap-2 border-2 border-border bg-bg-card text-text hover:border-primary hover:text-primary transition-all duration-300">
                            <PlayCircle size={18} /> See It In Action
                        </a>
                    </div>
                </div>

                {/* Mockup Visual */}
                <div className="relative animate-[fadeInRight_1s_ease_0.5s_both]">
                    <div className="bg-bg-card rounded-2xl shadow-xl border border-border-light overflow-hidden">
                        {/* Mockup Header */}
                        <div className="flex items-center gap-3 px-5 py-3.5 bg-bg-alt border-b border-border-light">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E8553D]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E8C43D]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#4AC84A]" />
                            </div>
                            <span className="text-xs text-text-muted font-medium">Vivaaham Dashboard</span>
                        </div>

                        {/* Mockup Body */}
                        <div className="p-5">
                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {[
                                    { icon: Users, label: "Guests", value: "847" },
                                    { icon: CheckCircle, label: "RSVPs", value: "623" },
                                    { icon: IndianRupee, label: "Budget", value: "₹24.5L" },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex items-center gap-2.5 p-3 bg-bg-alt rounded-lg">
                                        <stat.icon size={20} className="text-primary" />
                                        <div>
                                            <small className="text-[0.7rem] text-text-muted block">{stat.label}</small>
                                            <strong className="text-[0.95rem]">{stat.value}</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-text-muted mb-1.5">
                                    <span>Wedding Prep</span>
                                    <span>78%</span>
                                </div>
                                <div className="h-2 bg-bg-alt rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[78%] transition-all duration-1000" />
                                </div>
                            </div>

                            {/* Events */}
                            <div className="space-y-2">
                                {[
                                    { icon: Check, label: "Mehendi — 12 Feb", done: true },
                                    { icon: Loader, label: "Sangeet — 14 Feb", active: true },
                                    { icon: Circle, label: "Wedding — 15 Feb" },
                                    { icon: Circle, label: "Reception — 16 Feb" },
                                ].map((event) => (
                                    <div
                                        key={event.label}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg ${event.done
                                                ? "text-success bg-success/[0.06]"
                                                : event.active
                                                    ? "text-primary bg-primary/[0.06] font-semibold"
                                                    : "text-text-muted"
                                            }`}
                                    >
                                        <event.icon size={16} />
                                        {event.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-[10%] -right-2.5 w-12 h-12 flex items-center justify-center bg-bg-card rounded-full shadow-lg text-primary animate-[float_3s_ease-in-out_infinite]">
                        <Heart size={22} />
                    </div>
                    <div className="absolute bottom-[30%] -right-5 w-12 h-12 flex items-center justify-center bg-bg-card rounded-full shadow-lg text-accent animate-[float_3s_ease-in-out_infinite_1s]">
                        <Music size={22} />
                    </div>
                    <div className="absolute bottom-[10%] -left-2.5 w-12 h-12 flex items-center justify-center bg-bg-card rounded-full shadow-lg text-primary animate-[float_3s_ease-in-out_infinite_2s]">
                        <Camera size={22} />
                    </div>
                </div>
            </div>
        </section>
    );
}
