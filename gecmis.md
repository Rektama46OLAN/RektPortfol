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

## [2026-10-03] Faz 3b-2 commit + canlı görsel yükleme denemesi
- Durum: 3b-2 kodu bitti, e2e dev'de 29/29 + 17/17. Commit/push yok (Arda istemedi).
- Sonraki adım: Arda commit + push derse → deploy → Arda canlıda bir projeye görsel yüklesin
  (canlıdan yüklenen `projeler/` klasörüne gider; canlıya yazma testini Rekt yapmaz).
- Bağlam: Blob deposu canlıyla ortak; dev testleri `dev/` klasörünü kullanıp temizledi.
