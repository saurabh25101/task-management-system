 export type TaskStatus = "pending" | "inprogress" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface TaskModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (data: {
    title: string;
    description: string;
  }) => void;
}