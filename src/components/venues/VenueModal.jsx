
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function VenueModal({ isOpen, onClose, onSave, initialData, events = [] }) {
    const [formData, setFormData] = useState({
        name: "",
        eventId: "",
        address: "",
        contactName: "",
        contactPhone: "",
        totalRooms: 0,
        cost: 0,
        status: "draft"
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    name: initialData.name || "",
                    eventId: initialData.event_id || "",
                    address: initialData.address || "",
                    contactName: initialData.contact_name || "",
                    contactPhone: initialData.contact_phone || "",
                    totalRooms: initialData.total_rooms || 0,
                    cost: initialData.cost || 0,
                    status: initialData.status || "draft"
                });
            } else {
                setFormData({
                    name: "",
                    eventId: "", // Need to select an event
                    address: "",
                    contactName: "",
                    contactPhone: "",
                    totalRooms: 0,
                    cost: 0,
                    status: "draft"
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
            <div className="bg-bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease]">
                <div className="flex items-center justify-between p-4 border-b border-border-light">
                    <h3 className="font-heading text-lg font-semibold">
                        {initialData ? "Edit Venue" : "Add New Venue"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Venue Name <span className="text-danger">*</span></label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Taj Palace"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Associated Event</label>
                        <select
                            value={formData.eventId}
                            onChange={e => setFormData({ ...formData, eventId: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="">Select Event (Optional)</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Venue Address"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Total Rooms</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.totalRooms}
                                onChange={e => setFormData({ ...formData, totalRooms: parseInt(e.target.value) || 0 })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Cost (₹)</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.cost}
                                onChange={e => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Contact Person</label>
                            <input
                                type="text"
                                value={formData.contactName}
                                onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                                placeholder="Manager Name"
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Contact Phone</label>
                            <input
                                type="tel"
                                value={formData.contactPhone}
                                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                                placeholder="+91..."
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize"
                        >
                            <option value="draft">Draft</option>
                            <option value="inquiry_sent">Inquiry Sent</option>
                            <option value="visit_scheduled">Visit Scheduled</option>
                            <option value="negotiating">Negotiating</option>
                            <option value="deposit_paid">Deposit Paid</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
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
                            {saving ? "Saving..." : "Save Venue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
