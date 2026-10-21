"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { eventSchema, occasions, type EventInput } from "@/lib/schemas";
import { sendRequest } from "@/app/actions/requests";
import { site } from "@/content/site";
import { track } from "@/lib/track";

export function EventForm() {
  const [done, setDone] = useState<{ ref: string; demo: boolean } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: { date: "", guests: 12, occasion: occasions[0], name: "", phone: "", email: "", notes: "", consent: false, website: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (v) => {
    setServerError(null);
    const res = await sendRequest("event", v);
    if (res.ok) { track("event_submit", { guests: v.guests, occasion: v.occasion, demo: res.demo }); setDone(res); return; }
    if (res.fields) for (const [k, m] of Object.entries(res.fields)) setError(k as keyof EventInput, { message: m });
    setServerError(res.error);
  });

  if (done) {
    return (
      <div role="status" className="rounded-[22px] bg-paper p-8 text-ink">
        <span className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-800"><Check className="size-6" aria-hidden="true" /></span>
        <h3 className="mt-5 text-3xl">Zapytanie wysłane</h3>
        <p className="mt-2 text-muted">Odpiszemy mailowo z propozycją menu i warunkami. Numer: {done.ref}.</p>
        {done.demo && <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-950">Tryb demonstracyjny: nic nie wysłano.</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => { if (!started.current) { started.current = true; track("form_start", { form: "event" }); } }} noValidate className="on-light rounded-[22px] bg-paper p-6 text-ink sm:p-8">
      <fieldset>
        <legend className="mb-2 text-[15px] font-semibold">Okazja</legend>
        <Controller control={control} name="occasion" render={({ field }) => (
          <div className="flex flex-wrap gap-2">
            {occasions.map((o) => (
              <label key={o} className={`cursor-pointer rounded-full border-[1.5px] px-3.5 py-2 text-[15px] font-medium has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-gold/50 ${field.value === o ? "border-ink bg-ink text-icing" : "border-line bg-white"}`}>
                <input type="radio" className="sr-only" name={field.name} value={o} checked={field.value === o} onChange={() => field.onChange(o)} />{o}
              </label>
            ))}
          </div>
        )} />
      </fieldset>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <L id="e-date" label="Dzień" error={errors.date?.message}><input id="e-date" type="date" className="input" {...register("date")} aria-invalid={!!errors.date} /></L>
        <L id="e-guests" label="Liczba gości" error={errors.guests?.message}><input id="e-guests" type="number" inputMode="numeric" min={6} max={120} className="input tabular-nums" {...register("guests", { valueAsNumber: true })} aria-invalid={!!errors.guests} /></L>
        <L id="e-name" label="Imię i nazwisko" error={errors.name?.message}><input id="e-name" className="input" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} /></L>
        <L id="e-phone" label="Telefon" error={errors.phone?.message}><input id="e-phone" type="tel" className="input" autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} /></L>
        <div className="sm:col-span-2"><L id="e-email" label="E-mail" error={errors.email?.message}><input id="e-email" type="email" className="input" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} /></L></div>
        <div className="sm:col-span-2"><L id="e-notes" label="Szczegóły" hint="godzina, budżet na osobę, diety" error={errors.notes?.message}><textarea id="e-notes" rows={3} className="input resize-y" {...register("notes")} /></L></div>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden"><label>Strona<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[15px] leading-snug">
        <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#22140b]" {...register("consent")} aria-invalid={!!errors.consent} />
        <span>Zgadzam się na kontakt w sprawie wydarzenia i przetwarzanie danych przez Restaurację {site.name}.</span>
      </label>
      {errors.consent && <p className="mt-2 text-sm font-semibold text-[#9b2c22]">{errors.consent.message}</p>}
      {serverError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-[#9b2c22]">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="btn btn-ink mt-6 w-full disabled:opacity-70">
        {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}{isSubmitting ? "Wysyłam…" : "Wyślij zapytanie"}
      </button>
    </form>
  );
}

function L({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-[15px] font-semibold">{label}{hint && <span className="font-normal text-muted">{hint}</span>}</label>
      {children}
      {error && <p className="mt-1.5 text-sm font-semibold text-[#9b2c22]">{error}</p>}
    </div>
  );
}
