"use client";

import { useActionState, useState, useRef } from "react";
import Image from "next/image";
import type { Product, Category } from "@/types";
import { updateProductAction, addProductAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const action = product ? updateProductAction : addProductAction;
  const [state, formAction, pending] = useActionState(
    (_prev: { error?: string }, formData: FormData) => action(formData),
    { error: undefined }
  );

  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "שגיאה בהעלאת התמונה");
      } else {
        setImageUrl(data.url);
      }
    } catch {
      setUploadError("שגיאה בהעלאת התמונה");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? "עריכת מוצר" : "הוספת מוצר"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {product && <input type="hidden" name="id" value={product._id} />}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">שם מוצר</Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={product?.slug}
                required
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">מחיר (₪)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product?.price}
                required
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">מחיר מבצע (₪)</Label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                step="0.01"
                defaultValue={product?.salePrice ?? ""}
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">קטגוריה</Label>
              <Select
                name="categoryId"
                defaultValue={product?.category._id}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightUnit">יחידת משקל</Label>
              <Select
                name="weightUnit"
                defaultValue={product?.weightUnit ?? "kg"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">ק&quot;ג</SelectItem>
                  <SelectItem value="unit">יחידה</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">תיאור</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description ?? ""}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>תמונת מוצר</Label>
            <input type="hidden" name="imageUrl" value={imageUrl} />

            {imageUrl && (
              <div className="relative h-40 w-40 overflow-hidden rounded border border-white/10">
                <Image
                  src={imageUrl}
                  alt="תצוגה מקדימה"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? "מעלה..." : imageUrl ? "החלף תמונה" : "העלה תמונה"}
              </Button>
              {imageUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setImageUrl("")}
                >
                  הסר
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              onChange={handleFileChange}
            />

            {uploadError && (
              <p className="text-sm text-red-600">{uploadError}</p>
            )}
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="inStock"
                name="inStock"
                defaultChecked={product?.inStock ?? true}
              />
              <Label htmlFor="inStock">במלאי</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                name="featured"
                defaultChecked={product?.featured ?? false}
              />
              <Label htmlFor="featured">מומלץ</Label>
            </div>
          </div>

          {state.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <Button type="submit" disabled={pending}>
            {pending ? "שומר..." : product ? "עדכון" : "הוסף מוצר"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
