import fs from "fs";
import path from "path";
import type { Product, Category } from "@/types";
import {
  categories as hardcodedCategories,
  products as hardcodedProducts,
} from "./products";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

interface StoredProduct {
  _id: string;
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
}

interface StoreData {
  categories: Category[];
  products: StoredProduct[];
}

function readStore(): StoreData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    // Seed from hardcoded data if file doesn't exist
    const data: StoreData = {
      categories: hardcodedCategories,
      products: hardcodedProducts.map((p) => ({
        _id: p._id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        imageUrl: p.imageUrl,
        categoryId: p.category._id,
        price: p.price,
        salePrice: p.salePrice,
        weightUnit: p.weightUnit,
        inStock: p.inStock,
        featured: p.featured,
      })),
    };
    writeStore(data);
    return data;
  }
}

function writeStore(data: StoreData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function resolveProduct(sp: StoredProduct, categories: Category[]): Product {
  const category = categories.find((c) => c._id === sp.categoryId) ?? {
    _id: sp.categoryId,
    name: "לא ידוע",
    slug: "unknown",
    order: 99,
  };
  return {
    _id: sp._id,
    name: sp.name,
    slug: sp.slug,
    description: sp.description,
    imageUrl: sp.imageUrl,
    category,
    price: sp.price,
    salePrice: sp.salePrice,
    weightUnit: sp.weightUnit,
    inStock: sp.inStock,
    featured: sp.featured,
  };
}

// --- Read operations ---

export function getAllCategories(): Category[] {
  return readStore().categories;
}

export function getAllProducts(): Product[] {
  const data = readStore();
  return data.products.map((p) => resolveProduct(p, data.categories));
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured && p.inStock);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.category.slug === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p._id === id);
}

// --- Write operations ---

export function updateProduct(
  id: string,
  updates: Partial<Omit<StoredProduct, "_id">>
): Product | null {
  const data = readStore();
  const idx = data.products.findIndex((p) => p._id === id);
  if (idx === -1) return null;
  data.products[idx] = { ...data.products[idx], ...updates };
  writeStore(data);
  return resolveProduct(data.products[idx], data.categories);
}

export function deleteProduct(id: string): boolean {
  const data = readStore();
  const before = data.products.length;
  data.products = data.products.filter((p) => p._id !== id);
  if (data.products.length === before) return false;
  writeStore(data);
  return true;
}

export function addProduct(
  product: Omit<StoredProduct, "_id">
): Product {
  const data = readStore();
  const maxId = data.products.reduce((max, p) => {
    const num = parseInt(p._id.replace("p", ""), 10);
    return isNaN(num) ? max : Math.max(max, num);
  }, 0);
  const newProduct: StoredProduct = {
    _id: `p${maxId + 1}`,
    ...product,
  };
  data.products.push(newProduct);
  writeStore(data);
  return resolveProduct(newProduct, data.categories);
}
