import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";

import { SchoolLogo } from "@/components/branding/SchoolLogo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/config/navigation";
import { school } from "@/config/school";

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu principal
      </a>

      <header className="sticky top-0 z-30 border-b border-border/80 bg-[#f9f5ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link to="/" className="min-w-0" aria-label="Accueil du site de l'école">
            <SchoolLogo size="sm" />
          </Link>

          <nav
            className="ml-auto hidden items-center gap-1 lg:flex"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-[#e9e2d7] hover:text-foreground"
                activeProps={{ className: "bg-[#e9e2d7] text-foreground shadow-sm" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full bg-[#2d2d2d] text-[#f8f0e2] hover:bg-[#1f1f1f]">
              <Link to="/contact">Nous contacter</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                  <Menu className="h-5 w-5" aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="text-base">Menu</SheetTitle>
                <nav className="mt-6 flex flex-col gap-1" aria-label="Navigation mobile">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                      activeProps={{ className: "text-primary bg-secondary" }}
                      activeOptions={{ exact: link.to === "/" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4">
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Nous contacter
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="contenu" className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#2d2d2d] text-[#f8f0e2]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-semibold">{school.name}</p>
          <p className="mt-3 max-w-xs text-sm text-[#f8f0e2]/80">{school.tagline}</p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#d9d3ca]">Navigation</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[#f8f0e2]/80 transition-colors hover:text-[#ffffff]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#d9d3ca]">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#f8f0e2]/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d9d3ca]" aria-hidden />
              <span>{school.contact.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#d9d3ca]" aria-hidden />
              <a href={`tel:${school.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {school.contact.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#d9d3ca]" aria-hidden />
              <a href={`mailto:${school.contact.email}`} className="hover:text-white">
                {school.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#d9d3ca]">
            Réseaux sociaux
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[#f8f0e2]/70">
            {school.social.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="hover:text-white"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label} — lien à communiquer</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#f8f0e2]/15 px-4 py-5 text-center text-xs text-[#f8f0e2]/70">
        © {new Date().getFullYear()} {school.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
