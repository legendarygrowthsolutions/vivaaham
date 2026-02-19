
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useGuests() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchGuests = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            // Fetch guests with their event associations
            // We use event_guests to link guests to events
            // The query: get all guests, and for each guest, get linked events.
            const { data, error } = await supabase
                .from('guests')
                .select(`
                    *,
                    event_guests (
                        events (id, name)
                    )
                `)
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format data for UI
            const formattedGuests = data.map(g => ({
                ...g,
                // Flatten events into array of {id, name} or just names
                // Supabase returns array of objects inside event_guests
                events: g.event_guests?.map(eg => eg.events).filter(Boolean) || []
            }));

            setGuests(formattedGuests);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching guests:", err);
            setError(err.message);
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchGuests();
    }, [fetchGuests]);

    const addGuest = async (guestData, eventIds = []) => {
        try {
            // 1. Insert Guest
            const { data: newGuest, error: guestError } = await supabase
                .from('guests')
                .insert([{
                    wedding_id: user.weddingId,
                    name: guestData.name,
                    email: guestData.email || null,
                    phone: guestData.phone || null,
                    side: guestData.side || 'Bride',
                    rsvp: guestData.rsvp || 'pending',
                    count: guestData.count || 1,
                    // group_name?
                }])
                .select()
                .single();

            if (guestError) throw guestError;

            // 2. Link Events
            if (eventIds.length > 0) {
                const links = eventIds.map(eventId => ({
                    guest_id: newGuest.id,
                    event_id: eventId
                }));
                const { error: linkError } = await supabase
                    .from('event_guests')
                    .insert(links);

                if (linkError) throw linkError;
            }

            // 3. Log Activity
            await logActivity({
                action: "created",
                entityType: "Guest",
                entityName: newGuest.name,
                details: { guestId: newGuest.id, count: newGuest.count, side: newGuest.side }
            });

            // 4. Refresh
            await fetchGuests();

            return newGuest;
        } catch (err) {
            console.error("Error adding guest:", err);
            throw err;
        }
    };

    const updateGuest = async (id, updates, eventIds = null) => {
        try {
            // 1. Prepare Update Object (only include defined fields)
            const cleanUpdates = {};
            if (updates.name !== undefined) cleanUpdates.name = updates.name;
            if (updates.email !== undefined) cleanUpdates.email = updates.email;
            if (updates.phone !== undefined) cleanUpdates.phone = updates.phone;
            if (updates.side !== undefined) cleanUpdates.side = updates.side;
            if (updates.rsvp !== undefined) cleanUpdates.rsvp = updates.rsvp;
            if (updates.count !== undefined) cleanUpdates.count = updates.count;

            const { error: updateError } = await supabase
                .from('guests')
                .update(cleanUpdates)
                .eq('id', id);

            if (updateError) throw updateError;

            // 2. Update Events (if provided) implementation: Delete all and re-insert
            if (eventIds !== null) {
                // Delete existing
                await supabase.from('event_guests').delete().eq('guest_id', id);

                // Insert new
                if (eventIds.length > 0) {
                    const links = eventIds.map(eventId => ({
                        guest_id: id,
                        event_id: eventId
                    }));
                    await supabase.from('event_guests').insert(links);
                }
            }

            // 3. Log Activity
            await logActivity({
                action: "updated",
                entityType: "Guest",
                entityName: updates.name,
                details: { rsvp: updates.rsvp, count: updates.count }
            });

            // 4. Refresh
            await fetchGuests();
        } catch (err) {
            console.error("Error updating guest:", err);
            throw err;
        }
    };

    const deleteGuest = async (id, name) => {
        try {
            const { error } = await supabase
                .from('guests')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity (assuming name is passed or we fetched it before)
            await logActivity({
                action: "deleted",
                entityType: "Guest",
                entityName: name || "Guest",
                details: { guestId: id }
            });

            setGuests(prev => prev.filter(g => g.id !== id));
        } catch (err) {
            console.error("Error deleting guest:", err);
            throw err;
        }
    };

    return {
        guests,
        loading,
        error,
        addGuest,
        updateGuest,
        deleteGuest,
        refresh: fetchGuests
    };
}
