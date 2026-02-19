
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useActivity } from '@/hooks/useActivity';

export function useTasks() {
    const { user } = useAuth();
    const { logActivity } = useActivity();
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const supabase = useMemo(() => createClient(), []);

    const fetchTasks = useCallback(async () => {
        if (!user?.weddingId) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select(`
                    *,
                    assignee:wedding_members (
                        user:users (name, email)
                    )
                `)
                .eq('wedding_id', user.weddingId)
                .order('due_date', { ascending: true });

            if (error) throw error;

            // Format tasks to include assignee name flatly
            const formatted = data.map(t => ({
                ...t,
                assigneeName: t.assignee?.user?.name || t.assignee?.user?.email || 'Unassigned'
            }));

            setTasks(formatted);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user?.weddingId, supabase]);

    const fetchMembers = useCallback(async () => {
        if (!user?.weddingId) return;
        try {
            const { data, error } = await supabase
                .from('wedding_members')
                .select(`
                    id,
                    role,
                    user:users (name, email)
                `)
                .eq('wedding_id', user.weddingId);

            if (error) throw error;

            const formatted = data.map(m => ({
                id: m.id,
                name: m.user?.name || m.user?.email || 'Unknown',
                role: m.role
            }));
            setMembers(formatted);
        } catch (err) {
            console.error("Error fetching members:", err);
        }
    }, [user?.weddingId, supabase]);

    useEffect(() => {
        fetchTasks();
        fetchMembers();
    }, [fetchTasks, fetchMembers]);

    const addTask = async (taskData) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert({
                    wedding_id: user.weddingId,
                    title: taskData.title,
                    status: taskData.status || 'pending',
                    priority: taskData.priority || 'medium',
                    due_date: taskData.dueDate || null,
                    assignee_id: taskData.assigneeId || null
                })
                .select()
                .single();

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "created",
                entityType: "Task",
                entityName: taskData.title,
                details: { priority: taskData.priority, status: taskData.status }
            });

            await fetchTasks(); // Refresh to get relations
            return data;
        } catch (err) {
            console.error("Error adding task:", err);
            throw err;
        }
    };

    const updateTask = async (id, updates) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({
                    title: updates.title,
                    status: updates.status,
                    priority: updates.priority,
                    due_date: updates.dueDate,
                    assignee_id: updates.assigneeId
                })
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "updated",
                entityType: "Task",
                entityName: updates.title,
                details: { status: updates.status }
            });

            await fetchTasks();
        } catch (err) {
            console.error("Error updating task:", err);
            throw err;
        }
    };

    const deleteTask = async (id, title) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Log Activity
            await logActivity({
                action: "deleted",
                entityType: "Task",
                entityName: title || "Task",
                details: { taskId: id }
            });

            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
            throw err;
        }
    };

    return {
        tasks,
        members,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        refresh: fetchTasks
    };
}
