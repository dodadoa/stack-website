import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";

type StackMarkProps = {
  locale: Locale;
};

export function StackMark({ locale }: StackMarkProps) {
  return (
    <Link
      href={localePath(locale)}
      className="font-sporting text-[1.65rem] leading-none tracking-[-0.05em] text-pntrsw-blue transition-opacity hover:opacity-70 md:text-[1.85rem]"
      aria-label="Stack"
    >
      STACK
    </Link>
  );
}
