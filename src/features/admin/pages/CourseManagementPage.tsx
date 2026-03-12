import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Select } from "@/components/ui/select"
import { Search, Plus, Users, MoreVertical } from "lucide-react"
import {
  FACULTIES,
  MAJORS,
  CLASSES,
  LECTURERS,
  getCourses,
  getCourseEnrollments,
  getStudentsByClass,
  getStudentsNotInCourse,
  type Course,
  type Student,
} from "@/lib/mock-data"

export function CourseManagementPage() {
  const [courses, setCourses] = useState(getCourses())
  const [search, setSearch] = useState("")
  const [facultyFilter, setFacultyFilter] = useState<string>("all")
  const [majorFilter, setMajorFilter] = useState<string>("all")
  const [assignModal, setAssignModal] = useState<{ courseId: string; courseName: string } | null>(null)
  const [manageModal, setManageModal] = useState<{ courseId: string; courseName: string } | null>(null)
  const [addCourseOpen, setAddCourseOpen] = useState(false)

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
    const matchFaculty = facultyFilter === "all" || c.facultyId === facultyFilter
    const matchMajor = majorFilter === "all" || c.majorId === majorFilter
    return matchSearch && matchFaculty && matchMajor
  })

  const facultyOptions = [
    { value: "all", label: "All Faculties" },
    ...FACULTIES.map((f) => ({ value: f.id, label: f.name })),
  ]

  const majorOptions = [
    { value: "all", label: "All Majors" },
    ...MAJORS.map((m) => ({
      value: m.id,
      label: `${m.name} (${FACULTIES.find((f) => f.id === m.facultyId)?.name ?? ""})`,
    })),
  ]

  const handleAssignLecturer = (courseId: string, lecturerId: string) => {
    const lecturer = LECTURERS.find((l) => l.id === lecturerId)
    if (!lecturer) return
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, lecturerId: lecturer.id, lecturer } : c))
    )
    setAssignModal(null)
  }

  const handleAddCourse = (name: string, code: string, facultyId: string, majorId: string, lecturerId: string) => {
    const lecturer = LECTURERS.find((l) => l.id === lecturerId)
    if (!lecturer) return
    const newCourse: Course = {
      id: String(courses.length + 1),
      name,
      code,
      facultyId,
      majorId,
      lecturerId: lecturer.id,
      lecturer,
      semester: "2025-1",
      totalStudents: 0,
    }
    setCourses((prev) => [...prev, newCourse])
    setAddCourseOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Course Management</h1>
          <p className="text-sm text-gray-500">
            Manage courses, lecturers, and enrollments by faculty and major
          </p>
        </div>
        <Button size="sm" onClick={() => setAddCourseOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Course
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by course name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={facultyFilter}
          onValueChange={setFacultyFilter}
          options={facultyOptions}
          placeholder="Faculty"
          className="w-[160px]"
        />
        <Select
          value={majorFilter}
          onValueChange={setMajorFilter}
          options={majorOptions}
          placeholder="Major"
          className="w-[200px]"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-medium text-slate-900">Course Name</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Code</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Faculty</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Major</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Assigned Lecturer</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Semester</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Students</th>
              <th className="px-4 py-3 text-right font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{c.code}</td>
                <td className="px-4 py-3 text-gray-600">
                  {FACULTIES.find((f) => f.id === c.facultyId)?.name ?? "-"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {MAJORS.find((m) => m.id === c.majorId)?.name ?? "-"}
                </td>
                <td className="px-4 py-3 text-gray-600">{c.lecturer.name}</td>
                <td className="px-4 py-3 text-gray-600">{c.semester}</td>
                <td className="px-4 py-3 text-gray-600">{c.totalStudents}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAssignModal({ courseId: c.id, courseName: c.name })}
                    >
                      Assign Lecturer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setManageModal({ courseId: c.id, courseName: c.name })}
                    >
                      <Users className="mr-2 size-4" />
                      Manage Students
                    </Button>
                    <DropdownMenu
                      trigger={
                        <Button variant="ghost" size="icon-xs">
                          <MoreVertical className="size-4" />
                        </Button>
                      }
                    >
                      <DropdownMenuItem onClick={() => setAssignModal({ courseId: c.id, courseName: c.name })}>
                        Change Lecturer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setManageModal({ courseId: c.id, courseName: c.name })}>
                        Manage Students
                      </DropdownMenuItem>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssignLecturerDialog
        open={!!assignModal}
        onOpenChange={(open) => !open && setAssignModal(null)}
        courseName={assignModal?.courseName ?? ""}
        lecturers={LECTURERS.map((l) => ({ id: l.id, name: l.name }))}
        onSelect={(lecturerId) => assignModal && handleAssignLecturer(assignModal.courseId, lecturerId)}
      />

      <ManageStudentsDialog
        open={!!manageModal}
        onOpenChange={(open) => !open && setManageModal(null)}
        courseId={manageModal?.courseId ?? ""}
        courseName={manageModal?.courseName ?? ""}
        courses={courses}
      />

      <AddCourseDialog
        open={addCourseOpen}
        onOpenChange={setAddCourseOpen}
        onAdd={handleAddCourse}
      />
    </div>
  )
}

