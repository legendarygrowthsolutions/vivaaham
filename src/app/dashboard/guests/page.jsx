
"use client";

import { useState } from "react";
import { useGuests } from "@/hooks/useGuests";
import { useEvents } from "@/contexts/EventContext";
import GuestModal from "@/components/guests/GuestModal";
import { Users, Search, Plus, Filter, Download, ChevronDown, MoreHorizontal, UserPlus, Send, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

export default function GuestsPage() {
    const { guests, loading, addGuest, updateGuest, deleteGuest } = useGuests();
    const { events } = useEvents();

    const [search, setSearch] = useState("");
    const [filterSide, setFilterSide] = useState("all");
    const [filterRsvp, setFilterRsvp] = useState("all");
    const [selected, setSelected] = useState([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);

    const filtered = guests.filter((g) => {
        if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (filterSide !== "all" && g.side !== filterSide) return false;
        if (filterRsvp !== "all" && g.rsvp !== filterRsvp) return false;
        return true;
    });

    const toggleSelect = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
    const selectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((g) => g.id));

    const rsvpBadge = (status) => {
        const styles = { accepted: "bg-success/[0.08] text-success", pending: "bg-accent/[0.12] text-[#8B7724]", declined: "bg-danger/[0.08] text-danger" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[status]}`}>{status}</span>;
    };

    const stats = {
        total: guests.reduce((s, g) => s + (g.count || 1), 0),
        accepted: guests.filter((g) => g.rsvp === "accepted").reduce((s, g) => s + (g.count || 1), 0),
        pending: guests.filter((g) => g.rsvp === "pending").reduce((s, g) => s + (g.count || 1), 0),
        declined: guests.filter((g) => g.rsvp === "declined").reduce((s, g) => s + (g.count || 1), 0),
    };

    // Handlers
    const handleAdd = () => {
        setEditingGuest(null);
        setIsModalOpen(true);
    };

    const handleEdit = (guest) => {
        setEditingGuest(guest);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingGuest) {
            await updateGuest(editingGuest.id, data, data.selectedEvents);
        } else {
            await addGuest(data, data.selectedEvents);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this guest?")) {
            await deleteGuest(id);
            setSelected(prev => prev.filter(mid => mid !== id));
        }
    };

    const handleBulkDelete = async () => {
        if (confirm(`Delete ${selected.length} guests?`)) {
            // Sequential delete or bulk? useGuests supports single delete.
            // For now, loop. In production, add bulkDelete to hook.
            for (const id of selected) {
                await deleteGuest(id);
            }
            setSelected([]);
        }
    }

    const handleBulkRSVP = async (status) => {
        if (confirm(`Mark ${selected.length} guests as ${status}?`)) {
            // Loop for now. 
            // Ideally we'd add bulkUpdate to useGuests for atomicity
            for (const id of selected) {
                // We only want to update RSVP, but updateGuest usage might require full object or we can send partial
                // Our useGuests.updateGuest implementation takes (id, updates). 
                // Let's check useGuests info from context.
                // Assuming updateGuest(id, { rsvp: status }) works.
                await updateGuest(id, { rsvp: status });
            }
            setSelected([]);
        }
    };

    const exportCSV = () => {
        const headers = ["Name", "Side", "Count", "RSVP", "Phone", "Email", "Events"];
        const rows = filtered.map(g => [
            g.name,
            g.side,
            g.count,
            g.rsvp,
            g.phone || "",
            g.email || "",
            g.events.map(e => e.name).join(", ")
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "wedding_guests.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading guest list...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Users size={22} className="text-primary" /> Guests & RSVP
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage your wedding guest list and track RSVPs</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={exportCSV} className="px-4 py-2.5 rounded-lg border border-border bg-bg text-sm font-medium hover:bg-bg-alt flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                    <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
                        <Plus size={16} /> Add Guest
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Guests", value: stats.total, color: "text-primary" },
                    { label: "Accepted", value: stats.accepted, color: "text-success" },
                    { label: "Pending", value: stats.pending, color: "text-accent" },
                    { label: "Declined", value: stats.declined, color: "text-danger" },
                ].map((s) => (
                    <div key={s.label} className="bg-bg-card rounded-xl border border-border-light p-4 text-center">
                        <div className={`font-heading text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="bg-bg-card rounded-xl border border-border-light p-4">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guests..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                    </div>
                    <select value={filterSide} onChange={(e) => setFilterSide(e.target.value)} className="px-4 py-2.5 rounded-lg border border-border bg-bg text-sm">
                        <option value="all">All Sides</option>
                        <option value="Bride">Bride&apos;s Side</option>
                        <option value="Groom">Groom&apos;s Side</option>
                    </select>
                    <select value={filterRsvp} onChange={(e) => setFilterRsvp(e.target.value)} className="px-4 py-2.5 rounded-lg border border-border bg-bg text-sm">
                        <option value="all">All RSVP</option>
                        <option value="accepted">Accepted</option>
                        <option value="pending">Pending</option>
                        <option value="declined">Declined</option>
                    </select>
                </div>

                {/* Bulk Actions */}
                {selected.length > 0 && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-primary/[0.04] rounded-lg border border-primary/10 animate-[fadeIn_0.3s_ease]">
                        <span className="text-sm font-medium text-primary">{selected.length} selected</span>
                        <div className="flex gap-2 ml-auto">
                            <div className="h-6 w-px bg-primary/20 mx-2 self-center hidden sm:block"></div>

                            <button onClick={() => handleBulkRSVP('accepted')} className="text-xs px-3 py-1.5 rounded bg-success/10 text-success font-medium hover:bg-success/20 flex items-center gap-1 transition-colors">
                                <CheckCircle size={12} /> Accept All
                            </button>
                            <button onClick={() => handleBulkRSVP('declined')} className="text-xs px-3 py-1.5 rounded bg-danger/10 text-danger font-medium hover:bg-danger/20 flex items-center gap-1 transition-colors">
                                <XCircle size={12} /> Decline All
                            </button>

                            <div className="h-6 w-px bg-primary/20 mx-2 self-center hidden sm:block"></div>

                            <button className="text-xs px-3 py-1.5 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 flex items-center gap-1"><Send size={12} /> Send Reminder</button>
                            <button onClick={handleBulkDelete} className="text-xs px-3 py-1.5 rounded bg-danger/10 text-danger font-medium hover:bg-danger/20 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-10">
                                    <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={selectAll} className="accent-primary" />
                                </th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">Guest</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Count</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Side</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Events</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">RSVP</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-20">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((guest) => (
                                <tr key={guest.id} className="border-b border-border-light hover:bg-bg-alt/50 transition-colors group">
                                    <td className="px-3 py-3">
                                        <input type="checkbox" checked={selected.includes(guest.id)} onChange={() => toggleSelect(guest.id)} className="accent-primary" />
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="font-medium">{guest.name}</div>
                                        {guest.phone && <div className="text-xs text-text-muted">{guest.phone}</div>}
                                    </td>
                                    <td className="px-3 py-3 hidden md:table-cell text-text-muted">{guest.count}</td>
                                    <td className="px-3 py-3 hidden sm:table-cell text-text-muted">{guest.side}</td>
                                    <td className="px-3 py-3 hidden lg:table-cell text-text-muted text-xs">
                                        {guest.events && guest.events.length > 0
                                            ? guest.events.map(e => e.name).join(", ")
                                            : <span className="text-text-muted/50">None</span>
                                        }
                                    </td>
                                    <td className="px-3 py-3">{rsvpBadge(guest.rsvp)}</td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(guest)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors" title="Edit">
                                                <Edit size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(guest.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors" title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && !loading && (
                        <div className="text-center py-12 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                                <Users size={20} className="text-text-muted" />
                            </div>
                            <p className="text-text-muted text-sm">No guests found.</p>
                            {guests.length === 0 && (
                                <button onClick={handleAdd} className="mt-4 text-primary text-sm hover:underline">
                                    Add your first guest
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <GuestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingGuest}
                events={events}
            />
        </div>
    );
}
