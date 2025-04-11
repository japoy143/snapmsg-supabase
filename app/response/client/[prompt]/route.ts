import { GoogleGenAI } from "@google/genai";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

const ai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY1"] });

//generate token for users
export async function generateRandomToken() {
  const cookiesStore = await cookies();
  const token = randomBytes(32).toString("hex");

  const payload = {
    token: token,
    free_token_count: 40,
  };

  cookiesStore.set("auth_token", JSON.stringify(payload));

  const value = cookiesStore.get("auth_token");

  return value;
}

//get token
export async function getToken(key: string) {
  const cookie = await cookies();

  const value = cookie.get(key);

  return value;
}

//is token exist
export async function isTokenExist(key: string) {
  const cookie = await cookies();

  if (cookie.get(key)?.value) {
    return true;
  } else {
    return false;
  }
}

//clear token
export async function clearToken(key: string) {
  const cookie = cookies();

  (await cookie).set(key, "");
}

//decrement free token value
export async function decrementFreeToken(key: string) {
  const cookie = await cookies();

  const value = cookie.get(key)?.value;

  if (!value) {
    return;
  }

  const parse = JSON.parse(value);
  const token = parse.token;
  let free_token_count_new_value = parse.free_token_count - 1;

  const payload = {
    token: token,
    free_token_count: free_token_count_new_value,
  };

  cookie.set(key, JSON.stringify(payload));
}

export async function GET(
  req: Response,
  { params }: { params: { prompt: string } }
) {
  const { prompt } = await params;
  const isTokenAlreadyExist = await isTokenExist("auth_token");

  const cookies = isTokenAlreadyExist
    ? await getToken("auth_token")
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

  await decrementFreeToken("auth_token");

  return Response.json({ token: parse.free_token_count, data: response.text });
}
