
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useDecor() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [decorPlans, setDecorPlans] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchDecor = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('decor_plans')
                .select(`
                    *,
                    event:events (id, name)
                `)
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format to flatten event name
            const formatted = data.map(d => ({
                ...d,
                eventName: d.event?.name || 'General'
            }));

            setDecorPlans(formatted);
        } catch (err) {
            console.error("Error fetching decor plans:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    const fetchEvents = useCallback(async () => {
        if (!user?.weddingId) return;
        try {
            const { data, error } = await supabase
                .from('events')
                .select('id, name')
                .eq('wedding_id', user.weddingId);

            if (error) throw error;
            setEvents(data);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchDecor();
        fetchEvents();
    }, [fetchDecor, fetchEvents]);

    const addDecor = async (decorData) => {
        try {
            const { data, error } = await supabase
                .from('decor_plans')
                .insert({
                    wedding_id: user.weddingId,
                    event_id: decorData.eventId || null,
                    theme: decorData.theme,
                    colors: decorData.colors,
                    highlight: decorData.highlight,
                    notes: decorData.notes
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Decor Plan",
                entityName: data.theme,
                details: { theme: data.theme, colors: data.colors }
            });

            await fetchDecor(); // Refresh to get relation
            return data;
        } catch (err) {
            console.error("Error adding decor plan:", err);
            throw err;
        }
    };

    const updateDecor = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('decor_plans')
                .update({
                    event_id: updates.eventId,
                    theme: updates.theme,
                    colors: updates.colors,
                    highlight: updates.highlight,
                    notes: updates.notes
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Decor Plan",
                entityName: data.theme,
                details: { theme: data.theme, colors: data.colors }
            });

            await fetchDecor();
        } catch (err) {
            console.error("Error updating decor plan:", err);
            throw err;
        }
    };

    const deleteDecor = async (id, theme) => {
        try {
            const { error } = await supabase
                .from('decor_plans')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Decor Plan",
                entityName: theme || "Decor Plan",
                details: { decorId: id }
            });

            setDecorPlans(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.error("Error deleting decor plan:", err);
            throw err;
        }
    };

    return {
        decorPlans,
        events,
        loading,
        error,
        addDecor,
        updateDecor,
        deleteDecor,
        refresh: fetchDecor
    };
}
