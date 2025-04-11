import { getUserDetails } from "@/utils/supabase/api/response_company";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY1"] });

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const [id, prompt] = params.slug || [];
  const user = await getUserDetails(id);

  if (user === null) {
    return Response.json({ message: "User not found", status: 404 });
  }

  //Relate company details
  const prompt_options = ` Company Name:${user.company_name}, Company details:${user.company_details}, content:${prompt}, make this like a reply from a client or customer`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt_options,
  });

  return Response.json(response.text);
}
