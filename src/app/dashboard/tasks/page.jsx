
"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskModal from "@/components/tasks/TaskModal";
import { ListChecks, Plus, CheckCircle, AlertCircle, Clock, Circle, Edit, Trash2, Filter } from "lucide-react";

export default function TasksPage() {
    const { tasks, members, loading, addTask, updateTask, deleteTask } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    const statusIcon = (s) => {
        const map = {
            done: <CheckCircle size={18} className="text-success" />,
            overdue: <AlertCircle size={18} className="text-danger" />,
            in_progress: <Clock size={18} className="text-accent" />,
            pending: <Circle size={18} className="text-border" />
        };
        return map[s] || map.pending;
    };

    const priorityBadge = (p) => {
        const map = { high: "bg-danger/[0.08] text-danger", medium: "bg-accent/[0.12] text-[#8B7724]", low: "bg-info/[0.08] text-info" };
        return <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${map[p] || map.medium}`}>{p}</span>;
    };

    const handleAdd = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSave = async (data) => {
        if (editingTask) {
            await updateTask(editingTask.id, data);
        } else {
            await addTask(data);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            await deleteTask(id);
        }
    };

    const toggleStatus = async (task) => {
        const newStatus = task.status === "done" ? "pending" : "done";
        await updateTask(task.id, { status: newStatus });
    };

    const filteredTasks = tasks.filter(t => {
        if (filterStatus === "all") return true;
        if (filterStatus === "done") return t.status === "done";
        if (filterStatus === "pending") return t.status !== "done";
        return t.status === filterStatus;
    });

    const doneCount = tasks.filter((t) => t.status === "done").length;
    const totalCount = tasks.length;
    const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

    if (loading) return <div className="p-8 text-center text-text-muted">Loading tasks...</div>;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <ListChecks size={22} className="text-primary" /> Tasks & Checklist
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">{doneCount}/{totalCount} tasks completed</p>
                </div>
                <button onClick={handleAdd} className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start">
                    <Plus size={16} /> Add Task
                </button>
            </div>

            {/* Progress Bar & Filter */}
            <div className="bg-bg-card rounded-xl border border-border-light p-5 space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-text-muted">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2.5 bg-bg-alt rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${Math.min(progress, 100)}%` }} />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm border-t border-border-light pt-4">
                    <Filter size={14} className="text-text-muted" />
                    <span className="text-text-muted">Filter:</span>
                    {["all", "pending", "done"].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1 rounded-full capitalize transition-colors ${filterStatus === s ? "bg-primary/10 text-primary font-medium" : "text-text-muted hover:bg-bg-alt"}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
                {filteredTasks.map((t) => (
                    <div
                        key={t.id}
                        className={`group flex items-center gap-3 p-3.5 rounded-lg border transition-all ${t.status === "overdue" ? "bg-danger/[0.03] border-danger/10" :
                                t.status === "done" ? "bg-bg-alt border-border-light opacity-70" :
                                    "bg-bg-card border-border-light hover:shadow-sm"
                            }`}
                    >
                        <button
                            onClick={() => toggleStatus(t)}
                            className="flex-shrink-0 hover:scale-110 transition-transform"
                        >
                            {statusIcon(t.status)}
                        </button>

                        <div className="flex-1 min-w-0 pointer-events-none sm:pointer-events-auto" onClick={() => handleEdit(t)}>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-sm font-medium cursor-pointer hover:text-primary transition-colors ${t.status === "done" ? "line-through text-text-muted" : ""}`}>
                                    {t.title}
                                </span>
                                {priorityBadge(t.priority)}
                            </div>
                            <div className="text-xs text-text-muted flex items-center gap-2">
                                {t.assigneeName !== 'Unassigned' && <span>Assigned to {t.assigneeName}</span>}
                                {t.due_date && <span>· Due {new Date(t.due_date).toLocaleDateString()}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(t)} className="p-1.5 hover:bg-primary/10 text-primary rounded transition-colors">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-danger/10 text-danger rounded transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredTasks.length === 0 && !loading && (
                    <div className="text-center py-12 text-text-muted text-sm bg-bg-card rounded-xl border border-border-light border-dashed">
                        No tasks found directly matching filters.
                    </div>
                )}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingTask}
                members={members}
            />
        </div>
    );
}
