import { createFileRoute } from "@tanstack/react-router";
import { Compass, Target } from "lucide-react";
import { useEffect, useState } from "react";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, InfoCard, PageHero, SectionHeading } from "@/components/public/sections";
import { SCHOOL_VALUES } from "@/config/content";
import { getSiteConfig, loadSiteConfig } from "@/lib/site-config";

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
  const [siteConfig, setSiteConfig] = useState(getSiteConfig());

  useEffect(() => {
    const sync = async () => setSiteConfig(await loadSiteConfig());
    sync();
    window.addEventListener("site-config:updated", sync);
    return () => window.removeEventListener("site-config:updated", sync);
  }, []);

  return (
    <PublicLayout>
      <PageHero
        eyebrow={siteConfig.pageContent.about.eyebrow}
        title={siteConfig.pageContent.about.title}
        description={siteConfig.aboutText}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <SectionHeading title={siteConfig.aboutTitle} />
          <p className="mt-4 text-sm text-muted-foreground">
            {siteConfig.aboutText}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {siteConfig.mission}
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <img
            src={siteConfig.heroImage}
            alt={siteConfig.heroAlt}
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
            {siteConfig.mission}
          </InfoCard>
          <InfoCard icon={Compass} title="Notre vision">
            {siteConfig.vision}
          </InfoCard>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Nos valeurs"
          title={siteConfig.pageContent.about.valuesTitle}
          description={siteConfig.pageContent.about.valuesText}
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
        title={siteConfig.pageContent.about.ctaTitle}
        description={siteConfig.pageContent.about.ctaText}
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/nos-sections", label: "Voir nos sections" }}
      />
    </PublicLayout>
  );
}
