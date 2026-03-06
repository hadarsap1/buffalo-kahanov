import { MapPin, Phone, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function VisitUs() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-extrabold sm:text-4xl">בואו לבקר</h2>
          <Separator className="mx-auto mb-4 w-16 bg-[var(--color-gold)]" />
          <p className="text-white/50">נשמח לראות אתכם במשק</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d35.3!3d32.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM2JzAwLjAiTiAzNcKwMTgnMDAuMCJF!5e0!3m2!1she!2sil!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="מיקום משק כהנוב"
            />
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/10">
                  <MapPin className="h-5 w-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-semibold">כתובת</h3>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ram+On+Israel+1920500"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[var(--color-gold)] transition-colors"
              >
                משק כהנוב, מושב רם-און, 1920500
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/10">
                  <Phone className="h-5 w-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-semibold">טלפון</h3>
              </div>
              <a
                href="tel:0524045744"
                className="text-white/60 hover:text-[var(--color-gold)] transition-colors"
              >
                052-4045744
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/10">
                  <Clock className="h-5 w-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-semibold">שעות פעילות</h3>
              </div>
              <div className="space-y-1 text-white/60">
                <p>א׳–ה׳: 08:00–20:00</p>
                <p>ו׳: 08:00–14:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
