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
        variant={active === "" ? "default" : "outline"}
        className={
          active === ""
            ? "bg-[var(--color-maroon)] text-white hover:bg-[var(--color-maroon)]/90"
            : "border-white/20 text-white/60 hover:bg-white/5"
        }
        onClick={() => select("")}
      >
        הכל
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat._id}
          size="sm"
          variant={active === cat.slug ? "default" : "outline"}
          className={
            active === cat.slug
              ? "bg-[var(--color-maroon)] text-white hover:bg-[var(--color-maroon)]/90"
              : "border-white/20 text-white/60 hover:bg-white/5"
          }
          onClick={() => select(cat.slug)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
