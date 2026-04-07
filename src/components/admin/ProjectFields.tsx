import type { Project } from "@prisma/client";
import { AdminFieldGroup } from "@/components/admin/AdminFieldGroup";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MarkdownField } from "@/components/admin/MarkdownField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  defaultValues?: Project | null;
};

export function ProjectFields({ defaultValues }: Props) {
  const d = defaultValues;
  return (
    <div className="space-y-10">
      <AdminFieldGroup title="Identity">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={d?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short description (card)</Label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            rows={3}
            defaultValue={d?.shortDescription ?? ""}
            required
          />
        </div>
      </AdminFieldGroup>

      <AdminFieldGroup title="Case study">
        <MarkdownField
          name="description"
          label="Full description (markdown)"
          defaultValue={d?.description ?? ""}
        />
      </AdminFieldGroup>

      <AdminFieldGroup title="Presentation">
        <div className="space-y-2">
          <Label htmlFor="tech">Tech stack (comma or newline separated)</Label>
          <Textarea
            id="tech"
            name="tech"
            rows={3}
            defaultValue={d?.tech?.join(", ") ?? ""}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Cover gradient (Tailwind classes)</Label>
          <Input
            id="color"
            name="color"
            defaultValue={d?.color ?? "from-blue-900 to-slate-900"}
            placeholder="from-blue-900 to-slate-900"
          />
        </div>
        <ImageUploadField defaultUrl={d?.imagePath} />
      </AdminFieldGroup>

      <AdminFieldGroup title="Links & order">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              defaultValue={d?.websiteUrl ?? ""}
              placeholder="https://"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={d?.githubUrl ?? ""}
              placeholder="https://github.com/..."
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="orderIndex">Order (lower first)</Label>
          <Input
            id="orderIndex"
            name="orderIndex"
            type="number"
            defaultValue={d?.orderIndex ?? 0}
          />
        </div>
      </AdminFieldGroup>
    </div>
  );
}
