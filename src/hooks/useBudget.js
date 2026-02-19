
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useBudget() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [budgetItems, setBudgetItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchBudget = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('budget_items')
                .select('*')
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBudgetItems(data);
        } catch (err) {
            console.error("Error fetching budget:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchBudget();
    }, [fetchBudget]);

    const addBudgetItem = async (itemData) => {
        try {
            const { data, error } = await supabase
                .from('budget_items')
                .insert({
                    wedding_id: user.weddingId,
                    category: itemData.category,
                    budgeted: itemData.budgeted || 0,
                    actual: itemData.actual || 0,
                    notes: itemData.notes || null
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Budget Item",
                entityName: data.category,
                details: { budgeted: data.budgeted, actual: data.actual }
            });

            setBudgetItems(prev => [data, ...prev]);
            return data;
        } catch (err) {
            console.error("Error adding budget item:", err);
            throw err;
        }
    };

    const updateBudgetItem = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('budget_items')
                .update({
                    category: updates.category,
                    budgeted: updates.budgeted,
                    actual: updates.actual,
                    notes: updates.notes
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Budget Item",
                entityName: data.category,
                details: { budgeted: data.budgeted, actual: data.actual }
            });

            setBudgetItems(prev => prev.map(item => item.id === id ? data : item));
            return data;
        } catch (err) {
            console.error("Error updating budget item:", err);
            throw err;
        }
    };

    const deleteBudgetItem = async (id, category) => {
        try {
            const { error } = await supabase
                .from('budget_items')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Budget Item",
                entityName: category || "Budget Item",
                details: { itemId: id }
            });

            setBudgetItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Error deleting budget item:", err);
            throw err;
        }
    };

    return {
        budgetItems,
        loading,
        error,
        addBudgetItem,
        updateBudgetItem,
        deleteBudgetItem,
        refresh: fetchBudget
    };
}
