"use server";

import { cookies } from "next/headers";
import { createClient } from "./server";
import { error } from "console";

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

export async function decrementUserFreeToken(id: string, free_token: number) {
  const supabase = await createClient();

  //decrement the free tokens
  const decrement = free_token - 1;
  const { data, error } = await supabase
    .from("user_details")
    .update({ tokens: decrement })
    .eq("auth_user_id", id);

  if (error) {
    return { error: error, status: 500 };
  }

  return data;
}

/*
ACTIONS
*/
