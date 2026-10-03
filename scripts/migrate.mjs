// Kullanım: npm run db:migrate
// db/migrations/*.sql dosyalarını ad sırasıyla çalıştırır; çalışanları schema_migrations'a
// yazar, bir dahaki sefere atlar. Her dosya kendi transaction'ında: yarıda kalırsa geri alınır.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Pool } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL yok. Önce: npx vercel env pull .env.local");
  process.exit(1);
}

const klasor = join(import.meta.dirname, "..", "db", "migrations");
const pool = new Pool({ connectionString: url });
const client = await pool.connect();

try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    dosya text PRIMARY KEY,
    calisti timestamptz NOT NULL DEFAULT now()
  )`);
  const { rows } = await client.query("SELECT dosya FROM schema_migrations");
  const calisanlar = new Set(rows.map((r) => r.dosya));
  const dosyalar = readdirSync(klasor).filter((f) => f.endsWith(".sql")).sort();

  let yeni = 0;
  for (const dosya of dosyalar) {
    if (calisanlar.has(dosya)) continue;
    const sql = readFileSync(join(klasor, dosya), "utf8");
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (dosya) VALUES ($1)", [dosya]);
      await client.query("COMMIT");
      console.log(`✓ ${dosya}`);
      yeni++;
    } catch (hata) {
      await client.query("ROLLBACK");
      console.error(`✗ ${dosya}: ${hata.message}`);
      process.exitCode = 1;
      break;
    }
  }
  console.log(yeni ? `${yeni} migration çalıştı.` : "Yeni migration yok.");
} finally {
  client.release();
  await pool.end();
}
