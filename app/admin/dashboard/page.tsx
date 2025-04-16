"use server";
import { Message } from "@/components/form-message";
import { signOutAdmin } from "@/utils/supabase/admin/auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";

export default async function page() {
  async function getCookies() {
    const cookie = await cookies();
    const admin_cookie_token = process.env["ADMIN_COOKIE_TOKEN"] ?? "";

    const user_token = cookie.get(admin_cookie_token);

    return user_token?.value;
  }

  const admin_token = await getCookies();

  if (admin_token === "") {
    return redirect("/admin/sign-in");
  }

  return (
    <div>
      Admin {admin_token}
      <form action={signOutAdmin}>
        <button type="submit"> logout</button>
      </form>
    </div>
  );
}
