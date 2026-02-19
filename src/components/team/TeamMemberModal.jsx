
"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Shield, CheckSquare, Square } from "lucide-react";
import { ALL_MODULES } from "@/lib/mockData";

export default function TeamMemberModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        email: "",
        role: "editor",
        modules: ["all"]
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    email: initialData.email || initialData.invited_email || "",
                    role: initialData.role || "editor",
                    modules: initialData.modules || ["all"]
                });
            } else {
                setFormData({
                    email: "",
                    role: "editor",
                    modules: ["all"]
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
            alert(error.message); // Simple error feedback
        } finally {
            setSaving(false);
        }
    };

    const toggleModule = (moduleId) => {
        if (moduleId === 'all') {
            setFormData(prev => ({ ...prev, modules: prev.modules.includes('all') ? [] : ['all'] }));
            return;
        }

        setFormData(prev => {
            const newModules = prev.modules.includes(moduleId)
                ? prev.modules.filter(m => m !== moduleId)
                : [...prev.modules, moduleId];

            // If selecting specific, remove 'all'. If selecting all specific, maybe convert to 'all'? optional.
            // Let's just remove 'all' if a specific one is toggled.
            return { ...prev, modules: newModules.filter(m => m !== 'all') };
        });
    };

    if (!isOpen) return null;

    const isInvite = !initialData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
            <div className="bg-bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease] flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-border-light shrink-0">
                    <h3 className="font-heading text-lg font-semibold">
                        {isInvite ? "Invite Team Member" : "Edit Team Member"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-5 overflow-y-auto">
                    {/* Email - Readonly if editing */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Email Address <span className="text-danger">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"><Mail size={14} /></span>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isInvite}
                                placeholder="colleague@example.com"
                                className={`w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed`}
                            />
                        </div>
                        {isInvite && <p className="text-xs text-text-muted mt-1">An invitation will be sent to this email.</p>}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Role</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['admin', 'editor', 'viewer'].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role })}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium capitalize border transition-all ${formData.role === role
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-bg-alt border-transparent text-text-muted hover:bg-bg-alt/80"
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-text-muted mt-2">
                            {formData.role === 'admin' && "Full access to all modules and settings."}
                            {formData.role === 'editor' && "Can add and edit content, but cannot manage team."}
                            {formData.role === 'viewer' && "Read-only access to all modules."}
                        </p>
                    </div>

                    {/* Module Access */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Module Access</label>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-bg-alt cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.modules.includes('all')}
                                    onChange={() => toggleModule('all')}
                                    className="accent-primary rounded"
                                />
                                <span className="text-sm font-medium">All Modules</span>
                            </label>

                            {!formData.modules.includes('all') && (
                                <div className="pl-4 space-y-1 border-l-2 border-border-light ml-2">
                                    {ALL_MODULES.filter(m => m.id !== 'dashboard').map((mod) => (
                                        <label key={mod.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-bg-alt cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.modules.includes(mod.id)}
                                                onChange={() => toggleModule(mod.id)}
                                                className="accent-primary rounded"
                                            />
                                            <span className="text-sm">{mod.name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
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
                        {saving ? (isInvite ? "Sending..." : "Saving...") : (isInvite ? "Send Invite" : "Save Changes")}
                    </button>
                </div>
            </div>
        </div>
    );
}
