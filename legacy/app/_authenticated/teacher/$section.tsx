import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/StatCard";
import { ComingSoon } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WORKSPACE_NAV } from "@/config/navigation";

export const Route = createFileRoute("/_authenticated/teacher/$section")({
  component: TeacherSection,
});

function TeacherSection() {
  const { section } = Route.useParams();
  const item = WORKSPACE_NAV.teacher.find((navItem) => navItem.section === section);
  const title = item?.label ?? "Page not found";

  return (
    <DashboardLayout workspace="teacher">
      <div className="space-y-6">
        <PageHeader title={title} />
        <ComingSoon title={title} />
      </div>
    </DashboardLayout>
  );
}
