"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Briefcase,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings2,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, match: "exact" as const },
  {
    href: "/admin/experiences",
    label: "Experience",
    icon: Briefcase,
    match: "prefix" as const,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: FolderKanban,
    match: "prefix" as const,
  },
  { href: "/admin/settings", label: "Settings", icon: Settings2, match: "exact" as const },
];

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-0 w-[17rem] shrink-0 flex-col border-r border-border bg-secondary/40 sticky top-0 h-screen overflow-y-auto">
      <div className="border-l-4 border-primary px-6 py-8">
        <Link href="/" className="group block">
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground transition-colors group-hover:text-foreground">
            Portfolio
          </p>
          <p className="mt-1 font-display text-3xl font-black uppercase tracking-tighter text-foreground">
            CMS
          </p>
        </Link>
        <p className="mt-3 max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
          Edit content with the same sharp, editorial tone as the public site.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 pb-6">
        {nav.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(pathname, href, match);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 border border-transparent px-3 py-3 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors border-l-4 border-transparent",
                active
                  ? "border-border bg-background text-foreground shadow-[3px_3px_0_0_rgba(139,0,0,0.12)] border-l-primary bg-primary/5"
                  : "text-muted-foreground hover:border-border hover:bg-background/80 hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0",
                  active ? "text-primary" : "text-muted-foreground",
                )}
                strokeWidth={2}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-border px-5 py-5">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 border border-border bg-background px-3 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          View site
          <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
        </Link>
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="w-full justify-center gap-2 border-border text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            <LogOut className="size-3.5" strokeWidth={2.5} />
            Sign out
          </Button>
        </form>
      </div>
    </aside>
  );
}
