import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { USER_COOKIE, readUserSession } from "@/lib/demo-auth";

export const getUserEmail = cache(async (): Promise<string | null> => {
  return readUserSession((await cookies()).get(USER_COOKIE)?.value);
});

export async function requireUser(): Promise<string> {
  const email = await getUserEmail();
  if (!email) redirect("/account/login");
  return email;
}