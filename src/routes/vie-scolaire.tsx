import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PublicLayout } from "@/components/public/PublicLayout";
import {
  CtaSection,
  EventCard,
  InfoCard,
  NewsCard,
  PageHero,
  SectionHeading,
} from "@/components/public/sections";
import { getSiteConfig, loadSiteConfig, type SiteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/vie-scolaire")({
  head: () => ({
    meta: [
      { title: "Vie scolaire — École Secour d'en haut" },
      {
        name: "description",
        content:
          "Activités, événements et actualités de la vie scolaire de l'école.",
      },
      { property: "og:title", content: "Vie scolaire — École Secour d'en haut" },
      {
        property: "og:description",
        content: "Activités parascolaires, calendrier des événements et actualités de l'école.",
      },
      { property: "og:url", content: "/vie-scolaire" },
    ],
    links: [{ rel: "canonical", href: "/vie-scolaire" }],
  }),
  component: VieScolairePage,
});

function VieScolairePage() {
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
        eyebrow={siteConfig.pageContent.studentLife.eyebrow}
        title={siteConfig.pageContent.studentLife.title}
        description={siteConfig.pageContent.studentLife.intro}
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Activités"
          title={siteConfig.pageContent.studentLife.activitiesTitle}
          description={siteConfig.pageContent.studentLife.activitiesText}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.pageContent.activities.map((activity) => (
            <InfoCard key={activity.title} title={activity.title}>
              {activity.description}
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Calendrier"
            title={siteConfig.pageContent.studentLife.eventsTitle}
            description={siteConfig.pageContent.studentLife.eventsText}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {siteConfig.pageContent.events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Actualités"
          title={siteConfig.pageContent.studentLife.newsTitle}
          description={siteConfig.pageContent.studentLife.newsText}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {siteConfig.pageContent.news.map((item) => (
            <NewsCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <CtaSection
        title={siteConfig.pageContent.studentLife.ctaTitle}
        description={siteConfig.pageContent.studentLife.ctaText}
        primary={{ to: "/galerie", label: "Voir la galerie" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
      />
    </PublicLayout>
  );
}
