import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/src/app/lib/auth";

// POST /api/upload/avatar   (multipart/form-data, field: "image")
// 1. the user must be logged in
// 2. the file is checked (type + size)
// 3. it is uploaded to ImgBB from the server, so the API key never reaches the browser
// 4. the public image URL is returned; the client then saves it with updateUser()

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const bad = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return bad("Please log in first.", 401);

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return bad("Image upload is not set up (IMGBB_API_KEY).", 500);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Invalid form data.");
  }

  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) return bad("Please choose an image.");
  if (!ALLOWED.has(file.type)) return bad("Only JPG, PNG, WEBP or GIF images are allowed.");
  if (file.size > MAX_BYTES) return bad("The image must be 5 MB or smaller.");

  try {
    const body = new FormData();
    body.set("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", body }
    );
    const data = await res.json();

    if (!res.ok || !data?.data?.url) throw new Error("ImgBB rejected the upload");

    return NextResponse.json({ url: data.data.url as string });
  } catch (err) {
    console.error("Avatar upload failed:", err);
    return bad("Could not upload the photo. Please try again.", 502);
  }
}
