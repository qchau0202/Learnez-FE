import { NavLink, useNavigate } from "react-router-dom"
import { Calendar, LayoutDashboard, LogOut, Settings, Star } from "lucide-react"

import { ROUTES } from "@/routes"
import { cn } from "@/lib/utils"
import { useStudentCourses } from "@/features/dashboard/context/StudentCoursesContext"

type SidebarProps = {
  open?: boolean
}

const linkInactive =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-muted hover:text-slate-900"

const linkActive =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground font-semibold hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

export function Sidebar({ open = false }: SidebarProps) {
  const navigate = useNavigate()
  const { courses } = useStudentCourses()
  const starred = courses.filter((c) => c.starred)

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-50 flex-col border-r border-gray-200 bg-white p-4 transition-transform duration-200 md:static md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <span className="mb-6 text-lg font-bold text-primary">Learnez LMS</span>

      <nav className="flex flex-1 flex-col gap-1">
        <NavLink
          to={ROUTES.DASHBOARD}
          className={({ isActive }) => (isActive ? linkActive : linkInactive)}
        >
          <LayoutDashboard className="size-5 shrink-0" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={ROUTES.SCHEDULE}
          className={({ isActive }) => (isActive ? linkActive : linkInactive)}
        >
          <Calendar className="size-5 shrink-0" />
          <span>Schedule</span>
        </NavLink>
        {starred.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-3">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            Starred
          </p>
          <div className="space-y-1 text-xs">
            {starred.map((course) => (
              <NavLink
                key={course.id}
                to={ROUTES.COURSE_DETAIL(course.id)}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-slate-600 hover:bg-muted hover:text-slate-900"
              >
                <span className="line-clamp-1">{course.title}</span>
                <span className="text-[10px] font-medium text-slate-400">
                  {course.code}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      </nav>



      <div className="mt-auto flex flex-col gap-1 border-t border-gray-200 pt-4">
        <NavLink
          to={ROUTES.SETTINGS}
          className={({ isActive }) => (isActive ? linkActive : linkInactive)}
        >
          <Settings className="size-5 shrink-0" />
          <span>Settings</span>
        </NavLink>
        <button
          type="button"
          onClick={() => navigate(ROUTES.LOGIN)}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-muted"
        >
          <LogOut className="size-5 shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}
