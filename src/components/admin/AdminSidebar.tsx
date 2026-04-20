"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Briefcase,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Settings2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
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

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <nav className="flex flex-1 flex-col gap-1 px-4 pb-6">
        {nav.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(pathname, href, match);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "inline-flex w-full flex-nowrap items-center gap-2 whitespace-nowrap border border-transparent px-3 py-3 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors border-l-4 border-transparent",
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
              <span className="min-w-0">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-border px-5 py-5">
        <Link
          href="/"
          onClick={onNavigate}
          className="inline-flex h-10 w-full flex-nowrap items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background px-4 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground shadow-sm transition-colors hover:border-primary hover:bg-muted/50 hover:text-foreground"
        >
          <span>View site</span>
          <ArrowUpRight className="size-3.5 shrink-0" strokeWidth={2.5} />
        </Link>
        <AdminLogoutButton />
      </div>
    </>
  );
}

function BrandBlock() {
  return (
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
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background px-4 md:hidden">
        <Link
          href="/admin"
          className="font-display text-lg font-black uppercase tracking-tighter text-foreground"
        >
          CMS
        </Link>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="h-9 w-9 shrink-0 border border-border bg-secondary text-foreground shadow-sm hover:bg-secondary/90"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-4 text-foreground" strokeWidth={2.5} />
        </Button>
      </div>

      <aside className="hidden min-h-0 w-[17rem] shrink-0 flex-col border-r border-border bg-secondary/40 md:sticky md:top-0 md:flex md:h-screen md:overflow-y-auto">
        <BrandBlock />
        <SidebarNav pathname={pathname} />
      </aside>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,100vw)] flex-col border-r border-border bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
              <span className="font-display text-sm font-black uppercase tracking-tighter text-foreground">
                Menu
              </span>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                className="h-9 w-9 shrink-0 border border-border bg-secondary text-foreground shadow-sm hover:bg-secondary/90"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-4 text-foreground" strokeWidth={2.5} />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <SidebarNav
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
