/**
 * Contenus éditoriaux du site public.
 * Ces informations peuvent être mises à jour facilement selon les informations
 * officielles communiquées par l'établissement.
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
  { title: "Sport et jeux", description: "Des moments d'activité physique et de cohésion entre élèves." },
  { title: "Musique et chorale", description: "Un espace pour la créativité, le chant et la pratique musicale." },
  { title: "Clubs de lecture", description: "Des activités favorisant la culture, la curiosité et le goût de lire." },
  { title: "Sorties éducatives", description: "Des sorties et découvertes qui enrichissent l'apprentissage." },
];

export interface SchoolEvent {
  title: string;
  date: string;
  location: string;
  description: string;
}

export const DEMO_EVENTS: SchoolEvent[] = [
  {
    title: "Réunion de rentrée avec les parents",
    date: "À confirmer",
    location: "Cour de l'école",
    description: "Une occasion pour présenter le cadre scolaire et les attentes de la nouvelle année.",
  },
  {
    title: "Journée sportive inter-classes",
    date: "À confirmer",
    location: "Terrain de l'école",
    description: "Une journée de sport, d'énergie et de solidarité entre les classes.",
  },
  {
    title: "Remise des bulletins",
    date: "À confirmer",
    location: "Salles de classe",
    description: "Un moment de bilan, de suivi et d'encouragement pour les élèves et les familles.",
  },
];

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
}

export const DEMO_NEWS: NewsItem[] = [
  {
    title: "Bienvenue sur le site de l'école",
    date: "À venir",
    excerpt: "Un espace dédié aux informations importantes et aux moments forts de la vie scolaire.",
  },
  {
    title: "Informations sur les inscriptions",
    date: "À venir",
    excerpt: "Les conditions et le calendrier d'inscription seront publiés ici selon les demandes de l'école.",
  },
  {
    title: "Vie de l'établissement",
    date: "À venir",
    excerpt: "Les activités, sorties et réussites des élèves seront partagées dans cette rubrique.",
  },
];

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

/**
 * Images d'illustration utilisées pour présenter la vie scolaire et les espaces
 * de l'établissement. Remplacez-les par des photos réelles dès qu'elles sont disponibles.
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
