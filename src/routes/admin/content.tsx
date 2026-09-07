import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/routes/admin";

export const Route = createFileRoute("/admin/content")({
  component: ContentPage,
});
