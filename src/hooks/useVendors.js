
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useVendors() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchVendors = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('vendors')
                .select('*')
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setVendors(data);
        } catch (err) {
            console.error("Error fetching vendors:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    const addVendor = async (vendorData) => {
        try {
            const { data, error } = await supabase
                .from('vendors')
                .insert({
                    wedding_id: user.weddingId,
                    name: vendorData.name,
                    category: vendorData.category,
                    phone: vendorData.phone || null,
                    email: vendorData.email || null,
                    amount: vendorData.amount || 0,
                    payment_status: vendorData.paymentStatus || 'unpaid',
                    rating: vendorData.rating || 0,
                    notes: vendorData.notes || null
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Vendor",
                entityName: data.name,
                details: { category: data.category, amount: data.amount }
            });

            setVendors(prev => [data, ...prev]);
            return data;
        } catch (err) {
            console.error("Error adding vendor:", err);
            throw err;
        }
    };

    const updateVendor = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('vendors')
                .update({
                    name: updates.name,
                    category: updates.category,
                    phone: updates.phone,
                    email: updates.email,
                    amount: updates.amount,
                    payment_status: updates.paymentStatus,
                    rating: updates.rating,
                    notes: updates.notes
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Vendor",
                entityName: data.name,
                details: { paymentStatus: data.payment_status, amount: data.amount }
            });

            setVendors(prev => prev.map(v => v.id === id ? data : v));
            return data;
        } catch (err) {
            console.error("Error updating vendor:", err);
            throw err;
        }
    };

    const deleteVendor = async (id, name) => {
        try {
            const { error } = await supabase
                .from('vendors')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Vendor",
                entityName: name || "Vendor",
                details: { vendorId: id }
            });

            setVendors(prev => prev.filter(v => v.id !== id));
        } catch (err) {
            console.error("Error deleting vendor:", err);
            throw err;
        }
    };

    return {
        vendors,
        loading,
        error,
        addVendor,
        updateVendor,
        deleteVendor,
        refresh: fetchVendors
    };
}
