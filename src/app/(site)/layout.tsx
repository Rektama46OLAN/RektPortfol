import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

// Ziyaretçi sayfalarının düzeni: Dakay'ın model sheet'inin kâğıt dili (const.md, tasarım v3).
// Admin paneli (/admin) bunun dışında, kendi koyu düzeniyle.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col bg-masa text-murekkep print:bg-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
