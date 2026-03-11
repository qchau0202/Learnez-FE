import { useState } from "react"
import { Outlet } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AppShell>
      <div className="flex min-h-svh">
        <Sidebar open={sidebarOpen} />
        <div className="flex min-h-svh flex-1 flex-col">
          <Header onToggleSidebar={() => setSidebarOpen((open) => !open)} />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AppShell>
  )
}
