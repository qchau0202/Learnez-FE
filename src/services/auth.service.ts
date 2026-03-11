/** Auth API service */
import { apiFetch } from "@/lib/api"

export const authService = {
  login: (email: string, password: string) =>
    apiFetch<{ access_token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => apiFetch("/api/auth/logout", { method: "POST" }),
}
