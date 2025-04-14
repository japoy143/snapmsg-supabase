"use server";

import { createClient } from "@/utils/supabase/server";

export default async function UserEmail() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return <p>No email found</p>;
  }

  const splitUserEmail = user.email.split("@");

  return <p>{splitUserEmail[0] || user.email}</p>;
}
