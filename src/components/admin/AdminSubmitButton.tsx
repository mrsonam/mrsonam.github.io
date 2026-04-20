"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Button> & {
  pendingLabel?: string;
};

export function AdminSubmitButton({
  children,
  pendingLabel,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <InnerSubmitButton
      className={className}
      disabled={disabled}
      pendingLabel={pendingLabel}
      {...props}
    >
      {children}
    </InnerSubmitButton>
  );
}

function InnerSubmitButton({
  children,
  pendingLabel,
  className,
  disabled,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn(
        "inline-flex shrink-0 flex-nowrap items-center justify-center gap-2 whitespace-nowrap",
        className,
      )}
      disabled={disabled || pending}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
          {pendingLabel ? <span>{pendingLabel}</span> : null}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
