"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";

  function select(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        size="sm"
        variant={active === "" ? "default" : "ghost"}
        className={
          active === ""
            ? "bg-transparent text-[var(--color-gold)] border-b-2 border-[var(--color-gold)] rounded-none hover:bg-white/5 transition-all duration-200"
            : "text-white/60 hover:text-white hover:bg-white/5 rounded-none transition-all duration-200"
        }
        onClick={() => select("")}
      >
        הכל
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat._id}
          size="sm"
          variant={active === cat.slug ? "default" : "ghost"}
          className={
            active === cat.slug
              ? "bg-transparent text-[var(--color-gold)] border-b-2 border-[var(--color-gold)] rounded-none hover:bg-white/5 transition-all duration-200"
              : "text-white/60 hover:text-white hover:bg-white/5 rounded-none transition-all duration-200"
          }
          onClick={() => select(cat.slug)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
