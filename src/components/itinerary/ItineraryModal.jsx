
"use client";

import { useState, useEffect } from "react";
import { X, Clock, ScrollText, User } from "lucide-react";

export default function ItineraryModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        time: "",
        activity: "",
        responsible: ""
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    time: initialData.time || "",
                    activity: initialData.activity || "",
                    responsible: initialData.responsible || ""
                });
            } else {
                setFormData({
                    time: "",
                    activity: "",
                    responsible: ""
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(formData);
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
                        {initialData ? "Edit Itinerary Slot" : "Add Itinerary Slot"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Time <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><Clock size={14} /></span>
                            <input
                                required
                                type="time"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Activity <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><ScrollText size={14} /></span>
                            <input
                                required
                                type="text"
                                value={formData.activity}
                                onChange={e => setFormData({ ...formData, activity: e.target.value })}
                                placeholder="e.g. Baraat Assembly"
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Responsible Person / Role</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><User size={14} /></span>
                            <input
                                type="text"
                                value={formData.responsible}
                                onChange={e => setFormData({ ...formData, responsible: e.target.value })}
                                placeholder="e.g. Best Man, Wedding Planner"
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
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
                            {saving ? "Saving..." : "Save Slot"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
