"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/cart";
import CartSheet from "@/components/cart/CartSheet";
import BuffaloLogo from "@/components/ui/BuffaloLogo";

const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/products", label: "המוצרים שלנו" },
];

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BuffaloLogo className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-all duration-200 hover:text-[var(--color-gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart */}
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative transition-all duration-200 active:scale-95">
              <ShoppingCart className="h-5 w-5" />
              {hydrated && totalItems > 0 && (
                <Badge className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-maroon)] p-0 text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </CartSheet>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[var(--color-surface)] border-white/10">
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-lg font-medium text-white/80 transition-all duration-200 hover:bg-white/5 hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 border-t border-white/10 pt-6 px-4">
                <p className="text-sm text-white/40 mb-2">צור קשר</p>
                <a href="tel:0524045744" className="text-sm text-[var(--color-gold)] hover:text-white transition-colors">
                  052-4045744
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
