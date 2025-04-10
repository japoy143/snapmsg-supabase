import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY1"] });

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const [id, prompt] = params.slug || [];
  // const response = await ai.models.generateContent({
  //   model: "gemini-2.0-flash",
  //   contents: prompt,
  // });
  return Response.json({ id, prompt });
}
