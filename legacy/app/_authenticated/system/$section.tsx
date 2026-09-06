import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/StatCard";
import { ComingSoon } from "@/components/common/states";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WORKSPACE_NAV } from "@/config/navigation";

export const Route = createFileRoute("/_authenticated/system/$section")({
  component: SystemSection,
});

function SystemSection() {
  const { section } = Route.useParams();
  const item = WORKSPACE_NAV.system.find((navItem) => navItem.section === section);
  const title = item?.label ?? "Page not found";

  return (
    <DashboardLayout workspace="system">
      <div className="space-y-6">
        <PageHeader title={title} />
        <ComingSoon title={title} />
      </div>
    </DashboardLayout>
  );
}
