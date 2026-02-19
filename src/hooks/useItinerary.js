
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useItinerary(eventId) {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false); // Only load when eventId is present
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchSlots = useCallback(async () => {
        if (!user?.weddingId || !eventId) {
            setSlots([]);
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('itinerary_slots')
                .select('*')
                .eq('event_id', eventId)
                .order('time', { ascending: true }); // Trying time sort first, fallback to order users input

            if (error) throw error;
            setSlots(data);
        } catch (err) {
            console.error("Error fetching itinerary slots:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, eventId, supabase]);

    useEffect(() => {
        fetchSlots();
    }, [fetchSlots]);

    const addSlot = async (slotData) => {
        if (!eventId) return;
        try {
            const { data, error } = await supabase
                .from('itinerary_slots')
                .insert({
                    event_id: eventId,
                    time: slotData.time,
                    activity: slotData.activity,
                    responsible: slotData.responsible,
                    sort_order: slotData.sortOrder || 0
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Itinerary Slot",
                entityName: data.activity,
                details: { time: data.time, responsible: data.responsible }
            });

            setSlots(prev => [...prev, data].sort((a, b) => {
                // simple sort helper
                return (a.time || '').localeCompare(b.time || '');
            }));
            return data;
        } catch (err) {
            console.error("Error adding itinerary slot:", err);
            throw err;
        }
    };

    const updateSlot = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('itinerary_slots')
                .update({
                    time: updates.time,
                    activity: updates.activity,
                    responsible: updates.responsible,
                    sort_order: updates.sortOrder
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Itinerary Slot",
                entityName: data.activity,
                details: { time: data.time }
            });

            fetchSlots();
        } catch (err) {
            console.error("Error updating itinerary slot:", err);
            throw err;
        }
    };

    const deleteSlot = async (id, activityName) => {
        try {
            const { error } = await supabase
                .from('itinerary_slots')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Itinerary Slot",
                entityName: activityName || "Itinerary Slot",
                details: { slotId: id }
            });

            setSlots(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error("Error deleting itinerary slot:", err);
            throw err;
        }
    };

    return {
        slots,
        loading,
        error,
        addSlot,
        updateSlot,
        deleteSlot,
        refresh: fetchSlots
    };
}
