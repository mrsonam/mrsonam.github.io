import Link from "next/link";
import { ArrowRight, Briefcase, FolderKanban, Settings2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { cn } from "@/lib/utils";

const cards = [
  {
    href: "/admin/experiences",
    title: "Experience",
    body: "Timeline roles, companies, and skills shown on the home page.",
    icon: Briefcase,
  },
  {
    href: "/admin/projects",
    title: "Projects",
    body: "Featured work cards, case-study copy, and media.",
    icon: FolderKanban,
  },
  {
    href: "/admin/settings",
    title: "Settings",
    body: "Passcode and access control for this dashboard.",
    icon: Settings2,
  },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-12">
      <AdminPageHeader
        eyebrow="Control room"
        title="Dashboard"
        description="Changes save to the database and appear on the public site after you publish. Use the sections below to edit your portfolio content."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, title, body, icon: Icon }) => (
          <Link key={href} href={href} className="group block h-full">
            <AdminCard className="relative h-full overflow-hidden p-6 transition-colors md:p-8">
              <div className="flex items-start justify-between gap-4">
                <Icon
                  className="size-7 text-primary"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <ArrowRight
                  className="size-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </div>
              <h2 className="mt-8 font-display text-xl font-black uppercase tracking-tighter md:text-2xl">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              <span
                className={cn(
                  "mt-8 inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-primary",
                  "border-b border-transparent transition-colors group-hover:border-primary",
                )}
              >
                Open
              </span>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
