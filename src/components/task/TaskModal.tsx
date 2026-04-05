 "use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function TaskModal({
  open,
  setOpen,
  onSave,
  initialData,
}: any) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    onSave(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* ✅ STATUS DROPDOWN */}
          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <Button onClick={handleSubmit} className="w-full">
            {initialData ? "Update Task" : "Save Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}