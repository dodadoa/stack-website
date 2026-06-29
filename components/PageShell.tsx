import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export function PageShell({
  children,
  className = "",
  wide = true,
}: PageShellProps) {
  return (
    <div
      className={`mx-auto px-6 py-12 md:py-16 ${wide ? "max-w-6xl" : "max-w-3xl"} ${className}`}
    >
      {children}
    </div>
  );
}