function AssignLecturerDialog({
  open,
  onOpenChange,
  courseName,
  lecturers,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseName: string
  lecturers: { id: string; name: string }[]
  onSelect: (lecturerId: string) => void
}) {
  const [selected, setSelected] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selected) {
      onSelect(selected)
      setSelected("")
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Assign Lecturer"
      description={`Change the assigned lecturer for ${courseName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Lecturer</label>
          <Select
            value={selected}
            onValueChange={setSelected}
            options={lecturers.map((l) => ({ value: l.id, label: `${l.name} (${l.id})` }))}
            placeholder="Select lecturer"
            className="w-full"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!selected}>
            Assign
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

function ManageStudentsDialog({
  open,
  onOpenChange,
  courseId,
  courseName,
  courses,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseId: string
  courseName: string
  courses: Course[]
}) {
  const [enrollments, setEnrollments] = useState<Record<string, string[]>>(
    () => {
      const init: Record<string, string[]> = {}
      courses.forEach((c) => {
        init[c.id] = getCourseEnrollments(c.id)
      })
      return init
    }
  )

  const enrolled = enrollments[courseId] ?? []
  const allStudents = CLASSES.flatMap((cls) => getStudentsByClass(cls.id))
  const enrolledStudents = enrolled
    .map((id) => allStudents.find((s) => s.id === id))
    .filter(Boolean) as Student[]
  const available = getStudentsNotInCourse(courseId, enrolled)

  const handleAdd = (studentId: string) => {
    setEnrollments((prev) => ({
      ...prev,
      [courseId]: [...(prev[courseId] ?? []), studentId],
    }))
  }

  const handleRemove = (studentId: string) => {
    setEnrollments((prev) => ({
      ...prev,
      [courseId]: (prev[courseId] ?? []).filter((id) => id !== studentId),
    }))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Manage Students"
      description={`Add or remove students from ${courseName}. Students can be from different classes.`}
    >
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm font-medium text-slate-900">
            Enrolled ({enrolledStudents.length})
          </h4>
          <div className="max-h-40 space-y-1 overflow-y-auto rounded border border-gray-200 p-2">
            {enrolledStudents.length === 0 ? (
              <p className="py-2 text-center text-sm text-gray-500">No students enrolled</p>
            ) : (
              enrolledStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-slate-50"
                >
                  <div>
                    <span className="text-sm text-slate-700">
                      {s.name} <span className="font-mono text-gray-500">({s.id})</span>
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {CLASSES.find((c) => c.id === s.classId)?.name}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleRemove(s.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium text-slate-900">Add Student</h4>
          <Select
            value=""
            onValueChange={(v) => v && handleAdd(v)}
            options={available.map((s) => ({
              value: s.id,
              label: `${s.name} (${s.id}) — ${CLASSES.find((c) => c.id === s.classId)?.name ?? ""}`,
            }))}
            placeholder="Select student to add..."
            className="w-full"
          />
          {available.length === 0 && (
            <p className="mt-1 text-xs text-gray-500">
              All available students are already enrolled.
            </p>
          )}
        </div>
        <div className="flex justify-end pt-2">
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </div>
      </div>
    </Dialog>
  )
}

function AddCourseDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (name: string, code: string, facultyId: string, majorId: string, lecturerId: string) => void
}) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [facultyId, setFacultyId] = useState("")
  const [majorId, setMajorId] = useState("")
  const [lecturerId, setLecturerId] = useState("")

  const facultyOpts = FACULTIES.map((f) => ({ value: f.id, label: f.name }))
  const majorOpts = MAJORS.filter((m) => !facultyId || m.facultyId === facultyId).map((m) => ({
    value: m.id,
    label: m.name,
  }))
  const lecturerOpts = LECTURERS.map((l) => ({ value: l.id, label: `${l.name} (${l.id})` }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && code && facultyId && majorId && lecturerId) {
      onAdd(name, code, facultyId, majorId, lecturerId)
      setName("")
      setCode("")
      setFacultyId("")
      setMajorId("")
      setLecturerId("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add Course"
      description="Create a new course and assign to a faculty and major"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Course Name</label>
          <Input
            placeholder="e.g. Introduction to Programming"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Course Code</label>
          <Input
            placeholder="e.g. CS101"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Faculty</label>
          <Select
            value={facultyId}
            onValueChange={(v) => {
              setFacultyId(v)
              setMajorId("")
            }}
            options={facultyOpts}
            placeholder="Select faculty"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Major</label>
          <Select
            value={majorId}
            onValueChange={setMajorId}
            options={majorOpts}
            placeholder={facultyId ? "Select major" : "Select faculty first"}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Assigned Lecturer</label>
          <Select
            value={lecturerId}
            onValueChange={setLecturerId}
            options={lecturerOpts}
            placeholder="Select lecturer"
            className="w-full"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name || !code || !facultyId || !majorId || !lecturerId}>
            Create Course
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
