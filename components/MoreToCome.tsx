type MoreToComeProps = {
  className?: string;
  message?: string;
  variant?: "inline" | "footer";
};

export function MoreToCome({
  className = "",
  message = "More To Come",
  variant = "footer",
}: MoreToComeProps) {
  if (variant === "inline") {
    return (
      <p
        className={`type-subheadline label-caps inline-flex items-center gap-2 rounded-full bg-pntrsw-lime px-4 py-2 text-[0.6875rem] leading-none text-pntrsw-black ${className}`}
      >
        {message}
        <span className="patch-cursor !text-pntrsw-black" aria-hidden>
          {" "}
        </span>
      </p>
    );
  }

  return (
    <p
      className={`type-subheadline meta-line mt-10 flex items-center gap-2 border-t border-pntrsw-deep/15 pt-8 text-pntrsw-body/45 ${className}`}
    >
      {message}
      <span className="patch-cursor" aria-hidden>
        {" "}
      </span>
    </p>
  );
}
