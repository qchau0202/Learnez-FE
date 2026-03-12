import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ROUTES } from "@/routes"

export function LoginPage() {
  const navigate = useNavigate()
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentId || !password) return
    // Admin login: use "admin" as student ID
    if (studentId.toLowerCase() === "admin") {
      navigate(ROUTES.ADMIN)
      return
    }
    // TODO: wire to auth service for student login
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Card className="rounded-xl border border-gray-200 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Sign in to Learnez LMS
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Sign in with your student credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="student-id"
                  className="text-sm font-semibold text-slate-900"
                >
                  Student ID
                </label>
                <Input
                  id="student-id"
                  type="text"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-900"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="flex items-center text-xs">
                <label className="flex cursor-pointer items-center gap-2">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
              </div>
              <Button
                type="submit"
                className="h-10 w-full font-semibold"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
