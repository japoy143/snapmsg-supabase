"use server";

import { createClient } from "./server";

//GET USER
export async function getUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? "";
}

/*
ACTIONS
*/
