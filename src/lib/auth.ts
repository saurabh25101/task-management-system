import { apiFetch } from "./api";

export const loginUser = (email: string, password: string) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registerUser = (email: string, password: string) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });