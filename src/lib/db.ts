import { neon } from "@neondatabase/serverless";

// HTTP üzerinden tek sorgu; serverless için Neon'un önerdiği mod. Bağlantı havuzu gerekmez.
// DATABASE_URL Vercel'de Neon entegrasyonundan, yerelde .env.local'den gelir.
export const sql = neon(process.env.DATABASE_URL!);
