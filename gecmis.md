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

## [2026-10-03] Vercel ↔ GitHub otomatik deploy
- Durum: Vercel projesi `rekt10/rektportfol` var, CLI ile deploy ediliyor. `vercel git
  connect` 400 verdi: "You need to add a Login Connection to your GitHub account first."
- Sonraki adım: Arda Vercel hesap ayarlarında (Account Settings → Authentication / Login
  Connections) GitHub'ı bağlar → Rekt `npx vercel git connect` çalıştırır → bir push ile
  otomatik deploy'un tetiklendiği doğrulanır.
- Bağlam: O zamana kadar deploy `npx vercel deploy` (preview) / `--prod` ile elle.
