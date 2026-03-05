import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-[var(--color-gold)]">
              בופלו כהנוב
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              בוטיק בשרים פרימיום. בשר איכותי במיוחד, חתוך בעבודת יד מתוך
              מחויבות למצוינות.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">צור קשר</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:0524045744" className="hover:text-white transition-colors">052-4045744</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ram+On+Israel+1920500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer underline text-[var(--color-gold)] hover:text-white transition-colors"
                >
                  משק כהנוב, מושב רם-און, 1920500
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">
              שעות פעילות
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>א׳–ה׳: 08:00–20:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>ו׳: 08:00–14:00</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex items-center justify-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} בופלו כהנוב. כל הזכויות שמורות.</p>
          <span>|</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            תקנון
          </Link>
        </div>
      </div>
    </footer>
  );
}
