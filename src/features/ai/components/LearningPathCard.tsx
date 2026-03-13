import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type LearningPathStep = {
  label: string
  status: string
  reason: string
  type: string
  duration: string
}

type LearningPathCardProps = {
  steps: LearningPathStep[]
  activeIndex: number
  onChangeActive: (index: number) => void
}

export function LearningPathCard({
  steps,
  activeIndex,
  onChangeActive,
}: LearningPathCardProps) {
  const activeStep = steps[activeIndex]

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <span>My Learning Path</span>
          <Badge variant="outline" className="text-xs">
            AI-generated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {activeIndex + 1} of {steps.length}
          </span>
          <span>
            Estimated duration:{" "}
            <span className="font-medium text-slate-900">
              {activeStep.duration}
            </span>
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100">
          <div
            className="h-1.5 rounded-full bg-primary transition-all"
            style={{
              width: `${((activeIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {steps.map((step, idx) => {
            const isActive = idx === activeIndex
            const isCompleted = step.status === "Completed"
            const isNext = !isCompleted && idx === activeIndex + 1

            return (
              <button
                key={step.label}
                type="button"
                onClick={() => onChangeActive(idx)}
                className={`flex items-start gap-3 rounded-md border bg-slate-50/60 p-3 text-left transition-colors ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-dashed border-gray-200 hover:border-primary/60"
                }`}
              >
                <div
                  className={`mt-1 flex size-7 items-center justify-center rounded-full text-xs font-semibold ${
                    isCompleted
                      ? "bg-emerald-100 text-emerald-700"
                      : isActive
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">
                      {step.label}
                    </p>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Badge variant="outline">{step.type}</Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase tracking-wide"
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.reason}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Est. duration:{" "}
                    <span className="font-medium text-slate-900">
                      {step.duration}
                    </span>
                  </p>
                  {isActive && (
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="font-medium text-primary">
                        You&apos;re here now
                      </span>
                      <Button size="xs" variant="outline">
                        Open related courses
                      </Button>
                    </div>
                  )}
                  {isNext && !isActive && (
                    <p className="pt-1 text-[11px] font-medium text-amber-600">
                      Up next in your path
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

