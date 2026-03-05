import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getProductById, getAllCategories } from "@/lib/data/store";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">עריכת מוצר: {product.name}</h1>
        <Button variant="outline" asChild>
          <Link href="/admin">חזרה</Link>
        </Button>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
