import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, GalleryCard, PageHero } from "@/components/public/sections";
import { Button } from "@/components/ui/button";
import { getSiteConfig, loadSiteConfig, type SiteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — École Secour d'en haut" },
      {
        name: "description",
        content:
          "Galerie photo de l'école : ses espaces, ses activités et les moments de la vie scolaire.",
      },
      { property: "og:title", content: "Galerie — École Secour d'en haut" },
      {
        property: "og:description",
        content: "Découvrez l'école en images : bâtiments, classes, activités et événements.",
      },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GaleriePage,
});

const TOUTES = "Toutes";

function GaleriePage() {
  const [active, setActive] = useState<string>(TOUTES);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig());
  useEffect(() => {
    const sync = async () => setSiteConfig(await loadSiteConfig());
    sync();
    window.addEventListener("site-config:updated", sync);
    return () => window.removeEventListener("site-config:updated", sync);
  }, []);
  const items =
    active === TOUTES ? siteConfig.pageContent.galleryItems : siteConfig.pageContent.galleryItems.filter((item) => item.category === active);

  return (
    <PublicLayout>
      <PageHero
        eyebrow={siteConfig.pageContent.gallery.eyebrow}
        title={siteConfig.pageContent.gallery.title}
        description={siteConfig.pageContent.gallery.intro}
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {[TOUTES, ...siteConfig.pageContent.galleryCategories].map((category) => (
            <Button
              key={category}
              size="sm"
              variant={active === category ? "default" : "outline"}
              onClick={() => setActive(category)}
              aria-pressed={active === category}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GalleryCard key={item.src} {...item} />
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">
            Aucune image n'est encore disponible dans cette catégorie.
          </p>
        ) : null}
      </section>

      <CtaSection
        title={siteConfig.pageContent.gallery.ctaTitle}
        description={siteConfig.pageContent.gallery.ctaText}
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/a-propos", label: "À propos de l'école" }}
      />
    </PublicLayout>
  );
}
