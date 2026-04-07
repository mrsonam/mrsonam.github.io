import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AdminSidebar />
      <div className="relative min-h-0 min-w-0 flex-1 bg-[linear-gradient(165deg,var(--background)_0%,var(--muted)_14%,var(--background)_55%)] md:bg-[linear-gradient(115deg,var(--muted)_0%,var(--background)_22%,var(--background)_100%)]">
        <div className="w-full px-5 py-9 md:px-10 md:py-12 lg:px-14 lg:py-14">
          {children}
        </div>
      </div>
    </div>
  );
}
