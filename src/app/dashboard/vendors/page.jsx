
"use client";

import { useState } from "react";
import { useVendors } from "@/hooks/useVendors";
import VendorModal from "@/components/vendors/VendorModal";
import { Handshake, Plus, Star, Phone, IndianRupee, Search, Edit, Trash2, Mail } from "lucide-react";

export default function VendorsPage() {
    const { vendors, loading, addVendor, updateVendor, deleteVendor } = useVendors();
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);

    const filtered = vendors.filter(v => {
        if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (filterCategory !== "all" && v.category !== filterCategory) return false;
        return true;
    });

    const categories = ["all", ...new Set(vendors.map(v => v.category))];

    const payBadge = (s) => {
        const map = { paid: "bg-success/[0.08] text-success", partial: "bg-accent/[0.12] text-[#8B7724]", unpaid: "bg-danger/[0.08] text-danger" };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[s]}`}>{s === "partial" ? "Partial" : s}</span>;
    };

    const handleAdd = () => {
        setEditingVendor(null);
        setIsModalOpen(true);
    };

    const handleEdit = (vendor) => {
        setEditingVendor(vendor);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingVendor) {
            await updateVendor(editingVendor.id, data);
        } else {
            await addVendor(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this vendor?")) {
            await deleteVendor(id);
        }
    };

    const formatCurrency = (val) => {
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading vendors...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Handshake size={22} className="text-primary" /> Vendor Management
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Track vendors, contracts, and payment statuses</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Vendor
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-bg-card rounded-xl border border-border-light p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search vendors..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-border bg-bg text-sm capitalize"
                >
                    <option value="all">All Categories</option>
                    {categories.filter(c => c !== "all").map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((v) => (
                    <div key={v.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow group relative">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(v)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors" title="Edit">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(v.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors" title="Delete">
                                <Trash2 size={14} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-3 pr-16 sm:pr-0">
                            <span className="text-xs text-text-muted bg-bg-alt px-2 py-1 rounded font-medium">{v.category}</span>
                            {payBadge(v.payment_status)}
                        </div>
                        <h3 className="font-heading text-base font-semibold mb-1 truncate pr-14">{v.name}</h3>
                        <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={14}
                                    className={star <= (v.rating || 0) ? "text-accent fill-accent" : "text-border"}
                                />
                            ))}
                            {v.rating > 0 && <span className="text-xs text-text-muted ml-1">({v.rating})</span>}
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-text-muted">
                            {v.phone && <span className="flex items-center gap-2"><Phone size={14} /> {v.phone}</span>}
                            {v.email && <span className="flex items-center gap-2"><Mail size={14} /> {v.email}</span>}
                            <div className="border-t border-border-light mt-2 pt-2 flex justify-between items-center">
                                <span className="text-xs">Total Cost</span>
                                <span className="font-medium text-text flex items-center gap-0.5 text-base">
                                    {formatCurrency(v.amount || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && !loading && (
                <div className="text-center py-12 flex flex-col items-center justify-center bg-bg-card rounded-xl border border-border-light border-dashed">
                    <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                        <Handshake size={20} className="text-text-muted" />
                    </div>
                    <p className="text-text-muted text-sm">No vendors found.</p>
                    <button onClick={handleAdd} className="mt-4 text-primary text-sm hover:underline">
                        Add your first vendor
                    </button>
                </div>
            )}

            <VendorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingVendor}
            />
        </div>
    );
}
