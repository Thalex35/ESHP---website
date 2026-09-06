import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  IdCard,
} from "lucide-react";

import { PageHeader, StatCard } from "@/components/common/StatCard";
import { EmptyState, ErrorState, StatCardSkeleton } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { displayName, useAuth } from "@/hooks/use-auth";
import { useStudentRecord } from "@/lib/school-data";

export const Route = createFileRoute("/_authenticated/student/")({
  head: () => ({ meta: [{ title: "Student dashboard" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { user, profile } = useAuth();
  const { data: record, isLoading, isError, refetch } = useStudentRecord(user?.id);

  return (
    <DashboardLayout workspace="student">
      <div className="space-y-6">
        <PageHeader
          title={`Welcome, ${displayName(profile, user?.email)}`}
          description="Your academic information will appear here as the school publishes it."
        />

        {isLoading ? (
          <StatCardSkeleton />
        ) : isError ? (
          <ErrorState
            description="We couldn't load your student record."
            onRetry={() => void refetch()}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Student ID"
              value={record?.student_number ?? "Not assigned"}
              hint={record ? `Status: ${record.status}` : "Assigned by the school administration"}
              icon={IdCard}
            />
            <StatCard
              label="Class"
              value={record?.classes?.name ?? "Not assigned"}
              hint={record?.classes?.academic_year ?? "You will be placed in a class by the office"}
              icon={BookOpen}
            />
            <StatCard
              label="Academic average"
              value="—"
              hint="Available once your teachers publish grades"
              icon={GraduationCap}
            />
            <StatCard
              label="Assignments"
              value="0"
              hint="No assignments yet"
              icon={ClipboardList}
            />
            <StatCard label="Attendance" value="—" hint="Attendance tracking coming soon" icon={CalendarCheck} />
            <StatCard label="Notifications" value="0" hint="You're all caught up" icon={Bell} />
          </div>
        )}

        {!isLoading && !isError && !record ? (
          <EmptyState
            icon={IdCard}
            title="No student record linked to your account yet"
            description="Your account exists, but the school office has not yet created your student file. Once it does, your ID, class and academic information will appear here."
          />
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent grades</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={GraduationCap}
                title="No grades yet"
                description="Grades will appear here once your teachers publish them."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Bell}
                title="You're all caught up"
                description="School announcements and reminders will be shown here."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
