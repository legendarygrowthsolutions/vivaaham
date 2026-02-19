
"use client";

import { useState, useEffect } from "react";
import { useEvents } from "@/contexts/EventContext";
import { useItinerary } from "@/hooks/useItinerary";
import ItineraryModal from "@/components/itinerary/ItineraryModal";
import { ScrollText, Calendar, Clock, User, Plus, Edit, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ItineraryPage() {
    const { events, loading: eventsLoading } = useEvents();
    const [activeEventId, setActiveEventId] = useState(null);

    // Auto-select first event when events are loaded
    useEffect(() => {
        if (!activeEventId && events.length > 0) {
            setActiveEventId(events[0].id);
        }
    }, [events, activeEventId]);

    const activeEvent = events.find(e => e.id === activeEventId);

    const { slots, loading: slotsLoading, addSlot, updateSlot, deleteSlot } = useItinerary(activeEventId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);

    const handleAdd = () => {
        setEditingSlot(null);
        setIsModalOpen(true);
    };

    const handleEdit = (slot) => {
        setEditingSlot(slot);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingSlot) {
            await updateSlot(editingSlot.id, data);
        } else {
            await addSlot(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this itinerary slot?")) {
            await deleteSlot(id);
        }
    };

    if (eventsLoading) return <div className="p-8 text-center text-text-muted">Loading events...</div>;

    if (events.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-[fadeIn_0.5s_ease]">
                <div className="w-16 h-16 bg-bg-alt rounded-full flex items-center justify-center mb-2">
                    <Calendar size={32} className="text-text-muted" />
                </div>
                <h2 className="text-xl font-heading font-semibold">No Events Found</h2>
                <p className="text-text-muted max-w-md">
                    You need to add wedding events (like Sangeet, Wedding, Reception) to your timeline before creating an itinerary.
                </p>
                <Link href="/dashboard/timeline" className="btn-primary px-6 py-2.5 rounded-lg inline-flex items-center gap-2 mt-4">
                    Go to Timeline <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <ScrollText size={22} className="text-primary" /> Ceremony Script / Itinerary
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Detailed event-by-event schedule with roles and responsibilities</p>
                </div>
                {activeEventId && (
                    <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                        <Plus size={16} /> Add Slot
                    </button>
                )}
            </div>

            {/* Event Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {events.map((ev) => (
                    <button
                        key={ev.id}
                        onClick={() => setActiveEventId(ev.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeEventId === ev.id
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-bg-card border border-border-light text-text-muted hover:border-primary hover:text-text"
                            }`}
                    >
                        {ev.name}
                    </button>
                ))}
            </div>

            {/* Selected Event Content */}
            {activeEvent && (
                <div className="bg-bg-card rounded-xl border border-border-light p-5 min-h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/[0.08] rounded-lg flex items-center justify-center">
                                <Calendar size={20} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-heading text-lg font-semibold">{activeEvent.name}</h3>
                                <span className="text-sm text-text-muted">
                                    {new Date(activeEvent.date).toLocaleDateString("en-IN", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative pl-2">
                        {/* Vertical Line */}
                        <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-border-light" />

                        {slotsLoading ? (
                            <div className="py-12 text-center text-text-muted">Loading itinerary...</div>
                        ) : slots.length === 0 ? (
                            <div className="py-12 text-center text-text-muted border-2 border-dashed border-border-light rounded-xl ml-8">
                                <p className="mb-2">No itinerary slots yet.</p>
                                <button onClick={handleAdd} className="text-primary hover:underline font-medium text-sm">
                                    + Add the first activity
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {slots.map((slot) => (
                                    <div key={slot.id} className="flex gap-4 relative group">
                                        {/* Time Bubble */}
                                        <div className="w-10 h-10 bg-bg rounded-full border-2 border-primary flex items-center justify-center z-10 shrink-0 shadow-sm mt-1">
                                            <Clock size={16} className="text-primary" />
                                        </div>

                                        {/* Content Card */}
                                        <div className="flex-1 bg-bg-alt/50 border border-border-light rounded-xl p-4 hover:bg-bg-alt transition-colors relative">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                                <span className="font-semibold text-text">{slot.activity}</span>
                                                <span className="text-sm font-bold text-primary px-2 py-0.5 bg-primary/10 rounded">
                                                    {slot.time ? new Date(`2000-01-01T${slot.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'All Day'}
                                                </span>
                                            </div>

                                            {slot.responsible && (
                                                <div className="flex items-center gap-1.5 mt-2 text-xs text-text-muted">
                                                    <User size={12} />
                                                    <span className="font-medium">Responsible:</span> {slot.responsible}
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(slot)}
                                                    className="p-1.5 hover:bg-white rounded text-text-muted hover:text-primary transition-colors shadow-sm"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(slot.id)}
                                                    className="p-1.5 hover:bg-white rounded text-text-muted hover:text-danger transition-colors shadow-sm"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <ItineraryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingSlot}
            />
        </div>
    );
}
