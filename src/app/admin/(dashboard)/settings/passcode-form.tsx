"use client";

import { useActionState } from "react";
import { updatePasscodeAction, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: ActionState = {};

export function PasscodeForm() {
  const [state, formAction] = useActionState(updatePasscodeAction, initial);

  return (
    <form action={formAction} className="w-full space-y-8">
      <div className="space-y-2">
        <Label htmlFor="current">Current passcode</Label>
        <Input
          id="current"
          name="current"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="next">New passcode</Label>
        <Input
          id="next"
          name="next"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm new passcode</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
        />
      </div>
      {state?.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="text-sm font-medium text-primary" role="status">
          Passcode updated.
        </p>
      )}
      <Button
        type="submit"
        className="w-full text-[10px] font-bold tracking-[0.2em] uppercase sm:w-auto"
      >
        Update passcode
      </Button>
    </form>
  );
}
