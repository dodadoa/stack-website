import type { ReactNode } from "react";

const THAI_RUN = /[\u0E00-\u0E7F]+/;

type ArtistNameProps = {
  name: string;
  className?: string;
};

export function ArtistName({ name, className }: ArtistNameProps) {
  const parts = name.split(/([\u0E00-\u0E7F]+)/).filter((part) => part.length > 0);

  const content: ReactNode[] = parts.map((part, index) =>
    THAI_RUN.test(part) ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );

  if (className) {
    return <span className={className}>{content}</span>;
  }

  return content;
}
