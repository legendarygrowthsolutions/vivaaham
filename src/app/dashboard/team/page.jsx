"use client";
import { useState } from "react";
import { MOCK_TEAM, ALL_MODULES, ROLES } from "@/lib/mockData";
import { UsersRound, Plus, Shield, Edit, Trash2, MoreHorizontal, Search, Send } from "lucide-react";

export default function TeamPage() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);

    const filtered = MOCK_TEAM.filter((m) =>
        search ? m.name.toLowerCase().includes(search.toLowerCase()) : true
    );

    const toggleSelect = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
    const selectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((m) => m.id));

    const roleBadge = (r) => {
        const map = { admin: "bg-primary/[0.08] text-primary", editor: "bg-accent/[0.12] text-[#8B7724]", viewer: "bg-info/[0.08] text-info" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[r]}`}>{r}</span>;
    };

    const statusBadge = (s) => {
        const map = { active: "bg-success/[0.08] text-success", invited: "bg-accent/[0.12] text-[#8B7724]" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[s]}`}>{s}</span>;
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><UsersRound size={22} className="text-primary" /> Team Management</h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage users, roles, and module access for your wedding team</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Invite Member</button>
            </div>

            {/* Roles Legend */}
            <div className="flex flex-wrap gap-4">
                {ROLES.map((r) => (
                    <div key={r.id} className="flex items-center gap-2 text-sm">
                        <Shield size={14} className="text-primary" />
                        <strong className="capitalize">{r.name}</strong> — <span className="text-text-muted">{r.description}</span>
                    </div>
                ))}
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light p-4">
                <div className="relative mb-4 max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>

                {/* Bulk Actions */}
                {selected.length > 0 && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-primary/[0.04] rounded-lg border border-primary/10">
                        <span className="text-sm font-medium text-primary">{selected.length} selected</span>
                        <div className="flex gap-2 ml-auto">
                            <button className="text-xs px-3 py-1.5 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 flex items-center gap-1"><Send size={12} /> Re-Invite</button>
                            <button className="text-xs px-3 py-1.5 rounded bg-accent/10 text-accent font-medium hover:bg-accent/20 flex items-center gap-1"><Edit size={12} /> Change Role</button>
                            <button className="text-xs px-3 py-1.5 rounded bg-danger/10 text-danger font-medium hover:bg-danger/20 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-10">
                                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={selectAll} className="accent-primary" />
                            </th>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">Member</th>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">Role</th>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Modules</th>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Last Active</th>
                            <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-10"></th>
                        </tr></thead>
                        <tbody>
                            {filtered.map((m) => (
                                <tr key={m.id} className="border-b border-border-light hover:bg-bg-alt/50">
                                    <td className="px-3 py-3"><input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggleSelect(m.id)} className="accent-primary" /></td>
                                    <td className="px-3 py-3 font-medium">{m.name}</td>
                                    <td className="px-3 py-3">{roleBadge(m.role)}</td>
                                    <td className="px-3 py-3 hidden md:table-cell text-text-muted text-xs">
                                        {m.modules[0] === "all" ? "All modules" : m.modules.join(", ")}
                                    </td>
                                    <td className="px-3 py-3 hidden sm:table-cell">{statusBadge(m.status)}</td>
                                    <td className="px-3 py-3 hidden lg:table-cell text-text-muted text-xs">{m.lastActive}</td>
                                    <td className="px-3 py-3"><button className="p-1 hover:bg-bg-alt rounded"><MoreHorizontal size={16} className="text-text-muted" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
