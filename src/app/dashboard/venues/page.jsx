"use client";
import { MOCK_VENUES } from "@/lib/mockData";
import { Building2, Plus, MapPin, BedDouble, Calendar } from "lucide-react";

export default function VenuesPage() {
    const totalRooms = MOCK_VENUES.reduce((s, v) => s + v.rooms, 0);
    const assignedRooms = MOCK_VENUES.reduce((s, v) => s + v.assigned, 0);

    const statusBadge = (s) => {
        const map = { confirmed: ["bg-success/[0.08] text-success", "Confirmed"], deposit_paid: ["bg-accent/[0.12] text-[#8B7724]", "Deposit Paid"] };
        const [cls, lbl] = map[s] || ["bg-border text-text-muted", s];
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{lbl}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Building2 size={22} className="text-primary" /> Venues & Rooms</h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage venues, book rooms, and assign guests</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Venue</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Venues Booked", value: MOCK_VENUES.length, icon: Building2 },
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
                {MOCK_VENUES.map((venue) => (
                    <div key={venue.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <div>
                                <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" /> {venue.name}
                                </h3>
                                <span className="text-sm text-text-muted">{venue.event}</span>
                            </div>
                            {statusBadge(venue.status)}
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {venue.date}</span>
                            {venue.rooms > 0 && <span className="flex items-center gap-1.5"><BedDouble size={14} /> {venue.assigned}/{venue.rooms} rooms assigned</span>}
                            <span className="font-medium text-text">{venue.cost}</span>
                        </div>
                        {venue.rooms > 0 && (
                            <div className="mt-3">
                                <div className="h-2 bg-bg-alt rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${(venue.assigned / venue.rooms) * 100}%` }} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
