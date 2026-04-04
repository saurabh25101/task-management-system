 "use client";

import Navbar from "@/components/common/Navbar";
import TaskModal from "@/components/task/TaskModal";
import TaskTable from "@/components/task/TaskTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Task } from "@/types";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Learn Next.js",
      status: "pending",
      description: "Study routing",
      createdAt: new Date().toISOString(),
    },
  ]);

  // ✅ ADD TASK FUNCTION
  const handleAddTask = (data: { title: string; description: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-semibold">My Tasks</h2>

          {/* ✅ BUTTON */}
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-black text-white"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        <TaskTable tasks={tasks} />
      </div>

      {/* ✅ IMPORTANT: onSave pass karo */}
      <TaskModal open={open} setOpen={setOpen} onSave={handleAddTask} />
    </div>
  );
}