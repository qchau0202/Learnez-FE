/** API client configuration */

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const isJson = options?.body && !(options.body instanceof FormData)
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(isJson && { "Content-Type": "application/json" }),
      ...(options?.headers as HeadersInit),
    },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const text = await res.text()
  return (text ? JSON.parse(text) : null) as T
}
