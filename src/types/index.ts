/** Shared TypeScript types */

export type UserRole = "admin" | "lecturer" | "student"

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
}
