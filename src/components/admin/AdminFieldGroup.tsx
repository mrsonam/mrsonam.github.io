import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function AdminFieldGroup({ title, children, className }: Props) {
  return (
    <fieldset className={cn("space-y-4", className)}>
      <legend className="mb-4 w-full border-b border-border pb-2 text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground">
        {title}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}
