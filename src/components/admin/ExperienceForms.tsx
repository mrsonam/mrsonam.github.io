"use client";

import { useActionState } from "react";
import type { Experience } from "@prisma/client";
import { createExperienceAction, updateExperienceAction } from "@/app/admin/actions";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { ExperienceFields } from "@/components/admin/ExperienceFields";

export function ExperienceCreateForm() {
  const [state, formAction] = useActionState(createExperienceAction, {});
  return (
    <form action={formAction} className="space-y-8">
      <AdminCard className="p-6 md:p-10">
        <ExperienceFields />
      </AdminCard>
      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <AdminSubmitButton
        className="text-[10px] font-bold tracking-[0.2em] uppercase"
        pendingLabel="Creating…"
      >
        Create entry
      </AdminSubmitButton>
    </form>
  );
}

export function ExperienceEditForm({ experience }: { experience: Experience }) {
  const bound = updateExperienceAction.bind(null, experience.id);
  const [state, formAction] = useActionState(bound, {});
  return (
    <form action={formAction} className="space-y-8">
      <AdminCard className="p-6 md:p-10">
        <ExperienceFields defaultValues={experience} />
      </AdminCard>
      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <AdminSubmitButton
        className="text-[10px] font-bold tracking-[0.2em] uppercase"
        pendingLabel="Saving…"
      >
        Save changes
      </AdminSubmitButton>
    </form>
  );
}
