import { createClient } from "./server";

export async function getApiCounter() {
  const supabase = await createClient();

  const {
    data: { api_counter },
    error,
  } = await supabase.from("api_key_counter").select().eq("id", 1).single();

  if (error) {
    return { message: error.message, error: true };
  }

  return api_counter;
}

export async function setNewApiCounter(count: number) {
  let newVal = 0;
  if (count <= 3) {
    newVal = count + 1;
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("api_key_counter")
    .update({ api_counter: newVal })
    .eq("id", 1);

  if (error) {
    return { message: error.message, error: true };
  }

  return { success: true };
}
