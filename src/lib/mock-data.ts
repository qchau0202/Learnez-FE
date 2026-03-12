/**
 * Centralized mock data for university LMS.
 * Hierarchy: Faculty → Major → Class (students) | Course (enrollment)
 * - 1 class has many students
 * - Students can attend different courses (many-to-many)
 * - Courses can have many students
 */

export const FACULTIES = [
  { id: "F1", name: "Engineering" },
  { id: "F2", name: "Business Administration" },
  { id: "F3", name: "Science" },
] as const

export const MAJORS = [
  { id: "M1", name: "Computer Science", facultyId: "F1" },
  { id: "M2", name: "Electrical Engineering", facultyId: "F1" },
  { id: "M3", name: "Business Administration", facultyId: "F2" },
  { id: "M4", name: "Economics", facultyId: "F2" },
  { id: "M5", name: "Mathematics", facultyId: "F3" },
  { id: "M6", name: "Biology", facultyId: "F3" },
] as const

export const CLASSES = [
  { id: "C1", name: "CNTT-K52", majorId: "M1", facultyId: "F1" },
  { id: "C2", name: "CNTT-K53", majorId: "M1", facultyId: "F1" },
  { id: "C3", name: "DienTu-K52", majorId: "M2", facultyId: "F1" },
  { id: "C4", name: "QTKD-K53", majorId: "M3", facultyId: "F2" },
  { id: "C5", name: "KTE-K52", majorId: "M4", facultyId: "F2" },
  { id: "C6", name: "Toan-K53", majorId: "M5", facultyId: "F3" },
] as const

export const LECTURERS = [
  { id: "GV001", name: "Tran Thi B", facultyId: "F1" },
  { id: "GV002", name: "Nguyen Van D", facultyId: "F1" },
  { id: "GV003", name: "Le Thi E", facultyId: "F3" },
  { id: "GV004", name: "Pham Van H", facultyId: "F2" },
] as const

export const STUDENTS = [
  { id: "1", name: "Nguyen Van A", mssv: "523K0001", classId: "C1", status: "Active" as const, lastLogin: "2025-03-11 09:00" },
  { id: "2", name: "Le Van C", mssv: "523K0002", classId: "C1", status: "Inactive" as const, lastLogin: "2025-03-05 14:00" },
  { id: "3", name: "Pham Thi F", mssv: "523K0003", classId: "C1", status: "Active" as const, lastLogin: "2025-03-10 11:20" },
  { id: "4", name: "Hoang Van G", mssv: "523K0004", classId: "C2", status: "Active" as const, lastLogin: "2025-03-11 08:15" },
  { id: "5", name: "Truong Thi H", mssv: "523K0005", classId: "C2", status: "Active" as const, lastLogin: "2025-03-09 16:00" },
  { id: "6", name: "Vo Van I", mssv: "524K0001", classId: "C3", status: "Active" as const, lastLogin: "2025-03-11 07:30" },
  { id: "7", name: "Dang Thi K", mssv: "521K0001", classId: "C4", status: "Active" as const, lastLogin: "2025-03-10 09:45" },
  { id: "8", name: "Bui Van L", mssv: "522K0002", classId: "C5", status: "Inactive" as const, lastLogin: "2025-02-28 12:00" },
] as const

/** Course enrollments: courseId -> studentIds */
export const COURSE_ENROLLMENTS: Record<string, string[]> = {
  "1": ["1", "2", "3", "4"],
  "2": ["1", "3", "4", "5"],
  "3": ["1", "2", "6", "8"],
  "4": ["7", "8"],
}

export const COURSES = [
  { id: "1", name: "Introduction to Programming", code: "CS101", lecturerId: "GV001", facultyId: "F1", majorId: "M1", semester: "2025-1" },
  { id: "2", name: "Data Structures", code: "CS201", lecturerId: "GV002", facultyId: "F1", majorId: "M1", semester: "2025-1" },
  { id: "3", name: "Linear Algebra", code: "MATH101", lecturerId: "GV003", facultyId: "F3", majorId: "M5", semester: "2025-1" },
  { id: "4", name: "Principles of Economics", code: "ECON101", lecturerId: "GV004", facultyId: "F2", majorId: "M4", semester: "2025-1" },
] as const

export function getFaculty(id: string) {
  return FACULTIES.find((f) => f.id === id)
}

export function getMajor(id: string) {
  return MAJORS.find((m) => m.id === id)
}

export function getClass(id: string) {
  return CLASSES.find((c) => c.id === id)
}

export function getMajorsByFaculty(facultyId: string) {
  return MAJORS.filter((m) => m.facultyId === facultyId)
}

export function getClassesByMajor(majorId: string) {
  return CLASSES.filter((c) => c.majorId === majorId)
}

export function getClassesByFaculty(facultyId: string) {
  return CLASSES.filter((c) => c.facultyId === facultyId)
}

export function getStudentsByClass(classId: string) {
  return STUDENTS.filter((s) => s.classId === classId)
}

export type Student = (typeof STUDENTS)[number]

export type Course = {
  id: string
  name: string
  code: string
  facultyId: string
  majorId: string
  lecturerId: string
  lecturer: { id: string; name: string }
  semester: string
  totalStudents: number
}

export function getCourseEnrollments(courseId: string): string[] {
  return COURSE_ENROLLMENTS[courseId] ?? []
}

export function getStudentsNotInCourse(
  _courseId: string,
  enrolledIds: string[]
): { id: string; name: string; classId: string }[] {
  return STUDENTS.filter((s) => !enrolledIds.includes(s.id)).map((s) => ({
    id: s.id,
    name: s.name,
    classId: s.classId,
  }))
}

export function getCourses(): Course[] {
  return COURSES.map((c) => {
    const lecturer = LECTURERS.find((l) => l.id === c.lecturerId)
    const enrolled = getCourseEnrollments(c.id)
    return {
      id: c.id,
      name: c.name,
      code: c.code,
      facultyId: c.facultyId,
      majorId: c.majorId,
      lecturerId: c.lecturerId,
      lecturer: lecturer ? { id: lecturer.id, name: lecturer.name } : { id: c.lecturerId, name: "Unknown" },
      semester: c.semester,
      totalStudents: enrolled.length,
    }
  })
}

export function getFacultyName(id: string) {
  return getFaculty(id)?.name ?? "-"
}

export function getMajorName(id: string) {
  return getMajor(id)?.name ?? "-"
}

export function getClassName(id: string) {
  return getClass(id)?.name ?? "-"
}

export type UserRow = {
  id: string
  name: string
  mssv: string
  role: "Student" | "Lecturer"
  facultyId: string | null
  majorId: string | null
  classId: string | null
  status: "Active" | "Inactive"
  lastLogin: string
}

/** Combined users for User Management - students and lecturers */
export const MOCK_USERS: UserRow[] = [
  ...STUDENTS.map((s) => {
    const cls = getClass(s.classId)
    return {
      id: s.id,
      name: s.name,
      mssv: s.mssv,
      role: "Student" as const,
      facultyId: cls?.facultyId ?? null,
      majorId: cls?.majorId ?? null,
      classId: s.classId,
      status: s.status,
      lastLogin: s.lastLogin,
    }
  }),
  ...LECTURERS.map((l) => ({
    id: l.id,
    name: l.name,
    mssv: l.id,
    role: "Lecturer" as const,
    facultyId: l.facultyId,
    majorId: null as string | null,
    classId: null as string | null,
    status: "Active" as const,
    lastLogin: "-",
  })),
]
