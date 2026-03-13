import { useMemo, useState } from "react"

import {
  LayoutGrid,
  List,
  Star,
  StarOff,
  Filter,
  ArrowUpDown,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStudentCourses } from "@/features/dashboard/context/StudentCoursesContext"

type ViewMode = "grid" | "list"
type SortOption = "recent" | "progress-asc" | "progress-desc"

export function DashboardPage() {
  const { courses, toggleStar } = useStudentCourses()
  const [search, setSearch] = useState("")
  const [view, setView] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const [showStarredOnly, setShowStarredOnly] = useState(false)

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) =>
        c.title.toLowerCase().includes(search.trim().toLowerCase())
      )
      .filter((c) => (showStarredOnly ? c.starred : true))
      .slice()
      .sort((a, b) => {
        if (sortBy === "recent") {
          return a.updatedAt < b.updatedAt ? 1 : -1
        }
        if (sortBy === "progress-asc") {
          return a.progress - b.progress
        }
        if (sortBy === "progress-desc") {
          return b.progress - a.progress
        }
        return 0
      })
  }, [courses, search, showStarredOnly, sortBy])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Course overview</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="hidden sm:inline">
              {courses.filter((c) => c.status === "In progress").length} in progress
            </span>
            <span>{courses.filter((c) => c.starred).length} starred</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 bg-white border-gray-200"
            />
            <Button
              type="button"
              size="sm"
              className="inline-flex items-center gap-1 text-xs text-slate-600 bg-white border-gray-200 hover:bg-gray-100"
            >
              <Filter className="size-3.5" />
              Filters
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 rounded-md bg-white border-gray-200 h-9 p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border-gray-200 ${
                  view === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-600 hover:bg-gray-100"
                }`}
              >
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border-gray-200 ${
                  view === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-600 hover:bg-gray-100"
                }`}
              >
                <List className="size-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                setSortBy((prev) =>
                  prev === "recent"
                    ? "progress-desc"
                    : prev === "progress-desc"
                      ? "progress-asc"
                      : "recent"
                )
              }
              className="inline-flex items-center gap-1 rounded-md border border-dashed border-gray-200 h-9 p-1"
            >
              <ArrowUpDown className="size-3.5" />
              <span className="text-[11px] text-slate-700">
                {sortBy === "recent"
                  ? "Sort: Recently updated"
                  : sortBy === "progress-desc"
                    ? "Sort: Progress high → low"
                    : "Sort: Progress low → high"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowStarredOnly((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-md h-9 p-1 text-xs border-gray-200 ${
                showStarredOnly
                  ? "bg-primary text-primary-foreground"
                  : "border border-dashed border-gray-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {showStarredOnly ? (
                <Star className="size-3.5" />
              ) : (
                <StarOff className="size-3.5" />
              )}
              <span>Starred only</span>
            </button>
          </div>
        </div>
      </div>
      {/* Courses */}
      {filteredCourses.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No courses match your current filters.
        </p>
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              view="grid"
              onToggleStar={() => toggleStar(course.id)}
              {...course}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              view="list"
              onToggleStar={() => toggleStar(course.id)}
              {...course}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type CourseCardProps = {
  view: ViewMode
  onToggleStar: () => void
} & ReturnType<typeof useStudentCourses>["courses"][number]

function CourseCard({
  view,
  onToggleStar,
  title,
  code,
  category,
  status,
  progress,
  updatedAt,
  starred,
}: CourseCardProps) {
  const progressColor =
    progress >= 80
      ? "bg-emerald-50 text-emerald-700"
      : progress >= 40
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-50 text-slate-700"

  const progressLabel =
    progress === 0 ? "Not started" : progress === 100 ? "Completed" : "In progress"

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-muted-foreground">{code}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleStar()
          }}
          className={`rounded-full p-1 ${starred ? "text-amber-500" : "text-slate-400 hover:text-amber-500"
            }`}
          aria-label={starred ? "Remove star" : "Star course"}
        >
          <Star className={`size-4 ${starred ? "fill-amber-400" : ""}`} />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px]">
        <Badge variant="outline">{category}</Badge>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
          {status}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{updatedAt}</span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] ${progressColor}`}>
          {progressLabel} · {progress}%
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  )

  if (view === "list") {
    return (
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white p-3 text-left shadow-sm hover:border-primary/50 hover:bg-primary/5"
      >
        <div className="hidden h-12 w-16 rounded-md bg-gradient-to-br from-primary/20 via-accent/40 to-primary/40 sm:block" />
        <div className="flex-1">{content}</div>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition hover:border-primary/50 hover:shadow-md"
    >
      <div className="h-20 bg-gradient-to-r from-primary/15 via-accent/30 to-primary/40" />
      <div className="flex-1 p-3">{content}</div>
    </button>
  )
}


