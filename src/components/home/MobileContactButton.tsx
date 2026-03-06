"use client";

import { Phone } from "lucide-react";

export default function MobileContactButton() {
  return (
    <a
      href="tel:0524045744"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-maroon)] text-white shadow-lg shadow-[var(--color-maroon)]/30 transition-all duration-200 hover:scale-110 active:scale-95 md:hidden"
      aria-label="התקשר אלינו"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
