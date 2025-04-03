"use server";
import { TagSchema } from "@/app/_lib/definitions";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllTags(): Promise<string[] | null> {
  const supabase = await createClient(); // No need for `await` here
  const { data: tags } = await supabase.from("tags").select();

  return tags?.map((tag) => tag) ?? [];
}

/*
ACTIONS
*/
//add tags
export async function addTags(state: any, formData: FormData) {
  const validateResult = TagSchema.safeParse({
    tagname: formData.get("tagname"),
  });

  if (!validateResult.success) {
    return { error: validateResult.error.flatten().fieldErrors };
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
        owner_id: user?.id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/protected/tags");
}
