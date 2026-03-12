import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">System Settings</h1>
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
          <p className="text-sm text-gray-500">
            Configure system-wide settings and preferences
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Settings configuration coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
