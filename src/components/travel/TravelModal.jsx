
"use client";

import { useState, useEffect } from "react";
import { X, Plane, Clock, User, Phone, MapPin } from "lucide-react";

export default function TravelModal({ isOpen, onClose, onSave, initialData, guests = [] }) {
    const [formData, setFormData] = useState({
        guestId: "",
        arrivalDatetime: "",
        mode: "Flight",
        details: "",
        pickupStatus: "pending"
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    guestId: initialData.guest_id || "",
                    arrivalDatetime: initialData.arrival_datetime ? new Date(initialData.arrival_datetime).toISOString().slice(0, 16) : "",
                    mode: initialData.mode || "Flight",
                    details: initialData.details || "",
                    pickupStatus: initialData.pickup_status || "pending"
                });
            } else {
                setFormData({
                    guestId: "",
                    arrivalDatetime: "",
                    mode: "Flight",
                    details: "",
                    pickupStatus: "pending"
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
                        {initialData ? "Edit Travel Plan" : "Add Travel Plan"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Guest <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><User size={14} /></span>
                            <select
                                required
                                value={formData.guestId}
                                onChange={e => setFormData({ ...formData, guestId: e.target.value })}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                disabled={!!initialData} // Lock guest if editing existing plan? Or allow change? Let's allow change if needed, but usually linked.
                            >
                                <option value="">Select Guest</option>
                                {guests.map(g => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Arrival Date & Time <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><Clock size={14} /></span>
                            <input
                                required
                                type="datetime-local"
                                value={formData.arrivalDatetime}
                                onChange={e => setFormData({ ...formData, arrivalDatetime: e.target.value })}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Mode</label>
                            <select
                                value={formData.mode}
                                onChange={e => setFormData({ ...formData, mode: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="Flight">Flight ✈️</option>
                                <option value="Train">Train 🚆</option>
                                <option value="Bus">Bus 🚌</option>
                                <option value="Car">Car 🚗</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Pickup Status</label>
                            <select
                                value={formData.pickupStatus}
                                onChange={e => setFormData({ ...formData, pickupStatus: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="pending">Pending</option>
                                <option value="arranged">Arranged</option>
                                <option value="not_needed">Not Needed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Details (Flight/Train No.)</label>
                        <input
                            type="text"
                            value={formData.details}
                            onChange={e => setFormData({ ...formData, details: e.target.value })}
                            placeholder="e.g. 6E 5022 from Mumbai"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
