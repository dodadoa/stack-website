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
    line1: "text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]",
    line2: "text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.02em]",
    small: "text-[clamp(0.65rem,1.4vw,0.85rem)] font-medium tracking-[0.28em]",
  },
  header: {
    line1: "text-sm font-semibold leading-none tracking-[-0.02em]",
    line2: "text-sm font-semibold leading-none tracking-[-0.02em]",
    small: "text-[0.55rem] font-medium tracking-[0.22em]",
  },
  page: {
    line1: "text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]",
    line2: "text-[clamp(1.35rem,3.5vw,2.25rem)] font-semibold leading-[0.95] tracking-[-0.02em]",
    small: "text-[0.65rem] font-medium tracking-[0.26em]",
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
  const ink = onGradient ? "text-pntrsw-navy" : "text-pntrsw-navy";
  const mute = onGradient ? "text-pntrsw-olive/80" : "text-pntrsw-olive";

  if (size === "header") {
    const header = (
      <span className={`block uppercase ${className}`}>
        <span className={`block ${s.line1} ${ink}`}>Patch Notes</span>
        <span className={`mt-1 block ${s.small} ${mute}`}>
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
    <span className={`block uppercase ${className}`}>
      <span className={`block ${s.line1} ${ink}`}>Patch Notes</span>
      <span className={`mt-1 block ${s.line2} ${ink}`}>
        <span className={`${s.small} ${mute}`}>That </span>
        Refuse
      </span>
      <span className={`mt-0.5 block ${s.line2} ${ink}`}>
        <span className={`${s.small} ${mute}`}>A </span>
        Settled World
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
