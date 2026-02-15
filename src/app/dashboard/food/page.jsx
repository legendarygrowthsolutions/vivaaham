"use client";
import { MOCK_FOOD } from "@/lib/mockData";
import { UtensilsCrossed, Plus, Leaf, WheatOff } from "lucide-react";

export default function FoodPage() {
    const statusBadge = (s) => {
        const map = { finalized: ["bg-success/[0.08] text-success", "Finalized"], tasting_due: ["bg-accent/[0.12] text-[#8B7724]", "Tasting Due"], draft: ["bg-border text-text-muted", "Draft"] };
        const [cls, lbl] = map[s] || ["bg-border text-text-muted", s];
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{lbl}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><UtensilsCrossed size={22} className="text-primary" /> Food & Catering</h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage menus, dietary requirements, and tastings</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Menu</button>
            </div>
            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr>
                            {["Event", "Menu Type", "Headcount", "Status"].map((h) => <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {MOCK_FOOD.map((f) => (
                                <tr key={f.id} className="border-b border-border-light hover:bg-bg-alt/50">
                                    <td className="px-4 py-3 font-medium">{f.event}</td>
                                    <td className="px-4 py-3 text-text-muted">{f.type}</td>
                                    <td className="px-4 py-3 text-text-muted">{f.headcount}</td>
                                    <td className="px-4 py-3">{statusBadge(f.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-bg-card rounded-xl border border-border-light p-5">
                <h3 className="font-heading text-base font-semibold mb-3">Dietary Notes</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-bg-alt rounded-lg text-sm"><Leaf size={16} className="text-success" /> 120 guests — Pure Vegetarian (Jain)</div>
                    <div className="flex items-center gap-3 p-3 bg-bg-alt rounded-lg text-sm"><WheatOff size={16} className="text-warning" /> 8 guests — Gluten Free</div>
                </div>
            </div>
        </div>
    );
}
