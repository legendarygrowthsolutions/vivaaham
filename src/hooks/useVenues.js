
import { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useVenues() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchVenues = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            // Fetch venues with linked event name if possible, but events are linked via event_id
            // The schema says `event_id` is a FK to `events`.
            // So we can select `*, event:events(name)`.
            const { data, error } = await supabase
                .from('venues')
                .select(`
                    *,
                    event:events (name)
                `)
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedVenues = data.map(v => ({
                ...v,
                eventName: v.event?.name || 'Unassigned'
            }));

            setVenues(formattedVenues);
        } catch (err) {
            console.error("Error fetching venues:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

    const addVenue = async (venueData) => {
        try {
            const { data, error } = await supabase
                .from('venues')
                .insert({
                    wedding_id: user.weddingId,
                    name: venueData.name,
                    event_id: venueData.eventId || null,
                    address: venueData.address || null,
                    contact_name: venueData.contactName || null,
                    contact_phone: venueData.contactPhone || null,
                    total_rooms: venueData.totalRooms || 0,
                    cost: venueData.cost || 0,
                    status: venueData.status || 'draft',
                    assigned_rooms: 0 // Initialize
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Venue",
                entityName: data.name,
                details: { cost: data.cost, rooms: data.total_rooms }
            });

            await fetchVenues();
            return data;
        } catch (err) {
            console.error("Error adding venue:", err);
            throw err;
        }
    };

    const updateVenue = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('venues')
                .update({
                    name: updates.name,
                    event_id: updates.eventId,
                    address: updates.address,
                    contact_name: updates.contactName,
                    contact_phone: updates.contactPhone,
                    total_rooms: updates.totalRooms,
                    cost: updates.cost,
                    status: updates.status,
                    // assigned_rooms managed separately usually, or here if manual override
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Venue",
                entityName: data.name,
                details: { status: data.status, cost: data.cost }
            });

            await fetchVenues();
        } catch (err) {
            console.error("Error updating venue:", err);
            throw err;
        }
    };

    const deleteVenue = async (id, name) => {
        try {
            const { error } = await supabase
                .from('venues')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Venue",
                entityName: name || "Venue",
                details: { venueId: id }
            });

            setVenues(prev => prev.filter(v => v.id !== id));
        } catch (err) {
            console.error("Error deleting venue:", err);
            throw err;
        }
    };

    return {
        venues,
        loading,
        error,
        addVenue,
        updateVenue,
        deleteVenue,
        refresh: fetchVenues
    };
}
