import type { Experience } from "@prisma/client";
import { AdminFieldGroup } from "@/components/admin/AdminFieldGroup";
import { MarkdownField } from "@/components/admin/MarkdownField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  defaultValues?: Experience | null;
};

export function ExperienceFields({ defaultValues }: Props) {
  const d = defaultValues;
  return (
    <div className="space-y-10">
      <AdminFieldGroup title="Role & organization">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              defaultValue={d?.company}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" defaultValue={d?.role} required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment type</Label>
            <Input
              id="employmentType"
              name="employmentType"
              defaultValue={d?.employmentType ?? ""}
              placeholder="e.g. Full-time, Internship"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={d?.location ?? ""}
            />
          </div>
        </div>
      </AdminFieldGroup>

      <AdminFieldGroup title="Timeline labels">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start (label)</Label>
            <Input
              id="startDate"
              name="startDate"
              defaultValue={d?.startDate}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End (label)</Label>
            <Input
              id="endDate"
              name="endDate"
              defaultValue={d?.endDate}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="datesDisplay">Dates (shown in timeline)</Label>
          <Input
            id="datesDisplay"
            name="datesDisplay"
            defaultValue={d?.datesDisplay}
            required
            placeholder="Mar 2026 - Present"
          />
        </div>
      </AdminFieldGroup>

      <AdminFieldGroup title="Story">
        <MarkdownField
          name="description"
          label="Description (markdown supported)"
          defaultValue={d?.description ?? ""}
        />
      </AdminFieldGroup>

      <AdminFieldGroup title="Stack & order">
        <div className="space-y-2">
          <Label htmlFor="skills">Skills (comma or newline separated)</Label>
          <Textarea
            id="skills"
            name="skills"
            rows={4}
            defaultValue={d?.skills?.join(", ") ?? ""}
            className="font-mono text-sm"
          />
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
