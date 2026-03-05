/**
 * Seed script for Neon PostgreSQL.
 *
 * Usage:
 *   npx tsx scripts/seed-neon.ts
 *
 * Requires DATABASE_URL in .env.local
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// ---------- Schema ----------

async function createSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id      TEXT PRIMARY KEY,
      name    TEXT NOT NULL,
      slug    TEXT NOT NULL UNIQUE,
      "order" INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      slug        TEXT NOT NULL UNIQUE,
      description TEXT,
      image_url   TEXT,
      category_id TEXT NOT NULL REFERENCES categories(id),
      price       NUMERIC(10,2) NOT NULL,
      sale_price  NUMERIC(10,2),
      weight_unit TEXT NOT NULL CHECK (weight_unit IN ('kg', 'unit')),
      in_stock    BOOLEAN NOT NULL DEFAULT true,
      featured    BOOLEAN NOT NULL DEFAULT false
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured, in_stock)`;
}

// ---------- Data ----------

const categories = [
  { id: "cat-cooking", name: "בשר לבישול", slug: "cooking", order: 1 },
  { id: "cat-grill", name: "בשר למנגל", slug: "grill", order: 2 },
];

const products = [
  { id: "p1", name: "אנטריקוט", slug: "entrecote", description: "חתוך טרי מבשר בקר מובחר", categoryId: "cat-grill", price: 189.9, weightUnit: "kg", inStock: true, featured: true },
  { id: "p2", name: "צלעות בקר", slug: "beef-ribs", description: "צלעות בקר עסיסיות", categoryId: "cat-grill", price: 159.9, weightUnit: "kg", inStock: true, featured: true },
  { id: "p3", name: "פילה בקר", slug: "beef-fillet", description: "הנתח המובחר ביותר", categoryId: "cat-grill", price: 249.9, weightUnit: "kg", inStock: true, featured: true },
  { id: "p4", name: "סינטה", slug: "sirloin", description: "נתח רך ועסיסי", categoryId: "cat-grill", price: 139.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p5", name: "שריר קדמי", slug: "front-shank", description: "מתאים לבישול ארוך", categoryId: "cat-cooking", price: 79.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p6", name: "כתף בקר", slug: "beef-shoulder", description: "נתח מצוין לתבשילים", categoryId: "cat-cooking", price: 89.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p7", name: "צוואר בקר", slug: "beef-neck", description: "עשיר בטעם, מושלם לתבשילים", categoryId: "cat-cooking", price: 69.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p8", name: "בורגר פרימיום", slug: "premium-burger", description: "200 גרם, טחון טרי", categoryId: "cat-grill", price: 29.9, weightUnit: "unit", inStock: true, featured: true },
  { id: "p9", name: "שיפודי בקר", slug: "beef-skewers", description: "חתוכים ומתובלים", categoryId: "cat-grill", price: 49.9, weightUnit: "unit", inStock: true, featured: false },
  { id: "p10", name: "קבב", slug: "kebab", description: "טחון טרי עם תיבול מיוחד", categoryId: "cat-grill", price: 39.9, weightUnit: "unit", inStock: true, featured: false },
  { id: "p11", name: "פלנק סטייק", slug: "flank-steak", description: "נתח שטוח ועשיר בטעם", categoryId: "cat-grill", price: 129.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p12", name: "אוסבוקו", slug: "ossobuco", description: "חתוך עם עצם מוח", categoryId: "cat-cooking", price: 99.9, weightUnit: "kg", inStock: true, featured: true },
  { id: "p13", name: "טחון בקר", slug: "ground-beef", description: "טחון טרי 100% בקר", categoryId: "cat-cooking", price: 59.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p14", name: "צלי כתף", slug: "shoulder-roast", description: "מושלם לצלי שבת", categoryId: "cat-cooking", price: 109.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p15", name: "סטייק עין", slug: "rib-eye", description: "ריב אי עם שומן שיש", categoryId: "cat-grill", price: 199.9, weightUnit: "kg", inStock: true, featured: true },
  { id: "p16", name: "פיקניה", slug: "picanha", description: "הנתח הברזילאי המפורסם", categoryId: "cat-grill", price: 169.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p17", name: "שפונדרה", slug: "shpondra", description: "נתח רך לבישול איטי", categoryId: "cat-cooking", price: 89.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p18", name: "לשון בקר", slug: "beef-tongue", description: "מעדן לשון צלויה או מבושלת", categoryId: "cat-cooking", price: 79.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p19", name: "מריל סטייק", slug: "merguez", description: "נקניקיות מרגז חריפות", categoryId: "cat-grill", price: 44.9, weightUnit: "unit", inStock: true, featured: false },
  { id: "p20", name: "טי-בון", slug: "t-bone", description: "סטייק עם עצם T", categoryId: "cat-grill", price: 219.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p21", name: "שוק בקר", slug: "beef-shank", description: "עם עצם, מושלם למרק", categoryId: "cat-cooking", price: 69.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p22", name: "חזה בקר", slug: "beef-brisket", description: "לעישון או בישול ארוך", categoryId: "cat-cooking", price: 99.9, weightUnit: "kg", inStock: true, featured: true },
  { id: "p23", name: "סטייק דנבר", slug: "denver-steak", description: "נתח רך במיוחד", categoryId: "cat-grill", price: 149.9, weightUnit: "kg", inStock: true, featured: false },
  { id: "p24", name: "עצמות מוח", slug: "marrow-bones", description: "לצלייה או למרק", categoryId: "cat-cooking", price: 39.9, weightUnit: "kg", inStock: true, featured: false },
];

// ---------- Seed ----------

async function seed() {
  console.log("Creating schema...");
  await createSchema();

  console.log("Seeding categories...");
  for (const c of categories) {
    await sql`
      INSERT INTO categories (id, name, slug, "order")
      VALUES (${c.id}, ${c.name}, ${c.slug}, ${c.order})
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, "order" = EXCLUDED."order"
    `;
  }

  console.log("Seeding products...");
  for (const p of products) {
    await sql`
      INSERT INTO products (id, name, slug, description, image_url, category_id, price, sale_price, weight_unit, in_stock, featured)
      VALUES (${p.id}, ${p.name}, ${p.slug}, ${p.description}, ${null}, ${p.categoryId}, ${p.price}, ${null}, ${p.weightUnit}, ${p.inStock}, ${p.featured})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, slug = EXCLUDED.slug, description = EXCLUDED.description,
        category_id = EXCLUDED.category_id, price = EXCLUDED.price, weight_unit = EXCLUDED.weight_unit,
        in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured
    `;
  }

  console.log(`Done! Seeded ${categories.length} categories and ${products.length} products.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
