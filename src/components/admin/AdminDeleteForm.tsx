"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  action: (prev: ActionState | undefined, formData: FormData) => Promise<ActionState>;
  id: string;
  className?: string;
};

function DeleteSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      disabled={pending}
      className={cn(
        "text-[10px] font-bold tracking-[0.18em] uppercase",
        pending && "gap-1.5",
      )}
    >
      {pending ? (
        <Loader2 className="size-3.5 shrink-0 animate-spin" aria-hidden />
      ) : null}
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}

export function AdminDeleteForm({ action, id, className }: Props) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form
      action={formAction}
      className={cn("flex flex-col items-end gap-1", className)}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteSubmitButton />
      {state?.error ? (
        <p
          className="max-w-[14rem] text-right text-[10px] leading-snug text-destructive"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
