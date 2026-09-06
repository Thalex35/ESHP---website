/** Navigation publique du site. Une seule source pour l'en-tête et le pied de page. */
export const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/nos-sections", label: "Nos sections" },
  { to: "/admissions", label: "Admissions" },
  { to: "/vie-scolaire", label: "Vie scolaire" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

export type PublicRoute = NavLink["to"];
