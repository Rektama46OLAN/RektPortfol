import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

// Admin sayfaları çerez okur; Cache Components'ta bu, Suspense sınırı içinde olmalı.
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-iron">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest">
            <span className="text-fog">/</span> Yönetim
          </p>
          <Link href="/" className="text-sm text-silver hover:text-veil">
            Siteye dön →
          </Link>
        </div>
      </div>
      <Suspense fallback={<p className="mx-auto w-full max-w-4xl px-4 py-10 text-fog sm:px-8">Yükleniyor…</p>}>
        {children}
      </Suspense>
    </div>
  );
}
