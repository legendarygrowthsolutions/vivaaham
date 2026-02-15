import { Heart, CheckCircle2, MessageCircle, PhoneMissed, CheckCircle, Rocket } from "lucide-react";

export default function FamilySection() {
    return (
        <section className="py-16 lg:py-24" id="family">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center reveal">
                    <div>
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            <Heart size={16} /> Built for Indian Families
                        </span>
                        <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight mb-5">
                            Dear <span className="gradient-text">Bride&apos;s Brother,</span><br />We See You.
                        </h2>
                        <p className="italic text-text-muted border-l-[3px] border-accent pl-4 mb-4 leading-relaxed">
                            You&apos;re the one tracking 800 guests on a spreadsheet at 2 AM. You&apos;re coordinating the pandit,
                            the caterer, and your <em>mausaji</em> who &quot;needs a room with AC — not a cooler.&quot; You&apos;re managing
                            the baraat route and the parking lot at the same time.
                        </p>
                        <p className="mb-6 leading-relaxed">
                            <strong>Vivaaham was built for you.</strong> Not for wedding planners with fancy offices —
                            for the brother, sister, cousin, or uncle who becomes the unofficial CEO of every Indian wedding.
                        </p>
                        <ul className="mb-8 space-y-2">
                            {[
                                "Share access with the entire planning committee",
                                "No tech skills needed — as easy as WhatsApp",
                                "Real-time updates so nobody asks \"kya hua?\"",
                                "Works on phone, tablet, and laptop",
                            ].map((perk) => (
                                <li key={perk} className="flex items-center gap-2.5 text-[0.95rem]">
                                    <CheckCircle2 size={20} className="text-success shrink-0" />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                        <a href="#demo" className="btn-gradient px-8 py-4 text-base font-semibold rounded-lg inline-flex items-center gap-2">
                            <Rocket size={18} /> Let&apos;s Lighten the Load
                        </a>
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            { icon: MessageCircle, text: '"Bhaiya, pandit ji ka number bhejo"', sub: "— Every relative, ever" },
                            { icon: PhoneMissed, text: '"12 missed calls from caterer"', sub: "— Your phone, daily" },
                            { icon: CheckCircle, text: '"Everything is on Vivaaham now!"', sub: "— You, after signing up", highlight: true },
                        ].map((card) => (
                            <div
                                key={card.text}
                                className={`p-5 bg-bg-card rounded-xl shadow-md border border-border-light hover:translate-x-2 transition-transform duration-300 ${card.highlight ? "border-l-[3px] border-l-success" : ""
                                    }`}
                            >
                                <card.icon size={24} className={card.highlight ? "text-success mb-2" : "text-primary mb-2"} />
                                <p className="font-medium text-[0.95rem] mb-1">{card.text}</p>
                                <span className="text-xs text-text-muted">{card.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
