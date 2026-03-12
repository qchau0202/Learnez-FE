import * as React from "react"

import { cn } from "@/lib/utils"

type DropdownMenuProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "end"
  className?: string
}

export function DropdownMenu({
  trigger,
  children,
  align = "end",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [open])

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1 min-w-[10rem] rounded-md border border-gray-200 bg-white py-1 shadow-lg",
            align === "end" ? "right-0" : "left-0"
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({
  onClick,
  children,
  className,
  destructive,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  destructive?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center px-3 py-2 text-left text-sm hover:bg-muted",
        destructive ? "text-red-600" : "text-slate-700",
        className
      )}
    >
      {children}
    </button>
  )
}
