
import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useDashboardData() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        guests: { total: 0, accepted: 0 },
        budget: { total: 0, used: 0 },
        tasks: { total: 0, completed: 0, pending: 0, overdue: 0 },
        activity: [],
        alerts: { overdueTasks: [], unreadNotifs: [] },
        loading: true
    });
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        let mounted = true;
        if (!user?.weddingId) {
            const timer = setTimeout(() => {
                if (mounted) setStats(prev => ({ ...prev, loading: false }));
            }, 0);
            return () => { mounted = false; clearTimeout(timer); };
        }

        const fetchData = async () => {
            try {
                // 1. Guests
                const { count: totalGuests } = await supabase
                    .from('guests')
                    .select('*', { count: 'exact', head: true })
                    .eq('wedding_id', user.weddingId);

                const { count: acceptedGuests } = await supabase
                    .from('guests')
                    .select('*', { count: 'exact', head: true })
                    .eq('wedding_id', user.weddingId)
                    .eq('rsvp', 'accepted');

                // 2. Budget
                const { data: budgetItems } = await supabase
                    .from('budget_items')
                    .select('actual')
                    .eq('wedding_id', user.weddingId);

                const { data: weddingData } = await supabase
                    .from('weddings')
                    .select('total_budget')
                    .eq('id', user.weddingId)
                    .single();

                const budgetUsed = budgetItems?.reduce((acc, item) => acc + (item.actual || 0), 0) || 0;

                // 3. Tasks (with deep join for assignee name)
                const { data: tasks } = await supabase
                    .from('tasks')
                    .select(`
                        id, 
                        title, 
                        status, 
                        assignee:assignee_id (
                            user:user_id (name)
                        )
                    `)
                    .eq('wedding_id', user.weddingId);

                const taskStats = tasks?.reduce((acc, t) => {
                    acc.total++;
                    if (t.status === 'done') acc.completed++;
                    else if (t.status === 'pending' || t.status === 'in_progress') acc.pending++;
                    else if (t.status === 'overdue') acc.overdue++;
                    return acc;
                }, { total: 0, completed: 0, pending: 0, overdue: 0 });

                const overdueTasksList = tasks
                    ?.filter(t => t.status === 'overdue')
                    .map(t => ({
                        id: t.id,
                        task: t.title,
                        assignee: t.assignee?.user?.name || 'Unassigned'
                    })) || [];

                // 4. Activity Log
                const { data: activityWithUser } = await supabase
                    .from('activity_log')
                    .select(`
                        id, 
                        action, 
                        target_type, 
                        created_at, 
                        user:user_id (name)
                    `)
                    .eq('wedding_id', user.weddingId)
                    .order('created_at', { ascending: false })
                    .limit(5);

                const formattedActivity = activityWithUser?.map(act => ({
                    id: act.id,
                    user: act.user?.name || 'System',
                    action: act.action,
                    target: act.target_type,
                    time: new Date(act.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                })) || [];

                // 5. Notifications
                const { data: notifs } = await supabase
                    .from('notifications')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('read', false)
                    .order('created_at', { ascending: false })
                    .limit(3);

                const formattedNotifs = notifs?.map(n => ({
                    id: n.id,
                    type: n.type,
                    message: n.message,
                    time: new Date(n.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                })) || [];

                setStats({
                    guests: { total: totalGuests || 0, accepted: acceptedGuests || 0 },
                    budget: { total: weddingData?.total_budget || 0, used: budgetUsed },
                    tasks: taskStats || { total: 0, completed: 0, pending: 0, overdue: 0 },
                    activity: formattedActivity,
                    alerts: {
                        overdueTasks: overdueTasksList,
                        unreadNotifs: formattedNotifs
                    },
                    loading: false
                });

            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchData();

        return () => { mounted = false; };
    }, [user?.weddingId, user?.id, supabase]);

    return stats;
}
