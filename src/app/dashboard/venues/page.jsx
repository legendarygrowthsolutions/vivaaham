
"use client";
import { useState } from "react";
import { useVenues } from "@/hooks/useVenues";
import { useEvents } from "@/contexts/EventContext";
import VenueModal from "@/components/venues/VenueModal";
import { Building2, Plus, MapPin, BedDouble, Calendar, Edit, Trash2 } from "lucide-react";

export default function VenuesPage() {
    const { venues, loading, addVenue, updateVenue, deleteVenue } = useVenues();
    const { events } = useEvents();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);

    const totalRooms = venues.reduce((s, v) => s + (v.total_rooms || 0), 0);
    const assignedRooms = venues.reduce((s, v) => s + (v.assigned_rooms || 0), 0);

    const statusBadge = (s) => {
        const map = {
            confirmed: ["bg-success/[0.08] text-success", "Confirmed"],
            deposit_paid: ["bg-accent/[0.12] text-[#8B7724]", "Deposit Paid"],
            negotiating: ["bg-primary/[0.08] text-primary", "Negotiating"],
            visit_scheduled: ["bg-blue-500/[0.08] text-blue-500", "Visit Scheduled"],
            inquiry_sent: ["bg-orange-500/[0.08] text-orange-500", "Inquiry Sent"],
            draft: ["bg-text-muted/[0.1] text-text-muted", "Draft"]
        };
        const [cls, lbl] = map[s] || ["bg-border text-text-muted", s];
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${cls}`}>{lbl}</span>;
    };

    // Handlers
    const handleAdd = () => {
        setEditingVenue(null);
        setIsModalOpen(true);
    };

    const handleEdit = (venue) => {
        setEditingVenue(venue);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingVenue) {
            await updateVenue(editingVenue.id, data);
        } else {
            await addVenue(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this venue?")) {
            await deleteVenue(id);
        }
    };

    const formatCurrency = (val) => {
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading venues...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Building2 size={22} className="text-primary" /> Venues & Rooms
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage venues, book rooms, and assign guests</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Venue
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Venues Booked", value: venues.length, icon: Building2 },
                    { label: "Total Rooms", value: totalRooms, icon: BedDouble },
                    { label: "Rooms Assigned", value: `${assignedRooms}/${totalRooms}`, icon: BedDouble },
                ].map((s) => (
                    <div key={s.label} className="bg-bg-card rounded-xl border border-border-light p-4 text-center">
                        <s.icon size={20} className="text-primary mx-auto mb-2" />
                        <div className="font-heading text-xl font-bold">{s.value}</div>
                        <div className="text-xs text-text-muted">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                {venues.map((venue) => (
                    <div key={venue.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow group relative">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(venue)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors" title="Edit">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(venue.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors" title="Delete">
                                <Trash2 size={14} />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pr-16 sm:pr-0">
                            <div>
                                <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" /> {venue.name}
                                </h3>
                                <span className="text-sm text-text-muted block mt-1">
                                    {venue.eventName !== 'Unassigned' ? `Event: ${venue.eventName}` : 'No Event Assigned'}
                                </span>
                            </div>
                            {statusBadge(venue.status)}
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted mt-4">
                            {venue.address && <span className="flex items-center gap-1.5 w-full sm:w-auto"><MapPin size={14} className="opacity-50" /> {venue.address}</span>}
                            {venue.total_rooms > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <BedDouble size={14} /> {venue.assigned_rooms}/{venue.total_rooms} rooms assigned
                                </span>
                            )}
                            <span className="font-medium text-text">{formatCurrency(venue.cost || 0)}</span>
                            {venue.contact_name && <span className="text-xs border-l border-border pl-3 ml-2">Contact: {venue.contact_name}</span>}
                        </div>

                        {venue.total_rooms > 0 && (
                            <div className="mt-3">
                                <div className="h-2 bg-bg-alt rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                                        style={{ width: `${Math.min(100, (venue.assigned_rooms / venue.total_rooms) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {venues.length === 0 && !loading && (
                    <div className="text-center py-12 flex flex-col items-center justify-center bg-bg-card rounded-xl border border-border-light border-dashed">
                        <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                            <Building2 size={20} className="text-text-muted" />
                        </div>
                        <p className="text-text-muted text-sm">No venues added yet.</p>
                        <button onClick={handleAdd} className="mt-4 text-primary text-sm hover:underline">
                            Add your first venue
                        </button>
                    </div>
                )}
            </div>

            <VenueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingVenue}
                events={events}
            />
        </div>
    );
}
