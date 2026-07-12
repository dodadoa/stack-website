type WorkDescriptionProps = {
  description: string;
  descriptionTh?: readonly string[];
  note?: string;
  noteTh?: string;
};

export function WorkDescription({
  description,
  descriptionTh,
  note,
  noteTh,
}: WorkDescriptionProps) {
  const hasThai = Boolean(descriptionTh?.length || noteTh);

  return (
    <>
      <div className="type-body prose detail-text-width space-y-4 text-base leading-[1.65] text-pntrsw-body/85">
        {description.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        {note ? <p className="text-pntrsw-body/70">{note}</p> : null}
      </div>

      {hasThai ? (
        <div className="type-body thai-text detail-text-width mt-10 space-y-4 border-t border-pntrsw-deep/20 pt-10 text-base leading-[1.75] text-pntrsw-body/85">
          {descriptionTh?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {noteTh ? <p className="text-pntrsw-body/70">{noteTh}</p> : null}
        </div>
      ) : null}
    </>
  );
}
