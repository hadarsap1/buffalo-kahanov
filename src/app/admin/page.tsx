export const dynamic = 'force-dynamic';

import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { getAllProducts, getAllDeliveryZones } from "@/lib/data/store";
import { logoutAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/admin/ProductTable";
import DeliveryZoneTable from "@/components/admin/DeliveryZoneTable";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const products = await getAllProducts();
  const zones = await getAllDeliveryZones();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">ניהול מוצרים</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/products/new">+ הוסף מוצר</Link>
          </Button>
          <form action={logoutAction}>
            <Button variant="outline" type="submit">
              התנתק
            </Button>
          </form>
        </div>
      </div>
      <p className="mb-4 text-sm text-white/50">
        {products.length} מוצרים
      </p>
      <ProductTable products={products} />

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">אזורי משלוח</h2>
        <DeliveryZoneTable zones={zones} />
      </div>
    </div>
  );
}
