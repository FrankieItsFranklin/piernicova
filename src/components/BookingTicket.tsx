"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Minus, Plus } from "lucide-react";
import { Katarzynka } from "@/components/Katarzynka";
import { reservationSchema, type ReservationInput } from "@/lib/schemas";
import { sendRequest } from "@/app/actions/requests";
import { dayLabel, isoPlusDays, slotsFor, warsawNow } from "@/lib/hours";
import { seating, site } from "@/content/site";
import { track } from "@/lib/track";

// Rezerwacja jako bon na mosiężnej szynie wydawki, przypięty klipsem-katarzynką.
// Krok 1: kiedy i ile osób. Krok 2: dane. Potem pieczątka "PRZYJĘTE" — to prośba, potwierdzamy telefonicznie.
export function BookingTicket({ id = "bon", headingLevel = "h2" }: { id?: string; headingLevel?: "h1" | "h2" }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [done, setDone] = useState<{ ref: string; demo: boolean } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [today, setToday] = useState<string>("");
  const started = useRef(false);
  const step2First = useRef<HTMLInputElement | null>(null);

  const { register, control, handleSubmit, setValue, trigger, setError, formState: { errors, isSubmitting } } =
    useForm<ReservationInput>({
      resolver: zodResolver(reservationSchema),
      defaultValues: { date: "", time: "19:00", guests: 2, seat: "kuchnia", name: "", phone: "", email: "", notes: "", consent: false, website: "" },
      mode: "onTouched",
    });

  // Data ustawiana w przeglądarce (strona statyczna), w strefie Toruń.
  useEffect(() => {
    const t = warsawNow().iso;
    const id = requestAnimationFrame(() => setToday(t));
    setValue("date", t);
    return () => cancelAnimationFrame(id);
  }, [setValue]);

  const v = useWatch({ control }) as ReservationInput;
  const date = v.date;
  // dziś: tylko godziny co najmniej 30 min od teraz (czas toruński)
  const slots = useMemo(() => {
    if (!date) return [];
    const all = slotsFor(date);
    if (date !== today) return all;
    const now = warsawNow().minutes + 30;
    return all.filter((s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3)) >= now);
  }, [date, today]);
  // dziś już za późno — przeskakujemy na jutro
  useEffect(() => {
    if (date && date === today && slots.length === 0) setValue("date", isoPlusDays(today, 1));
  }, [date, today, slots, setValue]);
  const time = v.time;
  useEffect(() => {
    if (slots.length && !slots.includes(time)) setValue("time", slots.includes("19:00") ? "19:00" : slots[Math.floor(slots.length / 2)]);
  }, [slots, time, setValue]);

  const startOnce = () => {
    if (started.current) return;
    started.current = true;
    track("reservation_start", { place: "ticket" });
  };

  const next = async () => {
    if (await trigger(["date", "time", "guests", "seat"])) {
      setStep(2);
      requestAnimationFrame(() => step2First.current?.focus());
    }
  };

  const onSubmit = handleSubmit(async (v) => {
    setServerError(null);
    const res = await sendRequest("reservation", v);
    if (res.ok) {
      track("reservation_submit", { guests: v.guests, seat: v.seat, demo: res.demo });
      setDone({ ref: res.ref, demo: res.demo });
      return;
    }
    if (res.fields) {
      for (const [k, m] of Object.entries(res.fields)) setError(k as keyof ReservationInput, { message: m });
      if (res.fields.date || res.fields.time) setStep(1);
    }
    setServerError(res.error);
  });

  const H = headingLevel;
  const quickDays = today ? [0, 1, 2].map((n) => isoPlusDays(today, n)) : [];
  const nameReg = register("name");

  return (
    <div className="relative pt-10" id={id}>
      <div className="brass absolute -left-3 -right-3 top-1.5 h-[18px] rounded-full sm:-left-6 sm:-right-6" aria-hidden="true" />
      <Katarzynka className="absolute left-1/2 top-[-6px] z-10 w-[84px] -translate-x-1/2 drop-shadow-[0_6px_6px_rgb(0_0_0/0.45)]" />

      <div className="ticket ticket-anim relative px-6 pb-9 pt-9 font-mono shadow-[0_34px_50px_-22px_rgb(0_0_0/0.8)] sm:px-7">
        <div className="flex justify-between border-b-[1.5px] border-dashed border-[#c8bba8] pb-2.5 text-[13px] text-muted">
          <span>BON NA SALĘ</span>
          <span>{step === 1 ? "1/2 · KIEDY" : done ? "PRZYJĘTE" : "2/2 · DANE"}</span>
        </div>

        {done ? (
          <div role="status" className="relative py-2">
            <H className="mt-4 pr-32 font-serif text-[2rem] leading-none">Prośba przyjęta</H>
            <dl className="mt-8 space-y-1.5 text-[15px]">
              <div className="flex justify-between gap-4"><dt className="text-muted">Dzień</dt><dd className="font-semibold">{dayLabel(v.date)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Godzina</dt><dd className="font-semibold">{v.time}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Osoby</dt><dd className="font-semibold">{v.guests}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Numer</dt><dd className="font-semibold">{done.ref}</dd></div>
            </dl>
            <p className="mt-5 font-sans text-[15px] text-ink">Zadzwonimy na podany numer, żeby potwierdzić stolik. Do tego czasu rezerwacja nie jest wiążąca.</p>
            {done.demo && (
              <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 font-sans text-sm text-amber-950">Tryb demonstracyjny: formularz nie jest podłączony do skrzynki restauracji, nic nie wysłano.</p>
            )}
            <span className="stamp-anim pointer-events-none absolute -right-1 top-3 rotate-[-9deg] rounded-md border-[3px] border-[#8b2b1e] px-3 py-1 font-serif text-2xl text-[#8b2b1e] opacity-90" aria-hidden="true">
              PRZYJĘTE
            </span>
          </div>
        ) : (
          <form onSubmit={onSubmit} onFocus={startOnce} noValidate aria-labelledby={`${id}-title`}>
            <H id={`${id}-title`} className="mt-4 font-serif text-[2rem] leading-none">Zarezerwuj stolik</H>

            {step === 1 && (
              <div className="mt-3">
                <Row label="Dzień" htmlFor={`${id}-date`} error={errors.date?.message}>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Szybki wybór dnia">
                      {quickDays.map((d, i) => (
                        <button key={d} type="button" onClick={() => setValue("date", d, { shouldValidate: true })} aria-pressed={date === d}
                          className={`rounded-md border-[1.5px] px-2.5 py-1 text-[13px] font-semibold ${date === d ? "border-ink bg-ink text-paper" : "border-[#cdbfac] bg-white text-ink"}`}>
                          {i === 0 ? "Dziś" : i === 1 ? "Jutro" : dayLabel(d).split(",")[0]}
                        </button>
                      ))}
                    </div>
                    <input id={`${id}-date`} type="date" min={today || undefined} className="field-line" {...register("date")} aria-invalid={!!errors.date} />
                  </div>
                </Row>
                <Row label="Godzina" htmlFor={`${id}-time`} error={errors.time?.message}>
                  <Controller control={control} name="time" render={({ field }) => (
                    <select id={`${id}-time`} className="field-line" value={slots.includes(field.value) ? field.value : ""} onChange={(e) => field.onChange(e.target.value)} onBlur={field.onBlur} ref={field.ref}>
                      {slots.length === 0 && <option value="">—</option>}
                      {slots.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )} />
                </Row>
                <Row label="Osoby" error={errors.guests?.message} groupId={`${id}-guests`}>
                  <Controller control={control} name="guests" render={({ field }) => (
                    <div className="flex items-center gap-2" role="group" aria-labelledby={`${id}-guests`}>
                      <button type="button" aria-label="Mniej osób" disabled={field.value <= 1} onClick={() => field.onChange(Math.max(1, field.value - 1))}
                        className="grid size-9 place-items-center rounded-md border-[1.5px] border-[#cdbfac] bg-white disabled:opacity-40"><Minus className="size-4" /></button>
                      <output aria-live="polite" className="min-w-16 text-center text-lg font-semibold tabular-nums">{field.value} {field.value === 1 ? "os." : "os."}</output>
                      <button type="button" aria-label="Więcej osób" disabled={field.value >= 12} onClick={() => field.onChange(Math.min(12, field.value + 1))}
                        className="grid size-9 place-items-center rounded-md border-[1.5px] border-[#cdbfac] bg-white disabled:opacity-40"><Plus className="size-4" /></button>
                    </div>
                  )} />
                </Row>
                <Row label="Gdzie" htmlFor={`${id}-seat`}>
                  <select id={`${id}-seat`} className="field-line" {...register("seat")}>
                    {seating.map((s) => <option key={s.id} value={s.id}>{s.label}{s.hint ? ` (${s.hint})` : ""}</option>)}
                  </select>
                </Row>
                <button type="button" onClick={next} className="btn btn-icing mt-5 w-full !rounded-[10px]">Dalej — dane kontaktowe</button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-3">
                <p className="text-[13px] text-muted">{date && dayLabel(date)} · {time} · {v.guests} os. · {seating.find((s) => s.id === v.seat)?.label}</p>
                <div className="mt-3 space-y-3 font-sans">
                  <Field label="Imię i nazwisko" id={`${id}-name`} error={errors.name?.message}>
                    <input id={`${id}-name`} className="input" autoComplete="name" {...nameReg} ref={(el) => { nameReg.ref(el); step2First.current = el; }} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
                  </Field>
                  <Field label="Telefon" id={`${id}-phone`} error={errors.phone?.message}>
                    <input id={`${id}-phone`} className="input tabular-nums" type="tel" inputMode="tel" autoComplete="tel" placeholder="600 123 456" {...register("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} />
                  </Field>
                  <Field label="E-mail" hint="opcjonalnie" id={`${id}-email`} error={errors.email?.message}>
                    <input id={`${id}-email`} className="input" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
                  </Field>
                  <Field label="Uwagi" hint="alergie, okazja, krzesełko dla dziecka" id={`${id}-notes`} error={errors.notes?.message}>
                    <textarea id={`${id}-notes`} rows={2} className="input resize-y" {...register("notes")} />
                  </Field>
                  <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden"><label>Strona<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
                  <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-ink">
                    <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#22140b]" {...register("consent")} aria-invalid={!!errors.consent} />
                    <span>Zgadzam się na kontakt w sprawie rezerwacji i przetwarzanie danych przez Restaurację {site.name}.</span>
                  </label>
                  {errors.consent && <p className="text-sm font-semibold text-[#9b2c22]">{errors.consent.message}</p>}
                </div>
                {serverError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 font-sans text-sm font-semibold text-[#9b2c22]">{serverError}</p>}
                <div className="mt-5 flex gap-2">
                  <button type="button" onClick={() => setStep(1)} className="btn !min-h-12 !rounded-[10px] !px-4 font-sans text-ink ring-1 ring-[#cdbfac]" aria-label="Wróć do wyboru dnia">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-ink flex-1 !rounded-[10px] disabled:opacity-70">
                    {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                    {isSubmitting ? "Wysyłam…" : "Wyślij prośbę o stolik"}
                  </button>
                </div>
              </div>
            )}
            <p className="mt-4 text-[13px] leading-relaxed text-muted">To prośba o rezerwację — potwierdzimy ją telefonicznie. Większa grupa? {site.phone.display}.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Row({ label, htmlFor, groupId, error, children }: { label: string; htmlFor?: string; groupId?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-dotted border-[#cdbfac] py-2.5">
      <div className="grid grid-cols-[5.8rem_1fr] items-center gap-2">
        {htmlFor ? <label htmlFor={htmlFor} className="text-[15px] text-muted">{label}</label> : <span id={groupId} className="text-[15px] text-muted">{label}</span>}
        {children}
      </div>
      {error && <p className="mt-1 pl-[6.3rem] font-sans text-sm font-semibold text-[#9b2c22]">{error}</p>}
    </div>
  );
}

function Field({ label, hint, id, error, children }: { label: string; hint?: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-[15px] font-semibold text-ink">
        {label}{hint && <span className="font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-semibold text-[#9b2c22]">{error}</p>}
    </div>
  );
}
