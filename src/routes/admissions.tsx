import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, PageHero, SectionHeading } from "@/components/public/sections";
import { ADMISSION_BLOCKS } from "@/config/content";
import { school } from "@/config/school";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Ecole Secour d'en haut de puit-sales" },
      {
        name: "description",
        content:
          "Conditions d'admission, documents requis et processus d'inscription à l'Ecole Secour d'en haut de puit-sales.",
      },
      { property: "og:title", content: "Admissions — Ecole Secour d'en haut de puit-sales" },
      {
        property: "og:description",
        content: "Conditions, documents et étapes pour inscrire votre enfant à l'école.",
      },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Inscriptions"
        title="Admissions"
        description="Retrouvez ici les informations nécessaires pour inscrire votre enfant. Les éléments marqués « à confirmer » seront précisés par la direction."
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {ADMISSION_BLOCKS.map((block) => (
            <article
              key={block.title}
              className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h2 className="font-display text-lg font-semibold">{block.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-secondary/60 p-6">
          <SectionHeading
            title="Où déposer un dossier ?"
            description="Les inscriptions se font uniquement au bureau de l'école."
          />
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            <li>{school.contact.address}</li>
            <li>{school.contact.phone}</li>
            <li>{school.contact.email}</li>
            <li>{school.contact.hours}</li>
          </ul>
        </div>
      </section>

      <CtaSection
        title="Prêt à commencer une inscription ?"
        description="Écrivez-nous pour recevoir la liste complète des pièces à fournir."
        primary={{ to: "/contact", label: "Contacter le secrétariat" }}
        secondary={{ to: "/nos-sections", label: "Voir nos sections" }}
      />
    </PublicLayout>
  );
}
