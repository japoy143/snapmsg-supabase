import { createClient } from "../server";

export async function upgradeToken(
  userId: string,
  token: number,
  subscription: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_details")
    .update({ tokens: token, subscription: subscription })
    .eq("auth_user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  console.log(`updated ${token}`);
}
