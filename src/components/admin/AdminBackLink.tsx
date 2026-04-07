import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function AdminBackLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <ArrowLeft className="size-3.5 shrink-0" strokeWidth={2.5} />
      {children}
    </Link>
  );
}
