
"use client";

import { useState } from "react";
import { useInvitations } from "@/hooks/useInvitations";
import InvitationModal from "@/components/invitations/InvitationModal";
import { Mail, Plus, Image, Send, Eye, CheckCircle, Edit, Trash2 } from "lucide-react";

export default function InvitationsPage() {
    const { invitations, events, loading, addInvitation, updateInvitation, deleteInvitation } = useInvitations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInvitation, setEditingInvitation] = useState(null);

    const handleAdd = () => {
        setEditingInvitation(null);
        setIsModalOpen(true);
    };

    const handleEdit = (inv) => {
        setEditingInvitation(inv);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingInvitation) {
            await updateInvitation(editingInvitation.id, data);
        } else {
            await addInvitation(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this invitation design?")) {
            await deleteInvitation(id);
        }
    };

    const getIconForChannel = (channel) => {
        // You can add specific icons for channel types here if available
        return <Mail size={16} className="text-primary" />;
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading invitations...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Mail size={22} className="text-primary" /> Digital Invitations
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Design, send, and track wedding invitations</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Create Design
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {invitations.map((inv) => (
                    <div key={inv.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow group relative">
                        {/* Actions */}
                        <div className="absolute top-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(inv); }}
                                className="p-1.5 bg-white/80 backdrop-blur rounded text-text-muted hover:text-primary transition-colors shadow-sm"
                            >
                                <Edit size={14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(inv.id); }}
                                className="p-1.5 bg-white/80 backdrop-blur rounded text-text-muted hover:text-danger transition-colors shadow-sm"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Preview / Placeholder */}
                        <div className="w-full h-36 bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                            {inv.template_url ? (
                                <img src={inv.template_url} alt={inv.design_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-primary/30">
                                    <Image size={32} />
                                    <span className="text-xs uppercase font-medium tracking-widest">No Preview</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <h3 className="font-heading text-base font-semibold mb-1 truncate" title={inv.design_name}>{inv.design_name}</h3>
                            <div className="flex items-center justify-between text-xs text-text-muted">
                                <span>{inv.eventName}</span>
                                <span className="flex items-center gap-1 bg-bg-alt px-2 py-0.5 rounded-full border border-border-light">
                                    {getIconForChannel(inv.channel)} {inv.channel}
                                </span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-border-light">
                            <div>
                                <div className="mx-auto w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                                    <Send size={12} />
                                </div>
                                <div className="font-bold text-sm">{inv.sent_count}</div>
                                <div className="text-[0.65rem] text-text-muted uppercase tracking-wider">Sent</div>
                            </div>
                            <div>
                                <div className="mx-auto w-6 h-6 rounded-full bg-success/10 flex items-center justify-center mb-1 text-success">
                                    <CheckCircle size={12} />
                                </div>
                                <div className="font-bold text-sm">{inv.delivered_count}</div>
                                <div className="text-[0.65rem] text-text-muted uppercase tracking-wider">Delivered</div>
                            </div>
                            <div>
                                <div className="mx-auto w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mb-1 text-accent">
                                    <Eye size={12} />
                                </div>
                                <div className="font-bold text-sm">{inv.opened_count}</div>
                                <div className="text-[0.65rem] text-text-muted uppercase tracking-wider">Opened</div>
                            </div>
                        </div>
                    </div>
                ))}

                {invitations.length === 0 && !loading && (
                    <div className="col-span-full py-16 text-center text-text-muted bg-bg-card rounded-xl border border-border-light border-dashed flex flex-col items-center">
                        <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                            <Mail size={20} className="text-text-muted" />
                        </div>
                        <p>No invitation designs created yet.</p>
                        <button onClick={handleAdd} className="mt-2 text-primary hover:underline font-medium text-sm">Create your first design</button>
                    </div>
                )}
            </div>

            <InvitationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingInvitation}
                events={events}
            />
        </div>
    );
}
