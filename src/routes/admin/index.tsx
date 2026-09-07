import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/routes/admin";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});
