"use server";

import { cookies } from "next/headers";
import { createClient } from "./server";

//GET USER
export async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? "";
}

export async function setUserIdCookie(id: string) {
  const cookie = await cookies();
  const user_token_id = process.env["COOKIE_USER_ID_KEY"] ?? "";

  cookie.set(user_token_id, id);
}

/*
ACTIONS
*/
