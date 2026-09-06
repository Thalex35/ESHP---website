import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { SchoolLogo } from "@/components/branding/SchoolLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { school } from "@/config/school";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: `Sign in — ${school.name}` },
      {
        name: "description",
        content:
          "Secure sign-in for students, teachers and administrators of Ecole Secour d'en haut de puit-sales.",
      },
      { property: "og:title", content: `Sign in — ${school.name}` },
      { property: "og:description", content: "Access your school portal." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email address").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(72);
const nameSchema = z.string().trim().min(1, "Required").max(60);

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/dashboard", replace: true });
  }, [loading, session, navigate]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = z
      .object({ email: emailSchema, password: z.string().min(1, "Password is required") })
      .safeParse({ email: data.get("email"), password: data.get("password") });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setBusy(true);
    setFormError(null);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(false);
    if (error) {
      setFormError(
        error.message === "Invalid login credentials"
          ? "Email or password is incorrect."
          : error.message,
      );
      return;
    }
    toast.success("Welcome back.");
    void navigate({ to: "/dashboard", replace: true });
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = z
      .object({
        first_name: nameSchema,
        last_name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
      })
      .safeParse(Object.fromEntries(data));
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setBusy(true);
    setFormError(null);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { first_name: parsed.data.first_name, last_name: parsed.data.last_name },
      },
    });
    setBusy(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    setEmailSent(parsed.data.email);
    toast.success("Account created. Check your email to confirm it.");
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = emailSchema.safeParse(data.get("email"));
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }

    setBusy(true);
    setFormError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    setEmailSent(parsed.data);
    toast.success("If that address exists, a reset link is on its way.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary/40">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10">
        <Link to="/" className="mx-auto mb-6">
          <SchoolLogo />
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {mode === "reset" ? "Reset your password" : "School portal"}
            </CardTitle>
            <CardDescription>
              {mode === "reset"
                ? "We'll email you a secure link to choose a new password."
                : "Sign in to access your dashboard."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="space-y-4 text-sm">
                <p className="rounded-md border border-border bg-secondary/60 p-3 text-muted-foreground">
                  We sent an email to <span className="font-medium text-foreground">{emailSent}</span>
                  . Follow the link in that message to continue.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEmailSent(null);
                    setMode("signin");
                  }}
                >
                  Back to sign in
                </Button>
              </div>
            ) : mode === "reset" ? (
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input id="reset-email" name="email" type="email" autoComplete="email" required />
                </div>
                {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Sending…" : "Send reset link"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setMode("signin")}
                >
                  Back to sign in
                </Button>
              </form>
            ) : (
              <Tabs
                value={mode}
                onValueChange={(value) => {
                  setMode(value as "signin" | "signup");
                  setFormError(null);
                }}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Create account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                      />
                    </div>
                    {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? "Signing in…" : "Sign in"}
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="w-full"
                      onClick={() => {
                        setMode("reset");
                        setFormError(null);
                      }}
                    >
                      Forgot your password?
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First name</Label>
                        <Input id="first_name" name="first_name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last name</Label>
                        <Input id="last_name" name="last_name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />
                      <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                    </div>
                    {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? "Creating account…" : "Create account"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      New accounts start with the student role. School staff roles are granted by
                      the administration.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to the school website
          </Link>
        </p>
      </div>
    </div>
  );
}
