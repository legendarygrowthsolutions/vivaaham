"use client";
import { MOCK_INVITATIONS } from "@/lib/mockData";
import { Mail, Plus, Image, Send, Eye } from "lucide-react";

export default function InvitationsPage() {
    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Mail size={22} className="text-primary" /> Digital Invitations</h2>
                    <p className="text-sm text-text-muted mt-0.5">Design, send, and track wedding invitations</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Create Design</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_INVITATIONS.map((inv) => (
                    <div key={inv.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow">
                        <div className="w-full h-32 bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] rounded-lg mb-4 flex items-center justify-center">
                            <Image size={32} className="text-primary/30" />
                        </div>
                        <h3 className="font-heading text-base font-semibold mb-1">{inv.design}</h3>
                        <p className="text-xs text-text-muted mb-3">{inv.event} · via {inv.channel}</p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div><Send size={14} className="mx-auto text-primary mb-1" /><div className="font-bold text-sm">{inv.sent}</div><div className="text-[0.65rem] text-text-muted">Sent</div></div>
                            <div><Mail size={14} className="mx-auto text-success mb-1" /><div className="font-bold text-sm">{inv.delivered}</div><div className="text-[0.65rem] text-text-muted">Delivered</div></div>
                            <div><Eye size={14} className="mx-auto text-accent mb-1" /><div className="font-bold text-sm">{inv.opened}</div><div className="text-[0.65rem] text-text-muted">Opened</div></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
