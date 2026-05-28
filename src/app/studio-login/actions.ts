"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function studioLogin(formData: FormData) {
  const password = formData.get("password") as string;

  if (
    password &&
    password === process.env.STUDIO_PASSWORD &&
    process.env.STUDIO_SESSION_SECRET
  ) {
    const jar = await cookies();
    jar.set("studio_session", process.env.STUDIO_SESSION_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    redirect("/studio");
  }

  redirect("/studio-login?error=1");
}
