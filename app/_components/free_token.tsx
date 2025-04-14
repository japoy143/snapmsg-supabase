"use server";
import React from "react";
import { createClient } from "@/utils/supabase/server";

export default async function FreeTokens() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { tokens },
  } = await supabase
    .from("user_details")
    .select("*")
    .eq("auth_user_id", user?.id)
    .single();

  return <>{tokens}</>;
}
