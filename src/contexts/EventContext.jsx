
"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useActivity } from "@/hooks/useActivity";

const EventContext = createContext();

export function EventProvider({ children }) {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const supabase = useMemo(() => createClient(), []);

    // Fetch Events when user (and weddingId) is available
    useEffect(() => {
        if (!user?.weddingId) {
            setEvents([]);
            setLoading(false);
            return;
        }

        const fetchEvents = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("events")
                    .select("*")
                    .eq("wedding_id", user.weddingId)
                    .order("date", { ascending: true });

                if (error) throw error;
                setEvents(data || []);
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();

        // Realtime Subscription?
        // For now, let's stick to fetch. We can add realtime later.
    }, [user?.weddingId]);

    const addEvent = async (eventData) => {
        if (!user?.weddingId) return null;
        try {
            const { data, error } = await supabase
                .from("events")
                .insert({
                    wedding_id: user.weddingId,
                    name: eventData.name,
                    date: eventData.date,
                    start_time: eventData.startTime,
                    end_time: eventData.endTime,
                    notes: eventData.notes || "",
                    status: eventData.status || "upcoming",
                })
                .select()
                .single();

            if (error) throw error;
            setEvents((prev) => [...prev, data]);

            // Log activity
            await logActivity({
                action: "created",
                entityType: "Event",
                entityName: data.name,
                details: { date: data.date, time: data.start_time }
            });

            return data;
        } catch (err) {
            console.error("Error adding event:", err);
            throw err;
        }
    };

    const updateEvent = async (id, updatedFields) => {
        try {
            const updates = {};
            if (updatedFields.name) updates.name = updatedFields.name;
            if (updatedFields.date) updates.date = updatedFields.date;
            if (updatedFields.startTime) updates.start_time = updatedFields.startTime;
            if (updatedFields.endTime) updates.end_time = updatedFields.endTime;
            if (updatedFields.status) updates.status = updatedFields.status;
            if (updatedFields.notes) updates.notes = updatedFields.notes;

            const { data, error } = await supabase
                .from("events")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            setEvents((prev) =>
                prev.map((event) => (event.id === id ? data : event))
            );

            // Log activity
            if (data) {
                await logActivity({
                    action: "updated",
                    entityType: "Event",
                    entityName: data.name || "Event",
                    details: { ...updates }
                });
            }
        } catch (err) {
            console.error("Error updating event:", err);
            throw err;
        }
    };

    const deleteEvent = async (id) => {
        try {
            const eventToDelete = events.find(e => e.id === id);
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setEvents((prev) => prev.filter((event) => event.id !== id));

            if (eventToDelete) {
                await logActivity({
                    action: "deleted",
                    entityType: "Event",
                    entityName: eventToDelete.name,
                    details: { eventId: id }
                });
            }
        } catch (err) {
            console.error("Error deleting event:", err);
            throw err;
        }
    };

    const getEventById = (id) => {
        return events.find((event) => event.id === id);
    };

    return (
        <EventContext.Provider
            value={{
                events: events.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0)),
                loading,
                addEvent,
                updateEvent,
                deleteEvent,
                getEventById,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventContext);
}
