"use client";
import { MOCK_TRAVEL } from "@/lib/mockData";
import { Plane, Plus, MapPin, Clock } from "lucide-react";

export default function TravelPage() {
    const pickupBadge = (s) => {
        const map = { arranged: "bg-success/[0.08] text-success", pending: "bg-accent/[0.12] text-[#8B7724]", not_needed: "bg-info/[0.08] text-info" };
        const labels = { arranged: "Arranged", pending: "Pending", not_needed: "Not Needed" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[s]}`}>{labels[s]}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Plane size={22} className="text-primary" /> Travel & Logistics</h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage outstation guest arrivals, pickups, and shuttles</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Arrival</button>
            </div>
            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr>
                            {["Guest", "Arriving", "Mode", "Pickup"].map((h) => <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {MOCK_TRAVEL.map((t) => (
                                <tr key={t.id} className="border-b border-border-light hover:bg-bg-alt/50">
                                    <td className="px-4 py-3 font-medium">{t.guest}</td>
                                    <td className="px-4 py-3 text-text-muted flex items-center gap-1"><Clock size={14} /> {t.arriving}</td>
                                    <td className="px-4 py-3 text-text-muted">{t.mode}</td>
                                    <td className="px-4 py-3">{pickupBadge(t.pickup)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
