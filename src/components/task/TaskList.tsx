import TaskCard from "./TaskCard";

export default function TaskList({ tasks }: unknown) {
  return (
    <div className="space-y-3">
      {tasks.map((task: any) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}