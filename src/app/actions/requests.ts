"use server";

import { eventSchema, reservationSchema, voucherSchema } from "@/lib/schemas";
import { site, seating } from "@/content/site";

export type RequestResult =
  | { ok: true; demo: boolean; ref: string }
  | { ok: false; error: string; fields?: Record<string, string> };

type Kind = "reservation" | "event" | "voucher";
const schemas = { reservation: reservationSchema, event: eventSchema, voucher: voucherSchema };
const subjects = { reservation: "Prośba o rezerwację", event: "Zapytanie o wydarzenie", voucher: "Zamówienie vouchera" };

function ref() {
  return `#${Math.floor(1000 + Math.random() * 9000)}`;
}

// Walidacja na serwerze dla wszystkich formularzy. Wysyłka przez Resend tylko z kluczami w env;
// bez nich zwracamy demo: true i interfejs mówi wprost, że nic nie wysłano.
export async function sendRequest(kind: Kind, input: unknown): Promise<RequestResult> {
  const parsed = schemas[kind].safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0])] = i.message;
    return { ok: false, error: "Sprawdź zaznaczone pola.", fields };
  }
  const data = parsed.data as Record<string, unknown>;
  if (data.website) return { ok: true, demo: false, ref: ref() };

  if (kind === "reservation") {
    const today = new Date().toISOString().slice(0, 10);
    if (String(data.date) < today) return { ok: false, error: "Ten dzień już minął.", fields: { date: "Wybierz dzisiejszy lub późniejszy dzień." } };
  }

  const key = process.env.RESEND_API_KEY, to = process.env.RESTAURANT_INBOX, from = process.env.RESEND_FROM;
  const r = ref();
  if (!key || !to || !from) {
    console.info(`[${kind}] tryb demo — nic nie wysłano`, r);
    return { ok: true, demo: true, ref: r };
  }
  const seat = seating.find((s) => s.id === data.seat)?.label;
  const lines = (Object.entries({ ...data, seat, consent: undefined, website: undefined }) as [string, unknown][])
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: `${subjects[kind]} ${r}`, text: [`${subjects[kind]} ze strony ${site.url}`, ...lines].join("\n") }),
  });
  if (!res.ok) return { ok: false, error: `Nie udało się wysłać. Zadzwoń: ${site.phone.display}.` };
  return { ok: true, demo: false, ref: r };
}
