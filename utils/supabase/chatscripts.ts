"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ChatScriptsSchema } from "../../app/_lib/definitions";
import { cache } from "react";

//get all chat_scripts
// export async function getAllChatScripts(
//   id: string
// ): Promise<ChatScriptsType[] | null> {
//   const supabase = await createClient();

//   const { data: scripts } = await supabase
//     .from("chat_scripts")
//     .select()
//     .order("created_at", { ascending: false })
//     .eq("auth_user_id", id);

//   return scripts?.map((item) => item) ?? [];
// }

//caching
export const getAllChatScripts = cache(
  async (id: string): Promise<ChatScriptsType[] | null> => {
    const supabase = await createClient();

    const { data: scripts } = await supabase
      .from("chat_scripts")
      .select()
      .order("created_at", { ascending: false })
      .eq("auth_user_id", id);

    return scripts?.map((item) => item) ?? [];
  }
);

/*
ACTIONS
*/

//ADD
export async function addScript(state: any, formData: FormData | "RESET") {
  if (formData === "RESET") {
    return { success: false };
  }

  const validateResult = ChatScriptsSchema.safeParse({
    script_title: formData.get("script_title"),
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
        script_title: formData.get("script_title"),
        scripts: formData.get("scripts"),
        associated_tags_id: formData.get("associated_tags"),
        auth_user_id: user?.id,
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
  script_title: string,
  script: string,
  associated_tags_id: string
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("chat_scripts")
    .update({
      script_title: script_title,
      scripts: script,
      associated_tags_id: associated_tags_id,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/chat-scripts");
  return { success: true };
}
