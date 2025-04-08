"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ChatScriptsSchema } from "../../app/_lib/definitions";
import { error } from "console";

//get all chat_scripts
export async function getAllChatScripts(): Promise<any[] | null> {
  const supabase = await createClient();

  const { data: scripts } = await supabase
    .from("chat_scripts")
    .select()
    .order("created_at", { ascending: false });

  return scripts?.map((item) => item) ?? [];
}

/*
ACTIONS
*/

//ADD
export async function addScript(state: any, formData: FormData) {
  const validateResult = ChatScriptsSchema.safeParse({
    scripts: formData.get("scripts"),
    associated_tags: formData.get("associated_tags"),
  });

  if (!validateResult.success) {
    return { errorField: validateResult.error?.flatten().fieldErrors };
  }

  //get authenticated user
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //insert chart scripts
  const { error } = await supabase
    .from("chat_scripts")
    .insert([
      {
        scripts: formData.get("scripts"),
        associated_tags_id: formData.get("associated_tags"),
        owner_id: user?.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/chat-scripts");
  return { success: true };
}

//DELETE
export async function deleteChatScripts(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("chat_scripts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/chat-scripts");
  return { success: true };
}

//UPDATE
export async function updateChatScripts(
  id: number,
  script: string,
  associated_tags_id: string
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("chat_scripts")
    .update({ scripts: script, associated_tags_id: associated_tags_id })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/chat-scripts");
  return { success: true };
}
