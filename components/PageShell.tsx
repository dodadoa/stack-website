import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  full?: boolean;
};

export function PageShell({
  children,
  className = "",
  wide = true,
  full = false,
}: PageShellProps) {
  const widthClass = full ? "max-w-none px-4 sm:px-6 lg:px-8" : wide ? "max-w-6xl px-6" : "max-w-3xl px-6";

  return (
    <div className={`mx-auto py-12 md:py-16 ${widthClass} ${className}`}>
      {children}
    </div>
  );
}
