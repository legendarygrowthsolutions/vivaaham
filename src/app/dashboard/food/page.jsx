
"use client";

import { useState } from "react";
import { useFoodMenus } from "@/hooks/useFoodMenus";
import { useEvents } from "@/contexts/EventContext";
import FoodMenuModal from "@/components/food/FoodMenuModal";
import { UtensilsCrossed, Plus, Leaf, WheatOff, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function FoodPage() {
    const { menus, loading, addMenu, updateMenu, deleteMenu } = useFoodMenus();
    const { events } = useEvents();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);

    const statusBadge = (s) => {
        const map = {
            finalized: ["bg-success/[0.08] text-success", "Finalized"],
            tasting_due: ["bg-accent/[0.12] text-[#8B7724]", "Tasting Due"],
            changes_requested: ["bg-danger/[0.08] text-danger", "Changes Requested"],
            draft: ["bg-border text-text-muted", "Draft"]
        };
        const [cls, lbl] = map[s] || ["bg-border text-text-muted", s];
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${cls}`}>{lbl}</span>;
    };

    const handleAdd = () => {
        setEditingMenu(null);
        setIsModalOpen(true);
    };

    const handleEdit = (menu) => {
        setEditingMenu(menu);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingMenu) {
            await updateMenu(editingMenu.id, data);
        } else {
            await addMenu(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this menu?")) {
            await deleteMenu(id);
        }
    };

    const toggleExpand = (id) => {
        setExpandedMenu(expandedMenu === id ? null : id);
    };

    // Aggregate dietary notes
    const dietaryNotes = menus
        .filter(m => m.items?.dietaryNotes)
        .map(m => ({
            event: m.eventName,
            note: m.items.dietaryNotes
        }));

    if (loading) return <div className="p-8 text-center text-text-muted">Loading menus...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <UtensilsCrossed size={22} className="text-primary" /> Food & Catering
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Manage menus, dietary requirements, and tastings</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Menu
                </button>
            </div>

            {/* Menus List */}
            <div className="space-y-4">
                {menus.map((menu) => (
                    <div key={menu.id} className="bg-bg-card rounded-xl border border-border-light overflow-hidden transition-all">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-bg-alt/30"
                            onClick={() => toggleExpand(menu.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <UtensilsCrossed size={18} />
                                </div>
                                <div>
                                    <h3 className="font-heading text-base font-semibold">{menu.menu_type}</h3>
                                    <div className="text-sm text-text-muted flex items-center gap-2">
                                        <span>{menu.eventName}</span>
                                        <span className="w-1 h-1 bg-text-muted rounded-full" />
                                        <span>{menu.headcount || 0} pax</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {statusBadge(menu.status)}
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(menu); }}
                                        className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(menu.id); }}
                                        className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    {expandedMenu === menu.id ? <ChevronUp size={18} className="text-text-muted ml-2" /> : <ChevronDown size={18} className="text-text-muted ml-2" />}
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedMenu === menu.id && (
                            <div className="p-5 border-t border-border-light bg-bg-alt/10 animate-[fadeIn_0.2s_ease]">
                                {menu.items?.dietaryNotes && (
                                    <div className="mb-4 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-sm text-orange-700 dark:text-orange-400">
                                        <strong>Dietary Note:</strong> {menu.items.dietaryNotes}
                                    </div>
                                )}

                                {menu.items?.categories && menu.items.categories.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {menu.items.categories.map((cat, idx) => (
                                            <div key={idx}>
                                                <h4 className="font-semibold text-sm mb-2 text-primary border-b border-primary/20 pb-1 inline-block">{cat.name}</h4>
                                                <ul className="list-disc list-inside text-sm text-text-muted space-y-1">
                                                    {cat.items.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-text-muted italic">No items added to this menu yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {menus.length === 0 && !loading && (
                    <div className="text-center py-12 flex flex-col items-center justify-center bg-bg-card rounded-xl border border-border-light border-dashed">
                        <div className="w-12 h-12 bg-bg-alt rounded-full flex items-center justify-center mb-3">
                            <UtensilsCrossed size={20} className="text-text-muted" />
                        </div>
                        <p className="text-text-muted text-sm">No menus created yet.</p>
                        <button onClick={handleAdd} className="mt-4 text-primary text-sm hover:underline">
                            Create your first menu
                        </button>
                    </div>
                )}
            </div>

            {/* Dietary Notes Summary */}
            {dietaryNotes.length > 0 && (
                <div className="bg-bg-card rounded-xl border border-border-light p-5">
                    <h3 className="font-heading text-base font-semibold mb-3 flex items-center gap-2">
                        <Leaf size={18} className="text-success" /> All Dietary Requirements
                    </h3>
                    <div className="space-y-2">
                        {dietaryNotes.map((note, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-bg-alt rounded-lg text-sm">
                                <span className="font-medium text-text min-w-[120px]">{note.event}:</span>
                                <span className="text-text-muted">{note.note}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <FoodMenuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingMenu}
                events={events}
            />
        </div>
    );
}
