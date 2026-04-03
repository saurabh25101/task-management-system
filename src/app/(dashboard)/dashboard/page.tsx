"use client";

import Navbar from "@/components/common/Navbar";
import TaskList from "@/components/task/TaskList";
import TaskModal from "@/components/task/TaskModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const tasks = [
    { id: 1, title: "Learn Next.js", completed: false },
    { id: 2, title: "Build project", completed: true },
  ];

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Tasks</h2>
          <Button onClick={() => setOpen(true)}>+ Add Task</Button>
        </div>

        <TaskList tasks={tasks} />
      </div>

      <TaskModal open={open} setOpen={setOpen} />
    </div>
  );
}