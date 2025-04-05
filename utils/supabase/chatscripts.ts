"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ChatScriptsSchema } from "../../app/_lib/definitions";

//get all chat_scripts
export async function getAllChatScripts(): Promise<any[] | null> {
  const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const { data: scripts } = await supabase.from("chat_scripts").select();

  return scripts?.map((item) => item) ?? [];
}

/*
ACTIONS
*/
export async function addScript(state: any, formData: FormData) {
  const validateResult = ChatScriptsSchema.safeParse({
    scripts: formData.get("scripts"),
    associated_tags: formData.get("associated_tags"),
  });

  if (!validateResult.success) {
    return { error: validateResult.error?.flatten().fieldErrors };
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
  formData.delete("scripts");
  formData.delete("associated_tags");
}
