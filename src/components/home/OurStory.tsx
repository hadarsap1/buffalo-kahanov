import { Separator } from "@/components/ui/separator";

export default function OurStory() {
  return (
    <section id="our-story" className="py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-2 text-3xl font-bold">הסיפור שלנו</h2>
        <Separator className="mx-auto mb-8 w-16 bg-[var(--color-maroon)]" />

        <p className="mb-6 text-lg leading-relaxed text-white/70">
          בבופלו כהנוב אנחנו מאמינים שבשר איכותי מתחיל בבחירה קפדנית של חומרי
          הגלם ומסתיים בחיתוך מדויק ומקצועי. כל מוצר שלנו עובר בקרה קפדנית כדי
          להבטיח שתקבלו את הטוב ביותר.
        </p>

        <p className="text-lg leading-relaxed text-white/70">
          המומחיות שלנו, השירות האישי והאיכות ללא פשרות הם מה שהופך אותנו
          לבוטיק בשרים מהמובילים בארץ. אנחנו מזמינים אתכם לטעום את ההבדל.
        </p>
      </div>
    </section>
  );
}
