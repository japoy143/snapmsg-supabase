"use server";
import {
  setApiKey,
  splitPromptAndGetRelatedScript,
} from "@/utils/response/splitter";
import { getUserDetails } from "@/utils/supabase/api/response_company";
import { getApiCounter, setNewApiCounter } from "@/utils/supabase/api_counter";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import { decrementUserFreeToken } from "@/utils/supabase/users";
import { GoogleGenAI } from "@google/genai";

export async function GET(
  request: Request,
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
  const [tags, scripts, api_counter] = await Promise.all([
    getAllTags(user.auth_user_id),
    getAllChatScripts(user.auth_user_id),
    getApiCounter(),
  ]);

  //change the api key base on counter
  const apiKey = await setApiKey(api_counter);

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
    additionalDetails = split_related_prompt?.related_chatscripts[0].scripts;
  }

  //Relate company details
  const prompt_options = ` Company Name:${user.company_name}, Company details:${user.company_details}, categories:${categories} additional details:${additionalDetails}  content:${prompt}, make this like a response to a client or customer, disregard the additional details if its not relevant to the content`;
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt_options,
  });

  if (!response) {
    return Response.json({ message: "Request error" });
  }

  const [decrement, newval] = await Promise.all([
    decrementUserFreeToken(user.auth_user_id, user.tokens, user.response_uses),
    setNewApiCounter(api_counter),
  ]);

  return Response.json(response.text);
}
