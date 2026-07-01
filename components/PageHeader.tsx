type PageHeaderProps = {
  title: string;
  intro?: string;
  label?: string;
};

export function PageHeader({ title, intro, label }: PageHeaderProps) {
  return (
    <header className="mb-14 border-b border-pntrsw-deep/20 pb-10">
      {label ? (
        <p className="type-subheadline label-caps mb-4 text-pntrsw-body/60">{label}</p>
      ) : null}
      <h1 className="type-headline max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.88] text-pntrsw-body">
        {title}
      </h1>
      {intro ? (
        <p className="type-body mt-6 max-w-2xl text-base leading-[1.6] text-pntrsw-body/85">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
