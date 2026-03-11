import { Link } from "react-router-dom"

import { ROUTES } from "@/routes"
import { Menu, UserIcon } from "lucide-react"

type HeaderProps = {
  onToggleSidebar?: () => void
}

/** App header with menu toggle + user area */
export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b bg-background/80 px-4 text-sm">
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-1 text-slate-600 hover:bg-muted hover:text-slate-900 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </button>
        )}
        <Link to={ROUTES.DASHBOARD} className="font-semibold text-primary">
          LMS Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <UserIcon className="size-5" />
          <span className="text-sm font-medium">Student Name</span>
        </div>
      </div>
    </header>
  )
}
