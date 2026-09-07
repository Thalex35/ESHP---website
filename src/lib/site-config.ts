import heroImage from "@/assets/school-hero.jpg";
import logoImage from "@/assets/school-logo.png";
import { supabase } from "@/integrations/supabase/client";
import {
  ADMISSION_BLOCKS,
  DEMO_EVENTS,
  DEMO_NEWS,
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  SCHOOL_ACTIVITIES,
  SCHOOL_SECTIONS,
  SCHOOL_VALUES,
} from "@/config/content";

export interface SiteContactConfig {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface SiteConfig {
  schoolName: string;
  shortName: string;
  locality: string;
  tagline: string;
  contact: SiteContactConfig;
  heroImage: string;
  logoImage: string;
  heroAlt: string;
  logoAlt: string;
  aboutTitle: string;
  aboutText: string;
  mission: string;
  vision: string;
  pageContent: PageContent;
}

export interface PageContent {
  home: { eyebrow: string; aboutTitle: string; aboutText: string; sectionsTitle: string; sectionsText: string; valuesTitle: string; valuesText: string };
  about: { eyebrow: string; title: string; valuesTitle: string; valuesText: string; ctaTitle: string; ctaText: string };
  admissions: { eyebrow: string; title: string; intro: string; depositTitle: string; depositText: string; ctaTitle: string; ctaText: string };
  sections: { eyebrow: string; title: string; intro: string; infoTitle: string; infoText: string; ctaTitle: string; ctaText: string };
  studentLife: { eyebrow: string; title: string; intro: string; activitiesTitle: string; activitiesText: string; eventsTitle: string; eventsText: string; newsTitle: string; newsText: string; ctaTitle: string; ctaText: string };
  gallery: { eyebrow: string; title: string; intro: string; ctaTitle: string; ctaText: string };
  contact: { eyebrow: string; title: string; intro: string; locationTitle: string; locationText: string; formTitle: string; formText: string };
  values: typeof SCHOOL_VALUES;
  sectionsList: typeof SCHOOL_SECTIONS;
  admissionBlocks: typeof ADMISSION_BLOCKS;
  activities: typeof SCHOOL_ACTIVITIES;
  events: typeof DEMO_EVENTS;
  news: typeof DEMO_NEWS;
  galleryCategories: readonly string[];
  galleryItems: typeof GALLERY_ITEMS;
}

export const DEFAULT_PAGE_CONTENT: PageContent = {
  home: { eyebrow: "Présentation de l'établissement", aboutTitle: "Un établissement au service des familles", aboutText: "Une école qui accompagne chaque élève dans son développement, sa formation et son avenir.", sectionsTitle: "Deux sections, une même exigence", sectionsText: "L'école accueille les élèves du préscolaire jusqu'à la fin du secondaire.", valuesTitle: "Des valeurs pour grandir", valuesText: "Des principes qui guident la vie scolaire et l'accompagnement des élèves." },
  about: { eyebrow: "À propos", title: "Notre école", valuesTitle: "Les valeurs que nous voulons transmettre", valuesText: "Des principes qui guident la vie scolaire et l'accompagnement des élèves.", ctaTitle: "Une question sur l'école ?", ctaText: "L'équipe de l'école répond aux familles et aux visiteurs." },
  admissions: { eyebrow: "Inscriptions", title: "Admissions", intro: "Retrouvez ici les informations nécessaires pour inscrire votre enfant.", depositTitle: "Où déposer un dossier ?", depositText: "Les inscriptions se font uniquement au bureau de l'école.", ctaTitle: "Prêt à commencer une inscription ?", ctaText: "Écrivez-nous pour recevoir la liste complète des pièces à fournir." },
  sections: { eyebrow: "Organisation pédagogique", title: "Nos sections", intro: "L'école est organisée en deux sections, du préscolaire jusqu'à la fin du secondaire.", infoTitle: "Informations complémentaires", infoText: "Les horaires, effectifs par classe et programmes détaillés seront ajoutés ici dès leur communication par la direction.", ctaTitle: "Vous cherchez la classe adaptée à votre enfant ?", ctaText: "Contactez le secrétariat pour connaître les places disponibles par niveau." },
  studentLife: { eyebrow: "Au quotidien", title: "Vie scolaire", intro: "Activités, événements et actualités qui rythment la vie de l'établissement.", activitiesTitle: "Activités parascolaires", activitiesText: "Des activités qui complètent la formation et favorisent l'épanouissement des élèves.", eventsTitle: "Événements à venir", eventsText: "Le calendrier met en avant les moments forts de la vie de l'école et de la communauté éducative.", newsTitle: "Nouvelles de l'école", newsText: "Espace réservé aux communications officielles de la direction.", ctaTitle: "Envie de voir l'école en images ?", ctaText: "La galerie présente les espaces et les moments de la vie de l'établissement." },
  gallery: { eyebrow: "En images", title: "Galerie", intro: "Quelques images de l'établissement et de la vie scolaire pour mieux découvrir la communauté de l'école.", ctaTitle: "Vous voulez en savoir plus sur l'école ?", ctaText: "Contactez-nous ou consultez la présentation de l'établissement." },
  contact: { eyebrow: "Nous joindre", title: "Contact", intro: "Vous souhaitez obtenir des informations sur l'école, les inscriptions ou la vie scolaire ? Nous sommes à votre disposition.", locationTitle: "Localisation", locationText: "Le plan d'accès sera ajouté dès que l'adresse exacte de l'école aura été communiquée.", formTitle: "Envoyer un message", formText: "Tous les champs marqués d'un astérisque sont obligatoires." },
  values: SCHOOL_VALUES, sectionsList: SCHOOL_SECTIONS, admissionBlocks: ADMISSION_BLOCKS, activities: SCHOOL_ACTIVITIES, events: DEMO_EVENTS, news: DEMO_NEWS, galleryCategories: GALLERY_CATEGORIES, galleryItems: GALLERY_ITEMS,
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  schoolName: "École Secour d'en haut",
  shortName: "École Secour d'en haut",
  locality: "Puit-Sales, Haïti",
  tagline: "Former, accompagner et préparer les jeunes pour l'avenir.",
  contact: {
    address: "Adresse à confirmer",
    phone: "Téléphone à confirmer",
    email: "Email à confirmer",
    hours: "Horaires à confirmer",
  },
  heroImage,
  logoImage,
  heroAlt: "Photo d'illustration d'une école",
  logoAlt: "Logo de l'école",
  aboutTitle: "Un établissement au service des familles",
  aboutText:
    "Une école qui accompagne chaque élève dans son développement, sa formation et son avenir.",
  mission:
    "Favoriser la réussite scolaire, le développement des compétences et l'épanouissement de chaque élève dans un cadre bienveillant et exigeant.",
  vision:
    "Construire une école de qualité, ouverte sur les besoins des familles et engagée dans la réussite de ses élèves.",
  pageContent: DEFAULT_PAGE_CONTENT,
};

export function getSiteConfig(): SiteConfig {
  return DEFAULT_SITE_CONFIG;
}

function fromRow(row: Record<string, any>): SiteConfig {
  return {
    schoolName: row.school_name,
    shortName: row.short_name,
    locality: row.locality,
    tagline: row.tagline,
    contact: {
      address: row.contact_address,
      phone: row.contact_phone,
      email: row.contact_email,
      hours: row.contact_hours,
    },
    heroImage: row.hero_image,
    logoImage: row.logo_image,
    heroAlt: row.hero_alt,
    logoAlt: row.logo_alt,
    aboutTitle: row.about_title,
    aboutText: row.about_text,
    mission: row.mission,
    vision: row.vision,
    pageContent: { ...DEFAULT_PAGE_CONTENT, ...(row.page_content ?? {}) },
  };
}

export async function loadSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await (supabase as any).from("site_config").select("*").eq("id", true).maybeSingle();
  if (error || !data) return DEFAULT_SITE_CONFIG;
  return fromRow(data);
}

export async function saveSiteConfig(partial: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = getSiteConfig();
  const next = {
    ...current,
    ...partial,
    contact: {
      ...current.contact,
      ...(partial.contact ?? {}),
    },
  };

  const { error } = await (supabase as any).from("site_config").upsert({
    id: true,
    school_name: next.schoolName,
    short_name: next.shortName,
    locality: next.locality,
    tagline: next.tagline,
    contact_address: next.contact.address,
    contact_phone: next.contact.phone,
    contact_email: next.contact.email,
    contact_hours: next.contact.hours,
    hero_image: next.heroImage,
    logo_image: next.logoImage,
    hero_alt: next.heroAlt,
    logo_alt: next.logoAlt,
    about_title: next.aboutTitle,
    about_text: next.aboutText,
    mission: next.mission,
    vision: next.vision,
    page_content: next.pageContent,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  if (typeof window !== "undefined") window.dispatchEvent(new Event("site-config:updated"));

  return next;
}

export async function resetSiteConfig(): Promise<void> {
  await saveSiteConfig(DEFAULT_SITE_CONFIG);
}
