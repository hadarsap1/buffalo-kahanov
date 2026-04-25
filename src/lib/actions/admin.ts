"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/auth/admin";
import { rateLimit, rateLimitReset } from "@/lib/rate-limit";
import {
  updateProduct,
  deleteProduct,
  addProduct,
  getAllCategories,
  addDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone,
} from "@/lib/data/store";

// --- Auth actions ---

const LOGIN_MAX_ATTEMPTS = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

async function loginRateKey(): Promise<string> {
  const h = await headers();
  // Vercel sets x-forwarded-for with the original client IP first.
  const fwd = h.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : h.get("x-real-ip") ?? "unknown";
  return `admin-login:${ip}`;
}

export async function loginAction(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const key = await loginRateKey();

  // Refuse if this IP has already burned through its budget. Use the same
  // generic message so an attacker can't tell lockout from wrong password.
  if (rateLimit(key, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS)) {
    return { error: "סיסמה שגויה" };
  }

  const password = formData.get("password") as string;
  const success = await loginAdmin(password);
  if (!success) return { error: "סיסמה שגויה" };

  // Successful login — clear the failure counter for this IP.
  rateLimitReset(key);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await logoutAdmin();
  redirect("/admin/login");
}

// --- Product actions ---

export async function updateProductAction(
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = parseFloat(formData.get("price") as string);
  const salePrice = formData.get("salePrice")
    ? parseFloat(formData.get("salePrice") as string)
    : undefined;
  const categoryId = formData.get("categoryId") as string;
  const weightUnit = formData.get("weightUnit") as "kg" | "unit";
  const inStock = formData.get("inStock") === "on";
  const featured = formData.get("featured") === "on";
  const description = (formData.get("description") as string) || undefined;
  const imageUrl = (formData.get("imageUrl") as string) || undefined;

  const result = await updateProduct(id, {
    name,
    slug,
    price,
    salePrice,
    categoryId,
    weightUnit,
    inStock,
    featured,
    description,
    imageUrl,
  });

  if (!result) return { error: "מוצר לא נמצא" };

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProductAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function toggleProductFieldAction(
  id: string,
  field: "inStock" | "featured",
  value: boolean
): Promise<void> {
  await requireAdmin();
  await updateProduct(id, { [field]: value });
  revalidatePath("/");
  revalidatePath("/admin");
}

// --- Delivery Zone actions ---

export async function addDeliveryZoneAction(
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const active = formData.get("active") === "on";
  const order = parseInt(formData.get("order") as string, 10) || 0;

  await addDeliveryZone({ name, price, active, order });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateDeliveryZoneAction(
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const order = parseInt(formData.get("order") as string, 10) || 0;

  await updateDeliveryZone(id, { name, price, order });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleDeliveryZoneAction(
  id: string,
  value: boolean
): Promise<void> {
  await requireAdmin();
  await updateDeliveryZone(id, { active: value });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteDeliveryZoneAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteDeliveryZone(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function addProductAction(
  formData: FormData
): Promise<{ error?: string }> {
  await requireAdmin();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = parseFloat(formData.get("price") as string);
  const salePrice = formData.get("salePrice")
    ? parseFloat(formData.get("salePrice") as string)
    : undefined;
  const categoryId = formData.get("categoryId") as string;
  const weightUnit = formData.get("weightUnit") as "kg" | "unit";
  const inStock = formData.get("inStock") === "on";
  const featured = formData.get("featured") === "on";
  const description = (formData.get("description") as string) || undefined;
  const imageUrl = (formData.get("imageUrl") as string) || undefined;

  // Validate category
  const categories = await getAllCategories();
  if (!categories.find((c) => c._id === categoryId)) {
    return { error: "קטגוריה לא תקינה" };
  }

  await addProduct({
    name,
    slug,
    price,
    salePrice,
    categoryId,
    weightUnit,
    inStock,
    featured,
    description,
    imageUrl,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
