import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Activity, TrendingUp } from "lucide-react"

export function AdminDashboardPage() {
  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "text-primary" },
    { label: "Active Courses", value: "42", icon: BookOpen, color: "text-emerald-600" },
    { label: "Active Sessions", value: "89", icon: Activity, color: "text-amber-600" },
    { label: "Avg Completion", value: "78%", icon: TrendingUp, color: "text-blue-600" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {label}
              </CardTitle>
              <Icon className={`size-5 ${color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• Manage users and roles</p>
            <p>• Assign lecturers to courses</p>
            <p>• View AI-driven insights and at-risk students</p>
            <p>• Review audit logs</p>
          </CardContent>
        </Card> */}
        {/* <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Recent system activity will appear here.
            </p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
