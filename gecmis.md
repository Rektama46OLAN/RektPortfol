# Geçmiş — Yarım Kalan İşler

Bir iş yarıda kalırsa buraya not bırakılır. **Amaç: hiçbir iş yarım kalmasın.**
Her oturum başında bu dosya kontrol edilir; buradaki maddeler bitmeden yeni işe geçilmez.

Bir madde tamamlandığında buradan silinir ve özeti `gecmislog.md`'ye taşınır.

## Format

```
## [TARİH] İş başlığı
- Durum: nerede kalındı
- Sonraki adım: ne yapılacak
- Bağlam: ilgili dosyalar / kararlar
```

---

## Açık işler

## [2026-10-03] LinkedIn linki doğrulaması
- Durum: `https://www.linkedin.com/in/arda-kaya-946bb6202/` sitede (footer, /iletisim, /cv).
  curl 999 döndü (LinkedIn bot engeli) → otomatik doğrulanamadı.
- Sonraki adım: Arda tarayıcıda tıklayıp profilin açıldığını söyler → madde kapanır. Açılmazsa
  `src/lib/site.ts` → `sosyal` düzeltilir.
- Bağlam: Orijinal linkteki `?isSelfProfile=true` bilerek çıkarıldı.
