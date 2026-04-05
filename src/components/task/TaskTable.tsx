"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Task } from "@/types";
import { useEffect, useState } from "react";

import { FilterX, Pencil, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteDialog from "./DeleteDialog";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskTable({
  tasks,
  onDelete,
  onToggle,
  onEdit,
}: Props) {
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredTasks(filtered);
  }, [search, tasks]);

  const allSelected =
    filteredTasks.length > 0 &&
    selectedIds.length === filteredTasks.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTasks.map((t) => t.id));
    }
  };
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteId === "bulk") {
        await Promise.all(selectedIds.map((id) => onDelete(id)));
        toast.success("Tasks deleted successfully ");
      } else if (deleteId) {
        await onDelete(deleteId);
        toast.success("Task deleted successfully ");
      }

      setOpenDialog(false);
      setSelectedIds([]); // reset selection
    } catch (err) {
      console.error(err);
      toast.error("Delete failed ");
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const resetFilter = () => {
    setSearch("");
    setSelectedIds([]);
  };

  return (
    <div className="space-y-5">
      {/* TOP BAR */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64"
            />
          </div>

          {(search || selectedIds.length > 0) && (
            <Button variant="outline" size="sm" onClick={resetFilter}>
              <FilterX className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}

          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDeleteId("bulk");
                setOpenDialog(true);
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="border rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 text-center">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={() => toggleSelectAll()}
                  />
                </th>
                <th className="p-3">Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Description</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => {
                const checked = selectedIds.includes(task.id);

                return (
                  <tr
                    key={task.id}
                    className={`border-t ${checked ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                  >
                    <td className="p-3 text-center">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleSelectOne(task.id)}
                      />
                    </td>

                    <td className="p-3 font-medium">{task.title}</td>

                    <td className="p-3 text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </td>

                    {/* 

 STATUS CLICKABLE */}
                    <td className="p-3">
                      <span
                        onClick={() => onToggle(task.id)}
                        className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium capitalize ${task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "inprogress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {task.status === "inprogress"
                          ? "In Progress"
                          : task.status}
                      </span>
                    </td>

                    <td className="p-3 text-gray-600 max-w-xs truncate">
                      {task.description || "No description"}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        {/* ✏️ EDIT */}
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => onEdit(task)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        {/* 🗑 DELETE */}
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDeleteClick(task.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>


          <DeleteDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={confirmDelete}
          />
        </div>
      </div>
    </div>
  );
}