"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
    { q: "Is Vivaaham only for big weddings?", a: "Not at all! Whether you have 50 guests or 5,000, Vivaaham scales to your needs. Our Shubh plan is perfect for intimate gatherings, while Shahi handles the grandest celebrations. If your family says \"chhota sa function rakhte hain\" and then invites 800 people — we've got you covered." },
    { q: "Can my parents use this? They're not very tech-savvy.", a: "Absolutely! We designed Vivaaham to be as intuitive as WhatsApp. If papa can forward good morning messages, they can use Vivaaham. Plus, our Family Collaboration feature lets you control exactly what each person sees and manages." },
    { q: "How does guest management work with Indian weddings?", a: "We know Indian wedding guest lists are... complicated. Import from Excel, Google Contacts, or add manually. Categorize by bride/groom side, tag VIPs, track +1s (and +5s — we know how it goes), manage per-event invitations, and send RSVPs via WhatsApp, SMS, or email. No more \"unhe bhi bulana tha!\" moments." },
    { q: "What if I'm the wedding planner, not the family?", a: "Even better! Vivaaham helps professional wedding planners manage multiple weddings simultaneously. Your clients get a beautiful, organized view of their wedding, and you get powerful tools to juggle everything behind the scenes." },
    { q: "Is my data safe?", a: "Your guest lists, budgets, and vendor details are encrypted and stored securely. We follow industry-best security practices — because we know Sharma ji ka beta shouldn't be seeing your budget spreadsheet. Your data is yours, always." },
    { q: "Can I try Vivaaham before committing?", a: "Of course! Book a free demo and we'll walk you through every feature with sample data. No pressure, no commitment — just like shaadi.com, but for planning, not matching. 😄" },
];

export default function FAQ() {
    const [active, setActive] = useState(null);

    return (
        <section className="py-16 lg:py-24 bg-bg-alt" id="faq">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-14 reveal">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <HelpCircle size={16} /> FAQ
                    </span>
                    <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4">
                        Questions? <span className="gradient-text">We&apos;ve Got Answers.</span>
                    </h2>
                    <p className="text-text-muted text-lg">And unlike your relatives, our answers are actually helpful.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-bg-card rounded-xl border border-border-light overflow-hidden reveal">
                            <button
                                onClick={() => setActive(active === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left font-medium hover:text-primary transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown size={20} className={`shrink-0 ml-4 transition-transform duration-300 ${active === i ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${active === i ? "max-h-[500px]" : "max-h-0"}`}>
                                <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
