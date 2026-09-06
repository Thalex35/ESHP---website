import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, GraduationCap, School, Users } from "lucide-react";

import { PageHeader, StatCard } from "@/components/common/StatCard";
import { EmptyState, ErrorState, StatCardSkeleton } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { displayName, useAuth } from "@/hooks/use-auth";
import { useSchoolCounts } from "@/lib/school-data";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "School administration dashboard" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, profile } = useAuth();
  const { data, isLoading, isError, refetch } = useSchoolCounts();

  return (
    <DashboardLayout workspace="admin">
      <div className="space-y-6">
        <PageHeader
          title={`School administration`}
          description={`Signed in as ${displayName(profile, user?.email)}. Live figures from the school database.`}
        />

        {isLoading ? (
          <StatCardSkeleton />
        ) : isError ? (
          <ErrorState
            description="We couldn't load the school statistics."
            onRetry={() => void refetch()}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total students"
              value={data?.students ?? 0}
              hint="Student records in the database"
              icon={Users}
            />
            <StatCard
              label="Total teachers"
              value={data?.teachers ?? 0}
              hint="Teaching staff records"
              icon={GraduationCap}
            />
            <StatCard
              label="Total classes"
              value={data?.classes ?? 0}
              hint="Across all academic years"
              icon={School}
            />
            <StatCard
              label="Pending applications"
              value="—"
              hint="Admissions module not released yet"
              icon={FileCheck2}
            />
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Admission applications</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={FileCheck2}
                title="No applications to review"
                description="Online admissions will be delivered in an upcoming sprint. Applications will then be listed here for review."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">School announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="No announcements published"
                description="Announcement publishing is planned for a future update."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
