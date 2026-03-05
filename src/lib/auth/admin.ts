import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";
const COOKIE_VALUE = "authenticated";
const MAX_AGE = 60 * 60 * 24; // 24 hours

export async function loginAdmin(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
  return true;
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export async function requireAdmin(): Promise<void> {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
