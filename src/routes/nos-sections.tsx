import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, PageHero, SectionHeading } from "@/components/public/sections";
import { getSiteConfig, loadSiteConfig, type SiteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/nos-sections")({
  head: () => ({
    meta: [
      { title: "Nos sections — École Secour d'en haut" },
      {
        name: "description",
        content:
          "Présentation des sections préscolaire, fondamentale et secondaire de l'école.",
      },
      { property: "og:title", content: "Nos sections — École Secour d'en haut" },
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
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig());
  useEffect(() => {
    const sync = async () => setSiteConfig(await loadSiteConfig());
    sync();
    window.addEventListener("site-config:updated", sync);
    return () => window.removeEventListener("site-config:updated", sync);
  }, []);

  return (
    <PublicLayout>
      <PageHero
        eyebrow={siteConfig.pageContent.sections.eyebrow}
        title={siteConfig.pageContent.sections.title}
        description={siteConfig.pageContent.sections.intro}
      />

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-14">
        {siteConfig.pageContent.sectionsList.map((section, index) => (
          <article
            key={section.slug}
            className="rounded-xl border border-border bg-card p-6 shadow-(--shadow-card) sm:p-8"
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
            title={siteConfig.pageContent.sections.infoTitle}
            description={siteConfig.pageContent.sections.infoText}
          />
        </div>
      </section>

      <CtaSection
        title={siteConfig.pageContent.sections.ctaTitle}
        description={siteConfig.pageContent.sections.ctaText}
        primary={{ to: "/contact", label: "Demander des informations" }}
        secondary={{ to: "/admissions", label: "Voir les admissions" }}
      />
    </PublicLayout>
  );
}
