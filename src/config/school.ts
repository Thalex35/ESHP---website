/**
 * Informations centrales de l'établissement.
 *
 * Toutes les données affichées sur le site (nom, coordonnées, images, réseaux
 * sociaux) proviennent de ce fichier. Remplacez ici les valeurs provisoires
 * par les informations officielles de l'école : aucun autre fichier ne doit
 * contenir d'adresse, de téléphone ou d'URL d'image en dur.
 */
import heroImage from "@/assets/school-hero.jpg";
import logoImage from "@/assets/school-logo.png";

export interface SocialLink {
  label: string;
  /** `null` tant que le compte officiel n'a pas été communiqué. */
  href: string | null;
}

export const school = {
  name: "Ecole Secour d'en haut de puit-sales",
  shortName: "Ecole Secour d'en haut",
  locality: "de puit-sales",
  tagline: "Former, accompagner et préparer les jeunes pour l'avenir.",
  // Coordonnées provisoires — à remplacer par les informations officielles.
  contact: {
    address: "Adresse à compléter, Puit-Sales, Haïti",
    phone: "+509 00 00 0000",
    email: "contact@example.com",
    hours: "Lundi – vendredi, 8h00 – 16h00 (horaire provisoire)",
    admissionsNote: "Bureau des admissions — coordonnées à confirmer par l'école.",
  },
  social: [
    { label: "Facebook", href: null },
    { label: "Instagram", href: null },
    { label: "WhatsApp", href: null },
  ] as SocialLink[],
  images: {
    hero: heroImage,
    heroAlt: "Photo d'illustration : élèves dans la cour d'une école",
    logo: logoImage,
    logoAlt: "Écusson provisoire de l'école",
  },
} as const;

/** Mention affichée sous les contenus encore provisoires. */
export const PLACEHOLDER_NOTE = "Contenu provisoire — à remplacer par le texte officiel de l'école.";
