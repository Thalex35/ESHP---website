import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileBarChart,
  GraduationCap,
  Users,
  LayoutDashboard,
  MessageSquare,
  Bell,
  Settings,
  UserCircle,
  Megaphone,
  ScrollText,
  Activity,
  ShieldAlert,
  Server,
  SlidersHorizontal,
  School,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";

import type { Workspace } from "@/lib/roles";

export interface NavItem {
  label: string;
  /** URL slug under the workspace, or `null` for the workspace home. */
  section: string | null;
  icon: LucideIcon;
  /** Implemented in this sprint? Otherwise the page shows a "coming soon" state. */
  ready?: boolean;
}

export const WORKSPACE_LABELS: Record<Workspace, string> = {
  student: "Student Portal",
  teacher: "Teacher Portal",
  admin: "School Administration",
  system: "System Administration",
};

export const WORKSPACE_NAV: Record<Workspace, NavItem[]> = {
  student: [
    { label: "Dashboard", section: null, icon: LayoutDashboard, ready: true },
    { label: "My Profile", section: "profile", icon: UserCircle, ready: true },
    { label: "My Classes", section: "classes", icon: BookOpen },
    { label: "Assignments", section: "assignments", icon: ClipboardList },
    { label: "Grades", section: "grades", icon: GraduationCap },
    { label: "Attendance", section: "attendance", icon: CalendarCheck },
    { label: "Payments", section: "payments", icon: CreditCard },
    { label: "Notifications", section: "notifications", icon: Bell },
    { label: "Messages", section: "messages", icon: MessageSquare },
    { label: "Settings", section: "settings", icon: Settings },
  ],
  teacher: [
    { label: "Dashboard", section: null, icon: LayoutDashboard, ready: true },
    { label: "My Classes", section: "classes", icon: BookOpen },
    { label: "Students", section: "students", icon: Users },
    { label: "Assignments", section: "assignments", icon: ClipboardList },
    { label: "Grades", section: "grades", icon: GraduationCap },
    { label: "Attendance", section: "attendance", icon: CalendarCheck },
    { label: "Messages", section: "messages", icon: MessageSquare },
    { label: "Notifications", section: "notifications", icon: Bell },
    { label: "Settings", section: "settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", section: null, icon: LayoutDashboard, ready: true },
    { label: "Students", section: "students", icon: Users, ready: true },
    { label: "Teachers", section: "teachers", icon: GraduationCap, ready: true },
    { label: "Classes", section: "classes", icon: School, ready: true },
    { label: "Admissions", section: "admissions", icon: FileCheck2 },
    { label: "Academic Management", section: "academic", icon: BookOpen },
    { label: "Payments", section: "payments", icon: CreditCard },
    { label: "Announcements", section: "announcements", icon: Megaphone },
    { label: "Reports", section: "reports", icon: FileBarChart },
    { label: "Notifications", section: "notifications", icon: Bell },
    { label: "Settings", section: "settings", icon: Settings },
  ],
  system: [
    { label: "Dashboard", section: null, icon: LayoutDashboard, ready: true },
    { label: "User Activity", section: "user-activity", icon: Activity },
    { label: "Audit Logs", section: "audit-logs", icon: ScrollText },
    { label: "System Logs", section: "system-logs", icon: Server },
    { label: "Error Monitoring", section: "errors", icon: ShieldAlert },
    { label: "System Health", section: "health", icon: Activity },
    { label: "Technical Settings", section: "technical-settings", icon: SlidersHorizontal },
  ],
};

export function workspacePath(workspace: Workspace, section?: string | null): string {
  return section ? `/${workspace}/${section}` : `/${workspace}`;
}
