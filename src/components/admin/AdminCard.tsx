import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Strong top accent bar (portfolio oxblood). */
  accent?: boolean;
};

export function AdminCard({ children, className, accent = true }: Props) {
  return (
    <div
      className={cn(
        "border border-border bg-background",
        "shadow-[6px_6px_0_0_rgba(10,10,10,0.06)]",
        accent && "border-t-4 border-t-primary",
        "admin-card-labels",
        className,
      )}
    >
      {children}
    </div>
  );
}
