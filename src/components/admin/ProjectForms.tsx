"use client";

import { useActionState } from "react";
import type { Project } from "@prisma/client";
import { createProjectAction, updateProjectAction } from "@/app/admin/actions";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { ProjectFields } from "@/components/admin/ProjectFields";

export function ProjectCreateForm() {
  const [state, formAction] = useActionState(createProjectAction, {});
  return (
    <form action={formAction} className="space-y-8">
      <AdminCard className="p-6 md:p-10">
        <ProjectFields />
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
        Create project
      </AdminSubmitButton>
    </form>
  );
}

export function ProjectEditForm({ project }: { project: Project }) {
  const bound = updateProjectAction.bind(null, project.id);
  const [state, formAction] = useActionState(bound, {});
  return (
    <form action={formAction} className="space-y-8">
      <AdminCard className="p-6 md:p-10">
        <ProjectFields defaultValues={project} />
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
