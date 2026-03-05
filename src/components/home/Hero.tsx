import Link from "next/link";
import { Button } from "@/components/ui/button";
import BuffaloLogo from "@/components/ui/BuffaloLogo";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-black/40 via-[var(--background)] to-[var(--background)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_1px,_transparent_1px)] bg-[length:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <div className="mb-6 inline-block rounded-full border border-[var(--color-gold)]/30 px-4 py-1 text-xs text-[var(--color-gold)]">
          בוטיק בשרים פרימיום
        </div>

        <div className="mx-auto mb-4 w-fit rounded-full shadow-[0_0_40px_rgba(191,155,48,0.3)]">
          <BuffaloLogo className="h-24 w-auto sm:h-32" />
        </div>

        <p className="mx-auto mb-8 max-w-xl text-lg text-white/60 sm:text-xl">
          בשר בופאלו טרי ישירות מהמשק
          <br />
          גידול ישראלי מוקפד | ללא אנטיביוטיקה | ללא זרזי גדילה
          <br />
          מגוון נתחים, המבורגרים ונקניקיות – טרי מהמרעה לצלחת!
          <br />
          כמות מוגבלת.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[var(--color-maroon)] text-white hover:bg-[var(--color-maroon)]/90"
          >
            <Link href="/products">לצפייה במוצרים</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
          >
            <Link href="#our-story">הסיפור שלנו</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
