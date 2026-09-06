import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, PageHero, SectionHeading } from "@/components/public/sections";
import { SCHOOL_SECTIONS } from "@/config/content";

export const Route = createFileRoute("/nos-sections")({
  head: () => ({
    meta: [
      { title: "Nos sections — Ecole Secour d'en haut de puit-sales" },
      {
        name: "description",
        content:
          "Section préscolaire et fondamentale (maternelle à 6e année) et section secondaire (7e année à NS4) de l'Ecole Secour d'en haut de puit-sales.",
      },
      { property: "og:title", content: "Nos sections — Ecole Secour d'en haut de puit-sales" },
      {
        property: "og:description",
        content: "De la maternelle à la NS4 : l'organisation pédagogique de l'école.",
      },
      { property: "og:url", content: "/nos-sections" },
    ],
    links: [{ rel: "canonical", href: "/nos-sections" }],
  }),
  component: NosSectionsPage,
});

function NosSectionsPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Organisation pédagogique"
        title="Nos sections"
        description="L'école est organisée en deux sections, du préscolaire jusqu'à la fin du secondaire."
      />

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-14">
        {SCHOOL_SECTIONS.map((section, index) => (
          <article
            key={section.slug}
            className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
              Section {index + 1}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{section.title}</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{section.summary}</p>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Niveaux proposés
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {section.levels.map((level) => (
                <li
                  key={level}
                  className="rounded-md border border-border bg-secondary/60 px-3 py-2 text-sm font-medium"
                >
                  {level}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <div>
          <SectionHeading
            title="Informations complémentaires"
            description="Les horaires, effectifs par classe et programmes détaillés seront ajoutés ici dès leur communication par la direction."
          />
        </div>
      </section>

      <CtaSection
        title="Vous cherchez la classe adaptée à votre enfant ?"
        description="Contactez le secrétariat pour connaître les places disponibles par niveau."
        primary={{ to: "/contact", label: "Demander des informations" }}
        secondary={{ to: "/admissions", label: "Voir les admissions" }}
      />
    </PublicLayout>
  );
}
