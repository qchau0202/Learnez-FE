import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const ANALYTICS = [
  { label: "Total Users", value: "1,247", sub: "Across all roles" },
  { label: "Active Sessions", value: "89", sub: "Currently online" },
  {
    label: "Avg Course Completion",
    value: "72%",
    sub: "Last 30 days",
  },
]

const DROPOUT_RISK_DATA = [
  { name: "Low", value: 820, color: "#22c55e" },
  { name: "Medium", value: 310, color: "#f59e0b" },
  { name: "High", value: 117, color: "#dc2626" },
]

const AT_RISK_STUDENTS = [
  { id: "MSSV001", name: "Nguyen Van A", risk: "High", lastActivity: "5 days ago" },
  { id: "MSSV002", name: "Tran Thi B", risk: "Medium", lastActivity: "3 days ago" },
  { id: "MSSV003", name: "Le Van C", risk: "High", lastActivity: "1 week ago" },
]

const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HEATMAP_HOURS = Array.from({ length: 12 }, (_, i) => `${i + 7}:00`)

function genHeatmapData() {
  return HEATMAP_HOURS.flatMap((hour) =>
    HEATMAP_DAYS.map((day) => ({
      day,
      hour,
      count: Math.floor(Math.random() * 20),
    }))
  )
}

const heatmapData = genHeatmapData()

function getHeatmapValue(day: string, hour: string) {
  return heatmapData.find((d) => d.day === day && d.hour === hour)?.count ?? 0
}

export function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">AI Insights & Analytics</h1>

      {/* Analytics Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {ANALYTICS.map((a) => (
          <Card key={a.label} className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {a.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">{a.value}</p>
              <p className="text-xs text-gray-500">{a.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dropout Risk Pie Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Dropout Risk Distribution</CardTitle>
            <p className="text-sm text-gray-500">
              Students categorized by AI-predicted risk level
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DROPOUT_RISK_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {DROPOUT_RISK_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Student Activity Heatmap</CardTitle>
            <p className="text-sm text-gray-500">
              Login frequency by day and hour
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-0">
                <div className="mb-2 flex justify-end gap-1 text-xs text-gray-500">
                  <span>Low</span>
                  <div className="flex gap-0.5">
                    {[0, 5, 10, 15, 20].map((v) => (
                      <div
                        key={v}
                        className="h-3 w-4 rounded"
                        style={{
                          backgroundColor: `rgb(37, 99, 235, ${0.2 + (v / 20) * 0.8})`,
                        }}
                      />
                    ))}
                  </div>
                  <span>High</span>
                </div>
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr>
                      <th className="w-12 p-1 text-left font-medium text-gray-500" />
                      {HEATMAP_DAYS.map((d) => (
                        <th key={d} className="p-1 font-medium text-gray-500">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HEATMAP_HOURS.map((hour) => (
                      <tr key={hour}>
                        <td className="p-1 text-left text-gray-500">{hour}</td>
                        {HEATMAP_DAYS.map((day) => {
                          const v = getHeatmapValue(day, hour)
                          const opacity = 0.15 + (v / 20) * 0.85
                          return (
                            <td key={day} className="p-0.5">
                              <div
                                className="mx-auto h-5 w-6 rounded"
                                style={{
                                  backgroundColor: `rgb(37, 99, 235, ${opacity})`,
                                }}
                                title={`${day} ${hour}: ${v} logins`}
                              />
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk List */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-base">At-Risk Students</CardTitle>
          <p className="text-sm text-gray-500">
            Flagged by AI model — review and take action
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Risk Level</th>
                  <th className="pb-3 font-medium">Last Activity</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {AT_RISK_STUDENTS.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100">
                    <td className="py-3 font-mono text-slate-700">{s.id}</td>
                    <td className="py-3 text-slate-900">{s.name}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          s.risk === "High"
                            ? "bg-red-100 text-red-700"
                            : s.risk === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {s.risk}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{s.lastActivity}</td>
                    <td className="py-3">
                      <Button size="sm" variant="outline">
                        View Analysis
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
