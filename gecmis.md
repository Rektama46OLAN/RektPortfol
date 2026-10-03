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

## [2026-10-03] Faz 0 — Kurulum
- Durum: Next.js 16.3.8 + TS + Tailwind 4 kuruldu (create-next-app scratchpad'de, dosyalar
  taşındı; onun CLAUDE.md/AGENTS.md/README.md'si alınmadı). `agentRules: false`. Yer tutucu
  Türkçe sayfa. localhost:3000 → 200, lint temiz, `npm run build` başarılı. Commit yok.
- Sonraki adım: Arda'nın onayıyla commit + push → Vercel'de GitHub reposuna bağlı proje
  (hesap `rekt46`, hobby, team `team_FzoVzZwNXlZXrKWhi1hbmD89`, henüz proje yok) → preview
  URL aynı sayfayı gösteriyor mu kontrol → Faz 0 kapanır.
- Bağlam: Private repo için Vercel GitHub uygulamasının repoya erişimi gerekebilir.
