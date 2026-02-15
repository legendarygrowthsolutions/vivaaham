"use client";
import { MOCK_GIFTS } from "@/lib/mockData";
import { Gift, Plus } from "lucide-react";

export default function GiftsPage() {
    const thankBadge = (s) => {
        const map = { sent: "bg-success/[0.08] text-success", pending: "bg-accent/[0.12] text-[#8B7724]" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[s]}`}>{s}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Gift size={22} className="text-primary" /> Gift Registry</h2>
                    <p className="text-sm text-text-muted mt-0.5">Track gifts received and manage thank-you notes</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Log Gift</button>
            </div>
            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr>
                            {["From", "Gift", "Est. Value", "Thank You"].map((h) => <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {MOCK_GIFTS.map((g) => (
                                <tr key={g.id} className="border-b border-border-light hover:bg-bg-alt/50">
                                    <td className="px-4 py-3 font-medium">{g.from}</td>
                                    <td className="px-4 py-3 text-text-muted">{g.gift}</td>
                                    <td className="px-4 py-3 text-text-muted">{g.value}</td>
                                    <td className="px-4 py-3">{thankBadge(g.thankYou)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
