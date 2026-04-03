import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function TaskCard({ task }: any) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm hover:shadow-md transition">
      
      <div className="flex items-center gap-3">
        <Checkbox checked={task.completed} />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    </div>
  );
}