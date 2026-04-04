 import { Task } from "../../types";
import TaskTable from "./TaskTable";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return <TaskTable tasks={tasks} />;
}