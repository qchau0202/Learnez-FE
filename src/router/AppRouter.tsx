import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppLayout } from "@/components/layout/AppLayout"
import { ROUTES } from "@/routes"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { SchedulePage } from "@/features/schedule/pages/SchedulePage"
import { AccountManagementPage } from "@/features/iam/pages/AccountManagementPage"
import { LoginPage } from "@/features/iam/pages/LoginPage"
import { CourseDetailPage } from "@/features/course/pages/CourseDetailPage"
import { CourseListPage } from "@/features/course/pages/CourseListPage"
import { EnrollmentPage } from "@/features/course/pages/EnrollmentPage"
import { AttendancePage } from "@/features/assessment/pages/AttendancePage"
import { AssignmentListPage } from "@/features/assessment/pages/AssignmentListPage"
import { GradingPage } from "@/features/assessment/pages/GradingPage"
import { NotificationCenterPage } from "@/features/assessment/pages/NotificationCenterPage"
import { ActivityDashboardPage } from "@/features/activity/pages/ActivityDashboardPage"
import { AnalyticsPage } from "@/features/activity/pages/AnalyticsPage"
import { StoragePage } from "@/features/storage/pages/StoragePage"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={<DashboardPage />}
          />
          <Route path={ROUTES.SCHEDULE} element={<SchedulePage />} />
          <Route
            path={ROUTES.ACCOUNTS}
            element={<AccountManagementPage />}
          />
          <Route path={ROUTES.COURSES} element={<CourseListPage />} />
          <Route
            path="/courses/:courseId"
            element={<CourseDetailPage />}
          />
          <Route
            path="/courses/:courseId/enrollment"
            element={<EnrollmentPage />}
          />
          <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
          <Route
            path={ROUTES.ASSIGNMENTS}
            element={<AssignmentListPage />}
          />
          <Route path={ROUTES.GRADING} element={<GradingPage />} />
          <Route
            path={ROUTES.NOTIFICATIONS}
            element={<NotificationCenterPage />}
          />
          <Route path={ROUTES.ACTIVITY} element={<ActivityDashboardPage />} />
          <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
          <Route path={ROUTES.STORAGE} element={<StoragePage />} />
          <Route
            path="*"
            element={
              <div className="text-sm text-muted-foreground">Page not found.</div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
