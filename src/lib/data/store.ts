import type { Product, Category } from "@/types";
import { sql } from "@/lib/db/client";

// --- Helpers: snake_case DB <-> camelCase TS ---

interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category_id: string;
  price: number;
  sale_price: number | null;
  weight_unit: "kg" | "unit";
  in_stock: boolean;
  featured: boolean;
  cat_id?: string;
  cat_name?: string;
  cat_slug?: string;
  cat_order?: number;
}

function toProduct(row: DbProduct): Product {
  const cat = row.cat_id
    ? { id: row.cat_id, name: row.cat_name!, slug: row.cat_slug!, order: row.cat_order! }
    : { id: row.category_id, name: "לא ידוע", slug: "unknown", order: 99 };
  return {
    _id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? undefined,
    imageUrl: row.image_url ?? undefined,
    category: { _id: cat.id, name: cat.name, slug: cat.slug, order: cat.order },
    price: Number(row.price),
    salePrice: row.sale_price ? Number(row.sale_price) : undefined,
    weightUnit: row.weight_unit,
    inStock: row.in_stock,
    featured: row.featured,
  };
}

function toCategory(row: { id: string; name: string; slug: string; order: number }): Category {
  return { _id: row.id, name: row.name, slug: row.slug, order: row.order };
}

const PRODUCT_JOIN = `
  SELECT p.*, c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c."order" AS cat_order
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
`;

// --- Read operations ---

export async function getAllCategories(): Promise<Category[]> {
  const rows = await sql`SELECT * FROM categories ORDER BY "order" ASC`;
  return rows.map((row) => toCategory(row as unknown as { id: string; name: string; slug: string; order: number }));
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT p.*, c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c."order" AS cat_order
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    ORDER BY p.name ASC
  `;
  return rows.map((row) => toProduct(row as unknown as DbProduct));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT p.*, c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c."order" AS cat_order
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.featured = true AND p.in_stock = true
    ORDER BY p.name ASC
  `;
  return rows.map((row) => toProduct(row as unknown as DbProduct));
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const rows = await sql`
    SELECT p.*, c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c."order" AS cat_order
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE c.slug = ${categorySlug}
    ORDER BY p.name ASC
  `;
  return rows.map((row) => toProduct(row as unknown as DbProduct));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const rows = await sql`
    SELECT p.*, c.id AS cat_id, c.name AS cat_name, c.slug AS cat_slug, c."order" AS cat_order
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.id = ${id}
    LIMIT 1
  `;
  if (rows.length === 0) return undefined;
  return toProduct(rows[0] as unknown as DbProduct);
}

// --- Write operations ---

export async function updateProduct(
  id: string,
  updates: Partial<{
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    price: number;
    salePrice: number;
    weightUnit: "kg" | "unit";
    inStock: boolean;
    featured: boolean;
  }>
): Promise<Product | null> {
  // Build SET clause dynamically
  const setClauses: string[] = [];
  const values: unknown[] = [];

  if (updates.name !== undefined) { setClauses.push("name"); values.push(updates.name); }
  if (updates.slug !== undefined) { setClauses.push("slug"); values.push(updates.slug); }
  if (updates.description !== undefined) { setClauses.push("description"); values.push(updates.description); }
  if (updates.imageUrl !== undefined) { setClauses.push("image_url"); values.push(updates.imageUrl); }
  if (updates.categoryId !== undefined) { setClauses.push("category_id"); values.push(updates.categoryId); }
  if (updates.price !== undefined) { setClauses.push("price"); values.push(updates.price); }
  if (updates.salePrice !== undefined) { setClauses.push("sale_price"); values.push(updates.salePrice); }
  if (updates.weightUnit !== undefined) { setClauses.push("weight_unit"); values.push(updates.weightUnit); }
  if (updates.inStock !== undefined) { setClauses.push("in_stock"); values.push(updates.inStock); }
  if (updates.featured !== undefined) { setClauses.push("featured"); values.push(updates.featured); }

  if (setClauses.length === 0) return null;

  // Use individual update queries per field since neon() tagged template
  // doesn't support dynamic column names easily. Update all fields at once.
  await sql`
    UPDATE products SET
      name = COALESCE(${updates.name ?? null}, name),
      slug = COALESCE(${updates.slug ?? null}, slug),
      description = CASE WHEN ${updates.description !== undefined} THEN ${updates.description ?? null} ELSE description END,
      image_url = CASE WHEN ${updates.imageUrl !== undefined} THEN ${updates.imageUrl ?? null} ELSE image_url END,
      category_id = COALESCE(${updates.categoryId ?? null}, category_id),
      price = COALESCE(${updates.price ?? null}, price),
      sale_price = CASE WHEN ${updates.salePrice !== undefined} THEN ${updates.salePrice ?? null} ELSE sale_price END,
      weight_unit = COALESCE(${updates.weightUnit ?? null}, weight_unit),
      in_stock = CASE WHEN ${updates.inStock !== undefined} THEN ${updates.inStock ?? null} ELSE in_stock END,
      featured = CASE WHEN ${updates.featured !== undefined} THEN ${updates.featured ?? null} ELSE featured END
    WHERE id = ${id}
  `;

  return (await getProductById(id)) ?? null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM products WHERE id = ${id}`;
  return result.length !== undefined ? true : true;
}

export async function addProduct(product: {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  categoryId: string;
  price: number;
  salePrice?: number;
  weightUnit: "kg" | "unit";
  inStock: boolean;
  featured: boolean;
}): Promise<Product> {
  // Generate next ID
  const maxRows = await sql`SELECT id FROM products`;
  const maxId = maxRows.reduce((max: number, p: Record<string, unknown>) => {
    const num = parseInt((p.id as string).replace("p", ""), 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);

  const newId = `p${maxId + 1}`;

  await sql`
    INSERT INTO products (id, name, slug, description, image_url, category_id, price, sale_price, weight_unit, in_stock, featured)
    VALUES (
      ${newId},
      ${product.name},
      ${product.slug},
      ${product.description ?? null},
      ${product.imageUrl ?? null},
      ${product.categoryId},
      ${product.price},
      ${product.salePrice ?? null},
      ${product.weightUnit},
      ${product.inStock},
      ${product.featured}
    )
  `;

  const created = await getProductById(newId);
  return created!;
}
