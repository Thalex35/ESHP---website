/**
 * Informations centrales de l'établissement.
 *
 * Ces valeurs sont destinées à une présentation publique de l'école.
 * Remplacez-les par les informations officielles dès qu'elles sont confirmées.
 */
import heroImage from "@/assets/school-hero.jpg";
import logoImage from "@/assets/school-logo.png";

export interface SocialLink {
  label: string;
  href: string | null;
}

export const school = {
  name: "École Secour d'en haut",
  shortName: "École Secour d'en haut",
  locality: "Puit-Sales, Haïti",
  tagline: "Former, accompagner et préparer les jeunes pour l'avenir.",
  contact: {
    address: "Adresse à confirmer",
    phone: "Téléphone à confirmer",
    email: "Email à confirmer",
    hours: "Horaires à confirmer",
    admissionsNote: "Coordonnées du bureau des admissions à confirmer.",
  },
  social: [
    { label: "Facebook", href: null },
    { label: "Instagram", href: null },
    { label: "WhatsApp", href: null },
  ] as SocialLink[],
  images: {
    hero: heroImage,
    heroAlt: "Photo d'illustration d'une école",
    logo: logoImage,
    logoAlt: "Logo de l'école",
  },
} as const;

export const PLACEHOLDER_NOTE = "Informations de l'école à confirmer.";
