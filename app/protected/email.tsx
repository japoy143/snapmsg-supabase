"use server";

import { createClient } from "@/utils/supabase/server";

export default async function UserEmail() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <p>{user?.email}</p>;
}
