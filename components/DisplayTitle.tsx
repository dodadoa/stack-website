import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";

type DisplayTitleProps = {
  locale?: Locale;
  asLink?: boolean;
  size?: "hero" | "header" | "page";
  className?: string;
  onGradient?: boolean;
};

const sizeStyles = {
  hero: {
    line1: "text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92]",
    line2: "text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.95]",
    small: "text-[clamp(0.65rem,1.4vw,0.85rem)]",
  },
  header: {
    line1: "text-sm leading-none",
    line2: "text-sm leading-none",
    small: "text-[0.55rem]",
  },
  page: {
    line1: "text-[clamp(2rem,5vw,3.5rem)] leading-[0.92]",
    line2: "text-[clamp(1.35rem,3.5vw,2.25rem)] leading-[0.95]",
    small: "text-[0.65rem]",
  },
} as const;

export function DisplayTitle({
  locale,
  asLink = false,
  size = "hero",
  className = "",
  onGradient = false,
}: DisplayTitleProps) {
  const s = sizeStyles[size];
  const ink = "text-pntrsw-body";
  const mute = onGradient ? "text-pntrsw-body/60" : "text-pntrsw-body/70";

  if (size === "header") {
    const header = (
      <span className={`type-headline block ${className}`}>
        <span className={`block ${s.line1} ${ink}`}>Patch Notes</span>
        <span className={`type-subheadline mt-1 block ${s.small} ${mute}`}>
          Refuse a Settled World
        </span>
      </span>
    );

    if (asLink && locale) {
      return (
        <Link
          href={localePath(locale)}
          className="inline-block transition-opacity hover:opacity-70"
        >
          {header}
        </Link>
      );
    }

    return header;
  }

  const content = (
    <span className={`type-headline block ${className}`}>
      <span className={`block ${s.line1} ${ink}`}>Patch Notes</span>
      <span className={`mt-1 block ${s.line2} ${ink}`}>
        <span className={`type-subheadline ${s.small} ${mute}`}>That </span>
        <span className="type-headline-highlight">Refuse</span>
      </span>
      <span className={`mt-0.5 block ${s.line2} ${ink}`}>
        <span className={`type-subheadline ${s.small} ${mute}`}>A </span>
        <span className="type-headline-highlight">Settled World</span>
      </span>
    </span>
  );

  if (asLink && locale) {
    return (
      <Link
        href={localePath(locale)}
        className="inline-block transition-opacity hover:opacity-70"
      >
        {content}
      </Link>
    );
  }

  return content;
}
