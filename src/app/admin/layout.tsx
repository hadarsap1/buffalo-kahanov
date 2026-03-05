import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ניהול | באפלו כהנוב",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]" dir="rtl">
      {children}
    </div>
  );
}
