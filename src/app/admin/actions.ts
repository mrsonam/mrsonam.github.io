"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { ADMIN_COOKIE, signAdminSessionToken } from "@/lib/auth";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export type ActionState = { error?: string; ok?: boolean };

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function revalidatePortfolioAndAdmin() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/experiences");
  revalidatePath("/admin/settings");
}

export async function loginAction(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  try {
    const passcode = String(formData.get("passcode") ?? "");
    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    if (
      !settings ||
      !(await bcrypt.compare(passcode, settings.passcodeHash))
    ) {
      return { error: "Invalid passcode." };
    }
    const token = await signAdminSessionToken();
    (await cookies()).set(ADMIN_COOKIE, token, cookieOptions);
    revalidatePath("/admin");
    redirect("/admin");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    console.error(e);
    return { error: "Could not sign in. Please try again." };
  }
}

export async function logoutAction() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function updatePasscodeAction(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 6) {
    return { error: "New passcode must be at least 6 characters." };
  }
  if (next !== confirm) {
    return { error: "New passcode and confirmation do not match." };
  }

  try {
    const settings = await prisma.settings.findUnique({ where: { id: 1 } });
    if (
      !settings ||
      !(await bcrypt.compare(current, settings.passcodeHash))
    ) {
      return { error: "Current passcode is incorrect." };
    }

    const passcodeHash = await bcrypt.hash(next, 12);
    await prisma.settings.update({
      where: { id: 1 },
      data: { passcodeHash },
    });
    revalidatePortfolioAndAdmin();
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { error: "Could not update passcode. Please try again." };
  }
}

export async function createExperienceAction(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  try {
    await prisma.experience.create({
      data: {
        company: String(formData.get("company") ?? ""),
        role: String(formData.get("role") ?? ""),
        employmentType: emptyToNull(formData.get("employmentType")),
        startDate: String(formData.get("startDate") ?? ""),
        endDate: String(formData.get("endDate") ?? ""),
        datesDisplay: String(formData.get("datesDisplay") ?? ""),
        location: emptyToNull(formData.get("location")),
        description: String(formData.get("description") ?? ""),
        skills: parseSkills(formData.get("skills")),
        orderIndex: Number(formData.get("orderIndex") ?? 0) || 0,
      },
    });
    revalidatePortfolioAndAdmin();
    redirect("/admin/experiences");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    console.error(e);
    return { error: "Could not create entry. Check required fields and try again." };
  }
}

export async function updateExperienceAction(
  id: string,
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  try {
    await prisma.experience.update({
      where: { id },
      data: {
        company: String(formData.get("company") ?? ""),
        role: String(formData.get("role") ?? ""),
        employmentType: emptyToNull(formData.get("employmentType")),
        startDate: String(formData.get("startDate") ?? ""),
        endDate: String(formData.get("endDate") ?? ""),
        datesDisplay: String(formData.get("datesDisplay") ?? ""),
        location: emptyToNull(formData.get("location")),
        description: String(formData.get("description") ?? ""),
        skills: parseSkills(formData.get("skills")),
        orderIndex: Number(formData.get("orderIndex") ?? 0) || 0,
      },
    });
    revalidatePortfolioAndAdmin();
    revalidatePath(`/admin/experiences/${id}`);
    redirect("/admin/experiences");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    console.error(e);
    return { error: "Could not save changes. Please try again." };
  }
}

export async function deleteExperienceAction(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { error: "Missing entry id." };
  }
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePortfolioAndAdmin();
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Could not delete this entry." };
  }
}

export async function createProjectAction(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  try {
    await prisma.project.create({
      data: {
        title: String(formData.get("title") ?? ""),
        shortDescription: String(formData.get("shortDescription") ?? ""),
        description: String(formData.get("description") ?? ""),
        tech: parseSkills(formData.get("tech")),
        websiteUrl: emptyToNull(formData.get("websiteUrl")),
        githubUrl: emptyToNull(formData.get("githubUrl")),
        imagePath: emptyToNull(formData.get("imagePath")),
        color: String(formData.get("color") ?? "from-blue-900 to-slate-900"),
        orderIndex: Number(formData.get("orderIndex") ?? 0) || 0,
      },
    });
    revalidatePortfolioAndAdmin();
    redirect("/admin/projects");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    console.error(e);
    return { error: "Could not create project. Check required fields and try again." };
  }
}

export async function updateProjectAction(
  id: string,
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  try {
    await prisma.project.update({
      where: { id },
      data: {
        title: String(formData.get("title") ?? ""),
        shortDescription: String(formData.get("shortDescription") ?? ""),
        description: String(formData.get("description") ?? ""),
        tech: parseSkills(formData.get("tech")),
        websiteUrl: emptyToNull(formData.get("websiteUrl")),
        githubUrl: emptyToNull(formData.get("githubUrl")),
        imagePath: emptyToNull(formData.get("imagePath")),
        color: String(formData.get("color") ?? "from-blue-900 to-slate-900"),
        orderIndex: Number(formData.get("orderIndex") ?? 0) || 0,
      },
    });
    revalidatePortfolioAndAdmin();
    revalidatePath(`/admin/projects/${id}`);
    redirect("/admin/projects");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    console.error(e);
    return { error: "Could not save changes. Please try again." };
  }
}

export async function deleteProjectAction(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { error: "Missing project id." };
  }
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePortfolioAndAdmin();
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Could not delete this project." };
  }
}

function emptyToNull(v: FormDataEntryValue | null): string | null {
  const s = v == null ? "" : String(v).trim();
  return s === "" ? null : s;
}

function parseSkills(v: FormDataEntryValue | null): string[] {
  const raw = v == null ? "" : String(v);
  return raw
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
