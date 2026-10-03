import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

// Ziyaretçi sayfalarının düzeni. Admin paneli (/admin) bunun dışında, kendi düzeniyle.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
