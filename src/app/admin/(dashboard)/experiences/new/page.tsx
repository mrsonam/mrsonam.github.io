import Link from "next/link";
import { createExperienceAction } from "@/app/admin/actions";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ExperienceFields } from "@/components/admin/ExperienceFields";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NewExperiencePage() {
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <AdminBackLink href="/admin/experiences">Experience</AdminBackLink>
        <AdminPageHeader
          eyebrow="New entry"
          title="New experience"
          description="Add a role to your public timeline. Order controls top-to-bottom placement."
          actions={
            <Link
              href="/admin/experiences"
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

      <form action={createExperienceAction} className="space-y-8">
        <AdminCard className="p-6 md:p-10">
          <ExperienceFields />
        </AdminCard>
        <Button
          type="submit"
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          Create entry
        </Button>
      </form>
    </div>
  );
}
