
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useFoodMenus() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchMenus = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('food_menus')
                .select(`
                    *,
                    event:events (name)
                `)
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formatted = data.map(m => ({
                ...m,
                eventName: m.event?.name || 'Unassigned'
            }));

            setMenus(formatted);
        } catch (err) {
            console.error("Error fetching menus:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchMenus();
    }, [fetchMenus]);

    const addMenu = async (menuData) => {
        try {
            const { data, error } = await supabase
                .from('food_menus')
                .insert({
                    wedding_id: user.weddingId,
                    event_id: menuData.eventId || null,
                    menu_type: menuData.menuType,
                    headcount: menuData.headcount || 0,
                    status: menuData.status || 'draft',
                    items: menuData.items || {} // { categories: [], dietaryNotes: "" }
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Food Menu",
                entityName: menuData.menuType,
                details: { type: menuData.menuType, headcount: menuData.headcount }
            });

            await fetchMenus(); // Refresh to get event link
            return data;
        } catch (err) {
            console.error("Error adding menu:", err);
            throw err;
        }
    };

    const updateMenu = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('food_menus')
                .update({
                    event_id: updates.eventId,
                    menu_type: updates.menuType,
                    headcount: updates.headcount,
                    status: updates.status,
                    items: updates.items
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Food Menu",
                entityName: data.menu_type,
                details: { status: data.status, headcount: data.headcount }
            });

            await fetchMenus();
        } catch (err) {
            console.error("Error updating menu:", err);
            throw err;
        }
    };

    const deleteMenu = async (id, type) => {
        try {
            const { error } = await supabase
                .from('food_menus')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Food Menu",
                entityName: type || "Food Menu",
                details: { menuId: id }
            });

            setMenus(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error("Error deleting menu:", err);
            throw err;
        }
    };

    return {
        menus,
        loading,
        error,
        addMenu,
        updateMenu,
        deleteMenu,
        refresh: fetchMenus
    };
}
