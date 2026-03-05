export const dynamic = 'force-dynamic';

import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { getAllCategories } from "@/lib/data/store";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await getAllCategories();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">הוספת מוצר חדש</h1>
        <Button variant="outline" asChild>
          <Link href="/admin">חזרה</Link>
        </Button>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
