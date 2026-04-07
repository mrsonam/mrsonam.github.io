import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await verifyAdminSessionToken(token);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const name =
    file instanceof File && file.name ? file.name : "upload";
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const path = `${randomUUID()}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = getSupabaseAdmin();
  const contentType = file.type || "application/octet-stream";

  const { error } = await supabase.storage
    .from("portfolio-media")
    .upload(path, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Storage upload failed" },
      { status: 500 },
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-media").getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
