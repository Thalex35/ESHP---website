import { supabase } from "@/integrations/supabase/client";

const ADMIN_DOMAIN = "eshp.local";

export interface AdminSession {
  username: string;
  loggedInAt: string;
}

function toEmail(username: string): string {
  return username.includes("@") ? username : `${username}@${ADMIN_DOMAIN}`;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return false;
  const { data: role } = await (supabase as any).from("user_roles").select("role").eq("user_id", data.session.user.id).in("role", ["admin", "super_admin", "system_admin"]).maybeSingle();
  return Boolean(role);
}

export async function signInAdmin(username: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({ email: toEmail(username), password });
  return !error && (await isAdminAuthenticated());
}

export async function changeAdminPassword(currentPassword: string, nextPassword: string): Promise<boolean> {
  if (nextPassword.length < 8) return false;
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return false;
  const { error: verifyError } = await supabase.auth.signInWithPassword({ email: data.user.email, password: currentPassword });
  if (verifyError) return false;
  const { error } = await supabase.auth.updateUser({ password: nextPassword });
  return !error;
}

export async function signOutAdmin(): Promise<void> {
  await supabase.auth.signOut();
}
