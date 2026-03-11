import { NavLink, useNavigate } from "react-router-dom"
import { Calendar, LayoutDashboard, LogOut, Settings } from "lucide-react"

import { ROUTES } from "@/routes"
import { cn } from "@/lib/utils"

type SidebarProps = {
  open?: boolean
}

const linkInactive =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-muted hover:text-slate-900"

const linkActive =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground font-semibold hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

export function Sidebar({ open = false }: SidebarProps) {
  const navigate = useNavigate()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-gray-200 bg-slate-50 p-4 transition-transform duration-200 md:static md:translate-x-0",
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
