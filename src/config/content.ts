/**
 * Contenus éditoriaux du site.
 *
 * Les textes marqués comme provisoires sont volontairement neutres : ils
 * doivent être remplacés par les informations officielles de l'école.
 */
import galerieActivites from "@/assets/gallery-activites.jpg";
import galerieClasse from "@/assets/gallery-classe.jpg";
import galerieEcole from "@/assets/gallery-ecole.jpg";
import galerieEleves from "@/assets/gallery-eleves.jpg";
import galerieEvenements from "@/assets/gallery-evenements.jpg";
import galerieInstallations from "@/assets/gallery-installations.jpg";

export interface SchoolSection {
  slug: string;
  title: string;
  summary: string;
  levels: string[];
}

export const SCHOOL_SECTIONS: SchoolSection[] = [
  {
    slug: "prescolaire-fondamentale",
    title: "Section préscolaire et fondamentale",
    summary:
      "De la maternelle à la 6e année fondamentale, les bases de la lecture, du calcul et de l'autonomie.",
    levels: [
      "Maternelle (Kindergarten)",
      "1ère année fondamentale",
      "2e année fondamentale",
      "3e année fondamentale",
      "4e année fondamentale",
      "5e année fondamentale",
      "6e année fondamentale",
    ],
  },
  {
    slug: "secondaire",
    title: "Section secondaire",
    summary:
      "De la 7e année à la NS4, un parcours qui prépare les élèves aux examens officiels et à la suite de leurs études.",
    levels: ["7e année", "8e année", "9e année", "NS1", "NS2", "NS3", "NS4"],
  },
];

export interface SchoolValue {
  title: string;
  description: string;
}

/** Valeurs proposées à titre indicatif, en attente de validation par l'école. */
export const SCHOOL_VALUES: SchoolValue[] = [
  { title: "Excellence", description: "Encourager chaque élève à donner le meilleur de lui-même." },
  { title: "Discipline", description: "Un cadre clair et respectueux, propice à l'apprentissage." },
  { title: "Respect", description: "Le respect des personnes, des règles et de l'environnement." },
  { title: "Responsabilité", description: "Apprendre à assumer ses choix et ses engagements." },
  { title: "Éducation", description: "Transmettre des savoirs solides et utiles au quotidien." },
  { title: "Intégrité", description: "Agir avec honnêteté à l'école comme dans la communauté." },
];

export interface SchoolActivity {
  title: string;
  description: string;
}

export const SCHOOL_ACTIVITIES: SchoolActivity[] = [
  { title: "Sport et jeux", description: "Exemple d'activité — à confirmer par l'école." },
  { title: "Musique et chorale", description: "Exemple d'activité — à confirmer par l'école." },
  { title: "Clubs de lecture", description: "Exemple d'activité — à confirmer par l'école." },
  { title: "Sorties éducatives", description: "Exemple d'activité — à confirmer par l'école." },
];

export interface SchoolEvent {
  title: string;
  date: string;
  location: string;
  description: string;
}

/** Exemples de démonstration : aucun de ces événements n'est officiel. */
export const DEMO_EVENTS: SchoolEvent[] = [
  {
    title: "Réunion de rentrée avec les parents",
    date: "Date à confirmer",
    location: "Cour de l'école",
    description: "Exemple d'événement destiné à montrer la présentation du calendrier scolaire.",
  },
  {
    title: "Journée sportive inter-classes",
    date: "Date à confirmer",
    location: "Terrain de l'école",
    description: "Exemple d'événement — à remplacer par le programme officiel.",
  },
  {
    title: "Remise des bulletins",
    date: "Date à confirmer",
    location: "Salles de classe",
    description: "Exemple d'événement — à remplacer par le programme officiel.",
  },
];

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
}

/** Exemples de démonstration : ces actualités ne sont pas officielles. */
export const DEMO_NEWS: NewsItem[] = [
  {
    title: "Bienvenue sur le nouveau site de l'école",
    date: "Publication provisoire",
    excerpt:
      "Cet espace accueillera prochainement les communications officielles de l'établissement.",
  },
  {
    title: "Informations sur les inscriptions",
    date: "Publication provisoire",
    excerpt:
      "Les conditions et le calendrier d'inscription seront publiés ici dès leur validation par la direction.",
  },
  {
    title: "Vie de l'établissement",
    date: "Publication provisoire",
    excerpt: "Les activités, sorties et réussites des élèves seront partagées dans cette rubrique.",
  },
];

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

/**
 * Images d'illustration uniquement : ce ne sont pas des photographies de
 * l'établissement. Remplacez les fichiers dans `src/assets/` pour mettre la
 * galerie à jour.
 */
export const GALLERY_CATEGORIES = [
  "L'école",
  "Activités scolaires",
  "Élèves",
  "Événements",
  "Installations",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: galerieEcole, alt: "Image d'illustration : bâtiment scolaire ensoleillé", category: "L'école" },
  {
    src: galerieClasse,
    alt: "Image d'illustration : salle de classe avec des élèves en uniforme",
    category: "L'école",
  },
  {
    src: galerieActivites,
    alt: "Image d'illustration : enfants jouant dans une cour d'école",
    category: "Activités scolaires",
  },
  {
    src: galerieEleves,
    alt: "Image d'illustration : enseignante accompagnant des élèves autour de livres",
    category: "Élèves",
  },
  {
    src: galerieEvenements,
    alt: "Image d'illustration : rassemblement d'élèves lors d'une cérémonie scolaire",
    category: "Événements",
  },
  {
    src: galerieInstallations,
    alt: "Image d'illustration : bibliothèque et salle informatique",
    category: "Installations",
  },
];

export interface AdmissionBlock {
  title: string;
  items: string[];
}

export const ADMISSION_BLOCKS: AdmissionBlock[] = [
  {
    title: "Conditions d'admission",
    items: [
      "Conditions d'âge et de niveau à préciser par la direction.",
      "Entretien ou évaluation éventuelle — à confirmer.",
      "Places disponibles selon la section et l'année scolaire.",
    ],
  },
  {
    title: "Documents requis",
    items: [
      "Acte de naissance de l'élève (à confirmer).",
      "Bulletins de l'année précédente (à confirmer).",
      "Photos d'identité récentes (à confirmer).",
      "Pièce d'identité du parent ou du tuteur (à confirmer).",
    ],
  },
  {
    title: "Processus d'inscription",
    items: [
      "Prendre contact avec le secrétariat de l'école.",
      "Retirer et remplir le formulaire d'inscription auprès de l'école.",
      "Déposer le dossier complet au bureau des admissions.",
      "Confirmation de l'inscription par la direction.",
    ],
  },
  {
    title: "Informations importantes",
    items: [
      "Les frais de scolarité et modalités de paiement seront communiqués par l'école.",
      "Le calendrier d'inscription sera publié sur cette page.",
      "Aucune inscription ni aucun paiement ne se fait en ligne pour le moment.",
    ],
  },
];
