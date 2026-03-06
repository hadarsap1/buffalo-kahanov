"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const hasSale = product.salePrice && product.salePrice < product.price;
  const displayPrice = hasSale ? product.salePrice! : product.price;
  const unitLabel = product.weightUnit === "kg" ? 'ק"ג' : "יחידה";

  const imageUrl = product.image
    ? urlFor(product.image).width(400).height(300).url()
    : product.imageUrl ?? null;

  return (
    <Card className="group overflow-hidden border-white/10 bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-gold)]/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/20">
            אין תמונה
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Badge variant="destructive" className="text-sm">
              אזל מהמלאי
            </Badge>
          </div>
        )}
        {hasSale && product.inStock && (
          <Badge className="absolute left-2 top-2 bg-[var(--color-maroon)]">
            מבצע
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category */}
        {product.category && (
          <p className="mb-1 text-xs text-[var(--color-gold)]">
            {product.category.name}
          </p>
        )}

        {/* Name */}
        <h3 className="mb-2 text-base font-semibold">{product.name}</h3>

        {/* Description */}
        {product.description && (
          <p className="mb-3 line-clamp-2 text-sm text-white/50">
            {product.description}
          </p>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-end justify-between">
          <Button
            size="sm"
            disabled={!product.inStock}
            className="bg-[var(--color-maroon)] text-white hover:bg-[var(--color-maroon)]/90 disabled:opacity-40 transition-all duration-200 active:scale-95"
            onClick={() =>
              addItem({
                id: product._id,
                name: product.name,
                price: product.price,
                salePrice: product.salePrice,
                weightUnit: product.weightUnit,
                imageUrl: imageUrl ?? undefined,
              })
            }
          >
            <ShoppingCart className="ml-1 h-4 w-4" />
            הוסף
          </Button>
          <div className="text-left">
            <span className="text-lg font-bold text-[var(--color-gold)]">
              ₪{displayPrice.toFixed(2)}
            </span>
            <span className="mr-1 text-xs text-white/40">/ {unitLabel}</span>
            {hasSale && (
              <div className="text-xs text-white/30 line-through">
                ₪{product.price.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
