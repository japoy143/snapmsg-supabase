"use server";
import { getUserDetails } from "@/utils/supabase/api/response_company";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY1"] });

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
    getAllTags(),
    getAllChatScripts(),
  ]);

  //Relate company details
  const prompt_options = ` Company Name:${user.company_name}, Company details:${user.company_details},  content:${prompt}, make this like a reply from a client or customer`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt_options,
  });

  return Response.json(response.text);
}
