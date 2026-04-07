import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { updateProjectAction } from "@/app/admin/actions";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectFields } from "@/components/admin/ProjectFields";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) notFound();

  const action = updateProjectAction.bind(null, id);

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <AdminBackLink href="/admin/projects">Projects</AdminBackLink>
        <AdminPageHeader
          eyebrow="Edit work"
          title={row.title}
          description={row.shortDescription}
          actions={
            <Link
              href="/admin/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "text-[10px] font-bold tracking-[0.18em] uppercase",
              )}
            >
              Back
            </Link>
          }
        />
      </div>

      <form action={action} className="space-y-8">
        <AdminCard className="p-6 md:p-10">
          <ProjectFields defaultValues={row} />
        </AdminCard>
        <Button
          type="submit"
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
}
