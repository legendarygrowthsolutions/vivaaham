
"use client";

import { useState, useEffect } from "react";
import { X, Palette, Sparkles, Calendar } from "lucide-react";

export default function DecorModal({ isOpen, onClose, onSave, initialData, events = [] }) {
    const [formData, setFormData] = useState({
        eventId: "",
        theme: "",
        colors: "",
        highlight: "",
        notes: ""
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    eventId: initialData.event_id || "",
                    theme: initialData.theme || "",
                    colors: initialData.colors || "",
                    highlight: initialData.highlight || "",
                    notes: initialData.notes || ""
                });
            } else {
                setFormData({
                    eventId: "",
                    theme: "",
                    colors: "",
                    highlight: "",
                    notes: ""
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
                        {initialData ? "Edit Décor Plan" : "Add Décor Plan"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Event <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><Calendar size={14} /></span>
                            <select
                                required
                                value={formData.eventId}
                                onChange={e => setFormData({ ...formData, eventId: e.target.value })}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="">Select Event</option>
                                {events.map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                                <option value="">General / All Events</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Theme Name <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><Palette size={14} /></span>
                            <input
                                required
                                type="text"
                                value={formData.theme}
                                onChange={e => setFormData({ ...formData, theme: e.target.value })}
                                placeholder="e.g. Royal Rajasthan, Pastel Garden"
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Color Palette</label>
                        <input
                            type="text"
                            value={formData.colors}
                            onChange={e => setFormData({ ...formData, colors: e.target.value })}
                            placeholder="e.g. Gold & Red, Blush Pink & White"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Highlight Element</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><Sparkles size={14} /></span>
                            <input
                                type="text"
                                value={formData.highlight}
                                onChange={e => setFormData({ ...formData, highlight: e.target.value })}
                                placeholder="e.g. Floral Mandap, LED Entrance"
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Notes / Inspiration</label>
                        <textarea
                            rows="3"
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Describe the vibe, specific flowers, lighting ideas..."
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
                            {saving ? "Saving..." : "Save Plan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
