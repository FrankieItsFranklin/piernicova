"use client";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { voucherSchema, type VoucherInput } from "@/lib/schemas";
import { sendRequest } from "@/app/actions/requests";
import { Katarzynka } from "@/components/Katarzynka";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { site } from "@/content/site";
import { track } from "@/lib/track";

// Voucher jak pierniczek: imię obdarowanego "pisane lukrem" na żywo, kwota złotem.
export function VoucherDesigner() {
  const reduce = useReducedMotionSafe();
  const [done, setDone] = useState<{ ref: string; demo: boolean } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const { register, control, handleSubmit, setValue, setError, formState: { errors, isSubmitting } } = useForm<VoucherInput>({
    resolver: zodResolver(voucherSchema),
    defaultValues: { recipient: "", amount: 200, message: "", name: "", phone: "", email: "", consent: false, website: "" },
    mode: "onTouched",
  });
  const recipient = useWatch({ control, name: "recipient" });
  const amount = useWatch({ control, name: "amount" });
  const message = useWatch({ control, name: "message" });

  const onSubmit = handleSubmit(async (v) => {
    setServerError(null);
    const res = await sendRequest("voucher", v);
    if (res.ok) { track("voucher_submit", { amount: v.amount, demo: res.demo }); setDone(res); return; }
    if (res.fields) for (const [k, m] of Object.entries(res.fields)) setError(k as keyof VoucherInput, { message: m });
    setServerError(res.error);
  });

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* podgląd */}
      <div className="lg:sticky lg:top-28">
        <div className="mold relative aspect-[1.6] overflow-hidden rounded-[28px] p-7 text-icing sm:p-9" aria-label="Podgląd vouchera" role="img">
          <Katarzynka className="absolute -right-6 -top-6 w-40 opacity-90 sm:w-48" />
          <p className="font-serif text-2xl">Piernicova</p>
          <p className="text-[13px] font-semibold text-gold-hi">Voucher · {site.address.street}, Toruń</p>
          <div className="absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9">
            <p className="text-sm text-sand">Dla</p>
            <motion.p
              key={recipient || "placeholder"}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-[clamp(2rem,5vw,3.2rem)] leading-none text-icing [text-shadow:0_2px_0_rgb(0_0_0/0.35)]"
            >
              {recipient || "Imię obdarowanej osoby"}
            </motion.p>
            {message && <p className="mt-2 max-w-[80%] text-[15px] italic text-sand">„{message}”</p>}
            <p className="mt-4 text-3xl font-extrabold text-gold-hi tabular-nums">{Number(amount) || 0} zł</p>
          </div>
        </div>
        <p className="mt-4 text-[15px] text-sand">Podgląd jest poglądowy — wygląd vouchera ustala restauracja.</p>
      </div>

      {/* formularz */}
      {done ? (
        <div role="status" className="rounded-[22px] bg-paper p-8 text-ink">
          <span className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-800"><Check className="size-6" aria-hidden="true" /></span>
          <h2 className="mt-5 text-3xl">Dziękujemy</h2>
          <p className="mt-2 text-muted">Odezwiemy się mailowo z płatnością i odbiorem vouchera. Numer prośby: {done.ref}.</p>
          {done.demo && <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-950">Tryb demonstracyjny: nic nie wysłano.</p>}
        </div>
      ) : (
        <form onSubmit={onSubmit} onFocus={() => { if (!started.current) { started.current = true; track("form_start", { form: "voucher" }); } }} noValidate className="on-light rounded-[22px] bg-paper p-6 text-ink sm:p-8">
          <div className="space-y-4">
            <L id="v-rec" label="Dla kogo" error={errors.recipient?.message}><input id="v-rec" className="input" maxLength={40} {...register("recipient")} aria-invalid={!!errors.recipient} /></L>
            <fieldset>
              <legend className="mb-2 text-[15px] font-semibold">Kwota</legend>
              <div className="flex flex-wrap items-center gap-2">
                {[100, 200, 300, 500].map((a) => (
                  <button key={a} type="button" aria-pressed={Number(amount) === a} onClick={() => setValue("amount", a, { shouldValidate: true })}
                    className={`rounded-full border-[1.5px] px-4 py-2 font-semibold tabular-nums ${Number(amount) === a ? "border-ink bg-ink text-icing" : "border-line bg-white"}`}>{a} zł</button>
                ))}
                <label className="flex items-center gap-2 text-[15px] text-muted">lub
                  <input type="number" inputMode="numeric" min={50} step={10} className="input !min-h-10 w-28 !py-1.5" {...register("amount", { valueAsNumber: true })} aria-label="Inna kwota w złotych" aria-invalid={!!errors.amount} />
                </label>
              </div>
              {errors.amount && <p className="mt-1.5 text-sm font-semibold text-[#9b2c22]">{errors.amount.message}</p>}
            </fieldset>
            <L id="v-msg" label="Dedykacja" hint="opcjonalnie, do 120 znaków" error={errors.message?.message}><input id="v-msg" className="input" maxLength={120} {...register("message")} /></L>
            <hr className="border-line" />
            <L id="v-name" label="Twoje imię i nazwisko" error={errors.name?.message}><input id="v-name" className="input" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} /></L>
            <div className="grid gap-4 sm:grid-cols-2">
              <L id="v-phone" label="Telefon" error={errors.phone?.message}><input id="v-phone" className="input" type="tel" autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} /></L>
              <L id="v-email" label="E-mail" error={errors.email?.message}><input id="v-email" className="input" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} /></L>
            </div>
            <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden"><label>Strona<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug">
              <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#22140b]" {...register("consent")} aria-invalid={!!errors.consent} />
              <span>Zgadzam się na kontakt w sprawie vouchera i przetwarzanie danych przez Restaurację {site.name}.</span>
            </label>
            {errors.consent && <p className="text-sm font-semibold text-[#9b2c22]">{errors.consent.message}</p>}
          </div>
          {serverError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-[#9b2c22]">{serverError}</p>}
          <button type="submit" disabled={isSubmitting} className="btn btn-ink mt-6 w-full disabled:opacity-70">
            {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}{isSubmitting ? "Wysyłam…" : "Zamów voucher"}
          </button>
          <p className="mt-3 text-sm text-muted">Płatność i odbiór ustalimy mailowo. Wolisz od razu? {site.email}</p>
        </form>
      )}
    </div>
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
