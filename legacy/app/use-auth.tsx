import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { primaryRole, type AppRole } from "@/lib/roles";

export interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  roles: AppRole[];
  role: AppRole | null;
  /** True until the initial session + role lookup has finished. */
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setProfile(null);
      setRoles([]);
      return;
    }
    const [profileResult, rolesResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, user_id, first_name, last_name, email, phone, avatar_url")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    if (profileResult.error || rolesResult.error) {
      setError(profileResult.error?.message ?? rolesResult.error?.message ?? null);
    } else {
      setError(null);
    }
    setProfile((profileResult.data as Profile | null) ?? null);
    setRoles(((rolesResult.data ?? []) as { role: AppRole }[]).map((r) => r.role));
  }, []);

  useEffect(() => {
    let active = true;

    // Listener first, so no auth event is missed while the session loads.
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      // Supabase advises against awaiting other calls inside this callback.
      void loadUserData(nextSession?.user.id);
    });

    void supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!active) return;
        setSession(data.session);
        await loadUserData(data.session?.user.id);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [loadUserData]);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    profile,
    roles,
    role: primaryRole(roles),
    loading,
    error,
    refresh: () => loadUserData(session?.user.id),
    signOut: async () => {
      await supabase.auth.signOut();
      setProfile(null);
      setRoles([]);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}

export function displayName(profile: Profile | null, fallback?: string | null): string {
  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
  return name || fallback || "Member";
}

export function initialsFor(profile: Profile | null, fallback?: string | null): string {
  const name = displayName(profile, fallback);
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
