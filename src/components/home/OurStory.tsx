import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function OurStory() {
  return (
    <section id="our-story" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-extrabold sm:text-4xl">הסיפור שלנו</h2>
          <Separator className="mx-auto mb-4 w-16 bg-[var(--color-gold)]" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/ranch.jpg"
              alt="משק כהנוב"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Text */}
          <div>
            <p className="mb-6 text-lg leading-relaxed text-white/70">
              בבופלו כהנוב אנחנו מאמינים שבשר איכותי מתחיל בבחירה קפדנית של חומרי
              הגלם ומסתיים בחיתוך מדויק ומקצועי. כל מוצר שלנו עובר בקרה קפדנית כדי
              להבטיח שתקבלו את הטוב ביותר.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-white/70">
              המומחיות שלנו, השירות האישי והאיכות ללא פשרות הם מה שהופך אותנו
              לבוטיק בשרים מהמובילים בארץ. אנחנו מזמינים אתכם לטעום את ההבדל.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-[var(--color-surface)] p-4">
                <div className="text-2xl font-bold text-[var(--color-gold)]">100%</div>
                <div className="mt-1 text-xs text-white/50">גידול ישראלי</div>
              </div>
              <div className="rounded-xl bg-[var(--color-surface)] p-4">
                <div className="text-2xl font-bold text-[var(--color-gold)]">0</div>
                <div className="mt-1 text-xs text-white/50">אנטיביוטיקה</div>
              </div>
              <div className="rounded-xl bg-[var(--color-surface)] p-4">
                <div className="text-2xl font-bold text-[var(--color-gold)]">טרי</div>
                <div className="mt-1 text-xs text-white/50">מהמרעה לצלחת</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
