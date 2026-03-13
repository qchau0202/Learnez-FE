import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Menu, Search, Bell, Brain, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/routes"

type HeaderProps = {
  onToggleSidebar?: () => void
}

/** App header with menu toggle + user area */
export function Header({ onToggleSidebar }: HeaderProps) {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-md p-2 text-slate-600 hover:bg-muted hover:text-slate-900 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </button>
        )}
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
          onClick={() => navigate(ROUTES.AI_ADVISOR)}
          className="hidden items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-primary hover:bg-primary/5 hover:text-primary sm:flex"
        >
          <Brain className="size-3.5" />
          <span>AI Advisor</span>
        </button>
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
          <div>
            <p className="text-sm font-medium text-slate-900">Student Name</p>
          </div>
        </div>
      </div>
    </header>
  )
}
