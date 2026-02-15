"use client";
import { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import { Clock, CheckCircle, Circle, MapPin, Calendar, Plus, X, Edit2, Trash2 } from "lucide-react";

export default function TimelinePage() {
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        venue: "",
        status: "upcoming",
    });

    const openAddModal = () => {
        setEditingEvent(null);
        setFormData({ name: "", date: "", venue: "", status: "upcoming" });
        setIsModalOpen(true);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setFormData({
            name: event.name,
            date: event.date,
            venue: event.venue,
            status: event.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            deleteEvent(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEvent) {
            updateEvent(editingEvent.id, formData);
        } else {
            addEvent(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Clock size={22} className="text-primary" /> Event Timeline
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Chronological view of all wedding events</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                    <Plus size={18} /> Add Event
                </button>
            </div>

            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border-light" />

                <div className="space-y-6">
                    {events.length === 0 && (
                        <div className="text-center py-10 text-text-muted ml-8">
                            No events planned yet. Click "Add Event" to get started!
                        </div>
                    )}
                    {events.map((event) => (
                        <div key={event.id} className="relative flex gap-5 pl-1 group">
                            {/* Node */}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${event.status === "completed"
                                ? "bg-success text-white"
                                : "bg-bg-card border-2 border-primary text-primary"
                                }`}>
                                {event.status === "completed" ? <CheckCircle size={18} /> : <Circle size={18} />}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 bg-bg-card rounded-xl border p-5 hover:shadow-md transition-shadow relative ${event.status === "completed" ? "border-border-light opacity-80" : "border-primary/20"
                                }`}>
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEditModal(event)}
                                        className="p-1.5 text-text-muted hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="p-1.5 text-text-muted hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pr-12">
                                    <h3 className="font-heading text-base font-semibold">{event.name}</h3>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold w-fit ${event.status === "completed" ? "bg-success/[0.08] text-success" : "bg-primary/[0.08] text-primary"
                                        }`}>
                                        {event.status === "completed" ? "Completed" : "Upcoming"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                    </span>
                                    {event.venue && (
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> {event.venue}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease]">
                    <div className="bg-bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-[fadeInUp_0.3s_ease]">
                        <div className="flex items-center justify-between p-5 border-b border-border-light">
                            <h3 className="font-heading text-lg font-bold">
                                {editingEvent ? "Edit Event" : "Add New Event"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-text-muted hover:text-text p-1 rounded-lg hover:bg-bg-alt"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Event Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-bg-alt border border-border-light focus:border-primary focus:outline-none transition-colors"
                                    placeholder="e.g. Sangeet Ceremony"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-bg-alt border border-border-light focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Venue</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-bg-alt border border-border-light focus:border-primary focus:outline-none transition-colors"
                                    placeholder="e.g. Grand Hotel Ballroom"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-bg-alt border border-border-light focus:border-primary focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-border text-text-muted font-medium hover:bg-bg-alt transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                                >
                                    {editingEvent ? "Update Event" : "Add Event"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
