import { client } from "./client";
import type { Product, Category } from "@/types";
import {
  getAllCategories,
  getAllProducts,
  getFeaturedProducts as storeFeatured,
  getProductsByCategory as storeByCategory,
} from "@/lib/data/store";

export async function getCategories(): Promise<Category[]> {
  if (!client) return getAllCategories();
  return client.fetch(
    `*[_type == "category"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      order
    }`
  );
}

export async function getProducts(): Promise<Product[]> {
  if (!client) return getAllProducts();
  return client.fetch(
    `*[_type == "product"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      image,
      category->{ _id, name, "slug": slug.current },
      price,
      salePrice,
      weightUnit,
      inStock,
      featured
    }`
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!client) return storeFeatured();
  return client.fetch(
    `*[_type == "product" && featured == true && inStock == true] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      image,
      category->{ _id, name, "slug": slug.current },
      price,
      salePrice,
      weightUnit,
      inStock,
      featured
    }`
  );
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  if (!client) return storeByCategory(categorySlug);
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      image,
      category->{ _id, name, "slug": slug.current },
      price,
      salePrice,
      weightUnit,
      inStock,
      featured
    }`,
    { categorySlug }
  );
}
