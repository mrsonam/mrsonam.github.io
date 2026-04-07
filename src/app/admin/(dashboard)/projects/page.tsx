import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteProjectAction } from "@/app/admin/actions";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const rows = await prisma.project.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <div className="space-y-10">
      <AdminPageHeader
        eyebrow="Featured work"
        title="Projects"
        description="Cards and case-study content for the Featured Work section."
        actions={
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants({ variant: "default" }), "text-[10px] font-bold tracking-[0.18em] uppercase")}
          >
            Add project
          </Link>
        }
      />

      <AdminCard className="overflow-hidden p-0" accent>
        {rows.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm italic text-muted-foreground md:px-10">
            No projects yet. Add your first featured piece.
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
                    {row.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {row.shortDescription}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/projects/${row.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "text-[10px] font-bold tracking-[0.18em] uppercase",
                    )}
                  >
                    Edit
                  </Link>
                  <form action={deleteProjectAction.bind(null, row.id)}>
                    <Button
                      type="submit"
                      variant="destructive"
                      size="sm"
                      className="text-[10px] font-bold tracking-[0.18em] uppercase"
                    >
                      Delete
                    </Button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}
