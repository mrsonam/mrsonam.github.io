"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  className?: string;
};

export function MarkdownField({
  name,
  label,
  defaultValue = "",
  className,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Label htmlFor={name}>{label}</Label>
        <div
          className="inline-flex border border-border bg-secondary/40 p-0.5"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "edit"}
            className={cn(
              "px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase transition-colors",
              mode === "edit"
                ? "bg-background text-foreground shadow-[2px_2px_0_0_rgba(139,0,0,0.15)]"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "preview"}
            className={cn(
              "px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase transition-colors",
              mode === "preview"
                ? "bg-background text-foreground shadow-[2px_2px_0_0_rgba(139,0,0,0.15)]"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>
      </div>
      {mode === "preview" && (
        <input type="hidden" name={name} value={value} readOnly />
      )}
      {mode === "edit" ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={14}
          className="font-mono text-sm"
        />
      ) : (
        <div className="min-h-[200px] border border-border bg-secondary/20 p-4 text-sm text-foreground/90 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-bold [&_h3]:first:mt-0 [&_p]:leading-relaxed [&_p+p]:mt-4 [&_strong]:text-foreground">
          <ReactMarkdown>{value || "*Nothing to preview.*"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
