
import { useState, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useActivity() {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Create client once
    const supabase = useMemo(() => createClient(), []);

    const fetchLogs = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('activity_logs')
                .select('*')
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setLogs(data);
        } catch (err) {
            console.error("Error fetching activity logs:", err);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    const logActivity = useCallback(async ({ action, entityType, entityName, details = {} }) => {
        if (!user?.weddingId) return;

        try {
            const { error } = await supabase
                .from('activity_logs')
                .insert([{
                    wedding_id: user.weddingId,
                    user_id: user.id || null, // Assuming user.id is available from AuthContext
                    user_name: user.name || 'Unknown User',
                    action,
                    entity_type: entityType,
                    entity_name: entityName,
                    details
                }]);

            if (error) {
                console.error("Failed to log activity:", error);
            } else {
                // Optionally refresh logs if we are on the activity page, 
                // but usually we just fire and forget or let the UI refresh on mount.
                // For now, let's not auto-refresh to avoid complex dependency cycles.
            }
        } catch (err) {
            console.error("Error in logActivity:", err);
        }
    }, [user, supabase]);

    return {
        logs,
        loading,
        fetchLogs,
        logActivity
    };
}
