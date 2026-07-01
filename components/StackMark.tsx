import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

type StackMarkProps = {
  locale: Locale;
};

export function StackMark({ locale }: StackMarkProps) {
  return (
    <Link
      href={localePath(locale)}
      className="inline-flex transition-opacity hover:opacity-70"
      aria-label="Stack"
    >
      <Image
        src="/assets/LOGO/Stack_logo.png"
        alt="Stack"
        width={360}
        height={63}
        className="h-5 w-auto md:h-6"
        priority
      />
    </Link>
  );
}
