import Link from "next/link";
import { Tag, Check } from "lucide-react";
import { PLANS } from "@/lib/mockData";

export default function Pricing() {
    return (
        <section className="py-16 lg:py-24" id="pricing">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-14 reveal">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <Tag size={16} /> Pricing
                    </span>
                    <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4">
                        Less Than Your <span className="gradient-text">Flower Budget</span>
                    </h2>
                    <p className="text-text-muted text-lg">Seriously. You&apos;ll spend more on marigold garlands.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-bg-card rounded-2xl p-9 shadow-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative reveal ${plan.popular
                                    ? "border-primary shadow-lg scale-[1.04]"
                                    : "border-border-light"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <h3 className="font-heading text-xl mb-1">{plan.name}</h3>
                                <p className="text-sm text-text-muted mb-5">{plan.tagline}</p>
                            </div>
                            <div className="mb-6">
                                <span className="font-heading text-4xl font-bold text-primary">{plan.price}</span>
                                <span className="text-sm text-text-muted"> / wedding</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm">
                                        <Check size={16} className="text-success shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/signup"
                                className={`w-full py-3.5 rounded-lg font-semibold text-sm text-center block transition-all duration-300 ${plan.popular
                                        ? "btn-gradient"
                                        : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                                    }`}
                            >
                                {plan.id === "shahi" ? "Contact Us" : "Get Started"}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
