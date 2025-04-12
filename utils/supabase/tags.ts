"use server";
import { TagSchema } from "@/app/_lib/definitions";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

export async function getAllTags(id: string): Promise<TagType[] | null> {
  const supabase = await createClient(); // No need for `await` here
  const { data: tags } = await supabase
    .from("tags")
    .select()
    .order("created_at", { ascending: false })
    .eq("auth_user_id", id);

  return tags?.map((tag) => tag) ?? [];
}

export async function getLatestTags(
  count: number = 6,
  id: string
): Promise<TagType[] | null> {
  const supabase = await createClient();
  const { data: tags } = await supabase
    .from("tags")
    .select()
    .order("created_at", { ascending: false })
    .limit(count)
    .eq("auth_user_id", id);

  return tags?.map((tag) => tag) ?? [];
}

/*
ACTIONS
*/

//ADD TAGS
export async function addTags(state: any, formData: FormData) {
  const validateResult = TagSchema.safeParse({
    tagname: formData.get("tagname"),
  });

  if (!validateResult.success) {
    return { errorField: validateResult.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tags")
    .insert([
      {
        tagname: formData.get("tagname"),
        auth_user_id: user?.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/tags");
  return { success: true };
}

//UPDATE TAG
export async function updateTag(id: number, tagname: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tags")
    .update({ tagname: tagname })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/tags");
  return { success: true };
}

//DELETE TAGw
export async function deleteTag(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("tags").delete().eq("id", id);

  if (error) {
    throw new Error(error?.message);
  }

  revalidatePath("/protected/tags");
}
