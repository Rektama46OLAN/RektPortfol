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

## [2026-10-03] Canlıda admin girişi — Arda denesin
- Durum: Faz 3b-1 push'landı. Rekt canlıda giriş yapmadı (yazma testi canlıya yapılmaz).
- Sonraki adım: Arda https://rektportfol.vercel.app/admin → şifre → panel açılıyor mu, bir
  alanı kaydedip geri alınca sitede görünüyor mu, söyler → madde kapanır.
- Bağlam: ADMIN_SIFRE Production'da tanımlı; migration 003 canlı `main`'de uygulanmış.
