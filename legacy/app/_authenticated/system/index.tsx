import { createFileRoute } from "@tanstack/react-router";
import { Activity, Database, GraduationCap, ScrollText, Server, Users } from "lucide-react";

import { PageHeader, StatCard } from "@/components/common/StatCard";
import { EmptyState, ErrorState, StatCardSkeleton } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatformStats } from "@/lib/school-data";

export const Route = createFileRoute("/_authenticated/system/")({
  head: () => ({ meta: [{ title: "System administration" }] }),
  component: SystemDashboard,
});

function SystemDashboard() {
  const { data, isLoading, isError, refetch } = usePlatformStats();

  // Database reachability is inferred from the statistics query itself.
  const databaseHealthy = !isError && !isLoading;

  return (
    <DashboardLayout workspace="system">
      <div className="space-y-6">
        <PageHeader
          title="System administration"
          description="Technical overview of the platform. This area is separate from the school administration dashboard."
        />

        {isLoading ? (
          <StatCardSkeleton />
        ) : isError ? (
          <ErrorState
            description="We couldn't reach the platform statistics."
            onRetry={() => void refetch()}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Total users"
              value={data?.users ?? 0}
              hint="Accounts with a profile"
              icon={Users}
            />
            <StatCard label="Total students" value={data?.students ?? 0} hint="Student records" icon={Users} />
            <StatCard
              label="Total teachers"
              value={data?.teachers ?? 0}
              hint="Teaching staff records"
              icon={GraduationCap}
            />
            <StatCard
              label="Active users"
              value="—"
              hint="Session analytics arrive in a future update"
              icon={Activity}
            />
            <StatCard
              label="System status"
              value={<Badge variant="secondary">Operational</Badge>}
              hint="Application server responding"
              icon={Server}
            />
            <StatCard
              label="Database status"
              value={<Badge variant="secondary">{databaseHealthy ? "Connected" : "Unknown"}</Badge>}
              hint={`${data?.auditEvents ?? 0} audit events recorded`}
              icon={Database}
            />
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Audit logs</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={ScrollText}
                title="No audit events recorded yet"
                description="The audit log table exists and is ready. Sensitive actions will be recorded here as each module is released."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Error monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="No errors reported"
                description="Technical error monitoring will be connected in a future update."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
