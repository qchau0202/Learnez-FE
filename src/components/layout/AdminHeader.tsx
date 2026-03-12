import { useState } from "react"
import { Menu, Search, Bell, User } from "lucide-react"

import { Input } from "@/components/ui/input"

type AdminHeaderProps = {
  onToggleSidebar?: () => void
  onLogout?: () => void
}

export function AdminHeader({
  onToggleSidebar,
  onLogout,
}: AdminHeaderProps) {
  const [search, setSearch] = useState("")

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-slate-600 hover:bg-muted hover:text-slate-900 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border-gray-200 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative rounded-md p-2 text-slate-600 hover:bg-muted hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-4" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-900">Admin</p>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs text-slate-500 hover:text-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
