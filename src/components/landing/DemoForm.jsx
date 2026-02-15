"use client";

import { Calendar, Clock, UserCheck, BadgeIndianRupee, Send, User, Mail } from "lucide-react";

export default function DemoForm() {
    return (
        <section className="py-16 lg:py-24" id="demo">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-bg-card rounded-2xl shadow-xl border border-border-light p-8 lg:p-12 reveal">
                    <div>
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            <Calendar size={16} /> Book a Demo
                        </span>
                        <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight mb-5">
                            Ready to Plan Your<br /><span className="gradient-text">Dream Wedding?</span>
                        </h2>
                        <p className="text-text-muted leading-relaxed mb-6">
                            Get a personalized walkthrough of Vivaaham. We&apos;ll show you how to manage your entire wedding — chai break included.
                        </p>
                        <ul className="space-y-3">
                            {[
                                { icon: Clock, text: "20-minute walkthrough" },
                                { icon: UserCheck, text: "Personalized for your wedding" },
                                { icon: BadgeIndianRupee, text: "No cost, no obligations" },
                            ].map((perk) => (
                                <li key={perk.text} className="flex items-center gap-2.5 text-[0.95rem]">
                                    <perk.icon size={20} className="text-primary" />
                                    {perk.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <form action="https://formspree.io/f/mbdaozyb" method="POST" className="space-y-5">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <User size={16} className="text-primary" /> Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Rahul Sharma"
                                    required
                                    className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                    <Mail size={16} className="text-primary" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="rahul@example.com"
                                    required
                                    className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-gradient w-full py-4 rounded-lg font-semibold text-base inline-flex items-center justify-center gap-2"
                            >
                                <Send size={18} /> Book My Free Demo
                            </button>
                            <p className="text-xs text-text-muted text-center">
                                We&apos;ll reach out within 24 hours. No spam — we promise on our <em>saat phero</em>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
