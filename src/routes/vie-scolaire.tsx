import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout } from "@/components/public/PublicLayout";
import {
  CtaSection,
  EventCard,
  InfoCard,
  NewsCard,
  PageHero,
  SectionHeading,
} from "@/components/public/sections";
import { DEMO_EVENTS, DEMO_NEWS, SCHOOL_ACTIVITIES } from "@/config/content";

export const Route = createFileRoute("/vie-scolaire")({
  head: () => ({
    meta: [
      { title: "Vie scolaire — Ecole Secour d'en haut de puit-sales" },
      {
        name: "description",
        content:
          "Activités, événements et actualités de la vie scolaire à l'Ecole Secour d'en haut de puit-sales.",
      },
      { property: "og:title", content: "Vie scolaire — Ecole Secour d'en haut de puit-sales" },
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
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Au quotidien"
        title="Vie scolaire"
        description="Activités, événements et actualités de l'établissement. Les contenus ci-dessous sont des exemples de démonstration."
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Activités"
          title="Activités parascolaires"
          description="Exemples d'activités, à confirmer par l'école."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL_ACTIVITIES.map((activity) => (
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
            title="Événements à venir"
            description="Ces événements sont fictifs et servent uniquement à illustrer la présentation du calendrier."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {DEMO_EVENTS.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Actualités"
          title="Nouvelles de l'école"
          description="Espace réservé aux communications officielles de la direction."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {DEMO_NEWS.map((item) => (
            <NewsCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <CtaSection
        title="Envie de voir l'école en images ?"
        description="La galerie présente les espaces et les moments de la vie de l'établissement."
        primary={{ to: "/galerie", label: "Voir la galerie" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
      />
    </PublicLayout>
  );
}
