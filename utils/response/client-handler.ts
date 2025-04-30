//generate token for users

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
const cookie_auth_key = process.env["COOKIE_KEY"] ?? "";
export async function generateRandomToken() {
  const cookiesStore = await cookies();
  const token = randomBytes(32).toString("hex");

  const payload = {
    token: token,
    free_token_count: 40,
  };

  cookiesStore.set(cookie_auth_key, JSON.stringify(payload));

  const value = cookiesStore.get(cookie_auth_key);

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
