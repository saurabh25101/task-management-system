 "use client";
import { getTasks, createTask, deleteTask, toggleTask, updateTask } from "@/lib/api";
import Navbar from "@/components/common/Navbar";
import TaskModal from "@/components/task/TaskModal";
import TaskTable from "@/components/task/TaskTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Task } from "@/types";
 

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null); // ✅ ADD

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAddTask = async (data: {
  title: string;
  description: string;
  status: string;
}) => {
  try {
    if (editTask) {
      // ✅ UPDATE API CALL (MOST IMPORTANT)
      const res = await updateTask(editTask.id, data);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === editTask.id ? res.data : t
        )
      );

      setEditTask(null);
    } else {
      const res = await createTask(data);
      setTasks((prev) => [res.data, ...prev]);
    }
  } catch (err: any) {
    console.error(err);
  }
};

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = async (id: string) => {
    await toggleTask(id);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "completed" ? "pending" : "completed",
            }
          : t
      )
    );
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setOpen(true);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">My Tasks</h2>

          <Button
            onClick={() => {
              setEditTask(null); // ✅ reset
              setOpen(true);
            }}
            className="flex items-center gap-2 bg-black text-white"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        <TaskTable
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit} // ✅ ADD
        />
      </div>

      <TaskModal
        open={open}
        setOpen={setOpen}
        onSave={handleAddTask}
        initialData={editTask || undefined} // ✅ ADD
      />
    </div>
  );
}