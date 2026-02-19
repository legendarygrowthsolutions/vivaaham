
"use client";

import { useState, useEffect } from "react";
import { X, Mail, Monitor, Send, Eye, CheckCircle } from "lucide-react";

export default function InvitationModal({ isOpen, onClose, onSave, initialData, events = [] }) {
    const [formData, setFormData] = useState({
        eventId: "",
        designName: "",
        channel: "Email",
        templateUrl: "",
        sentCount: 0,
        deliveredCount: 0,
        openedCount: 0
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    eventId: initialData.event_id || "",
                    designName: initialData.design_name || "",
                    channel: initialData.channel || "Email",
                    templateUrl: initialData.template_url || "",
                    sentCount: initialData.sent_count || 0,
                    deliveredCount: initialData.delivered_count || 0,
                    openedCount: initialData.opened_count || 0
                });
            } else {
                setFormData({
                    eventId: "",
                    designName: "",
                    channel: "Email",
                    templateUrl: "",
                    sentCount: 0,
                    deliveredCount: 0,
                    openedCount: 0
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
                        {initialData ? "Edit Invitation Design" : "New Invitation Design"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Design Name <span className="text-danger">*</span></label>
                        <input
                            required
                            type="text"
                            value={formData.designName}
                            onChange={e => setFormData({ ...formData, designName: e.target.value })}
                            placeholder="e.g. Royal Gold Sangeet Invite"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Event</label>
                            <select
                                value={formData.eventId}
                                onChange={e => setFormData({ ...formData, eventId: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="">General</option>
                                {events.map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Channel</label>
                            <select
                                value={formData.channel}
                                onChange={e => setFormData({ ...formData, channel: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="Email">Email</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="SMS">SMS</option>
                                <option value="Print">Print</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats Section (Editable for tracking) */}
                    <div className="pt-2 border-t border-border-light">
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Campaign Stats (Manual Entry)</h4>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs text-text-muted mb-1 flex items-center gap-1"><Send size={10} /> Sent</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.sentCount}
                                    onChange={e => setFormData({ ...formData, sentCount: parseInt(e.target.value) || 0 })}
                                    className="w-full px-2 py-1.5 rounded-lg border border-border bg-bg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-text-muted mb-1 flex items-center gap-1"><CheckCircle size={10} /> Delivered</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.deliveredCount}
                                    onChange={e => setFormData({ ...formData, deliveredCount: parseInt(e.target.value) || 0 })}
                                    className="w-full px-2 py-1.5 rounded-lg border border-border bg-bg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-text-muted mb-1 flex items-center gap-1"><Eye size={10} /> Opened</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.openedCount}
                                    onChange={e => setFormData({ ...formData, openedCount: parseInt(e.target.value) || 0 })}
                                    className="w-full px-2 py-1.5 rounded-lg border border-border bg-bg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
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
                            {saving ? "Saving..." : "Save Design"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
