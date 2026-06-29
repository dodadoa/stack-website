type PageHeaderProps = {
  title: string;
  intro?: string;
  label?: string;
};

export function PageHeader({ title, intro, label }: PageHeaderProps) {
  return (
    <header className="mb-14 border-b-2 border-pntrsw-lime pb-10">
      {label ? <p className="label-caps mb-4 text-pntrsw-moss">{label}</p> : null}
      <h1 className="font-sporting max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.035em] text-pntrsw-navy">
        {title}
      </h1>
      {intro ? (
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-[1.55] text-pntrsw-olive">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
