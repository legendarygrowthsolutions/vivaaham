
"use client";

import { useState } from "react";
import { useTravel } from "@/hooks/useTravel";
import TravelModal from "@/components/travel/TravelModal";
import { Plane, Plus, Clock, Edit, Trash2, User } from "lucide-react";

export default function TravelPage() {
    const { travelPlans, guests, loading, addTravelPlan, updateTravelPlan, deleteTravelPlan } = useTravel();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    const pickupBadge = (s) => {
        const map = { arranged: "bg-success/[0.08] text-success", pending: "bg-accent/[0.12] text-[#8B7724]", not_needed: "bg-info/[0.08] text-info" };
        const labels = { arranged: "Arranged", pending: "Pending", not_needed: "Not Needed" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[s] || map.pending}`}>{labels[s] || "Unknown"}</span>;
    };

    const handleAdd = () => {
        setEditingPlan(null);
        setIsModalOpen(true);
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingPlan) {
            await updateTravelPlan(editingPlan.id, data);
        } else {
            await addTravelPlan(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this travel plan?")) {
            await deleteTravelPlan(id);
        }
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading travel plans...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Plane size={22} className="text-primary" /> Travel & Logistics
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage outstation guest arrivals, pickups, and shuttles</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Arrival
                </button>
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                {["Guest", "Arriving", "Mode", "Pickup", "Details", "Actions"].map((h) => (
                                    <th key={h} className="text-left px-4 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {travelPlans.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-text-muted">
                                        No travel plans added yet.
                                    </td>
                                </tr>
                            ) : (
                                travelPlans.map((t) => (
                                    <tr key={t.id} className="hover:bg-bg-alt/50 group">
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex flex-col">
                                                <span>{t.guestName}</span>
                                                {t.guestPhone && <span className="text-xs text-text-muted opacity-80">{t.guestPhone}</span>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-text-muted">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} className="text-primary/70" />
                                                {t.arrival_datetime ? new Date(t.arrival_datetime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'TBD'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-text-muted">{t.mode}</td>
                                        <td className="px-4 py-3">{pickupBadge(t.pickup_status)}</td>
                                        <td className="px-4 py-3 text-text-muted max-w-[200px] truncate" title={t.details}>
                                            {t.details || '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(t)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TravelModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingPlan}
                guests={guests}
            />
        </div>
    );
}
