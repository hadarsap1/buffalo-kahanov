import { getFeaturedProducts } from "@/lib/sanity/queries";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/products/ProductCard";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) return null;

  return (
    <section className="bg-white/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">מוצרים מומלצים</h2>
          <Separator className="mx-auto mb-4 w-16 bg-[var(--color-maroon)]" />
          <p className="text-white/50">הבחירות המובחרות שלנו במיוחד בשבילכם</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
