import { school } from "@/config/school";
import { cn } from "@/lib/utils";

interface SchoolLogoProps {
  className?: string;
  /** Show the school name next to the mark. */
  withName?: boolean;
  /** Use light text (for dark surfaces such as the sidebar). */
  inverted?: boolean;
  size?: "sm" | "md";
}

/**
 * Single place where the school mark is rendered. Replace the image file in
 * `src/config/school.ts` to rebrand the whole application.
 */
export function SchoolLogo({ className, withName = true, inverted, size = "md" }: SchoolLogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src={school.images.logo}
        alt={school.images.logoAlt}
        width={512}
        height={512}
        className={cn(
          "shrink-0 rounded-md bg-card object-contain p-0.5",
          size === "sm" ? "h-8 w-8" : "h-10 w-10",
        )}
      />
      {withName ? (
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display font-semibold",
              size === "sm" ? "text-sm" : "text-base",
              inverted ? "text-sidebar-foreground" : "text-foreground",
            )}
          >
            {school.shortName}
          </span>
          <span
            className={cn(
              "text-[11px]",
              inverted ? "text-sidebar-foreground/70" : "text-muted-foreground",
            )}
          >
            {school.locality}
          </span>
        </span>
      ) : null}
    </span>
  );
}
