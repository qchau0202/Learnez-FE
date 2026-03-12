import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Select } from "@/components/ui/select"
import { Plus, MoreVertical, Upload } from "lucide-react"
import {
  MOCK_USERS,
  FACULTIES,
  MAJORS,
  CLASSES,
  getFacultyName,
  getMajorName,
  getClassName,
} from "@/lib/mock-data"

const ROLE_OPTIONS = [
  { value: "all", label: "All Roles" },
  { value: "Student", label: "Student" },
  { value: "Lecturer", label: "Lecturer" },
]

const FACULTY_OPTIONS = [
  { value: "all", label: "All Faculties" },
  ...FACULTIES.map((f) => ({ value: f.id, label: f.name })),
]

const MAJOR_OPTIONS = [
  { value: "all", label: "All Majors" },
  ...MAJORS.map((m) => ({ value: m.id, label: m.name })),
]

const CLASS_OPTIONS = [
  { value: "all", label: "All Classes" },
  ...CLASSES.map((c) => ({ value: c.id, label: c.name })),
]

export function UserManagementPage() {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [facultyFilter, setFacultyFilter] = useState<string>("all")
  const [majorFilter, setMajorFilter] = useState<string>("all")
  const [classFilter, setClassFilter] = useState<string>("all")

  const filteredUsers = MOCK_USERS.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.mssv.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "all" || u.role === roleFilter
    const matchFaculty = facultyFilter === "all" || u.facultyId === facultyFilter
    const matchMajor = majorFilter === "all" || u.majorId === majorFilter
    const matchClass = classFilter === "all" || u.classId === classFilter
    return matchSearch && matchRole && matchFaculty && matchMajor && matchClass
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage students and lecturers by faculty, major, and class
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 size-4" />
            Bulk Import
          </Button>
          <Button size="sm" onClick={() => setAddUserOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="min-w-[200px] flex-1">
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-gray-200 bg-white"
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
          options={ROLE_OPTIONS}
          placeholder="Role"
          className="w-[140px]"
        />
        <Select
          value={facultyFilter}
          onValueChange={setFacultyFilter}
          options={FACULTY_OPTIONS}
          placeholder="Faculty"
          className="w-[180px]"
        />
        <Select
          value={majorFilter}
          onValueChange={setMajorFilter}
          options={MAJOR_OPTIONS}
          placeholder="Major"
          className="w-[180px]"
        />
        <Select
          value={classFilter}
          onValueChange={setClassFilter}
          options={CLASS_OPTIONS}
          placeholder="Class"
          className="w-[140px]"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-medium text-slate-900">Name</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">ID (MSSV/MSGV)</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Role</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Faculty</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Major</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Class</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Status</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Last Login</th>
              <th className="px-4 py-3 text-right font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{u.mssv}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {u.facultyId ? getFacultyName(u.facultyId) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {u.majorId ? getMajorName(u.majorId) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {u.classId ? getClassName(u.classId) : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.lastLogin}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu
                    trigger={
                      <Button variant="ghost" size="icon-xs">
                        <MoreVertical className="size-4" />
                      </Button>
                    }
                  >
                    <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}} destructive>
                      Deactivate
                    </DropdownMenuItem>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserDialog open={addUserOpen} onOpenChange={setAddUserOpen} />
    </div>
  )
}

const ADD_ROLE_OPTIONS = [
  { value: "Student", label: "Student" },
  { value: "Lecturer", label: "Lecturer" },
]

function AddUserDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [role, setRole] = useState("")
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add User"
      description="Create a new student or lecturer account"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onOpenChange(false)
        }}
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Full Name</label>
          <Input placeholder="Enter full name" className="border-gray-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">ID (MSSV/MSGV)</label>
          <Input placeholder="e.g. 523K0001 or GV001" className="border-gray-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Role</label>
          <Select
            value={role}
            onValueChange={setRole}
            options={ADD_ROLE_OPTIONS}
            placeholder="Select role"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Faculty</label>
          <Select
            value=""
            onValueChange={() => {}}
            options={FACULTY_OPTIONS.filter((o) => o.value !== "all")}
            placeholder="Select faculty"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Major</label>
          <Select
            value=""
            onValueChange={() => {}}
            options={MAJOR_OPTIONS.filter((o) => o.value !== "all")}
            placeholder="Select major"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Class (students only)</label>
          <Select
            value=""
            onValueChange={() => {}}
            options={CLASS_OPTIONS.filter((o) => o.value !== "all")}
            placeholder="Select class"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </Dialog>
  )
}
