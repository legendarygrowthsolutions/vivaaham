
"use client";

import { useState } from "react";
import { useGifts } from "@/hooks/useGifts";
import GiftModal from "@/components/gifts/GiftModal";
import { Gift, Plus, Edit, Trash2, Heart, DollarSign } from "lucide-react";

export default function GiftsPage() {
    const { gifts, loading, addGift, updateGift, deleteGift } = useGifts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGift, setEditingGift] = useState(null);

    const handleAdd = () => {
        setEditingGift(null);
        setIsModalOpen(true);
    };

    const handleEdit = (gift) => {
        setEditingGift(gift);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingGift) {
            await updateGift(editingGift.id, data);
        } else {
            await addGift(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this gift entry?")) {
            await deleteGift(id);
        }
    };

    const thankBadge = (s) => {
        const map = { sent: "bg-success/[0.08] text-success", pending: "bg-accent/[0.12] text-[#8B7724]" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[s] || map.pending}`}>{s}</span>;
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading gifts...</div>;

    const totalValue = gifts.reduce((acc, curr) => acc + (curr.estimated_value || 0), 0);

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Gift size={22} className="text-primary" /> Gift Registry
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Track gifts received and manage thank-you notes</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Log Gift
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-bg-card p-4 rounded-xl border border-border-light shadow-sm">
                    <div className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Total Gifts</div>
                    <div className="text-2xl font-bold font-heading">{gifts.length}</div>
                </div>
                <div className="bg-bg-card p-4 rounded-xl border border-border-light shadow-sm">
                    <div className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Est. Value</div>
                    <div className="text-2xl font-bold font-heading flex items-center gap-1">
                        <span className="text-primary text-lg">$</span>
                        {totalValue.toLocaleString()}
                    </div>
                </div>
                <div className="hidden md:block bg-bg-card p-4 rounded-xl border border-border-light shadow-sm">
                    <div className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Pending Thanks</div>
                    <div className="text-2xl font-bold font-heading text-accent">
                        {gifts.filter(g => g.thank_you_status === 'pending').length}
                    </div>
                </div>
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                {["From", "Gift Description", "Est. Value", "Thank You", "Actions"].map((h) => (
                                    <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {gifts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-text-muted">
                                        No gifts logged yet. Start adding them!
                                    </td>
                                </tr>
                            ) : (
                                gifts.map((g) => (
                                    <tr key={g.id} className="hover:bg-bg-alt/50 group">
                                        <td className="px-4 py-3 font-medium">{g.from_name}</td>
                                        <td className="px-4 py-3 text-text-muted">{g.description}</td>
                                        <td className="px-4 py-3 text-text-muted">
                                            {g.estimated_value ? `$${g.estimated_value.toLocaleString()}` : '-'}
                                        </td>
                                        <td className="px-4 py-3">{thankBadge(g.thank_you_status)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(g)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(g.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <GiftModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingGift}
            />
        </div>
    );
}
