import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { PublicRoute } from "@/config/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Bandeau de titre utilisé en haut des pages intérieures. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-primary-foreground/80 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="h-full transition-shadow hover:shadow-[var(--shadow-card)]">
      <CardHeader className="pb-2">
        {Icon ? (
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        ) : null}
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{children}</CardContent>
    </Card>
  );
}

export function EventCard({
  title,
  date,
  location,
  description,
}: {
  title: string;
  date: string;
  location: string;
  description: string;
}) {
  return (
    <Card className="h-full border-l-4 border-l-accent transition-shadow hover:shadow-[var(--shadow-card)]">
      <CardHeader className="pb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {date} · {location}
        </p>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  );
}

export function NewsCard({
  title,
  date,
  excerpt,
}: {
  title: string;
  date: string;
  excerpt: string;
}) {
  return (
    <Card className="h-full transition-shadow hover:shadow-[var(--shadow-card)]">
      <CardHeader className="pb-2">
        <p className="text-xs text-muted-foreground">{date}</p>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{excerpt}</CardContent>
    </Card>
  );
}

export function GalleryCard({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  return (
    <figure className="group overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={1280}
          height={853}
          loading="lazy"
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{category}</span>
        <span>Image d'illustration</span>
      </figcaption>
    </figure>
  );
}

/** Bloc d'appel à l'action réutilisable en bas de page. */
export function CtaSection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { to: PublicRoute; label: string };
  secondary?: { to: PublicRoute; label: string };
}) {
  return (
    <section className="border-t border-border bg-secondary/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12">
        <div>
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button asChild size="lg" variant="outline">
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
