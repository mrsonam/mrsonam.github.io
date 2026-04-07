"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  defaultUrl?: string | null;
};

export function ImageUploadField({ defaultUrl }: Props) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }
      if (data.url) setUrl(data.url);
    } catch {
      setError("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <Label htmlFor="project-cover-upload">Cover image (optional)</Label>
      <input type="hidden" name="imagePath" value={url} />
      <div className="border border-dashed border-border bg-secondary/30 p-4">
        <Input
          id="project-cover-upload"
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={onFile}
          className="cursor-pointer border-0 bg-transparent px-0 py-1 text-sm shadow-none file:mr-4 file:border file:border-border file:bg-background file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.18em] hover:file:border-primary"
        />
        <p className="mt-3 text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
          PNG or JPG · shown on the project card when set
        </p>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {busy && (
        <p className="text-xs font-medium text-muted-foreground">Uploading…</p>
      )}
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="mt-2 max-h-40 border border-border object-contain"
        />
      ) : null}
    </div>
  );
}
