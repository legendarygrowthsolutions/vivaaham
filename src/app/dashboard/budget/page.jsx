"use client";
import { MOCK_BUDGET } from "@/lib/mockData";
import { IndianRupee, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function BudgetPage() {
    const totalBudget = MOCK_BUDGET.reduce((s, b) => s + b.budget, 0);
    const totalActual = MOCK_BUDGET.reduce((s, b) => s + b.actual, 0);
    const remaining = totalBudget - totalActual;

    const format = (n) => `₹${(n / 100000).toFixed(1)}L`;
    const statusBadge = (s) => {
        const map = { under: ["bg-success/[0.08] text-success", "Under Budget", TrendingDown], over: ["bg-danger/[0.08] text-danger", "Over Budget", TrendingUp], on_track: ["bg-info/[0.08] text-info", "On Track", Minus] };
        const [cls, lbl, Icon] = map[s];
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${cls}`}><Icon size={12} /> {lbl}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div>
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><IndianRupee size={22} className="text-primary" /> Budget Tracker</h2>
                <p className="text-sm text-text-muted mt-0.5">Track spending across all wedding categories</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Budget", value: format(totalBudget), color: "text-primary" },
                    { label: "Spent", value: format(totalActual), color: "text-accent" },
                    { label: "Remaining", value: format(remaining), color: remaining >= 0 ? "text-success" : "text-danger" },
                ].map((s) => (
                    <div key={s.label} className="bg-bg-card rounded-xl border border-border-light p-4 text-center">
                        <div className={`font-heading text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-text-muted">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Progress */}
            <div className="bg-bg-card rounded-xl border border-border-light p-5">
                <div className="flex justify-between text-sm mb-2"><span className="font-medium">Overall Spend</span><span className="text-text-muted">{Math.round((totalActual / totalBudget) * 100)}%</span></div>
                <div className="h-3 bg-bg-alt rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${(totalActual / totalBudget) * 100}%` }} />
                </div>
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr>
                            {["Category", "Budget", "Actual", "Diff", "Status"].map((h) => <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {MOCK_BUDGET.map((b) => {
                                const diff = b.budget - b.actual;
                                return (
                                    <tr key={b.id} className="border-b border-border-light hover:bg-bg-alt/50">
                                        <td className="px-4 py-3 font-medium">{b.category}</td>
                                        <td className="px-4 py-3 text-text-muted">{format(b.budget)}</td>
                                        <td className="px-4 py-3 text-text-muted">{format(b.actual)}</td>
                                        <td className={`px-4 py-3 font-medium ${diff >= 0 ? "text-success" : "text-danger"}`}>{diff >= 0 ? "+" : ""}{format(Math.abs(diff))}</td>
                                        <td className="px-4 py-3">{statusBadge(b.status)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
