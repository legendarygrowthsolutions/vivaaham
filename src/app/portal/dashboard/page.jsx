
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Calendar, MapPin, CheckCircle, XCircle, Clock, Utensils, Users, LogOut, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function GuestDashboard() {
    const router = useRouter();
    const [guest, setGuest] = useState(null);
    const [wedding, setWedding] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rsvpModalOpen, setRsvpModalOpen] = useState(false);

    // RSVP Form State
    const [rsvpStatus, setRsvpStatus] = useState("accepted");
    const [guestCount, setGuestCount] = useState(1);
    const [dietaryNotes, setDietaryNotes] = useState("");
    const [saving, setSaving] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        // Mock Auth Check
        const stored = localStorage.getItem('guest_token');
        if (!stored) {
            router.push('/portal/login');
            return;
        }

        const guestData = JSON.parse(stored);
        fetchData(guestData.id, guestData.weddingId);
    }, [router]);

    const fetchData = async (guestId, weddingId) => {
        try {
            // 1. Fetch Guest Details (Fresh)
            const { data: guestData, error: guestError } = await supabase
                .from('guests')
                .select('*')
                .eq('id', guestId)
                .single();

            if (guestError) throw guestError;
            setGuest(guestData);
            setRsvpStatus(guestData.rsvp === 'pending' ? 'accepted' : guestData.rsvp);
            setGuestCount(guestData.count || 1);
            setDietaryNotes(guestData.dietary_notes || "");

            // 2. Fetch Wedding Details
            const { data: weddingData, error: weddingError } = await supabase
                .from('weddings')
                .select('*')
                .eq('id', weddingId)
                .single();

            if (weddingError) throw weddingError;
            setWedding(weddingData);

            // 3. Fetch Linked Events
            // We need to join event_guests -> events
            const { data: eventData, error: eventError } = await supabase
                .from('event_guests')
                .select(`
                    events (
                        *
                    )
                `)
                .eq('guest_id', guestId);

            if (eventError) throw eventError;

            // Flatten and Sort
            const myEvents = eventData
                .map(item => item.events)
                .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

            setEvents(myEvents);

        } catch (err) {
            console.error("Error loading portal:", err);
            // alert("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('guest_token');
        router.push('/portal/login');
    };

    const handleRsvpUpdate = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('guests')
                .update({
                    rsvp: rsvpStatus,
                    count: guestCount,
                    dietary_notes: dietaryNotes
                })
                .eq('id', guest.id);

            if (error) throw error;

            // Refresh local state
            setGuest(prev => ({ ...prev, rsvp: rsvpStatus, count: guestCount, dietary_notes: dietaryNotes }));
            setRsvpModalOpen(false);
            alert("RSVP Updated Successfully!");
        } catch (err) {
            console.error("RSVP Error:", err);
            alert("Failed to update RSVP");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-bg"><Loader2 className="animate-spin text-primary" size={40} /></div>;

    if (!guest || !wedding) return null;

    return (
        <div className="min-h-screen bg-bg pb-20">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 bg-primary/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-bg"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-block px-3 py-1 bg-white/50 backdrop-blur-md rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                            Wedding Invitation
                        </div>
                        <h1 className="font-heading text-3xl md:text-5xl font-bold text-text mb-2">
                            {wedding.name || "The Wedding"}
                        </h1>
                        <p className="text-text-muted text-lg flex items-center gap-2">
                            <Calendar size={18} />
                            {wedding.date ? format(new Date(wedding.date), 'MMMM d, yyyy') : "Date TBA"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-text hover:bg-white/40 transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10 space-y-6">

                {/* RSVP Card */}
                <div className="bg-bg-card border border-border-light rounded-2xl shadow-lg p-6 md:p-8 animate-[fadeInUp_0.5s_ease]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-1">Hello, {guest.name}</h2>
                            <p className="text-text-muted text-sm">We would be delighted to have you celebrate with us.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize border ${guest.rsvp === 'accepted' ? 'bg-success/10 text-success border-success/20' :
                                    guest.rsvp === 'declined' ? 'bg-danger/10 text-danger border-danger/20' :
                                        'bg-accent/10 text-accent border-accent/20'
                                }`}>
                                {guest.rsvp}
                            </div>
                            <button
                                onClick={() => setRsvpModalOpen(true)}
                                className="btn-gradient px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                {guest.rsvp === 'pending' ? 'Respond Now' : 'Update RSVP'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Itinerary */}
                <div className="space-y-4">
                    <h3 className="font-heading text-xl font-semibold px-2">Your Itinerary</h3>
                    {events.length === 0 ? (
                        <div className="text-center p-8 bg-bg-card rounded-xl border border-border-light text-text-muted">
                            No active events listed yet.
                        </div>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:border-primary/30 transition-colors flex gap-4 md:gap-6 items-start">
                                {/* Date Box */}
                                <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 bg-bg-alt rounded-lg border border-border shrink-0">
                                    <span className="text-xs font-semibold text-text-muted uppercase">
                                        {event.date ? format(new Date(event.date), 'MMM') : '-'}
                                    </span>
                                    <span className="text-xl font-bold text-text">
                                        {event.date ? format(new Date(event.date), 'dd') : '-'}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                        <h4 className="font-semibold text-lg">{event.name}</h4>
                                        <span className="text-xs md:text-sm font-medium text-primary bg-primary/5 px-2 py-1 rounded w-fit mt-1 md:mt-0">
                                            {event.start_time ? format(new Date(`2000-01-01T${event.start_time}`), 'h:mm a') : 'TBA'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-1.5 text-sm text-text-muted">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-primary" />
                                            {event.location || "Venue TBA"}
                                        </div>
                                        <div className="flex items-center gap-2 md:hidden">
                                            <Calendar size={14} className="text-primary" />
                                            {event.date ? format(new Date(event.date), 'MMMM d, yyyy') : "Date TBA"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Dietary Notes Display if any */}
                {guest.dietary_notes && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex gap-3 text-indigo-900">
                        <Utensils size={20} className="shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm">Dietary Preferences</h4>
                            <p className="text-sm mt-0.5 opacity-90">{guest.dietary_notes}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* RSVP Modal */}
            {rsvpModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
                    <div className="bg-bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease]">
                        <div className="p-6 border-b border-border-light">
                            <h3 className="font-heading text-xl font-semibold">RSVP Response</h3>
                            <p className="text-sm text-text-muted mt-1">{wedding.name}</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Attendance */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Will you be attending?</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRsvpStatus('accepted')}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${rsvpStatus === 'accepted'
                                                ? 'border-success bg-success/5 text-success'
                                                : 'border-border-light hover:border-border text-text-muted'
                                            }`}
                                    >
                                        <CheckCircle size={24} />
                                        <span className="font-semibold text-sm">Joyfully Accept</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setRsvpStatus('declined')}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${rsvpStatus === 'declined'
                                                ? 'border-danger bg-danger/5 text-danger'
                                                : 'border-border-light hover:border-border text-text-muted'
                                            }`}
                                    >
                                        <XCircle size={24} />
                                        <span className="font-semibold text-sm">Regretfully Decline</span>
                                    </button>
                                </div>
                            </div>

                            {/* Guest Count (Only if accepted) */}
                            {rsvpStatus === 'accepted' && (
                                <div className="animate-[fadeIn_0.3s_ease]">
                                    <label className="block text-sm font-medium mb-2">Total number of guests</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                            className="w-10 h-10 rounded-lg bg-bg-alt border border-border flex items-center justify-center hover:bg-border transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="font-heading text-xl font-bold w-12 text-center">{guestCount}</span>
                                        <button
                                            onClick={() => setGuestCount(guestCount + 1)}
                                            className="w-10 h-10 rounded-lg bg-bg-alt border border-border flex items-center justify-center hover:bg-border transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-xs text-text-muted mt-2">Including yourself</p>
                                </div>
                            )}

                            {/* Dietary Notes */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Dietary Restrictions / Notes</label>
                                <textarea
                                    value={dietaryNotes}
                                    onChange={(e) => setDietaryNotes(e.target.value)}
                                    placeholder="Vegetarian, Allergies, etc."
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-sm focus:ring-2 focus:ring-primary/20 outline-none min-h-[80px]"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-bg-alt flex justify-end gap-3">
                            <button
                                onClick={() => setRsvpModalOpen(false)}
                                className="px-5 py-2.5 rounded-lg border border-border bg-bg text-sm font-medium hover:bg-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRsvpUpdate}
                                disabled={saving}
                                className="btn-gradient px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary/20"
                            >
                                {saving ? <Loader2 className="animate-spin" /> : "Confirm RSVP"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
