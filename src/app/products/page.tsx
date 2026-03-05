export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "@/lib/sanity/queries";
import CategoryFilter from "@/components/products/CategoryFilter";
import ProductCard from "@/components/products/ProductCard";

export const metadata = {
  title: "המוצרים שלנו | בופלו כהנוב",
  description: "מגוון בשרים איכותיים - סטייקים, המבורגרים, צלי ועוד.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    category ? getProductsByCategory(category) : getProducts(),
  ]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold">המוצרים שלנו</h1>
          <Separator className="mx-auto mb-6 w-16 bg-[var(--color-maroon)]" />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <Suspense fallback={null}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="py-20 text-center text-white/40">
            לא נמצאו מוצרים בקטגוריה זו
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
