import { apiFetch } from "./api";

export const getTasks = () => apiFetch("/tasks");

export const createTask = (data: any) =>
  apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteTask = (id: string) =>
  apiFetch(`/tasks/${id}`, {
    method: "DELETE",
  });

export const toggleTask = (id: string) =>
  apiFetch(`/tasks/${id}/toggle`, {
    method: "PATCH",
  });