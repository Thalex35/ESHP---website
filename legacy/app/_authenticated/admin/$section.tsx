import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/StatCard";
import { ComingSoon } from "@/components/common/states";
import { AdminClassesTable, AdminDirectoryTable } from "@/components/dashboard/AdminTables";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WORKSPACE_NAV } from "@/config/navigation";

export const Route = createFileRoute("/_authenticated/admin/$section")({
  component: AdminSection,
});

function AdminSection() {
  const { section } = Route.useParams();
  const item = WORKSPACE_NAV.admin.find((navItem) => navItem.section === section);
  const title = item?.label ?? "Page not found";

  const content = () => {
    switch (section) {
      case "students":
        return <AdminDirectoryTable kind="students" />;
      case "teachers":
        return <AdminDirectoryTable kind="teachers" />;
      case "classes":
        return <AdminClassesTable />;
      default:
        return <ComingSoon title={title} />;
    }
  };

  return (
    <DashboardLayout workspace="admin">
      <div className="space-y-6">
        {["students", "teachers", "classes"].includes(section) ? (
          <PageHeader
            title={title}
            description="Read-only view for this sprint. Creating and editing records arrives in a later sprint."
          />
        ) : (
          <PageHeader title={title} />
        )}

        {content()}
      </div>
    </DashboardLayout>
  );
}
