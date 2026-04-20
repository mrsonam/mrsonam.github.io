import Link from "next/link";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ExperienceCreateForm } from "@/components/admin/ExperienceForms";
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
                "w-full text-[10px] font-bold tracking-[0.18em] uppercase sm:w-auto",
              )}
            >
              Cancel
            </Link>
          }
        />
      </div>

      <ExperienceCreateForm />
    </div>
  );
}
