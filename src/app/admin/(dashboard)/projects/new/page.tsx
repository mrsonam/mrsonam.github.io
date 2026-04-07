import Link from "next/link";
import { createProjectAction } from "@/app/admin/actions";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectFields } from "@/components/admin/ProjectFields";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NewProjectPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <AdminBackLink href="/admin/projects">Projects</AdminBackLink>
        <AdminPageHeader
          eyebrow="New work"
          title="New project"
          description="Short copy appears on the card; full markdown powers the modal case study."
          actions={
            <Link
              href="/admin/projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "text-[10px] font-bold tracking-[0.18em] uppercase",
              )}
            >
              Cancel
            </Link>
          }
        />
      </div>

      <form action={createProjectAction} className="space-y-8">
        <AdminCard className="p-6 md:p-10">
          <ProjectFields />
        </AdminCard>
        <Button
          type="submit"
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          Create project
        </Button>
      </form>
    </div>
  );
}
