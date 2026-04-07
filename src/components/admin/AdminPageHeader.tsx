type Props = {
  /** Small caps line above the title (often section context). */
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: Props) {
  return (
    <header className="space-y-1">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-3">
          {eyebrow ? (
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter leading-[0.95] md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
