import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PublicLayout } from "@/components/public/PublicLayout";
import { CtaSection, GalleryCard, PageHero } from "@/components/public/sections";
import { Button } from "@/components/ui/button";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/config/content";

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
  const items =
    active === TOUTES ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === active);

  return (
    <PublicLayout>
      <PageHero
        eyebrow="En images"
        title="Galerie"
        description="Quelques images de l'établissement et de la vie scolaire pour mieux découvrir la communauté de l'école."
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {[TOUTES, ...GALLERY_CATEGORIES].map((category) => (
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
        title="Vous voulez en savoir plus sur l'école ?"
        description="Contactez-nous ou consultez la présentation de l'établissement."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/a-propos", label: "À propos de l'école" }}
      />
    </PublicLayout>
  );
}
