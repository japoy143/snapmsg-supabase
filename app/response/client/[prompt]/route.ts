import {
  decrementFreeToken,
  generateRandomToken,
  getToken,
  isTokenExist,
} from "@/utils/response/client-handler";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY1"] });
const cookie_auth_key = process.env["COOKIE_KEY"] ?? "";

export async function GET(
  req: Response,
  { params }: { params: { prompt: string } }
) {
  const { prompt } = await params;
  const isTokenAlreadyExist = await isTokenExist(cookie_auth_key);

  const cookies = isTokenAlreadyExist
    ? await getToken(cookie_auth_key)
    : await generateRandomToken();

  if (!cookies?.value) {
    return Response.json({ error: "Auth Token Not Found", status: "404" });
  }

  const parse = JSON.parse(cookies?.value);

  if (parse.free_token_count === 0) {
    return Response.json({ error: "No token left" });
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  await decrementFreeToken(cookie_auth_key);

  return Response.json({ token: parse.free_token_count, data: response.text });
}
