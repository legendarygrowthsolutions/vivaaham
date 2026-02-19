
"use client";

import { useState } from "react";
import { useBudget } from "@/hooks/useBudget";
import BudgetModal from "@/components/budget/BudgetModal";
import { IndianRupee, TrendingUp, TrendingDown, Minus, Plus, Edit, Trash2 } from "lucide-react";

export default function BudgetPage() {
    const { budgetItems, loading, addBudgetItem, updateBudgetItem, deleteBudgetItem } = useBudget();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const totalBudget = budgetItems.reduce((s, b) => s + (b.budgeted || 0), 0);
    const totalActual = budgetItems.reduce((s, b) => s + (b.actual || 0), 0);
    const remaining = totalBudget - totalActual;
    const progress = totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0;

    const format = (n) => {
        if (n === null || n === undefined) return "₹0";
        if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
        return `₹${n.toLocaleString('en-IN')}`;
    };

    const statusBadge = (budgeted, actual) => {
        let status = "on_track";
        if (actual > budgeted) status = "over";
        else if (actual < budgeted && actual > 0) status = "under";

        const map = {
            under: ["bg-success/[0.08] text-success", "Under Budget", TrendingDown],
            over: ["bg-danger/[0.08] text-danger", "Over Budget", TrendingUp],
            on_track: ["bg-info/[0.08] text-info", "On Track", Minus]
        };
        const [cls, lbl, Icon] = map[status];
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${cls}`}><Icon size={12} /> {lbl}</span>;
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingItem) {
            await updateBudgetItem(editingItem.id, data);
        } else {
            await addBudgetItem(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this budget item?")) {
            await deleteBudgetItem(id);
        }
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading budget...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><IndianRupee size={22} className="text-primary" /> Budget Tracker</h2>
                    <p className="text-sm text-text-muted mt-0.5">Track spending across all wedding categories</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Item</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <div className="flex justify-between text-sm mb-2"><span className="font-medium">Overall Spend</span><span className="text-text-muted">{Math.round(progress)}%</span></div>
                <div className="h-3 bg-bg-alt rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr>
                            {["Category", "Budget", "Actual", "Diff", "Status", "Actions"].map((h) => <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {budgetItems.map((b) => {
                                const diff = (b.budgeted || 0) - (b.actual || 0);
                                return (
                                    <tr key={b.id} className="border-b border-border-light hover:bg-bg-alt/50 group">
                                        <td className="px-4 py-3 font-medium">{b.category}</td>
                                        <td className="px-4 py-3 text-text-muted">{format(b.budgeted)}</td>
                                        <td className="px-4 py-3 text-text-muted">{format(b.actual)}</td>
                                        <td className={`px-4 py-3 font-medium ${diff >= 0 ? "text-success" : "text-danger"}`}>{diff >= 0 ? "+" : ""}{format(Math.abs(diff))}</td>
                                        <td className="px-4 py-3">{statusBadge(b.budgeted || 0, b.actual || 0)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(b)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors" title="Edit">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(b.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors" title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {budgetItems.length === 0 && !loading && (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                            <IndianRupee size={20} className="text-text-muted" />
                        </div>
                        <p className="text-text-muted text-sm">No budget items added yet.</p>
                        <button onClick={handleAdd} className="mt-4 text-primary text-sm hover:underline">
                            Start planning your budget
                        </button>
                    </div>
                )}
            </div>

            <BudgetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingItem}
            />
        </div>
    );
}
