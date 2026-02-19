
"use client";

import { useState } from "react";
import { useTeam } from "@/hooks/useTeam";
import TeamMemberModal from "@/components/team/TeamMemberModal";
import { UsersRound, Plus, Shield, Edit, Trash2, MoreHorizontal, Search, Send, Mail, UserCheck } from "lucide-react";
import { ROLES } from "@/lib/mockData";

export default function TeamPage() {
    const { members, loading, inviteMember, updateMember, removeMember, resendInvite } = useTeam();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const filtered = members.filter((m) =>
        search ? (m.name.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase())) : true
    );

    const toggleSelect = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
    const selectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((m) => m.id));

    const handleInvite = () => {
        setEditingMember(null);
        setIsModalOpen(true);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingMember) {
            await updateMember(editingMember.id, data);
        } else {
            await inviteMember(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to remove this team member? They will lose access immediately.")) {
            await removeMember(id);
            setSelected(s => s.filter(sid => sid !== id));
        }
    };

    const handleResend = async (id) => {
        await resendInvite(id);
    };

    const roleBadge = (r) => {
        const map = { admin: "bg-primary/[0.08] text-primary", editor: "bg-accent/[0.12] text-[#8B7724]", viewer: "bg-info/[0.08] text-info" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[r]}`}>{r}</span>;
    };

    const statusBadge = (s) => {
        const map = { active: "bg-success/[0.08] text-success", invited: "bg-bg-alt text-text-muted border border-border-light", inactive: "bg-danger/[0.08] text-danger" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[s] || map.invited}`}>{s}</span>;
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading team...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <UsersRound size={22} className="text-primary" /> Team Management
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage users, roles, and permissions for your wedding team</p>
                </div>
                <button onClick={handleInvite} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Invite Member
                </button>
            </div>

            {/* Roles Legend */}
            <div className="flex flex-wrap gap-4 bg-bg-card/50 p-3 rounded-lg border border-border-light/50">
                {ROLES.map((r) => (
                    <div key={r.id} className="flex items-center gap-2 text-sm">
                        <Shield size={14} className="text-primary" />
                        <strong className="capitalize">{r.name}</strong> — <span className="text-text-muted text-xs">{r.description}</span>
                    </div>
                ))}
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light p-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search members by name or email..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                    </div>
                </div>

                {/* Bulk Actions */}
                {selected.length > 0 && (
                    <div className="flex items-center gap-3 mb-4 p-3 bg-primary/[0.04] rounded-lg border border-primary/10 animate-[fadeIn_0.2s_ease]">
                        <span className="text-sm font-medium text-primary">{selected.length} selected</span>
                        <div className="flex gap-2 ml-auto">
                            <button className="text-xs px-3 py-1.5 rounded bg-danger/10 text-danger font-medium hover:bg-danger/20 flex items-center gap-1" onClick={() => {
                                if (confirm(`Remove ${selected.length} members?`)) {
                                    selected.forEach(id => removeMember(id));
                                    setSelected([]);
                                }
                            }}>
                                <Trash2 size={12} /> Remove
                            </button>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-10">
                                    <input
                                        type="checkbox"
                                        checked={selected.length === filtered.length && filtered.length > 0}
                                        onChange={selectAll}
                                        className="accent-primary w-4 h-4"
                                    />
                                </th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">Member</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider">Role</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Modules</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                                <th className="text-left px-3 py-3 bg-bg-alt text-text-muted font-semibold text-xs uppercase tracking-wider w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-text-muted">
                                        No team members found. Invite someone to collaborate!
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((m) => (
                                    <tr key={m.id} className="hover:bg-bg-alt/50 group transition-colors">
                                        <td className="px-3 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(m.id)}
                                                onChange={() => toggleSelect(m.id)}
                                                className="accent-primary w-4 h-4"
                                            />
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full rounded-full object-cover" /> : m.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-text">{m.name}</span>
                                                    <span className="text-xs text-text-muted">{m.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">{roleBadge(m.role)}</td>
                                        <td className="px-3 py-3 hidden md:table-cell text-text-muted text-xs">
                                            {!m.modules || m.modules.includes('all') ? (
                                                <span className="flex items-center gap-1 text-success"><Shield size={12} /> All Access</span>
                                            ) : (
                                                m.modules.length + " modules"
                                            )}
                                        </td>
                                        <td className="px-3 py-3 hidden sm:table-cell">{statusBadge(m.status)}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {m.status === 'invited' && (
                                                    <button
                                                        onClick={() => handleResend(m.id)}
                                                        title="Resend Invite"
                                                        className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors"
                                                    >
                                                        <Send size={14} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleEdit(m)}
                                                    title="Edit Role"
                                                    className="p-1.5 hover:bg-bg-alt text-text-muted hover:text-text rounded transition-colors"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(m.id)}
                                                    title="Remove Member"
                                                    className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors"
                                                >
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

            <TeamMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingMember}
            />
        </div>
    );
}
