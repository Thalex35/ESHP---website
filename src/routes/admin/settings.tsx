import { createFileRoute } from "@tanstack/react-router";

import { SettingsPage } from "@/routes/admin";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});
