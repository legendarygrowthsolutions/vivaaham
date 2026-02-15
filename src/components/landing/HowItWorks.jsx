import { UserPlus, LayoutGrid, PartyPopper, ArrowRight, Route } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        { num: 1, icon: UserPlus, title: "Sign Up & Set Up", desc: "Create your wedding workspace in 2 minutes. Add events — from Roka to Reception. Invite your family team." },
        { num: 2, icon: LayoutGrid, title: "Plan & Manage", desc: "Import guests, book vendors, track budgets, manage venues. Everything your bade bhaiya juggled alone — now organised." },
        { num: 3, icon: PartyPopper, title: "Celebrate", desc: "Sit back, enjoy the baraat, and let Vivaaham handle the coordination. Real-time updates keep everyone in sync." },
    ];

    return (
        <section className="py-16 lg:py-24 bg-bg-alt" id="how-it-works">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-14 reveal">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <Route size={16} /> How It Works
                    </span>
                    <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4">
                        Three Steps to a<br /><span className="gradient-text">Stress-Free Wedding</span>
                    </h2>
                    <p className="text-text-muted text-lg">Because the only tears at a wedding should be happy ones.</p>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-center gap-5">
                    {steps.map((step, i) => (
                        <div key={step.num} className="contents">
                            <div className="text-center p-8 bg-bg-card rounded-2xl shadow-md flex-1 max-w-xs relative hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 reveal">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {step.num}
                                </div>
                                <div className="w-16 h-16 mx-auto mt-4 mb-5 bg-gradient-to-br from-primary/[0.08] to-accent/[0.08] rounded-full flex items-center justify-center">
                                    <step.icon size={28} className="text-primary" />
                                </div>
                                <h3 className="font-heading text-lg mb-2.5">{step.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="hidden md:flex items-center pt-20 text-border">
                                    <ArrowRight size={28} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
