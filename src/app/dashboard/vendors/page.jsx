"use client";
import { MOCK_VENDORS } from "@/lib/mockData";
import { Handshake, Plus, Star, Phone, IndianRupee } from "lucide-react";

export default function VendorsPage() {
    const payBadge = (s) => {
        const map = { paid: "bg-success/[0.08] text-success", partial: "bg-accent/[0.12] text-[#8B7724]", unpaid: "bg-danger/[0.08] text-danger" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[s]}`}>{s === "partial" ? "Partial" : s}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Handshake size={22} className="text-primary" /> Vendor Management</h2>
                    <p className="text-sm text-text-muted mt-0.5">Track vendors, contracts, and payment statuses</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Vendor</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_VENDORS.map((v) => (
                    <div key={v.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-text-muted bg-bg-alt px-2 py-1 rounded font-medium">{v.category}</span>
                            {payBadge(v.payment)}
                        </div>
                        <h3 className="font-heading text-base font-semibold mb-1">{v.name}</h3>
                        <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < v.rating ? "text-accent fill-accent" : "text-border"} />)}</div>
                        <div className="flex justify-between items-center text-sm text-text-muted">
                            <span className="flex items-center gap-1"><Phone size={14} /> {v.phone}</span>
                            <span className="font-medium text-text flex items-center gap-0.5"><IndianRupee size={14} />{v.amount.replace("₹", "")}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
