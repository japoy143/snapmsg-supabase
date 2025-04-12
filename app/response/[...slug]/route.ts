"use server";
import { getUserDetails } from "@/utils/supabase/api/response_company";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import { decrementUserFreeToken } from "@/utils/supabase/users";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY1"] });

//get the prompt and split
export async function splitPromptAndGetRelatedScript(
  prompt: string,
  tags: TagType[] | null,
  chats_scripts: ChatScriptsType[] | null
): Promise<{ tagnames?: any[]; related_chatscripts?: any[] } | undefined> {
  if (tags === null && chats_scripts === null) {
    return;
  }

  const split_prompt = prompt.toLowerCase().split(" ");

  const related_tags = tags?.flatMap((tag) =>
    split_prompt.some((word) => tag.tagname.toLowerCase().includes(word))
      ? [tag]
      : []
  );

  const related_tagname = related_tags?.map((tag) => tag.tagname);

  const convert_chat_script_id = chats_scripts?.map((script) => ({
    ...script,
    associated_tags_id: JSON.parse(script.associated_tags_id),
  }));

  const related_chat_scripts = related_tags?.flatMap(
    (tag) =>
      convert_chat_script_id?.filter((script) =>
        script.associated_tags_id.includes(tag.id)
      ) || []
  );

  const data = {
    tagnames: related_tagname,
    related_chatscripts: related_chat_scripts,
  };

  return data;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const {
    slug: [id, prompt],
  } = (await params) || [];
  const user = await getUserDetails(id);

  if (user === null) {
    return Response.json({ message: "User not found", status: 404 });
  }

  if (user.tokens <= 0) {
    return Response.json({ message: "No token left" });
  }

  // Get tags and scripts in parallel
  const [tags, scripts] = await Promise.all([
    getAllTags(user.auth_user_id),
    getAllChatScripts(user.auth_user_id),
  ]);

  //get related details from prompt

  //split
  const split_related_prompt = await splitPromptAndGetRelatedScript(
    prompt,
    tags,
    scripts
  );

  let categories = "";
  let additionalDetails = "";

  if (split_related_prompt?.tagnames != undefined) {
    categories = split_related_prompt?.tagnames?.join(",");
  }

  if (
    split_related_prompt?.related_chatscripts != undefined &&
    split_related_prompt.related_chatscripts.length != 0
  ) {
    additionalDetails = split_related_prompt?.related_chatscripts[0];
  }

  //Relate company details
  const prompt_options = ` Company Name:${user.company_name}, Company details:${user.company_details}, categories:${categories} additional details:${additionalDetails}  content:${prompt}, make this like a response to a client or customer`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt_options,
  });

  if (response.text) {
    await decrementUserFreeToken(user.auth_user_id, user.tokens);
  }

  return Response.json(response.text);
}
