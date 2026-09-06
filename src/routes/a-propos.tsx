import { createFileRoute } from "@tanstack/react-router";
import { Compass, Target } from "lucide-react";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, InfoCard, PageHero, SectionHeading } from "@/components/public/sections";
import { SCHOOL_VALUES } from "@/config/content";
import { school } from "@/config/school";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — École Secour d'en haut" },
      {
        name: "description",
        content:
          "Présentation de l'école, de sa mission, de sa vision et des valeurs qui portent son projet éducatif.",
      },
      { property: "og:title", content: "À propos — École Secour d'en haut" },
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
        description="Une école qui place l'élève, la discipline et le développement personnel au cœur de son projet éducatif."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <SectionHeading title="Notre école" />
          <p className="mt-4 text-sm text-muted-foreground">
            L'établissement accueille les élèves dans un cadre structurant, avec une attention particulière à la qualité de l'enseignement, au respect des valeurs et au bien-être de chacun.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            La mission de l'école est de former des jeunes responsables, curieux, disciplinés et prêts à affronter les défis de demain.
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
            Favoriser la réussite scolaire, le développement des compétences et l'épanouissement de chaque élève dans un cadre bienveillant et exigeant.
          </InfoCard>
          <InfoCard icon={Compass} title="Notre vision">
            Construire une école de qualité, ouverte sur les besoins des familles et engagée dans la réussite de ses élèves.
          </InfoCard>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Les valeurs que nous voulons transmettre"
          description="Des principes qui guident la vie scolaire et l'accompagnement des élèves."
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
