 const BASE_URL = "http://localhost:5000";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};

// ================= AUTH =================

export const loginUser = (data: {
  email: string;
  password: string;
}) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registerUser = (data: {
  email: string;
  password: string;
}) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

// ================= TASKS =================

export const getTasks = () => apiFetch("/tasks");

export const createTask = (data: {
  title: string;
  description?: string;
}) =>
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
  export const updateTask = (id: string, data: any) =>
  apiFetch(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });