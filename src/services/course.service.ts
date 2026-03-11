/** Course API service */
import { apiFetch } from "@/lib/api"

export const courseService = {
  list: () => apiFetch("/api/courses"),
  get: (id: string) => apiFetch(`/api/courses/${id}`),
  create: (data: unknown) => apiFetch("/api/courses", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: unknown) => apiFetch(`/api/courses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => apiFetch(`/api/courses/${id}`, { method: "DELETE" }),
}
