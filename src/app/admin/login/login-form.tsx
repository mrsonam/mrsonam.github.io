"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: ActionState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <Label
          htmlFor="passcode"
          className="text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground"
        >
          Passcode
        </Label>
        <Input
          id="passcode"
          name="passcode"
          type="password"
          autoComplete="current-password"
          required
          minLength={1}
          className="h-11 border-border bg-background text-base md:text-sm"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
      <Button
        type="submit"
        className="h-11 w-full text-[10px] font-bold tracking-[0.22em] uppercase"
      >
        Enter dashboard
      </Button>
    </form>
  );
}
