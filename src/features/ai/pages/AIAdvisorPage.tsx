import { useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Circle,
  X,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LearningPathCard } from "@/features/ai/components/LearningPathCard"

const MOCK_PATH = [
  {
    label: "Fundamentals of Programming",
    status: "Completed",
    reason: "You have strong performance in introductory programming.",
    type: "Core",
    duration: "4 weeks",
  },
  {
    label: "Data Structures",
    status: "In progress",
    reason: "Core topic for your current semester.",
    type: "Core",
    duration: "6 weeks",
  },
  {
    label: "Databases",
    status: "Recommended",
    reason: "Low quiz performance detected in related topics.",
    type: "Support",
    duration: "3 weeks",
  },
  {
    label: "Probability & Statistics",
    status: "Recommended",
    reason: "Needed for upcoming AI / ML courses.",
    type: "Support",
    duration: "4 weeks",
  },
]

const MOCK_STRENGTHS = [
  "Object-Oriented Programming",
  "Algorithmic Thinking",
  "Collaborative project work",
]

const MOCK_WEAKNESSES = [
  "Database normalization",
  "Probability basics",
  "Consistent weekly engagement",
]

const MOCK_ACTIONS = [
  "Finish 2 overdue activities in Databases",
  "Schedule 3 focused study sessions this week",
  "Review probability fundamentals before next quiz",
]

export function AIAdvisorPage() {
  const [completedActions, setCompletedActions] = useState(
    () => MOCK_ACTIONS.map(() => false)
  )
  const [activePathIndex, setActivePathIndex] = useState(1)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const riskLevel = "Medium" as string

  const riskClasses =
    riskLevel === "High"
      ? "bg-red-100 text-red-700"
      : riskLevel === "Medium"
        ? "bg-amber-100 text-amber-700"
        : "bg-emerald-100 text-emerald-700"

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              AI Advisor
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your current learning path, study plan, and risk.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Updated: 5 minutes ago</span>
            <Button size="sm" variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Engagement &amp; performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Engagement level</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                  Medium
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Performance</span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                  On track
                </span>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-md bg-primary/5 p-2">
                  <p className="font-semibold text-primary">80%</p>
                  <p className="text-[11px] text-primary">
                    On-time submissions
                  </p>
                </div>
                <div className="rounded-md bg-emerald-50 p-2">
                  <p className="font-semibold text-emerald-700">4 days</p>
                  <p className="text-[11px] text-emerald-700">Login streak</p>
                </div>
                <div className="rounded-md bg-chart-3/10 p-2">
                  <p className="font-semibold text-slate-900">3.2</p>
                  <p className="text-[11px] text-slate-600">Mock GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Behavior overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Most active</span>
                <span className="font-medium text-slate-900">
                  Weekday evenings
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Typical submissions</span>
                <span className="font-medium text-slate-900">
                  Last 12h before deadline
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Login pattern</span>
                <span className="font-medium text-slate-900">
                  4 of 7 days per week
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Use these patterns to adjust your schedule and reduce last-minute work.
              </p>
            </CardContent>
          </Card>
        </div>
        
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <LearningPathCard
          steps={MOCK_PATH}
          activeIndex={activePathIndex}
          onChangeActive={setActivePathIndex}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Strengths &amp; Weaknesses</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Strengths
              </p>
              <ul className="space-y-1 text-xs">
                {MOCK_STRENGTHS.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 rounded-md bg-emerald-50 px-2 py-1"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-900">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                Needs attention
              </p>
              <ul className="space-y-1 text-xs">
                {MOCK_WEAKNESSES.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2 rounded-md bg-red-50 px-2 py-1"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span className="text-red-900">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base">
              <span>Recommended Courses &amp; Activities</span>
              <Badge variant="outline" className="text-xs">
                Demo
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start justify-between rounded-md bg-slate-50 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Advanced Programming
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Recommended because of strong performance in core programming
                  courses.
                </p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Core
              </Badge>
            </div>
            <div className="flex items-start justify-between rounded-md bg-slate-50 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Databases Practice Lab
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Extra practice to improve weak areas in database design and
                  normalization.
                </p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Support
              </Badge>
            </div>
            <Button size="sm" variant="ghost" className="flex items-center gap-1 px-0 text-xs">
              View all recommendations
              <ArrowRight className="size-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="size-4 text-amber-500" />
                <span>Dropout Risk</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current level</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${riskClasses}`}
                >
                  {riskLevel}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on recent engagement, submission timing, and quiz
                performance, your risk is currently classified as{" "}
                <span className="font-medium text-slate-900">
                  {riskLevel}
                </span>
                . Small, consistent improvements can quickly lower this level.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Study plan</span>
                  <span className="font-medium text-slate-900">
                    {completedActions.filter(Boolean).length}/
                    {MOCK_ACTIONS.length} completed
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all"
                    style={{
                      width: `${
                        (completedActions.filter(Boolean).length /
                          MOCK_ACTIONS.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <ul className="space-y-1">
                  {MOCK_ACTIONS.map((action, index) => {
                    const done = completedActions[index]
                    return (
                      <li key={action}>
                        <button
                          type="button"
                          onClick={() =>
                            setCompletedActions((prev) =>
                              prev.map((v, i) => (i === index ? !v : v))
                            )
                          }
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-colors ${
                            done
                              ? "bg-emerald-50 text-emerald-900"
                              : "bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
                          ) : (
                            <Circle className="size-3.5 shrink-0 text-slate-400" />
                          )}
                          <span
                            className={`text-[11px] ${
                              done ? "line-through" : ""
                            }`}
                          >
                            {action}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CardContent>
          </Card>
      </div>

      <Card className="border-dashed border-gray-300 bg-slate-50/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="size-4 text-primary" />
            <span>Ask the AI Advisor</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-xs text-muted-foreground">
            In a future version, this will be a fully interactive chat
            assistant. For now, use these example questions as guidance.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "Why am I weak in databases?",
              "How can I lower my dropout risk?",
              "Create a 2-week study plan.",
              "Which course should I focus on next?",
            ].map((q) => (
              <button
                key={q}
                type="button"
                className="rounded-full border border-dashed border-gray-300 bg-white px-3 py-1 text-left hover:border-primary hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating chatbot */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-primary" />
              <p className="text-xs font-medium text-slate-900">AI Advisor</p>
            </div>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="space-y-3 px-3 py-3 text-xs">
            <p className="text-muted-foreground">
              This is a mock chat preview. Use the suggested prompts to imagine how
              the AI could support you.
            </p>
            <div className="space-y-1">
              {[
                "Explain why my dropout risk is Medium.",
                "Turn my study plan into a daily routine.",
                "List 3 actions to improve my databases skills.",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="w-full rounded-md border border-dashed border-gray-300 bg-slate-50 px-2 py-1 text-left hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="rounded-md border border-dashed border-gray-200 bg-slate-50 px-2 py-1.5 text-[11px] text-muted-foreground">
              In the real app, you would type here and the AI would respond with
              personalized feedback.
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsChatOpen((open) => !open)}
        className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
        aria-label="Open AI Advisor chat"
      >
        <MessageSquare className="size-5" />
      </button>
    </div>
  )
}

