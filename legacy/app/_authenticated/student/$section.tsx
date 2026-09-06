import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/StatCard";
import { ComingSoon } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StudentProfilePanel } from "@/components/dashboard/StudentProfilePanel";
import { WORKSPACE_NAV } from "@/config/navigation";

export const Route = createFileRoute("/_authenticated/student/$section")({
  component: StudentSection,
});

function StudentSection() {
  const { section } = Route.useParams();
  const item = WORKSPACE_NAV.student.find((navItem) => navItem.section === section);
  const title = item?.label ?? "Page not found";

  return (
    <DashboardLayout workspace="student">
      <div className="space-y-6">
        <PageHeader title={title} />
        {section === "profile" ? <StudentProfilePanel /> : <ComingSoon title={title} />}
      </div>
    </DashboardLayout>
  );
}
