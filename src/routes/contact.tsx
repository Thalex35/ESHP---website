import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PublicLayout } from "@/components/public/PublicLayout";
import { PageHero, SectionHeading } from "@/components/public/sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { school } from "@/config/school";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — École Secour d'en haut" },
      {
        name: "description",
        content:
          "Adresse, téléphone, e-mail et horaires de l'école, ainsi qu'un formulaire pour contacter le secrétariat.",
      },
      { property: "og:title", content: "Contact — École Secour d'en haut" },
      {
        property: "og:description",
        content: "Coordonnées de l'école et formulaire de contact pour les familles.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, { message: "Veuillez indiquer votre nom complet." })
    .max(100, { message: "Le nom ne doit pas dépasser 100 caractères." }),
  email: z
    .string()
    .trim()
    .email({ message: "Veuillez saisir une adresse e-mail valide." })
    .max(255, { message: "L'adresse e-mail est trop longue." }),
  telephone: z
    .string()
    .trim()
    .max(30, { message: "Le numéro de téléphone est trop long." })
    .optional()
    .or(z.literal("")),
  sujet: z
    .string()
    .trim()
    .min(3, { message: "Veuillez préciser le sujet de votre message." })
    .max(150, { message: "Le sujet ne doit pas dépasser 150 caractères." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Votre message doit contenir au moins 10 caractères." })
    .max(1000, { message: "Le message ne doit pas dépasser 1000 caractères." }),
});

type FieldName = keyof z.infer<typeof contactSchema>;

const CONTACT_DETAILS = [
  { icon: MapPin, label: "Adresse", value: school.contact.address },
  { icon: Phone, label: "Téléphone", value: school.contact.phone },
  { icon: Mail, label: "E-mail", value: school.contact.email },
  { icon: Clock, label: "Horaires", value: school.contact.hours },
];

function ContactPage() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = contactSchema.safeParse(data);

    if (!result.success) {
      const nextErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldName | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("Veuillez corriger les champs indiqués.");
      return;
    }

    setErrors({});
    form.reset();
    toast.success(
      "Merci ! Votre message a bien été pris en compte. L'envoi automatique n'est pas encore activé : contactez également l'école par téléphone.",
    );
  }

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Nous joindre"
        title="Contact"
        description="Vous souhaitez obtenir des informations sur l'école, les inscriptions ou la vie scolaire ? Nous sommes à votre disposition."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading title="Coordonnées de l'école" />
          <ul className="mt-6 space-y-4">
            {CONTACT_DETAILS.map((detail) => (
              <li key={detail.label} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  <detail.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold">{detail.label}</p>
                  <p className="text-sm text-muted-foreground">{detail.value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-border bg-secondary/60 p-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Localisation</p>
            <p className="mt-1">
              Le plan d'accès sera ajouté dès que l'adresse exacte de l'école aura été communiquée.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-xl font-semibold">Envoyer un message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tous les champs marqués d'un astérisque sont obligatoires.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="nom">Nom complet *</Label>
                <Input id="nom" name="nom" maxLength={100} autoComplete="name" />
                {errors.nom ? <p className="text-xs text-destructive">{errors.nom}</p> : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Adresse e-mail *</Label>
                <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" />
                {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="telephone">Téléphone (facultatif)</Label>
                <Input id="telephone" name="telephone" maxLength={30} autoComplete="tel" />
                {errors.telephone ? (
                  <p className="text-xs text-destructive">{errors.telephone}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sujet">Sujet *</Label>
                <Input id="sujet" name="sujet" maxLength={150} />
                {errors.sujet ? <p className="text-xs text-destructive">{errors.sujet}</p> : null}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" rows={6} maxLength={1000} />
              {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Envoyer le message
            </Button>
            <p className="text-xs text-muted-foreground">
              L'envoi automatique des messages n'est pas encore activé : vos informations ne sont
              pas transmises par ce formulaire pour le moment.
            </p>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}
