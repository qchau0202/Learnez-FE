import * as React from "react"

import { cn } from "@/lib/utils"

type SelectOption = { value: string; label: string }

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
}: {
  value?: string
  onValueChange?: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-muted"
      >
        <span className={value ? "text-slate-900" : "text-gray-500"}>
          {selected?.label ?? placeholder}
        </span>
      </button>
      {open && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onValueChange?.(opt.value)
                setOpen(false)
              }}
              className="flex w-full items-center px-3 py-2 text-left text-sm text-slate-700 hover:bg-muted"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
