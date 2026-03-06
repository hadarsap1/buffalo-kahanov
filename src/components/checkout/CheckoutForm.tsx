"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart";
import type { CheckoutFormData, DeliveryZone } from "@/types";

const WHATSAPP_NUMBER = "972524045744";

function buildWhatsAppMessage(
  form: CheckoutFormData,
  items: { name: string; quantity: number; price: number; salePrice?: number; weightUnit: string }[],
  subtotal: number,
  deliveryZoneName: string | null,
  deliveryFee: number,
  grandTotal: number
) {
  const itemLines = items
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} — ₪${((item.salePrice ?? item.price) * item.quantity).toFixed(2)}`
    )
    .join("\n");

  const deliveryLine = deliveryZoneName
    ? `\n🚚 משלוח: ${deliveryZoneName} — ₪${deliveryFee.toFixed(2)}`
    : "";

  return encodeURIComponent(
    `🥩 הזמנה חדשה מבופלו כהנוב\n\n` +
      `👤 שם: ${form.name}\n` +
      `📍 כתובת: ${form.address}\n` +
      (form.notes ? `📝 הערות: ${form.notes}\n` : "") +
      `\n📦 פריטים:\n${itemLines}` +
      deliveryLine +
      `\n\n💰 סה"כ: ₪${grandTotal.toFixed(2)}`
  );
}

export default function CheckoutForm({
  deliveryZones,
}: {
  deliveryZones: DeliveryZone[];
}) {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
    clearCart,
    selectedDeliveryZoneId,
    deliveryFee,
    setDeliveryZone,
    grandTotal,
  } = useCartStore();
  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    address: "",
    notes: "",
  });

  const subtotal = totalPrice();
  const total = grandTotal();

  // Re-sync delivery fee from server data when zones load
  useEffect(() => {
    if (selectedDeliveryZoneId) {
      const zone = deliveryZones.find((z) => z._id === selectedDeliveryZoneId);
      if (zone) {
        setDeliveryZone(zone._id, zone.price);
      } else {
        // Zone no longer active, reset
        setDeliveryZone(null, 0);
      }
    }
  }, [deliveryZones, selectedDeliveryZoneId, setDeliveryZone]);

  const selectedZone = deliveryZones.find(
    (z) => z._id === selectedDeliveryZoneId
  );

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-white/20" />
        <p className="mb-4 text-white/40">העגלה ריקה</p>
        <Button
          onClick={() => router.push("/products")}
          className="bg-[var(--color-maroon)] text-white hover:bg-[var(--color-maroon)]/90"
        >
          לצפייה במוצרים
        </Button>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = buildWhatsAppMessage(
      form,
      items,
      subtotal,
      selectedZone?.name ?? null,
      deliveryFee,
      total
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
    clearCart();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Order Summary */}
      <div className="rounded-lg border border-white/10 bg-[var(--color-surface)] p-4">
        <h2 className="mb-4 text-lg font-semibold">סיכום הזמנה</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-white/50">
                  ₪{(item.salePrice ?? item.price).toFixed(2)} /{" "}
                  {item.weightUnit === "kg" ? 'ק"ג' : "יחידה"}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-white/40 hover:text-white"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-white/40 hover:text-white"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-red-400/60 hover:text-red-400"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <p className="w-16 text-left text-sm font-medium">
                ₪{((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-4 bg-white/10" />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>סכום ביניים</span>
            <span>₪{subtotal.toFixed(2)}</span>
          </div>
          {selectedZone && (
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>משלוח ({selectedZone.name})</span>
              <span>{deliveryFee === 0 ? "חינם" : `₪${deliveryFee.toFixed(2)}`}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-lg font-bold">
            <span>סה&quot;כ</span>
            <span className="text-[var(--color-gold)]">₪{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Zone Selector */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">אזור משלוח</h2>
        <div className="space-y-2">
          {deliveryZones.map((zone) => (
            <label
              key={zone._id}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                selectedDeliveryZoneId === zone._id
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10"
                  : "border-white/10 bg-[var(--color-surface)] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryZone"
                  value={zone._id}
                  checked={selectedDeliveryZoneId === zone._id}
                  onChange={() => setDeliveryZone(zone._id, zone.price)}
                  className="accent-[var(--color-gold)]"
                />
                <span className="text-sm font-medium">{zone.name}</span>
              </div>
              <span className="text-sm text-white/60">
                {zone.price === 0 ? "חינם" : `₪${zone.price.toFixed(2)}`}
              </span>
            </label>
          ))}
        </div>
        {!selectedDeliveryZoneId && (
          <p className="text-xs text-red-400/80">יש לבחור אזור משלוח</p>
        )}
      </div>

      {/* Customer Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">פרטי הלקוח</h2>

        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-white/60">
            שם מלא *
          </label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border-white/10 bg-[var(--color-surface)] text-white placeholder:text-white/30"
            placeholder="ישראל ישראלי"
          />
        </div>

        <div>
          <label htmlFor="address" className="mb-1 block text-sm text-white/60">
            כתובת למשלוח *
          </label>
          <Input
            id="address"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border-white/10 bg-[var(--color-surface)] text-white placeholder:text-white/30"
            placeholder="רחוב, עיר"
          />
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm text-white/60">
            הערות להזמנה
          </label>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border-white/10 bg-[var(--color-surface)] text-white placeholder:text-white/30"
            placeholder="בקשות מיוחדות, זמן משלוח מועדף..."
            rows={3}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={!selectedDeliveryZoneId}
        className="w-full gap-2 bg-green-600 text-lg font-bold text-white hover:bg-green-700 disabled:opacity-50"
      >
        <MessageCircle className="h-5 w-5" />
        שלח הזמנה בוואטסאפ
      </Button>
    </form>
  );
}
