import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { getActiveDeliveryZones } from "@/lib/data/store";

export const metadata: Metadata = {
  title: "צ'קאאוט | בופלו כהנוב",
  description: "השלמת הזמנה דרך וואטסאפ",
};

export default async function CheckoutPage() {
  const deliveryZones = await getActiveDeliveryZones();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold">השלמת הזמנה</h1>
          <Separator className="mx-auto mb-6 w-16 bg-[var(--color-maroon)]" />
          <p className="text-white/60">
            מלאו את הפרטים ונשלח את ההזמנה ישירות לוואטסאפ שלנו
          </p>
        </div>

        <CheckoutForm deliveryZones={deliveryZones} />
      </div>
    </section>
  );
}
