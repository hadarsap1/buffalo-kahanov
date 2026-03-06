import Link from "next/link";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BuffaloLogo from "@/components/ui/BuffaloLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <BuffaloLogo className="mb-4 h-12 w-auto" />
            <p className="text-sm leading-relaxed text-white/60">
              בוטיק בשרים פרימיום. בשר איכותי במיוחד, חתוך בעבודת יד מתוך
              מחויבות למצוינות.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all duration-200 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all duration-200 hover:bg-[var(--color-gold)]/20 hover:text-[var(--color-gold)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-[var(--color-gold)]">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/60 transition-colors hover:text-[var(--color-gold)]">
                  המוצרים שלנו
                </Link>
              </li>
              <li>
                <Link href="/#our-story" className="text-white/60 transition-colors hover:text-[var(--color-gold)]">
                  הסיפור שלנו
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 transition-colors hover:text-[var(--color-gold)]">
                  תקנון
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">צור קשר</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                <a href="tel:0524045744" className="hover:text-white transition-colors">052-4045744</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[var(--color-gold)]" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ram+On+Israel+1920500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  משק כהנוב, מושב רם-און
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">שעות פעילות</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                <span>א׳–ה׳: 08:00–20:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-[var(--color-gold)]" />
                <span>ו׳: 08:00–14:00</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} בופלו כהנוב. כל הזכויות שמורות.</p>
          <Link href="/terms" className="hover:text-white transition-colors">
            תקנון האתר
          </Link>
        </div>
      </div>
    </footer>
  );
}
