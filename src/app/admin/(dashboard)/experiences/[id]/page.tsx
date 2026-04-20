import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ExperienceEditForm } from "@/components/admin/ExperienceForms";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const row = await prisma.experience.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <AdminBackLink href="/admin/experiences">Experience</AdminBackLink>
        <AdminPageHeader
          eyebrow="Edit entry"
          title={row.role}
          description={`${row.company} · ${row.datesDisplay}`}
          actions={
            <Link
              href="/admin/experiences"
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

      <ExperienceEditForm experience={row} />
    </div>
  );
}
