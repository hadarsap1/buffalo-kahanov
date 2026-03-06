import Link from "next/link";
import { Button } from "@/components/ui/button";
import BuffaloLogo from "@/components/ui/BuffaloLogo";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-b from-black/50 via-[var(--background)] to-[var(--background)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_1px,_transparent_1px)] bg-[length:32px_32px]" />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <div className="mb-6 inline-block rounded-full border border-[var(--color-gold)]/30 px-5 py-1.5 text-xs font-medium tracking-wide text-[var(--color-gold)]">
          בוטיק בשרים פרימיום
        </div>

        <div className="mx-auto mb-6 w-fit rounded-full shadow-[0_0_60px_rgba(212,175,55,0.25)]">
          <BuffaloLogo className="h-28 w-auto sm:h-36" />
        </div>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
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
            className="rounded-full bg-[var(--color-maroon)] px-8 text-white hover:bg-[var(--color-maroon)]/90 transition-all duration-200 active:scale-95 shadow-lg shadow-[var(--color-maroon)]/20"
          >
            <Link href="/products">לצפייה במוצרים</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-[var(--color-gold)]/40 px-8 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 hover:border-[var(--color-gold)]/60 transition-all duration-200 active:scale-95"
          >
            <Link href="#our-story">הסיפור שלנו</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
