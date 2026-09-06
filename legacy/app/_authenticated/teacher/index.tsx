import { createFileRoute } from "@tanstack/react-router";
import { Activity, BookOpen, ClipboardList, IdCard, Users } from "lucide-react";

import { PageHeader, StatCard } from "@/components/common/StatCard";
import { EmptyState, ErrorState, StatCardSkeleton } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { displayName, useAuth } from "@/hooks/use-auth";
import { useStudentsInClasses, useTeacherClasses, useTeacherRecord } from "@/lib/school-data";

export const Route = createFileRoute("/_authenticated/teacher/")({
  head: () => ({ meta: [{ title: "Teacher dashboard" }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const { user, profile } = useAuth();
  const teacher = useTeacherRecord(user?.id);
  const classes = useTeacherClasses(teacher.data?.id);
  const studentCount = useStudentsInClasses((classes.data ?? []).map((item) => item.id));

  const isLoading = teacher.isLoading || classes.isLoading;
  const isError = teacher.isError || classes.isError;

  return (
    <DashboardLayout workspace="teacher">
      <div className="space-y-6">
        <PageHeader
          title={`Welcome, ${displayName(profile, user?.email)}`}
          description="An overview of your classes and teaching activity."
        />

        {isLoading ? (
          <StatCardSkeleton />
        ) : isError ? (
          <ErrorState
            description="We couldn't load your teaching data."
            onRetry={() => {
              void teacher.refetch();
              void classes.refetch();
            }}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Employee number"
              value={teacher.data?.employee_number ?? "Not assigned"}
              hint={teacher.data ? `Status: ${teacher.data.status}` : "Assigned by administration"}
              icon={IdCard}
            />
            <StatCard
              label="Assigned classes"
              value={classes.data?.length ?? 0}
              hint="Classes where you are the main teacher"
              icon={BookOpen}
            />
            <StatCard
              label="Students"
              value={studentCount.data ?? 0}
              hint="Enrolled in your classes"
              icon={Users}
            />
            <StatCard
              label="Pending assignments"
              value="0"
              hint="Assignments arrive in a future update"
              icon={ClipboardList}
            />
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">My classes</CardTitle>
            </CardHeader>
            <CardContent>
              {(classes.data?.length ?? 0) === 0 ? (
                <EmptyState
                  icon={BookOpen}
                  title="No classes assigned yet"
                  description="Once the administration assigns you a class, it will appear here."
                />
              ) : (
                <ul className="divide-y divide-border">
                  {classes.data?.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">{item.academic_year}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Activity}
                title="No activity yet"
                description="Grading, attendance and assignment activity will be listed here as those modules are released."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
