import type { ReactNode } from "react";

type GradientFieldProps = {
  children: ReactNode;
  className?: string;
  variant?: "hero" | "soft" | "footer";
};

export function GradientField({
  children,
  className = "",
  variant = "hero",
}: GradientFieldProps) {
  const variantClass = {
    hero: "gradient-hero",
    soft: "gradient-soft",
    footer: "gradient-footer",
  }[variant];

  return (
    <div className={`relative overflow-hidden ${variantClass} ${className}`}>
      <div className="gradient-noise pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
