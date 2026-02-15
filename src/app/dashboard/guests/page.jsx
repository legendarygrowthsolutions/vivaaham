"use client";

import { useState } from "react";
import { MOCK_GUESTS } from "@/lib/mockData";
import { Users, Search, Plus, Filter, Download, ChevronDown, MoreHorizontal, UserPlus, Send, Trash2, Edit } from "lucide-react";

export default function GuestsPage() {
    const [search, setSearch] = useState("");
    const [filterSide, setFilterSide] = useState("all");
    const [filterRsvp, setFilterRsvp] = useState("all");
    const [selected, setSelected] = useState([]);

    const filtered = MOCK_GUESTS.filter((g) => {
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
        total: MOCK_GUESTS.reduce((s, g) => s + g.count, 0),
        accepted: MOCK_GUESTS.filter((g) => g.rsvp === "accepted").reduce((s, g) => s + g.count, 0),
        pending: MOCK_GUESTS.filter((g) => g.rsvp === "pending").reduce((s, g) => s + g.count, 0),
        declined: MOCK_GUESTS.filter((g) => g.rsvp === "declined").reduce((s, g) => s + g.count, 0),
    };

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
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Guest
                </button>
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
                    <div className="flex items-center gap-3 mb-4 p-3 bg-primary/[0.04] rounded-lg border border-primary/10">
                        <span className="text-sm font-medium text-primary">{selected.length} selected</span>
                        <div className="flex gap-2 ml-auto">
                            <button className="text-xs px-3 py-1.5 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 flex items-center gap-1"><Send size={12} /> Send Reminder</button>
                            <button className="text-xs px-3 py-1.5 rounded bg-danger/10 text-danger font-medium hover:bg-danger/20 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
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
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((guest) => (
                                <tr key={guest.id} className="border-b border-border-light hover:bg-bg-alt/50 transition-colors">
                                    <td className="px-3 py-3">
                                        <input type="checkbox" checked={selected.includes(guest.id)} onChange={() => toggleSelect(guest.id)} className="accent-primary" />
                                    </td>
                                    <td className="px-3 py-3 font-medium">{guest.name}</td>
                                    <td className="px-3 py-3 hidden md:table-cell text-text-muted">{guest.count}</td>
                                    <td className="px-3 py-3 hidden sm:table-cell text-text-muted">{guest.side}</td>
                                    <td className="px-3 py-3 hidden lg:table-cell text-text-muted text-xs">{guest.events}</td>
                                    <td className="px-3 py-3">{rsvpBadge(guest.rsvp)}</td>
                                    <td className="px-3 py-3"><button className="p-1 hover:bg-bg-alt rounded"><MoreHorizontal size={16} className="text-text-muted" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && <p className="text-center text-text-muted text-sm py-8">No guests found.</p>}
            </div>
        </div>
    );
}
