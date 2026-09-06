import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Compass } from "lucide-react";

import { EmptyState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { workspacePath } from "@/config/navigation";
import { useAuth } from "@/hooks/use-auth";
import { workspaceForRole } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardRedirect,
});

/** Sends each signed-in user to the workspace matching their role. */
function DashboardRedirect() {
  const { role, loading } = useAuth();
  const navigate = useNavigate();
  const workspace = workspaceForRole(role);

  useEffect(() => {
    if (!loading && workspace) {
      void navigate({ to: workspacePath(workspace), replace: true });
    }
  }, [loading, workspace, navigate]);

  if (loading || workspace) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <EmptyState
        icon={Compass}
        title="No dashboard assigned to your account yet"
        description="Your account does not have a workspace role yet. The school administration assigns roles such as student, teacher or administrator. Parent access is planned for a future update."
        action={
          <Button asChild variant="outline">
            <Link to="/">Back to the school website</Link>
          </Button>
        }
      />
    </div>
  );
}
