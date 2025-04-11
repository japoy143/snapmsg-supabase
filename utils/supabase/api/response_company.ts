"use server";
import { createClient } from "../server";
//get auth id and user details
export async function getUserDetails(id: string): Promise<UserDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("auth_user_id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}
