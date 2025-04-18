"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../server";

export async function getAllSubscribers(): Promise<UserDetails[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_details")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data?.map((user) => user) ?? [];
}

export async function getSubscribers(): Promise<UserDetails[] | null> {
  const supabase = await createClient();

  const { data: userDetails, error } = await supabase
    .from("user_details")
    .select()
    .order("created_at", { ascending: true })
    .neq("subscription", "Free Tier");

  if (error) {
    throw new Error(error.message);
  }

  return userDetails?.map((user) => user) ?? [];
}

export async function getFreetierUsers(): Promise<UserDetails[] | null> {
  const supabase = await createClient();

  const { data: userDetails, error } = await supabase
    .from("user_details")
    .select()
    .order("created_at", { ascending: true })
    .eq("subscription", "Free Tier");

  if (error) {
    throw new Error(error.message);
  }

  return userDetails?.map((user) => user) ?? [];
}

export async function updateSubscription(
  id: number,
  subscription: "Free Tier" | "Personal" | "Business" | "Block"
) {
  const supabase = await createClient();

  let token = 40;

  switch (subscription) {
    case "Free Tier":
      break;
    case "Personal":
      token = 500;
      break;
    case "Business":
      token = 1200;
      break;
    case "Block":
      token = 0;
      break;
    default:
      token = 40;
  }

  const { error } = await supabase
    .from("user_details")
    .update({ subscription: subscription, tokens: token })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/dashboard/users");
  return { success: true };
}
