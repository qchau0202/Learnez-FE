import { createContext, ReactNode, useContext, useState } from "react"

export type StudentCourse = {
  id: string
  title: string
  code: string
  category: string
  level: "Fundamental" | "Core" | "Advanced"
  status: "In progress" | "Not started" | "Completed"
  progress: number
  updatedAt: string
  completedAt?: string
  starred: boolean
}

type StudentCoursesContextValue = {
  courses: StudentCourse[]
  toggleStar: (id: string) => void
}

const StudentCoursesContext = createContext<StudentCoursesContextValue | undefined>(
  undefined
)

const INITIAL_COURSES: StudentCourse[] = [
  {
    id: "cs101",
    title: "Programming Fundamentals",
    code: "CS101",
    category: "Programming",
    level: "Fundamental",
    status: "In progress",
    progress: 60,
    updatedAt: "Edited 2h ago",
    starred: true,
  },
  {
    id: "cs201",
    title: "Data Structures & Algorithms",
    code: "CS201",
    category: "Programming",
    level: "Core",
    status: "Not started",
    progress: 0,
    updatedAt: "Edited 1d ago",
    starred: false,
  },
  {
    id: "db101",
    title: "Relational Databases",
    code: "DB101",
    category: "Database",
    level: "Core",
    status: "In progress",
    progress: 35,
    updatedAt: "Edited 4h ago",
    starred: false,
  },
  {
    id: "ai101",
    title: "Introduction to AI Concepts",
    code: "AI101",
    category: "AI & ML",
    level: "Advanced",
    status: "Not started",
    progress: 0,
    updatedAt: "Edited 3d ago",
    starred: true,
  },
]

export function StudentCoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<StudentCourse[]>(INITIAL_COURSES)

  const toggleStar = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    )
  }

  return (
    <StudentCoursesContext.Provider value={{ courses, toggleStar }}>
      {children}
    </StudentCoursesContext.Provider>
  )
}

export function useStudentCourses() {
  const ctx = useContext(StudentCoursesContext)
  if (!ctx) {
    throw new Error("useStudentCourses must be used within StudentCoursesProvider")
  }
  return ctx
}

