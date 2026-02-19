
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useInvitations() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [invitations, setInvitations] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchInvitations = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('invitations')
                .select(`
                    *,
                    event:events (id, name)
                `)
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format to have eventName at top level
            const formatted = data.map(i => ({
                ...i,
                eventName: i.event?.name || 'General'
            }));

            setInvitations(formatted);
        } catch (err) {
            console.error("Error fetching invitations:", err);
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
        fetchInvitations();
        fetchEvents();
    }, [fetchInvitations, fetchEvents]);

    const addInvitation = async (invData) => {
        try {
            const { data, error } = await supabase
                .from('invitations')
                .insert({
                    wedding_id: user.weddingId,
                    event_id: invData.eventId || null,
                    design_name: invData.designName,
                    channel: invData.channel,
                    sent_count: invData.sentCount || 0,
                    delivered_count: invData.deliveredCount || 0,
                    opened_count: invData.openedCount || 0,
                    template_url: invData.templateUrl || null
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Invitation",
                entityName: invData.designName,
                details: { channel: invData.channel }
            });

            await fetchInvitations();
            return data;
        } catch (err) {
            console.error("Error adding invitation:", err);
            throw err;
        }
    };

    const updateInvitation = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('invitations')
                .update({
                    event_id: updates.eventId,
                    design_name: updates.designName,
                    channel: updates.channel,
                    sent_count: updates.sentCount,
                    delivered_count: updates.deliveredCount,
                    opened_count: updates.openedCount,
                    template_url: updates.templateUrl
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Invitation",
                entityName: data.design_name,
                details: { sent: data.sent_count }
            });

            await fetchInvitations();
        } catch (err) {
            console.error("Error updating invitation:", err);
            throw err;
        }
    };

    const deleteInvitation = async (id, designName) => {
        try {
            const { error } = await supabase
                .from('invitations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Invitation",
                entityName: designName || "Invitation",
                details: { inviteId: id }
            });

            setInvitations(prev => prev.filter(i => i.id !== id));
        } catch (err) {
            console.error("Error deleting invitation:", err);
            throw err;
        }
    };

    return {
        invitations,
        events,
        loading,
        error,
        addInvitation,
        updateInvitation,
        deleteInvitation,
        refresh: fetchInvitations
    };
}
