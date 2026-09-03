import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "./auth";

export async function isAdminRequest() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
