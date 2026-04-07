import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PasscodeForm } from "./passcode-form";

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <AdminPageHeader
        eyebrow="Security"
        title="Settings"
        description="Rotate your admin passcode regularly. Use a long, unique value in production."
      />
      <AdminCard className="p-6 md:p-10">
        <PasscodeForm />
      </AdminCard>
    </div>
  );
}
