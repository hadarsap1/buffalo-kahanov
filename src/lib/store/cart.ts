import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  selectedDeliveryZoneId: string | null;
  deliveryFee: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryZone: (id: string | null, fee: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
  grandTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        })),

      clearCart: () =>
        set({ items: [], selectedDeliveryZoneId: null, deliveryFee: 0 }),

      selectedDeliveryZoneId: null,
      deliveryFee: 0,

      setDeliveryZone: (id, fee) =>
        set({ selectedDeliveryZoneId: id, deliveryFee: fee }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, item) =>
            sum + (item.salePrice ?? item.price) * item.quantity,
          0
        ),

      grandTotal: () => get().totalPrice() + get().deliveryFee,
    }),
    { name: "buffalo-kahanov-cart" }
  )
);
