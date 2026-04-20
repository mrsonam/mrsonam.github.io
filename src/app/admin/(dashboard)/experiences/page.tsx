import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteExperienceAction } from "@/app/admin/actions";
import { AdminDeleteForm } from "@/components/admin/AdminDeleteForm";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminExperiencesPage() {
  const rows = await prisma.experience.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <div className="space-y-10">
      <AdminPageHeader
        eyebrow="Timeline"
        title="Experience"
        description="Roles and companies shown in the Professional Experience section on the home page."
        actions={
          <Link
            href="/admin/experiences/new"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full text-[10px] font-bold tracking-[0.18em] uppercase sm:w-auto",
            )}
          >
            Add entry
          </Link>
        }
      />

      <AdminCard className="overflow-hidden p-0" accent>
        {rows.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm italic text-muted-foreground md:px-10">
            No entries yet. Create one to populate your timeline.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-secondary/40 md:flex-row md:items-center md:justify-between md:px-8 md:py-6"
              >
                <div className="min-w-0">
                  <p className="font-display text-lg font-black uppercase tracking-tighter text-foreground md:text-xl">
                    {row.role}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground/90">
                    {row.company}
                  </p>
                  <p className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    {row.datesDisplay}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/admin/experiences/${row.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "text-[10px] font-bold tracking-[0.18em] uppercase",
                    )}
                  >
                    Edit
                  </Link>
                  <AdminDeleteForm action={deleteExperienceAction} id={row.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}
