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
  let apiKey = "";

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

  return apiKey;
}
