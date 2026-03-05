"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart";
import Link from "next/link";

export default function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="flex w-80 flex-col bg-[var(--color-surface)] sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-right text-[var(--color-gold)]">
            סל הקניות
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-white/50">הסל ריק</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg bg-white/5 p-3">
                  <div className="flex items-start justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/40 hover:text-red-400"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-white/50">
                        ₪{(item.salePrice ?? item.price).toFixed(2)} /{" "}
                        {item.weightUnit === "kg" ? 'ק"ג' : "יחידה"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[var(--color-gold)]">
                      ₪{((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-3 py-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-[var(--color-gold)]">
                  ₪{totalPrice().toFixed(2)}
                </span>
                <span>סה״כ</span>
              </div>
              <Button
                asChild
                className="w-full bg-[var(--color-maroon)] text-white hover:bg-[var(--color-maroon)]/90"
              >
                <Link href="/checkout">לתשלום</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
