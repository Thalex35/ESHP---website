import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Menu, ShieldAlert } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { SchoolLogo } from "@/components/branding/SchoolLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { WORKSPACE_LABELS, WORKSPACE_NAV, workspacePath } from "@/config/navigation";
import { displayName, initialsFor, useAuth } from "@/hooks/use-auth";
import { canAccessWorkspace, ROLE_LABELS, type Workspace } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/common/states";

function NavLinks({ workspace, onNavigate }: { workspace: Workspace; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="space-y-1" aria-label={WORKSPACE_LABELS[workspace]}>
      {WORKSPACE_NAV[workspace].map((item) => {
        const to = workspacePath(workspace, item.section);
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="flex-1">{item.label}</span>
            {!item.ready ? (
              <span className="text-[10px] uppercase tracking-wide text-sidebar-foreground/50">
                soon
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Shared shell for every role workspace: role-aware sidebar, top bar,
 * mobile navigation and access enforcement (in addition to database RLS).
 */
export function DashboardLayout({
  workspace,
  children,
}: {
  workspace: Workspace;
  children: ReactNode;
}) {
  const { profile, user, roles, role, loading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("You have been signed out.");
    void navigate({ to: "/auth", replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col gap-4 p-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const allowed = canAccessWorkspace(roles, workspace);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar lg:flex">
        <div className="border-b border-sidebar-border p-4">
          <SchoolLogo inverted size="sm" />
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {WORKSPACE_LABELS[workspace]}
          </p>
          <NavLinks workspace={workspace} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="border-b border-sidebar-border p-4">
                <SchoolLogo inverted size="sm" />
              </div>
              <div className="p-3">
                <NavLinks workspace={workspace} onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold">
              {WORKSPACE_LABELS[workspace]}
            </p>
            <p className="truncate text-xs text-muted-foreground">{ROLE_LABELS[role ?? "student"]}</p>
          </div>

          <Button variant="ghost" size="icon" aria-label="Notifications" disabled>
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                    {initialsFor(profile, user?.email)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm sm:inline">{displayName(profile, user?.email)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="space-y-1">
                <p className="text-sm">{displayName(profile, user?.email)}</p>
                <Badge variant="secondary">{role ? ROLE_LABELS[role] : "No role assigned"}</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">Public website</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => void handleSignOut()}>
                <LogOut className="mr-2 h-4 w-4" aria-hidden />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {allowed ? (
            children
          ) : (
            <EmptyState
              icon={ShieldAlert}
              title="You don't have access to this area"
              description="Your account role does not allow access to this workspace. If you believe this is a mistake, contact the school administration."
              action={
                <Button asChild variant="outline">
                  <Link to="/dashboard">Go to my dashboard</Link>
                </Button>
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}
