import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "My sister's wedding had 1,200 guests and 5 events spread across 4 days. Vivaaham saved my sanity — and my marriage. Yes, my wife was tired of hearing about seating charts.",
        name: "Rajesh Kumar", role: "Bride's Brother, Jaipur", initials: "RK", color: "#8B1A4A",
    },
    {
        quote: "We managed 3 venues, 15 vendors, and 900+ guests without a single 'ye kaise hua?!' moment. The budget tracker alone saved us ₹3 lakhs by catching duplicate vendor payments.",
        name: "Priya Agarwal", role: "Bride, Delhi", initials: "PA", color: "#B8860B",
    },
    {
        quote: "As a wedding planner managing 8 weddings a season, Vivaaham is my secret weapon. My clients think I'm superhuman. I'm just well-organized — finally.",
        name: "Sneha Menon", role: "Wedding Planner, Mumbai", initials: "SM", color: "#C8553D",
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 lg:py-24 bg-bg-alt" id="testimonials">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-14 reveal">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <Star size={16} /> Love Letters
                    </span>
                    <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4">
                        Families Who <span className="gradient-text">Loved It</span>
                    </h2>
                    <p className="text-text-muted text-lg">Real families. Real weddings. Real relief.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.name} className="bg-bg-card rounded-2xl p-8 shadow-md border border-border-light hover:-translate-y-1 hover:shadow-lg transition-all duration-300 reveal">
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className="text-accent fill-accent" />
                                ))}
                            </div>
                            <p className="text-sm text-text-muted leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: t.color }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <strong className="text-sm block">{t.name}</strong>
                                    <span className="text-xs text-text-muted">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
