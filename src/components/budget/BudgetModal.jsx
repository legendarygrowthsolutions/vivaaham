
"use client";

import { useState, useEffect } from "react";
import { X, IndianRupee } from "lucide-react";

// Common wedding budget categories
const BUDGET_CATEGORIES = [
    "Venue & Accommodation", "Catering", "Decor & Design",
    "Photography & Videography", "Attire & Beauty", "Music & Entertainment",
    "Invites & Stationery", "Gifts & Favors", "Transportation",
    "Ceremony Costs", "Planner Fees", "Miscellaneous"
];

export default function BudgetModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        category: "",
        budgeted: 0,
        actual: 0,
        notes: ""
    });
    const [saving, setSaving] = useState(false);
    const [customCategory, setCustomCategory] = useState("");

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    category: initialData.category || "",
                    budgeted: initialData.budgeted || 0,
                    actual: initialData.actual || 0,
                    notes: initialData.notes || ""
                });
                if (!BUDGET_CATEGORIES.includes(initialData.category)) {
                    setFormData(prev => ({ ...prev, category: "Other" }));
                    setCustomCategory(initialData.category);
                } else {
                    setCustomCategory("");
                }
            } else {
                setFormData({
                    category: "Venue & Accommodation",
                    budgeted: 0,
                    actual: 0,
                    notes: ""
                });
                setCustomCategory("");
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const finalData = {
                ...formData,
                category: formData.category === "Other" ? customCategory : formData.category
            };
            await onSave(finalData);
            onClose();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
            <div className="bg-bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease]">
                <div className="flex items-center justify-between p-4 border-b border-border-light">
                    <h3 className="font-heading text-lg font-semibold">
                        {initialData ? "Edit Budget Item" : "Add Budget Item"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            {BUDGET_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {formData.category === "Other" && (
                        <div className="animate-[fadeIn_0.2s_ease]">
                            <label className="block text-sm font-medium text-text-muted mb-1">Custom Category Name</label>
                            <input
                                required
                                type="text"
                                value={customCategory}
                                onChange={e => setCustomCategory(e.target.value)}
                                placeholder="e.g. Honeymoon"
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Estimated Budget (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><IndianRupee size={14} /></span>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.budgeted}
                                    onChange={e => setFormData({ ...formData, budgeted: parseInt(e.target.value) || 0 })}
                                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Actual Spent (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><IndianRupee size={14} /></span>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.actual}
                                    onChange={e => setFormData({ ...formData, actual: parseInt(e.target.value) || 0 })}
                                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Notes</label>
                        <textarea
                            rows="2"
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Details about expenses..."
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border-light">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-bg-alt rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary px-5 py-2 text-sm rounded-lg flex items-center gap-2"
                        >
                            {saving ? "Saving..." : "Save Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
