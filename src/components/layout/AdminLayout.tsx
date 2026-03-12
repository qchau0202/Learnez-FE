import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { ROUTES } from "@/routes"

export function AdminLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => navigate(ROUTES.LOGIN)

  return (
    <AppShell>
      <div className="flex min-h-svh">
        <AdminSidebar
          open={sidebarOpen}
          onLogout={handleLogout}
        />
        <div className="flex min-h-svh flex-1 flex-col">
          <AdminHeader
            onToggleSidebar={() => setSidebarOpen((o) => !o)}
            onLogout={handleLogout}
          />
          <main className="flex-1 overflow-auto bg-slate-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AppShell>
  )
}
