"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import {
  toggleProductFieldAction,
  deleteProductAction,
} from "@/lib/actions/admin";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductTable({ products }: { products: Product[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    await deleteProductAction(deleteId);
    setDeleteId(null);
    setDeleting(false);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>שם</TableHead>
            <TableHead>קטגוריה</TableHead>
            <TableHead>מחיר</TableHead>
            <TableHead>מבצע</TableHead>
            <TableHead>יחידה</TableHead>
            <TableHead>במלאי</TableHead>
            <TableHead>מומלץ</TableHead>
            <TableHead>פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>₪{product.price}</TableCell>
              <TableCell>
                {product.salePrice ? `₪${product.salePrice}` : "—"}
              </TableCell>
              <TableCell>
                {product.weightUnit === "kg" ? 'ק"ג' : "יחידה"}
              </TableCell>
              <TableCell>
                <Switch
                  checked={product.inStock}
                  onCheckedChange={(checked) =>
                    toggleProductFieldAction(product._id, "inStock", checked)
                  }
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={product.featured}
                  onCheckedChange={(checked) =>
                    toggleProductFieldAction(product._id, "featured", checked)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/products/${product._id}/edit`}>
                      עריכה
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(product._id)}
                  >
                    מחיקה
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>מחיקת מוצר</DialogTitle>
            <DialogDescription>
              האם אתה בטוח שברצונך למחוק מוצר זה? פעולה זו לא ניתנת לביטול.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              ביטול
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "מוחק..." : "מחק"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
