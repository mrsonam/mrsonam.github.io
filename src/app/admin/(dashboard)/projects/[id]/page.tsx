import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectEditForm } from "@/components/admin/ProjectForms";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) notFound();

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
                "w-full text-[10px] font-bold tracking-[0.18em] uppercase sm:w-auto",
              )}
            >
              Back
            </Link>
          }
        />
      </div>

      <ProjectEditForm project={row} />
    </div>
  );
}
