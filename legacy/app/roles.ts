/**
 * Role model shared by the whole application.
 * The database is the source of truth (`public.user_roles`); these types and
 * helpers only mirror it for the UI layer.
 */
export const APP_ROLES = [
  "student",
  "teacher",
  "parent",
  "admin",
  "super_admin",
  "system_admin",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

/** Highest privilege first — used to resolve a user's "primary" workspace. */
const ROLE_PRIORITY: AppRole[] = [
  "system_admin",
  "super_admin",
  "admin",
  "teacher",
  "parent",
  "student",
];

export const ROLE_LABELS: Record<AppRole, string> = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent",
  admin: "School Administrator",
  super_admin: "Super Administrator",
  system_admin: "System Administrator",
};

/** Dashboard workspaces implemented in this sprint. */
export type Workspace = "student" | "teacher" | "admin" | "system";

export function primaryRole(roles: AppRole[]): AppRole | null {
  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? null;
}

/** Maps a role to the dashboard workspace it should land in. */
export function workspaceForRole(role: AppRole | null): Workspace | null {
  switch (role) {
    case "system_admin":
      return "system";
    case "super_admin":
    case "admin":
      return "admin";
    case "teacher":
      return "teacher";
    case "student":
      return "student";
    // PARENT is part of the architecture but has no dashboard yet (future sprint).
    default:
      return null;
  }
}

export const WORKSPACE_ROLES: Record<Workspace, AppRole[]> = {
  student: ["student"],
  teacher: ["teacher"],
  admin: ["admin", "super_admin"],
  system: ["system_admin"],
};

export function canAccessWorkspace(roles: AppRole[], workspace: Workspace): boolean {
  return WORKSPACE_ROLES[workspace].some((role) => roles.includes(role));
}
