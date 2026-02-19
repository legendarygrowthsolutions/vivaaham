
"use client";

import { useState, useEffect } from "react";
import { X, Gift, User, DollarSign, CheckSquare, Square } from "lucide-react";

export default function GiftModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        from_name: "",
        description: "",
        estimated_value: "",
        thank_you_status: "pending"
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    from_name: initialData.from_name || "",
                    description: initialData.description || "",
                    estimated_value: initialData.estimated_value || "",
                    thank_you_status: initialData.thank_you_status || "pending"
                });
            } else {
                setFormData({
                    from_name: "",
                    description: "",
                    estimated_value: "",
                    thank_you_status: "pending"
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave({
                ...formData,
                estimated_value: formData.estimated_value ? parseFloat(formData.estimated_value) : null
            });
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
            <div className="bg-bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease] flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-border-light shrink-0">
                    <h3 className="font-heading text-lg font-semibold">
                        {initialData ? "Edit Gift Details" : "Log New Gift"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-5 overflow-y-auto">
                    {/* From Name */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">From (Guest Name) <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><User size={14} /></span>
                            <input
                                required
                                value={formData.from_name}
                                onChange={e => setFormData({ ...formData, from_name: e.target.value })}
                                placeholder="e.g. Aunt Sally"
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Gift Description <span className="text-danger">*</span></label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="e.g. Silver Cutlery Set"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                        />
                    </div>

                    {/* Estimated Value */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Estimated Value</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><DollarSign size={14} /></span>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.estimated_value}
                                onChange={e => setFormData({ ...formData, estimated_value: e.target.value })}
                                placeholder="0.00"
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    {/* Thank You Status */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Thank You Note Status</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="thank_status"
                                    checked={formData.thank_you_status === 'pending'}
                                    onChange={() => setFormData({ ...formData, thank_you_status: 'pending' })}
                                    className="accent-primary"
                                />
                                <span className="text-sm">Pending</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="thank_status"
                                    checked={formData.thank_you_status === 'sent'}
                                    onChange={() => setFormData({ ...formData, thank_you_status: 'sent' })}
                                    className="accent-primary"
                                />
                                <span className="text-sm text-success font-medium">Sent</span>
                            </label>
                        </div>
                    </div>
                </form>

                <div className="p-4 border-t border-border-light flex justify-end gap-3 bg-bg-card shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-bg-alt rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="btn-primary px-5 py-2 text-sm rounded-lg flex items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Gift"}
                    </button>
                </div>
            </div>
        </div>
    );
}
