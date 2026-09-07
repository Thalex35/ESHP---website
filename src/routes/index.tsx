import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { PublicLayout } from "@/components/public/PublicLayout";
import {
  CtaSection,
  EventCard,
  GalleryCard,
  InfoCard,
  NewsCard,
  SectionHeading,
} from "@/components/public/sections";
import { Button } from "@/components/ui/button";
import {
  DEMO_EVENTS,
  DEMO_NEWS,
  GALLERY_ITEMS,
  SCHOOL_SECTIONS,
  SCHOOL_VALUES,
} from "@/config/content";
import { getSiteConfig, loadSiteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "École Secour d'en haut | Éducation et formation" },
      {
        name: "description",
        content:
          "Découvrez l'école, ses sections, les informations d'admission et les moyens de nous contacter.",
      },
      { property: "og:title", content: "École Secour d'en haut" },
      {
        property: "og:description",
        content:
          "Former, accompagner et préparer les jeunes pour l'avenir. Découvrez l'école, ses sections et les admissions.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: AccueilPage,
});

function AccueilPage() {
  const [siteConfig, setSiteConfig] = useState(getSiteConfig());
  const galleryPreview = GALLERY_ITEMS.slice(0, 3);

  useEffect(() => {
    const sync = async () => setSiteConfig(await loadSiteConfig());
    sync();
    window.addEventListener("site-config:updated", sync);
    return () => window.removeEventListener("site-config:updated", sync);
  }, []);

  return (
    <PublicLayout>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.pageContent.home.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {siteConfig.schoolName}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">{siteConfig.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/a-propos">Découvrir notre école</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border shadow-(--shadow-card)">
            <img
              src={siteConfig.heroImage}
              alt={siteConfig.heroAlt}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Notre école"
          title={siteConfig.pageContent.home.aboutTitle}
          description={siteConfig.pageContent.home.aboutText}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={BookOpen} title="Un parcours complet">
            De la maternelle à la NS4, les élèves bénéficient d'un cadre structurant et d'un enseignement de qualité.
          </InfoCard>
          <InfoCard icon={Users} title="Un accompagnement de proximité">
            Nous mettons l'accent sur le dialogue avec les familles et le suivi de chaque élève.
          </InfoCard>
          <InfoCard icon={GraduationCap} title="Préparation aux examens">
            L'école vise la réussite scolaire, la discipline et le développement des compétences essentielles.
          </InfoCard>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Nos sections"
            title={siteConfig.pageContent.home.sectionsTitle}
            description={siteConfig.pageContent.home.sectionsText}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SCHOOL_SECTIONS.map((section) => (
              <article
                key={section.slug}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-(--shadow-card)"
              >
                <h3 className="font-display text-lg font-semibold">{section.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{section.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {section.levels.map((level) => (
                    <li
                      key={level}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {level}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/nos-sections">
                Voir le détail des sections
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Pourquoi choisir notre école"
          description="Valeurs proposées à titre indicatif, en attente de validation par la direction."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOL_VALUES.map((value) => (
            <InfoCard key={value.title} title={value.title}>
              {value.description}
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Vie scolaire"
            title="Prochains événements"
            description="Exemples de démonstration : le calendrier officiel sera publié par l'école."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {DEMO_EVENTS.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/vie-scolaire">
                <CalendarDays className="mr-1 h-4 w-4" aria-hidden />
                Découvrir la vie scolaire
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Actualités"
          title="Dernières informations"
          description="Les mises à jour de l'établissement et les communications importantes seront partagées ici."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {DEMO_NEWS.map((item) => (
            <NewsCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Galerie"
            title="Aperçu en images"
            description="Images d'illustration : elles seront remplacées par les photographies de l'école."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item) => (
              <GalleryCard key={item.src} {...item} />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/galerie">Voir toute la galerie</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Vous souhaitez inscrire votre enfant ?"
        description="Consultez les informations d'admission ou écrivez directement à l'école pour obtenir un dossier."
        primary={{ to: "/admissions", label: "Voir les admissions" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
      />
    </PublicLayout>
  );
}
