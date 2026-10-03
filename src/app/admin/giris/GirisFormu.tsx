"use client";

import { useActionState } from "react";
import { girisYap, type GirisDurumu } from "../actions";

export default function GirisFormu() {
  const [durum, gonder, bekliyor] = useActionState<GirisDurumu, FormData>(girisYap, {});
  return (
    <form action={gonder} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-widest">Şifre</span>
        <input
          type="password"
          name="sifre"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded border border-iron bg-ink px-3 py-2 text-veil outline-none focus:border-silver"
        />
      </label>
      {durum.hata && (
        <p role="alert" className="text-sm text-veil">
          {durum.hata}
        </p>
      )}
      <button
        type="submit"
        disabled={bekliyor}
        className="w-full rounded-full bg-ink px-5 py-2.5 text-sm font-semibold ring-1 ring-silver transition-colors hover:bg-iron disabled:opacity-50"
      >
        {bekliyor ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
