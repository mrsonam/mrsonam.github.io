import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { updateExperienceAction } from "@/app/admin/actions";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ExperienceFields } from "@/components/admin/ExperienceFields";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const row = await prisma.experience.findUnique({ where: { id } });
  if (!row) notFound();

  const action = updateExperienceAction.bind(null, id);

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
          <ExperienceFields defaultValues={row} />
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
