"use server";

import { redirect } from "next/navigation";
import { createClient } from "../server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { encodedRedirect } from "@/utils/utils";

const auth_admin_token = process.env["ADMIN_AUTH_TOKEN"];
const admin_cookie_token = process.env["ADMIN_COOKIE_TOKEN"] ?? "";

export async function generateTokenForAdmin(): Promise<string> {
  const cookie = await cookies();
  const token = randomBytes(12).toString("hex");

  cookie.set(admin_cookie_token, token);

  return token;
}

export async function signUpAdmin(formData: FormData) {
  if (formData.get("password") != auth_admin_token) {
    return redirect("/admin/sign-in");
  }

  const supabase = await createClient();
  const token = await generateTokenForAdmin();

  const { error } = await supabase.from("admin_account").insert({
    email: formData.get("email"),
    password: formData.get("password"),
    token: token,
  });

  if (error) {
    return redirect("/admin/sign-in");
  }

  return redirect("/admin/dashboard");
}

export async function signInAdmin(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_account")
    .select()
    .eq("email", formData.get("email"))
    .single();

  if (error) {
    return redirect("/admin/sign-up");
  }

  if (
    data.password != formData.get("password") ||
    data.email != formData.get("email")
  ) {
    console.log(data.password);
    return redirect("/admin/sign-up");
  }

  if (data.token === "") {
    const generatedToken = await generateTokenForAdmin();

    const { error: istokenUpdatedError } = await supabase
      .from("admin_account")
      .update({ token: generatedToken })
      .eq("email", data.email);

    if (istokenUpdatedError) {
      throw new Error(istokenUpdatedError.message);
    }
  }

  return encodedRedirect("success", "/admin/dashboard", data.email);
}

export async function signOutAdmin() {
  const cookie = await cookies();
  const supabase = await createClient();
  const token = cookie.get(admin_cookie_token);

  if (token?.value === undefined) {
    const { data: isSessionClear, error: isError } = await supabase
      .from("admin_account")
      .update({ token: "" })
      .eq("password", auth_admin_token);

    if (isError) {
      throw new Error(isError.message);
    }

    return redirect("/admin/sign-in");
  }

  const { data, error } = await supabase
    .from("admin_account")
    .update({ token: "" })
    .eq("token", token?.value);

  cookie.set(admin_cookie_token, "");

  if (error) {
    throw new Error(error.message);
  }

  return redirect("/admin/sign-in");
}
