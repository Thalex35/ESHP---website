import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { signInAdmin } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await signInAdmin(username, password);

    if (!ok) {
      setError("Identifiants invalides.");
      return;
    }

    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f0e8] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-8 shadow-[0_18px_40px_rgba(45,45,45,0.08)]">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5d5d]">
            Administration
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2d2d2d]">Connexion</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2d2d2d]">Nom d'utilisateur</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-[#d9d3ca] bg-[#f8f5f1] px-3 py-2.5 outline-none focus:border-[#6f7071]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2d2d2d]">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#d9d3ca] bg-[#f8f5f1] px-3 py-2.5 outline-none focus:border-[#6f7071]"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-[#2d2d2d] px-4 py-3 font-medium text-[#f8f0e2] transition hover:bg-[#1f1f1f]"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-[#5d5d5d]">
          <Link to="/" className="text-[#2d2d2d] underline underline-offset-4">
            Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
