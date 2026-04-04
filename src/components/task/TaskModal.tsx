 "use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskModalProps } from "@/types";

export default function TaskModal({
  open,
  setOpen,
  onSave,
}: TaskModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSave({ title, description });

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={handleSubmit} className="w-full">
            Save Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}