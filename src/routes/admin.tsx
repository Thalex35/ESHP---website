import { createFileRoute, Link, Outlet, redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { BarChart3, FileText, Inbox, LogOut, MessageSquareText, Settings, Users } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { getMessages, MessageRecord, updateMessageStatus } from "@/lib/admin-data";
import { changeAdminPassword, isAdminAuthenticated, signOutAdmin } from "@/lib/admin-auth";
import { DEFAULT_SITE_CONFIG, getSiteConfig, loadSiteConfig, resetSiteConfig, saveSiteConfig } from "@/lib/site-config";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    if (!(await isAdminAuthenticated())) {
      throw redirect({ to: "/admin-login" });
    }
  },
  component: AdminLayout,
});

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isAdminAuthenticated().then((authenticated) => {
      if (!authenticated) navigate({ to: "/admin-login" });
    });
  }, [navigate]);

  function handleLogout() {
    signOutAdmin().then(() => navigate({ to: "/admin-login" }));
  }

  const links = [
    { to: "/admin", label: "Dashboard", icon: BarChart3 },
    { to: "/admin/messages", label: "Messages", icon: MessageSquareText },
    { to: "/admin/content", label: "Contenu", icon: FileText },
    { to: "/admin/settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f0e8] text-[#2d2d2d]">
      <aside className="w-72 border-r border-[#e4ddd1] bg-[#f9f5ef] p-5">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5d5d]">
            Admin panel
          </div>
          <h1 className="mt-3 text-2xl font-semibold">École</h1>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-[#eae1d6] text-[#2d2d2d]" : "text-[#4a4a4a] hover:bg-[#efe7dc]",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 flex w-full items-center gap-3 rounded-xl border border-[#d9d3ca] bg-white px-3 py-2.5 text-sm font-medium text-[#2d2d2d]"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </aside>

      <main className="flex-1 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export function DashboardPage() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);

  useEffect(() => {
    getMessages().then(setMessages).catch(() => setMessages([]));
  }, []);

  const stats = useMemo(() => {
    const newCount = messages.filter((message) => message.status === "new").length;
    const today = messages.filter((message) => {
      const date = new Date(message.createdAt);
      return date.toDateString() === new Date().toDateString();
    }).length;

    return {
      total: messages.length,
      today,
      unread: newCount,
      replied: messages.filter((message) => message.status === "replied").length,
    };
  }, [messages]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5d5d]">Vue d'ensemble</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#2d2d2d]">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total" value={String(stats.total)} icon={Users} />
        <StatCard title="Aujourd'hui" value={String(stats.today)} icon={Inbox} />
        <StatCard title="Messages" value={String(stats.unread)} icon={MessageSquareText} />
        <StatCard title="Réponses" value={String(stats.replied)} icon={BarChart3} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2d2d2d]">Messages récents</h3>
          <div className="mt-4 space-y-3">
            {messages.slice(0, 5).map((message) => (
              <div key={message.id} className="rounded-2xl border border-[#eee3d6] bg-[#f9f5ef] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-[#2d2d2d]">{message.name}</p>
                  <span className="rounded-full bg-[#eae1d6] px-2 py-1 text-[10px] uppercase tracking-wide text-[#4a4a4a]">
                    {message.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#5d5d5d]">{message.subject}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2d2d2d]">Résumé du site</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#4a4a4a]">
            <li>• Informations publiques gérées depuis le panneau</li>
            <li>• Formulaire de contact fonctionnel localement</li>
            <li>• Gestion des contenus sans modifier l'interface visuelle</li>
            <li>• Mode d'administration masqué au public</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#5d5d5d]">{title}</p>
        <span className="rounded-xl bg-[#efe7dc] p-2 text-[#2d2d2d]">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold text-[#2d2d2d]">{value}</p>
    </div>
  );
}

export function MessagesPage() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [reply, setReply] = useState<{ id: number; email: string; subject: string } | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    getMessages().then(setMessages).catch(() => setMessages([]));
  }, []);

  function markReplied(id: number) {
    updateMessageStatus(id, "replied").then(setMessages);
  }

  function openReply(message: MessageRecord) {
    setReply({ id: message.id, email: message.email, subject: message.subject });
    setReplyText(`Bonjour ${message.name},\n\n\n\nCordialement,\nL'équipe de l'école`);
  }

  function deliverReply() {
    if (!reply || !replyText.trim()) return;
    window.location.href = `mailto:${reply.email}?subject=${encodeURIComponent(`Re: ${reply.subject}`)}&body=${encodeURIComponent(replyText)}`;
    updateMessageStatus(reply.id, "replied").then(setMessages);
    setReply(null);
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5d5d]">Messages</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#2d2d2d]">Boîte de réception</h2>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[#2d2d2d]">{message.name}</p>
                <p className="text-sm text-[#5d5d5d]">{message.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#eae1d6] px-2 py-1 text-[10px] uppercase tracking-wide text-[#4a4a4a]">
                  {message.status}
                </span>
                <button
                  onClick={() => openReply(message)}
                  className="rounded-full bg-[#2d2d2d] px-3 py-1.5 text-xs font-medium text-[#f8f0e2]"
                >
                  Répondre
                </button>
                {message.status !== "replied" ? (
                  <button
                    onClick={() => markReplied(message.id)}
                    className="rounded-full bg-[#2d2d2d] px-3 py-1.5 text-xs font-medium text-[#f8f0e2]"
                  >
                    Marquer répondu
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#5d5d5d]">Objet</p>
                <p className="mt-1 text-[#2d2d2d]">{message.subject}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#5d5d5d]">Téléphone</p>
                <p className="mt-1 text-[#2d2d2d]">{message.phone || "—"}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#f7f2eb] p-3 text-sm text-[#3d3d3d]">
              {message.message}
            </div>
          </div>
        ))}
      </div>

      {reply ? (
        <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Répondre à {reply.email}</h3>
          <p className="mt-1 text-sm text-[#5d5d5d]">Votre logiciel de messagerie sera ouvert avec le destinataire et le texte préremplis.</p>
          <textarea
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            rows={8}
            className="mt-4 w-full rounded-xl border border-[#d9d3ca] bg-[#f8f5f1] px-3 py-2.5 outline-none focus:border-[#6f7071]"
          />
          <div className="mt-3 flex gap-2">
            <button onClick={deliverReply} className="rounded-full bg-[#2d2d2d] px-5 py-2.5 text-sm font-medium text-[#f8f0e2]">
              Ouvrir l'email et marquer répondu
            </button>
            <button onClick={() => setReply(null)} className="rounded-full border border-[#d9d3ca] px-5 py-2.5 text-sm font-medium">
              Annuler
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ContentPage() {
  const [config, setConfig] = useState(DEFAULT_SITE_CONFIG);
  const [activeSection, setActiveSection] = useState<PageKey>("home");

  useEffect(() => {
    loadSiteConfig().then(setConfig).catch(() => setConfig(DEFAULT_SITE_CONFIG));
  }, []);

  function handleChange<K extends keyof typeof config>(field: K, value: (typeof config)[K]) {
    setConfig((prev) => ({ ...prev, [field]: value }));
  }

  function handleContactChange<K extends keyof typeof config.contact>(field: K, value: string) {
    setConfig((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  }

  function handlePageChange(page: PageKey, field: string, value: unknown) {
    const collectionFields = ["values", "sectionsList", "admissionBlocks", "activities", "events", "news", "galleryCategories", "galleryItems"];
    setConfig((prev) => collectionFields.includes(field)
      ? { ...prev, pageContent: { ...prev.pageContent, [field]: value } }
      : { ...prev, pageContent: { ...prev.pageContent, [page]: { ...prev.pageContent[page], [field]: value } } });
  }

  async function handleSave() {
    try {
      await saveSiteConfig(config);
      alert("Les modifications ont été enregistrées dans Supabase.");
    } catch {
      alert("Impossible d'enregistrer. Vérifiez la connexion Supabase et les politiques RLS.");
    }
  }

  async function handleImageUpload(field: "heroImage" | "logoImage", file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("L'image doit faire moins de 3 Mo.");
      return;
    }
    const path = `${field}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: true });
    if (error) {
      alert("Impossible d'envoyer l'image. Vérifiez le bucket Supabase et vos droits admin.");
      return;
    }
    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    handleChange(field, data.publicUrl);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5d5d]">Contenu</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#2d2d2d]">Gérer le contenu du site</h2>
      </div>

      <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-4 shadow-sm">
        <p className="text-sm font-medium text-[#2d2d2d]">Pages du site</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PAGE_SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={activeSection === section.key ? "rounded-full bg-[#2d2d2d] px-4 py-2 text-sm font-medium text-[#f8f0e2]" : "rounded-full border border-[#d9d3ca] bg-white px-4 py-2 text-sm font-medium text-[#4a4a4a]"}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <PageSectionEditor
        page={activeSection}
        pageContent={config.pageContent}
        onChange={handlePageChange}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2d2d2d]">Identité de l'école</h3>
          <div className="mt-4 space-y-4">
            <Field label="Nom de l'école" value={config.schoolName} onChange={(v) => handleChange("schoolName", v)} />
            <Field label="Nom court" value={config.shortName} onChange={(v) => handleChange("shortName", v)} />
            <Field label="Localité" value={config.locality} onChange={(v) => handleChange("locality", v)} />
            <Field label="Slogan" value={config.tagline} onChange={(v) => handleChange("tagline", v)} />
            <Field label="Titre “À propos”" value={config.aboutTitle} onChange={(v) => handleChange("aboutTitle", v)} />
            <TextareaField label="Texte “À propos”" value={config.aboutText} onChange={(v) => handleChange("aboutText", v)} />
            <TextareaField label="Mission" value={config.mission} onChange={(v) => handleChange("mission", v)} />
            <TextareaField label="Vision" value={config.vision} onChange={(v) => handleChange("vision", v)} />
          </div>
        </div>

        <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2d2d2d]">Coordonnées</h3>
          <div className="mt-4 space-y-4">
            <Field label="Adresse" value={config.contact.address} onChange={(v) => handleContactChange("address", v)} />
            <Field label="Téléphone" value={config.contact.phone} onChange={(v) => handleContactChange("phone", v)} />
            <Field label="Email" value={config.contact.email} onChange={(v) => handleContactChange("email", v)} />
            <Field label="Horaires" value={config.contact.hours} onChange={(v) => handleContactChange("hours", v)} />
            <ImageField label="Image d'accueil" value={config.heroImage} onChange={(file) => handleImageUpload("heroImage", file)} />
            <ImageField label="Logo" value={config.logoImage} onChange={(file) => handleImageUpload("logoImage", file)} />
            <Field label="Texte alt de l'image" value={config.heroAlt} onChange={(v) => handleChange("heroAlt", v)} />
            <Field label="Texte alt du logo" value={config.logoAlt} onChange={(v) => handleChange("logoAlt", v)} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-full bg-[#2d2d2d] px-5 py-3 font-medium text-[#f8f0e2] hover:bg-[#1f1f1f]"
        >
          Enregistrer les changements
        </button>
      </div>
    </div>
  );
}

type PageKey = "home" | "about" | "admissions" | "sections" | "studentLife" | "gallery" | "contact";

const PAGE_SECTIONS: { key: PageKey; label: string }[] = [
  { key: "home", label: "Accueil" },
  { key: "about", label: "À propos" },
  { key: "admissions", label: "Admissions" },
  { key: "sections", label: "Nos sections" },
  { key: "studentLife", label: "Vie scolaire" },
  { key: "gallery", label: "Galerie" },
  { key: "contact", label: "Contact" },
];

function PageSectionEditor({ page, pageContent, onChange }: { page: PageKey; pageContent: typeof DEFAULT_SITE_CONFIG.pageContent; onChange: (page: PageKey, field: string, value: unknown) => void }) {
  const content = pageContent[page] as Record<string, unknown>;
  const fields = Object.entries(content).filter(([, value]) => typeof value === "string");
  const collections: Record<string, unknown> = {
    ...(page === "about" ? { values: pageContent.values } : {}),
    ...(page === "sections" ? { sectionsList: pageContent.sectionsList } : {}),
    ...(page === "admissions" ? { admissionBlocks: pageContent.admissionBlocks } : {}),
    ...(page === "studentLife" ? { activities: pageContent.activities, events: pageContent.events, news: pageContent.news } : {}),
    ...(page === "gallery" ? { galleryCategories: pageContent.galleryCategories, galleryItems: pageContent.galleryItems } : {}),
  };

  return (
    <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Contenu de la page : {PAGE_SECTIONS.find((item) => item.key === page)?.label}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {fields.map(([field, value]) => (
          <Field key={field} label={field.replace(/[A-Z]/g, (letter) => ` ${letter}`).replace(/^./, (letter) => letter.toUpperCase())} value={String(value)} onChange={(next) => onChange(page, field, next)} />
        ))}
      </div>
      {Object.entries(collections).map(([field, value]) => (
        <label key={field} className="mt-5 block text-sm text-[#2d2d2d]">
          <span className="mb-2 block font-medium">{field} (JSON éditable)</span>
          <textarea
            rows={7}
            value={JSON.stringify(value, null, 2)}
            onChange={(event) => {
              try { onChange(page, field, JSON.parse(event.target.value)); } catch { /* wait for valid JSON */ }
            }}
            className="w-full rounded-xl border border-[#d9d3ca] bg-[#f8f5f1] px-3 py-2.5 font-mono text-xs outline-none focus:border-[#6f7071]"
          />
        </label>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: "text" | "password" }) {
  return (
    <label className="block text-sm text-[#2d2d2d]">
      <span className="mb-2 block font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#d9d3ca] bg-[#f8f5f1] px-3 py-2.5 outline-none focus:border-[#6f7071]"
      />
    </label>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-[#2d2d2d]">
      <span className="mb-2 block font-medium">{label}</span>
      <textarea
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#d9d3ca] bg-[#f8f5f1] px-3 py-2.5 outline-none focus:border-[#6f7071]"
      />
    </label>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (file?: File) => void }) {
  return (
    <div className="block text-sm text-[#2d2d2d]">
      <span className="mb-2 block font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <img src={value} alt="Aperçu" className="h-16 w-20 rounded-lg border border-[#d9d3ca] bg-[#f8f5f1] object-contain p-1" />
        <label className="cursor-pointer rounded-full border border-[#d9d3ca] bg-white px-4 py-2.5 text-sm font-medium">
          Choisir une image
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => onChange(event.target.files?.[0])} />
        </label>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

    async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await changeAdminPassword(currentPassword, nextPassword);
    setPasswordMessage(ok ? "Mot de passe modifié. Il sera demandé lors de la prochaine connexion." : "Ancien mot de passe incorrect ou nouveau mot de passe trop court (8 caractères minimum).");
    if (ok) {
      setCurrentPassword("");
      setNextPassword("");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5d5d5d]">Paramètres</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#2d2d2d]">Réglages du site</h2>
      </div>

      <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
        <p className="text-[#4a4a4a]">
          Le panneau d'administration est réservé au gestionnaire du site. La personnalisation visuelle du thème n'est pas activée ici pour préserver la cohérence du design public.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => resetConfiguration()}
            className="rounded-full border border-[#d9d3ca] bg-white px-4 py-2.5 text-sm font-medium text-[#2d2d2d]"
          >
            Réinitialiser le contenu
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-[#e4ddd1] bg-[#fffdf9] p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Sécurité du compte</h3>
        <form onSubmit={handlePasswordChange} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <Field type="password" label="Mot de passe actuel" value={currentPassword} onChange={setCurrentPassword} />
            <Field type="password" label="Nouveau mot de passe" value={nextPassword} onChange={setNextPassword} />
          <button className="rounded-full bg-[#2d2d2d] px-5 py-2.5 text-sm font-medium text-[#f8f0e2]">Modifier</button>
        </form>
        {passwordMessage ? <p className="mt-3 text-sm text-[#5d5d5d]">{passwordMessage}</p> : null}
      </div>
    </div>
  );
}

async function resetConfiguration() {
  const reset = window.confirm("Réinitialiser le contenu public du site ?");
  if (reset) {
    await resetSiteConfig();
    window.location.reload();
  }
}
