
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useTravel() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [travelPlans, setTravelPlans] = useState([]);
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchTravelPlans = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('travel_plans')
                .select(`
                    *,
                    guest:guests (id, name, phone)
                `)
                .eq('wedding_id', user.weddingId)
                .order('arrival_datetime', { ascending: true });

            if (error) throw error;

            // Format to have guestName at top level
            const formatted = data.map(t => ({
                ...t,
                guestName: t.guest?.name || 'Unknown Guest',
                guestPhone: t.guest?.phone || ''
            }));

            setTravelPlans(formatted);
        } catch (err) {
            console.error("Error fetching travel plans:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    const fetchGuests = useCallback(async () => {
        if (!user?.weddingId) return;
        try {
            const { data, error } = await supabase
                .from('guests')
                .select('id, name')
                .eq('wedding_id', user.weddingId)
                .order('name');

            if (error) throw error;
            setGuests(data);
        } catch (err) {
            console.error("Error fetching guests:", err);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchTravelPlans();
        fetchGuests();
    }, [fetchTravelPlans, fetchGuests]);

    const addTravelPlan = async (planData) => {
        try {
            const { data, error } = await supabase
                .from('travel_plans')
                .insert({
                    wedding_id: user.weddingId,
                    guest_id: planData.guestId,
                    arrival_datetime: planData.arrivalDatetime,
                    mode: planData.mode,
                    details: planData.details,
                    pickup_status: planData.pickupStatus
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Travel Plan",
                entityName: planData.mode,
                details: { arrival: planData.arrivalDatetime }
            });

            await fetchTravelPlans();
            return data;
        } catch (err) {
            console.error("Error adding travel plan:", err);
            throw err;
        }
    };

    const updateTravelPlan = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('travel_plans')
                .update({
                    guest_id: updates.guestId,
                    arrival_datetime: updates.arrivalDatetime,
                    mode: updates.mode,
                    details: updates.details,
                    pickup_status: updates.pickupStatus
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Travel Plan",
                entityName: data.mode,
                details: { status: data.pickup_status }
            });

            await fetchTravelPlans();
        } catch (err) {
            console.error("Error updating travel plan:", err);
            throw err;
        }
    };

    const deleteTravelPlan = async (id, mode) => {
        try {
            const { error } = await supabase
                .from('travel_plans')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Travel Plan",
                entityName: mode || "Travel Plan",
                details: { planId: id }
            });

            setTravelPlans(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Error deleting travel plan:", err);
            throw err;
        }
    };

    return {
        travelPlans,
        guests,
        loading,
        error,
        addTravelPlan,
        updateTravelPlan,
        deleteTravelPlan,
        refresh: fetchTravelPlans
    };
}
