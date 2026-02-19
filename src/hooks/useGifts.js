
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useGifts() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchGifts = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('gifts')
                .select('*')
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setGifts(data);
        } catch (err) {
            console.error("Error fetching gifts:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchGifts();
    }, [fetchGifts]);

    const addGift = async (giftData) => {
        try {
            const { data, error } = await supabase
                .from('gifts')
                .insert([{ ...giftData, wedding_id: user.weddingId }])
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Gift",
                entityName: data.item_name,
                details: { from: data.giver_name, value: data.value }
            });

            setGifts(prev => [data, ...prev]);
            return data;
        } catch (err) {
            console.error("Error adding gift:", err);
            throw err;
        }
    };

    const updateGift = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('gifts')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Gift",
                entityName: data.item_name,
                details: { status: data.status }
            });

            setGifts(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
        } catch (err) {
            console.error("Error updating gift:", err);
            throw err;
        }
    };

    const deleteGift = async (id, itemName) => {
        try {
            const { error } = await supabase
                .from('gifts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Gift",
                entityName: itemName || "Gift",
                details: { giftId: id }
            });

            setGifts(prev => prev.filter(g => g.id !== id));
        } catch (err) {
            console.error("Error deleting gift:", err);
            throw err;
        }
    };

    return {
        gifts,
        loading,
        error,
        addGift,
        updateGift,
        deleteGift,
        refresh: fetchGifts
    };
}
