import { createFileRoute } from "@tanstack/react-router";
import { Compass, Target } from "lucide-react";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, InfoCard, PageHero, SectionHeading } from "@/components/public/sections";
import { SCHOOL_VALUES } from "@/config/content";
import { school } from "@/config/school";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Ecole Secour d'en haut de puit-sales" },
      {
        name: "description",
        content:
          "Présentation de l'Ecole Secour d'en haut de puit-sales : notre école, notre mission, notre vision et nos valeurs.",
      },
      { property: "og:title", content: "À propos — Ecole Secour d'en haut de puit-sales" },
      {
        property: "og:description",
        content: "Notre école, notre mission, notre vision et nos valeurs.",
      },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AProposPage,
});

function AProposPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="À propos"
        title="Notre école"
        description="Cette page présentera l'histoire, la mission et les engagements de l'établissement. Les textes ci-dessous sont provisoires."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <SectionHeading title="Notre école" />
          <p className="mt-4 text-sm text-muted-foreground">
            Ajoutez ici la présentation officielle de l'établissement : sa création, son
            implantation à Puit-Sales, son organisation et le nombre de classes accueillies.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Ce texte est un contenu provisoire, prévu pour être remplacé par la direction.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <img
            src={school.images.hero}
            alt={school.images.heroAlt}
            width={1600}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-2">
          <InfoCard icon={Target} title="Notre mission">
            Ajoutez ici la mission éducative officielle de l'école : les savoirs transmis,
            l'accompagnement des élèves et le rôle de l'établissement dans la communauté.
          </InfoCard>
          <InfoCard icon={Compass} title="Notre vision">
            Ajoutez ici la vision de l'école pour les prochaines années : projets, développement et
            objectifs pédagogiques.
          </InfoCard>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Les valeurs que nous voulons transmettre"
          description="Ces valeurs sont proposées à titre indicatif et doivent être confirmées par la direction."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOL_VALUES.map((value) => (
            <InfoCard key={value.title} title={value.title}>
              {value.description}
            </InfoCard>
          ))}
        </div>
      </section>

      <CtaSection
        title="Une question sur l'école ?"
        description="L'équipe de l'école répond aux familles et aux visiteurs."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/nos-sections", label: "Voir nos sections" }}
      />
    </PublicLayout>
  );
}
