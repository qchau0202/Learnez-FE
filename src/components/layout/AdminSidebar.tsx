import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Brain,
  Settings,
  FileText,
  LogOut,
} from "lucide-react"

import { ROUTES } from "@/routes"
import { cn } from "@/lib/utils"

type AdminSidebarProps = {
  open?: boolean
  onLogout?: () => void
}

const linkBase =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-muted hover:text-slate-900"

const activeLink =
  "bg-sidebar-accent text-sidebar-accent-foreground font-semibold hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

export function AdminSidebar({ open = false, onLogout }: AdminSidebarProps) {
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
          to={ROUTES.ADMIN}
          end
          className={({ isActive }) =>
            cn(linkBase, isActive && activeLink)
          }
        >
          <LayoutDashboard className="size-5 shrink-0" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={ROUTES.ADMIN_USER_MANAGEMENT}
          className={({ isActive }) =>
            cn(linkBase, isActive && activeLink)
          }
        >
          <Users className="size-5 shrink-0" />
          <span>Users</span>
        </NavLink>
        <NavLink
          to={ROUTES.ADMIN_COURSES}
          className={({ isActive }) =>
            cn(linkBase, isActive && activeLink)
          }
        >
          <BookOpen className="size-5 shrink-0" />
          <span>Courses</span>
        </NavLink>
        <NavLink
          to={ROUTES.ADMIN_AI_INSIGHTS}
          className={({ isActive }) =>
            cn(linkBase, isActive && activeLink)
          }
        >
          <Brain className="size-5 shrink-0" />
          <span>Insights</span>
        </NavLink>
        <NavLink
          to={ROUTES.ADMIN_AUDIT_LOGS}
          className={({ isActive }) =>
            cn(linkBase, isActive && activeLink)
          }
        >
          <FileText className="size-5 shrink-0" />
          <span>Audit Logs</span>
        </NavLink>
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-gray-200 pt-4">
      <NavLink
          to={ROUTES.ADMIN_SETTINGS}
          className={({ isActive }) =>
            cn(linkBase, isActive && activeLink)
          }
        >
          <Settings className="size-5 shrink-0" />
          <span>Settings</span>
        </NavLink>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 hover:cursor-pointer"
        >
          <LogOut className="size-5 shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}
