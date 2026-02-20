
"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export default function GuestModal({ isOpen, onClose, onSave, initialData, events = [] }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        side: "Bride",
        rsvp: "pending",
        count: 1,
        selectedEvents: []
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    name: initialData.name || "",
                    email: initialData.email || "",
                    phone: initialData.phone || "",
                    side: initialData.side || "Bride",
                    rsvp: initialData.rsvp || "pending",
                    count: initialData.count || 1,
                    selectedEvents: initialData.events?.map(e => e.id) || []
                });
            } else {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    side: "Bride",
                    rsvp: "pending",
                    count: 1,
                    selectedEvents: events.map(e => e.id) // Default to all? Or none? Let's default to all for convenience
                });
            }
        }
    }, [isOpen, initialData, events]);

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

    const toggleEvent = (eventId) => {
        setFormData(prev => {
            const current = prev.selectedEvents;
            if (current.includes(eventId)) {
                return { ...prev, selectedEvents: current.filter(id => id !== eventId) };
            } else {
                return { ...prev, selectedEvents: [...current, eventId] };
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
            <div className="bg-bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease]">
                <div className="flex items-center justify-between p-4 border-b border-border-light">
                    <h3 className="font-heading text-lg font-semibold">
                        {initialData ? "Edit Guest" : "Add New Guest"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Guest Name <span className="text-danger">*</span></label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Sharma Family"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Guest Classification */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-text-muted mb-2">Guest Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="guestType"
                                    checked={formData.count === 1}
                                    onChange={() => setFormData((prev) => ({ ...prev, count: 1 }))}
                                    className="accent-primary"
                                />
                                <span className="text-sm">Single Guest</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="guestType"
                                    checked={formData.count > 1}
                                    onChange={() => setFormData((prev) => ({ ...prev, count: Math.max(2, prev.count) }))}
                                    className="accent-primary"
                                />
                                <span className="text-sm">Family / Group POC</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Side</label>
                            <select
                                value={formData.side}
                                onChange={e => setFormData({ ...formData, side: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="Bride">Bride</option>
                                <option value="Groom">Groom</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">RSVP Status</label>
                            <select
                                value={formData.rsvp}
                                onChange={e => setFormData({ ...formData, rsvp: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="declined">Declined</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {formData.count > 1 && (
                            <div className="animate-[fadeIn_0.2s_ease]">
                                <label className="block text-sm font-medium text-text-muted mb-1">Total Party Size</label>
                                <input
                                    type="number"
                                    min="2"
                                    value={formData.count}
                                    onChange={e => setFormData({ ...formData, count: parseInt(e.target.value) || 2 })}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <p className="text-[10px] text-text-muted mt-1">Including the primary contact.</p>
                            </div>
                        )}
                        <div className={formData.count === 1 ? 'col-span-2' : ''}>
                            <label className="block text-sm font-medium text-text-muted mb-1">Phone (Optional)</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91..."
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Email (Optional)</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="guest@example.com"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Invited To Events</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto border border-border rounded-lg p-2 bg-bg-alt/30">
                            {events.map((event) => (
                                <label key={event.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-bg-alt p-1 rounded">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.selectedEvents.includes(event.id)
                                        ? "bg-primary border-primary text-white"
                                        : "border-text-muted/40"
                                        }`}>
                                        {formData.selectedEvents.includes(event.id) && <Check size={12} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={formData.selectedEvents.includes(event.id)}
                                        onChange={() => toggleEvent(event.id)}
                                    />
                                    <span>{event.name}</span>
                                </label>
                            ))}
                            {events.length === 0 && <span className="text-xs text-text-muted">No events created yet.</span>}
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
                            {saving ? "Saving..." : "Save Guest"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
