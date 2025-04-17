"use server";

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
