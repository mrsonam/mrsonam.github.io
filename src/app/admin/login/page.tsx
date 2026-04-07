import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin login | Portfolio",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="relative hidden flex-col justify-between border-r border-border bg-secondary/50 p-10 md:flex lg:p-14">
          <div className="border-l-4 border-primary pl-6">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground">
              Portfolio
            </p>
            <p className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-foreground lg:text-5xl">
              Admin
              <br />
              <span className="text-muted-foreground">Access.</span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Editorial control for your public site — same brutalist rhythm, same
              oxblood accent, zero bloat.
            </p>
          </div>
          <Link
            href="/"
            className="text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to portfolio
          </Link>
        </div>

        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md space-y-10">
            <div className="space-y-2 md:hidden">
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary">
                Portfolio admin
              </p>
              <h1 className="font-display text-3xl font-black uppercase tracking-tighter">
                Sign in
              </h1>
            </div>

            <div className="hidden space-y-2 md:block">
              <h1 className="font-display text-2xl font-black uppercase tracking-tighter">
                Sign in
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your passcode to open the CMS.
              </p>
            </div>

            <LoginForm />

            <p className="text-center text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground md:hidden">
              <Link href="/" className="hover:text-foreground">
                Back to site
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
