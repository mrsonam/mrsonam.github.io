import Link from "next/link";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectCreateForm } from "@/components/admin/ProjectForms";
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
                "w-full text-[10px] font-bold tracking-[0.18em] uppercase sm:w-auto",
              )}
            >
              Cancel
            </Link>
          }
        />
      </div>

      <ProjectCreateForm />
    </div>
  );
}
