"use server";
import { createClient } from "./server";

export async function getAllMessages(): Promise<messagesType[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("messages").select();

  if (error) {
    throw new Error(error.message);
  }

  return data.map((message) => message) ?? [];
}

export async function sendGuestMessage(formData: FormData) {
  const supabase = await createClient();

  const user = {
    firstname: formData.get("firstname"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const { firstname, email, message } = user;

  const { data, error } = await supabase
    .from("messages")
    .insert({ firstname: firstname, email: email, message: message });

  if (error) {
    return { error: true, message: error.message };
  }

  return { success: true, message: "Successfully message send" };
}
