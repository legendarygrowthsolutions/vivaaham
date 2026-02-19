
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useTeam() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchMembers = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('wedding_members')
                .select(`
                    *,
                    user:users (name, email, avatar_url, phone)
                `)
                .eq('wedding_id', user.weddingId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format data
            const formatted = data.map(m => ({
                ...m,
                name: m.user?.name || m.invited_email || 'Unknown',
                email: m.user?.email || m.invited_email,
                avatar: m.user?.avatar_url,
                phone: m.user?.phone,
                isPending: m.status === 'invited'
            }));

            setMembers(formatted);
        } catch (err) {
            console.error("Error fetching team members:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const inviteMember = async (memberData) => {
        try {
            // Check if email already exists in wedding
            const { data: existing } = await supabase
                .from('wedding_members')
                .select('id')
                .eq('wedding_id', user.weddingId)
                .or(`invited_email.eq.${memberData.email}`) // Ideally also check user.email if we could
                .maybeSingle();

            if (existing) throw new Error("This user is already part of the team or invited.");

            // Insert new member invitation
            const { data, error } = await supabase
                .from('wedding_members')
                .insert({
                    wedding_id: user.weddingId,
                    user_id: null, // No user ID yet
                    invited_email: memberData.email,
                    role: memberData.role,
                    status: 'invited',
                    modules: memberData.modules || ['all']
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "invited",
                entityType: "Team Member",
                entityName: memberData.email,
                details: { role: memberData.role }
            });

            await fetchMembers();
            return data;
        } catch (err) {
            console.error("Error inviting member:", err);
            throw err;
        }
    };

    const updateMember = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('wedding_members')
                .update({
                    role: updates.role,
                    modules: updates.modules
                })
                .eq('id', id)
                .select()
                .single(); // Need to select to get data for logging if needed, or use updates

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Team Member",
                entityName: "Member", // We might want to pass the name, but for now generic is fine or fetch it.
                details: { role: updates.role, modules: updates.modules }
            });

            await fetchMembers();
        } catch (err) {
            console.error("Error updating member:", err);
            throw err;
        }
    };

    const removeMember = async (id, name) => {
        try {
            const { error } = await supabase
                .from('wedding_members')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "removed",
                entityType: "Team Member",
                entityName: name || "Member",
                details: { memberId: id }
            });

            setMembers(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error("Error removing member:", err);
            throw err;
        }
    };

    const resendInvite = async (id) => {
        // Mock resend functionality for now
        // In a real app, this would trigger an email
        console.log("Resending invite to member ID:", id);
        alert("Invitation resent successfully! (Mock)");
    };

    return {
        members,
        loading,
        error,
        inviteMember,
        updateMember,
        removeMember,
        resendInvite,
        refresh: fetchMembers
    };
}
