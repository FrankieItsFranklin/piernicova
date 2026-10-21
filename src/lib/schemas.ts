import { z } from "zod";
import { seating } from "@/content/site";

const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s\-()]/g, "").replace(/^(\+48|0048)/, ""))
  .pipe(z.string().regex(/^\d{9}$/, "Podaj 9-cyfrowy numer telefonu, np. 600 123 456."));
const name = z.string().trim().min(2, "Jak się do Ciebie zwracać?").max(80);
const email = z.string().trim().email("Sprawdź adres e-mail.").optional().or(z.literal(""));
const consent = z.boolean().refine((v) => v, "Bez zgody nie możemy odpowiedzieć na prośbę.");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Wybierz dzień.");
const trap = z.string().max(0).optional();

export const seatingIds = seating.map((s) => s.id) as [string, ...string[]];

export const reservationSchema = z.object({
  date: isoDate,
  time: z.string().regex(/^\d{2}:\d{2}$/, "Wybierz godzinę."),
  guests: z.number().int().min(1).max(12, "Powyżej 12 osób — zapytaj o wydarzenie."),
  seat: z.enum(seatingIds),
  name,
  phone,
  email,
  notes: z.string().trim().max(400, "Maksymalnie 400 znaków.").optional().or(z.literal("")),
  consent,
  website: trap,
});
export type ReservationInput = z.input<typeof reservationSchema>;

export const occasions = ["Urodziny lub rocznica", "Kolacja firmowa", "Chrzciny, komunia", "Wigilia firmowa", "Inne"] as const;
export const eventSchema = z.object({
  date: isoDate,
  guests: z.number().int().min(6, "Dla mniejszych grup — zwykła rezerwacja.").max(120),
  occasion: z.enum(occasions),
  name,
  phone,
  email: z.string().trim().email("Podaj e-mail — wyślemy propozycję menu."),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
  consent,
  website: trap,
});
export type EventInput = z.input<typeof eventSchema>;

export const voucherSchema = z.object({
  recipient: z.string().trim().min(2, "Dla kogo jest voucher?").max(40, "Maksymalnie 40 znaków."),
  amount: z.number().int().min(50, "Najmniej 50 zł.").max(5000),
  message: z.string().trim().max(120).optional().or(z.literal("")),
  name,
  phone,
  email: z.string().trim().email("Podaj e-mail — tam odpowiemy."),
  consent,
  website: trap,
});
export type VoucherInput = z.input<typeof voucherSchema>;
