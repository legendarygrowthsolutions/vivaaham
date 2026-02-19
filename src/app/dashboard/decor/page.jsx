
"use client";

import { useState } from "react";
import { useDecor } from "@/hooks/useDecor";
import DecorModal from "@/components/decor/DecorModal";
import { Palette, Plus, Sparkles, Edit, Trash2 } from "lucide-react";

export default function DecorPage() {
    const { decorPlans, events, loading, addDecor, updateDecor, deleteDecor } = useDecor();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

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
            await updateDecor(editingPlan.id, data);
        } else {
            await addDecor(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this décor plan?")) {
            await deleteDecor(id);
        }
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading décor plans...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Palette size={22} className="text-primary" /> Décor & Themes
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Design mood boards, colour palettes, and mandap themes per event</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Theme
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {decorPlans.map((d) => (
                    <div key={d.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow group relative">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs bg-primary/[0.08] text-primary px-2.5 py-1 rounded-full font-semibold max-w-[70%] truncate">
                                {d.eventName || 'General'}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleEdit(d); }}
                                    className="p-1.5 text-text-muted hover:text-primary hover:bg-primary/10 rounded transition-colors"
                                >
                                    <Edit size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(d.id); }}
                                    className="p-1.5 text-text-muted hover:text-danger hover:bg-danger/10 rounded transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-heading text-lg font-semibold mb-3">{d.theme}</h3>

                        <div className="space-y-2 text-sm text-text-muted">
                            {d.colors && (
                                <div className="flex items-start gap-2">
                                    <div className="min-w-[20px] pt-0.5"><Palette size={14} className="text-accent" /></div>
                                    <span><span className="font-medium text-text">Colours:</span> {d.colors}</span>
                                </div>
                            )}
                            {d.highlight && (
                                <div className="flex items-start gap-2">
                                    <div className="min-w-[20px] pt-0.5"><Sparkles size={14} className="text-accent" /></div>
                                    <span><span className="font-medium text-text">Highlight:</span> {d.highlight}</span>
                                </div>
                            )}
                            {d.notes && (
                                <div className="pt-2 mt-2 border-t border-border-light text-xs italic opacity-80 line-clamp-3">
                                    "{d.notes}"
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {decorPlans.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12 text-text-muted text-sm bg-bg-card rounded-xl border border-border-light border-dashed flex flex-col items-center">
                        <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                            <Palette size={20} className="text-text-muted" />
                        </div>
                        <p>No décor plans added yet.</p>
                        <button onClick={handleAdd} className="mt-2 text-primary hover:underline">Create your first theme</button>
                    </div>
                )}
            </div>

            <DecorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingPlan}
                events={events}
            />
        </div>
    );
}
