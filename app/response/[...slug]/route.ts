"use server";
import { getUserDetails } from "@/utils/supabase/api/response_company";
import { getApiCounter, setNewApiCounter } from "@/utils/supabase/api_counter";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import { decrementUserFreeToken } from "@/utils/supabase/users";
import { GoogleGenAI } from "@google/genai";

let apiKey = "";
const geminiKey1 = process.env["GEMINI_API_KEY1"];
const geminiKey2 = process.env["GEMINI_API_KEY2"];
const geminiKey3 = process.env["GEMINI_API_KEY3"];
const geminiKey4 = process.env["GEMINI_API_KEY4"];
const geminiKey5 = process.env["GEMINI_API_KEY5"];

//get the prompt and split
export async function splitPromptAndGetRelatedScript(
  prompt: string,
  tags: TagType[] | null,
  chats_scripts: ChatScriptsType[] | null
): Promise<{ tagnames?: any[]; related_chatscripts?: any[] } | undefined> {
  if (tags === null && chats_scripts === null) {
    return;
  }

  let data = {};
  const split_prompt = prompt.toLowerCase().split(" ");

  const related_tags = tags?.flatMap((tag) =>
    split_prompt.some((word) => tag.tagname.toLowerCase().includes(word))
      ? [tag]
      : []
  );

  const related_tagname = related_tags?.map((tag) => tag.tagname);

  const related_chat_script_title = chats_scripts
    ?.filter((script) =>
      split_prompt.some((word) =>
        script.script_title.toLowerCase().includes(word.toLowerCase())
      )
    )
    ?.sort((a, b) => {
      const aMatches = split_prompt.filter((word) =>
        a.script_title.toLowerCase().includes(word.toLowerCase())
      ).length;

      const bMatches = split_prompt.filter((word) =>
        b.script_title.toLowerCase().includes(word.toLowerCase())
      ).length;

      return bMatches - aMatches; // more matches come first
    });

  if (related_chat_script_title?.length != 0) {
    data = {
      tagnames: related_tagname,
      related_chatscripts: related_chat_script_title,
    };
    return data;
  }

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

  data = {
    tagnames: related_tagname,
    related_chatscripts: related_chat_scripts,
  };

  return data;
}

//set api key
export async function setApiKey(api_counter: number) {
  switch (api_counter) {
    //use geminiApiKey1
    case 0:
      apiKey = geminiKey1 ?? "";
      break;
    case 1:
      apiKey = geminiKey2 ?? "";
      break;
    case 2:
      apiKey = geminiKey3 ?? "";
      break;
    case 3:
      apiKey = geminiKey4 ?? "";
      break;
    case 4:
      apiKey = geminiKey5 ?? "";
      break;
    default:
      apiKey = geminiKey1 ?? "";
  }
}

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
  setApiKey(api_counter);

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
    decrementUserFreeToken(user.auth_user_id, user.tokens),
    setNewApiCounter(api_counter),
  ]);

  return Response.json(response.text);
}
