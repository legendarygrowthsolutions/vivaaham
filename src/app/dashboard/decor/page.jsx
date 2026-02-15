"use client";
import { MOCK_DECOR } from "@/lib/mockData";
import { Palette, Plus, Sparkles } from "lucide-react";

export default function DecorPage() {
    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Palette size={22} className="text-primary" /> Décor & Themes</h2>
                    <p className="text-sm text-text-muted mt-0.5">Design mood boards, colour palettes, and mandap themes per event</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Theme</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_DECOR.map((d) => (
                    <div key={d.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs bg-primary/[0.08] text-primary px-2.5 py-1 rounded-full font-semibold">{d.event}</span>
                            <Sparkles size={16} className="text-accent" />
                        </div>
                        <h3 className="font-heading text-base font-semibold mb-2">{d.theme}</h3>
                        <div className="flex flex-col gap-1.5 text-sm text-text-muted">
                            <span>🎨 Colours: {d.colors}</span>
                            <span>✨ Highlight: {d.highlight}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
