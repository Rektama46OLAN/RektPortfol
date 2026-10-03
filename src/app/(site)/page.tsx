import type { Metadata } from "next";
import Hero from "@/components/Hero";
import KisiBilgisi from "@/components/KisiBilgisi";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <KisiBilgisi />
      <Hero />
    </>
  );
}
