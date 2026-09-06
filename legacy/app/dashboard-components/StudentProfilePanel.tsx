import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/common/states";
import { displayName, useAuth } from "@/hooks/use-auth";
import { ROLE_LABELS } from "@/lib/roles";
import { useStudentRecord } from "@/lib/school-data";

/** Read-only profile view. Editing arrives with the profile-management sprint. */
export function StudentProfilePanel() {
  const { user, profile, role, loading } = useAuth();
  const { data: record, isLoading, isError, refetch } = useStudentRecord(user?.id);

  if (loading || isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }
  if (isError) {
    return (
      <ErrorState description="We couldn't load your profile." onRetry={() => void refetch()} />
    );
  }

  const fields: { label: string; value: string }[] = [
    { label: "Full name", value: displayName(profile, user?.email) },
    { label: "Email", value: profile?.email ?? user?.email ?? "—" },
    { label: "Phone", value: profile?.phone ?? "Not provided" },
    { label: "Role", value: role ? ROLE_LABELS[role] : "No role assigned" },
    { label: "Student ID", value: record?.student_number ?? "Not assigned" },
    { label: "Class", value: record?.classes?.name ?? "Not assigned" },
    { label: "Date of birth", value: record?.date_of_birth ?? "Not provided" },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">My details</CardTitle>
          {record ? <Badge variant="secondary">{record.status}</Badge> : null}
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.label}>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  {field.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{field.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <EmptyState
        title="Profile editing is coming in a future update"
        description="For now, contact the school office to correct any personal information."
      />
    </div>
  );
}
