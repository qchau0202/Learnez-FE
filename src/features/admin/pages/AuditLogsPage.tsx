import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AUDIT_LOGS = [
  { timestamp: "2025-03-11 14:32:01", user: "admin", action: "User created", impact: "MSSV004 added" },
  { timestamp: "2025-03-11 13:15:22", user: "admin", action: "Course updated", impact: "CS101 - Lecturer assigned" },
  { timestamp: "2025-03-11 11:08:45", user: "lecturer_01", action: "Grade submitted", impact: "Assignment A1 - 45 students" },
  { timestamp: "2025-03-11 09:42:10", user: "admin", action: "User deactivated", impact: "MSSV099" },
  { timestamp: "2025-03-10 16:20:33", user: "admin", action: "Bulk import", impact: "32 users imported" },
]

export function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Audit Logs</h1>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-base">System Activity</CardTitle>
          <p className="text-sm text-gray-500">
            Chronological record of actions and their impact
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Impact</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOGS.map((log, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 font-mono text-slate-700">{log.timestamp}</td>
                    <td className="py-3 text-slate-900">{log.user}</td>
                    <td className="py-3 text-slate-700">{log.action}</td>
                    <td className="py-3 text-gray-500">{log.impact}</td>
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
