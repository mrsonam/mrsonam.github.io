"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export function AdminLogoutButton() {
  return (
    <form action={logoutAction} className="w-full">
      <AdminSubmitButton
        type="submit"
        variant="destructive"
        className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2.5 border border-destructive/30 bg-destructive/10 px-4 text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm transition-all duration-200 hover:border-destructive/60 hover:bg-destructive/30 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed focus-visible:ring-destructive/30"
        pendingLabel="Signing out…"
      >
        <span>Sign out</span>
        <LogOut className="size-4 shrink-0 opacity-95" strokeWidth={2.25} aria-hidden />
      </AdminSubmitButton>
    </form>
  );
}
