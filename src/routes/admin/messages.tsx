import { createFileRoute } from "@tanstack/react-router";

import { MessagesPage } from "@/routes/admin";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesPage,
});
