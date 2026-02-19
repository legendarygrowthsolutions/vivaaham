
"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const MENU_TYPES = ["Breakfast", "Brunch", "Lunch", "High Tea", "Dinner", "Sangeet Snacks", "Reception Dinner", "Other"];

export default function FoodMenuModal({ isOpen, onClose, onSave, initialData, events = [] }) {
    const [formData, setFormData] = useState({
        menuType: "Lunch",
        eventId: "",
        headcount: 0,
        status: "draft",
        items: { categories: [], dietaryNotes: "" }
    });
    const [saving, setSaving] = useState(false);

    // Temp state for adding new categories/items
    const [newCategory, setNewCategory] = useState("");
    const [newItem, setNewItem] = useState({ categoryIndex: null, name: "" });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    menuType: initialData.menu_type || "Lunch",
                    eventId: initialData.event_id || "",
                    headcount: initialData.headcount || 0,
                    status: initialData.status || "draft",
                    items: initialData.items || { categories: [], dietaryNotes: "" }
                });
            } else {
                setFormData({
                    menuType: "Lunch",
                    eventId: "",
                    headcount: 0,
                    status: "draft",
                    items: { categories: [], dietaryNotes: "" }
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    const addCategory = () => {
        if (!newCategory.trim()) return;
        setFormData(prev => ({
            ...prev,
            items: {
                ...prev.items,
                categories: [...(prev.items.categories || []), { name: newCategory, items: [] }]
            }
        }));
        setNewCategory("");
    };

    const removeCategory = (index) => {
        setFormData(prev => ({
            ...prev,
            items: {
                ...prev.items,
                categories: prev.items.categories.filter((_, i) => i !== index)
            }
        }));
    };

    const addItem = (categoryIndex) => {
        if (!newItem.name.trim()) return;
        const updatedCategories = [...(formData.items.categories || [])];
        updatedCategories[categoryIndex].items.push(newItem.name);

        setFormData(prev => ({
            ...prev,
            items: { ...prev.items, categories: updatedCategories }
        }));
        setNewItem({ categoryIndex: null, name: "" });
    };

    const removeItem = (categoryIndex, itemIndex) => {
        const updatedCategories = [...(formData.items.categories || [])];
        updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter((_, i) => i !== itemIndex);

        setFormData(prev => ({
            ...prev,
            items: { ...prev.items, categories: updatedCategories }
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
            <div className="bg-bg-card w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease] max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-border-light">
                    <h3 className="font-heading text-lg font-semibold">
                        {initialData ? "Edit Menu" : "Create New Menu"}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-bg-alt rounded-full text-text-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Menu Type</label>
                            <select
                                value={formData.menuType}
                                onChange={e => setFormData({ ...formData, menuType: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                {MENU_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Event</label>
                            <select
                                value={formData.eventId}
                                onChange={e => setFormData({ ...formData, eventId: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="">Select Event (Optional)</option>
                                {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Headcount</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.headcount}
                                onChange={e => setFormData({ ...formData, headcount: parseInt(e.target.value) || 0 })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 capitalize"
                            >
                                <option value="draft">Draft</option>
                                <option value="tasting_due">Tasting Due</option>
                                <option value="changes_requested">Changes Requested</option>
                                <option value="finalized">Finalized</option>
                            </select>
                        </div>
                    </div>

                    {/* Dietary Notes */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1">Dietary Requirements / Notes</label>
                        <textarea
                            rows="2"
                            value={formData.items.dietaryNotes || ""}
                            onChange={e => setFormData({ ...formData, items: { ...formData.items, dietaryNotes: e.target.value } })}
                            placeholder="e.g. 20 Jain plates, 5 Gluten Free, No peanuts..."
                            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Menu Items Builder */}
                    <div className="border border-border-light rounded-xl p-4 bg-bg-alt/20">
                        <label className="block text-sm font-medium text-text-muted mb-3">Menu Items</label>

                        <div className="space-y-4">
                            {formData.items.categories?.map((cat, catIndex) => (
                                <div key={catIndex} className="bg-bg-card border border-border rounded-lg p-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold text-sm">{cat.name}</h4>
                                        <button type="button" onClick={() => removeCategory(catIndex)} className="text-danger hover:bg-danger/10 p-1 rounded">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {cat.items.map((item, itemIndex) => (
                                            <span key={itemIndex} className="bg-bg-alt border border-border px-2 py-1 rounded text-xs flex items-center gap-1">
                                                {item}
                                                <button type="button" onClick={() => removeItem(catIndex, itemIndex)} className="hover:text-danger"><X size={12} /></button>
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={`Add item to ${cat.name}`}
                                            className="flex-1 px-2 py-1 text-xs rounded border border-border bg-bg"
                                            value={newItem.categoryIndex === catIndex ? newItem.name : ""}
                                            onChange={e => setNewItem({ categoryIndex: catIndex, name: e.target.value })}
                                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem(catIndex); } }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => addItem(catIndex)}
                                            className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1 rounded text-xs font-medium"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <input
                                type="text"
                                placeholder="New Category (e.g. Starters)"
                                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-bg"
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCategory(); } }}
                            />
                            <button
                                type="button"
                                onClick={addCategory}
                                className="btn-secondary px-4 py-2 text-sm rounded-lg flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Category
                            </button>
                        </div>
                    </div>

                </form>

                <div className="p-4 border-t border-border-light flex justify-end gap-3 sticky bottom-0 bg-bg-card">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-bg-alt rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        onClick={handleSubmit} // Trigger form submit from specific button
                        className="btn-primary px-5 py-2 text-sm rounded-lg flex items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Menu"}
                    </button>
                </div>
            </div>
        </div>
    );
}
