type WorkDescriptionProps = {
  description: string | readonly string[];
  note?: string;
};

export function WorkDescription({ description, note }: WorkDescriptionProps) {
  const paragraphs = Array.isArray(description)
    ? description
    : (description as string).split("\n\n");

  return (
    <div className="type-body prose detail-text-width space-y-4 text-base leading-[1.65] text-pntrsw-body/85">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
      {note ? <p className="text-pntrsw-body/70">{note}</p> : null}
    </div>
  );
}
