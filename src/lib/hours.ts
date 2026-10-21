import { hours } from "@/content/site";

// Czas w Toruniu niezależnie od strefy gościa.
export function warsawNow(now = new Date()) {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw", year: "numeric", month: "2-digit", day: "2-digit",
    weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  return {
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday")),
    minutes: Number(g("hour")) * 60 + Number(g("minute")),
    iso: `${g("year")}-${g("month")}-${g("day")}`,
  };
}

const dayNames = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];

export function openState(now = new Date()) {
  const { day, minutes } = warsawNow(now);
  const h = hours[day];
  if (minutes >= h.open * 60 && minutes < h.close * 60) return { open: true, label: `Otwarte do ${h.close}:00` };
  if (minutes < h.open * 60) return { open: false, label: `Dziś otwieramy o ${h.open}:00` };
  // otwarte codziennie, więc po zamknięciu następne otwarcie jest jutro
  const next = (day + 1) % 7;
  return { open: false, label: `Zamknięte · jutro (${dayNames[next]}) od ${hours[next].open}:00` };
}

// Godziny do wyboru w rezerwacji: co 30 min od otwarcia do godziny przed zamknięciem.
// (Zasada ostatniej rezerwacji do potwierdzenia z restauracją — docs/NOTES.md.)
export function slotsFor(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`);
  const h = hours[d.getDay()];
  const out: string[] = [];
  for (let m = h.open * 60; m <= (h.close - 1) * 60; m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${m % 60 ? "30" : "00"}`);
  }
  return out;
}

export function isoPlusDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function dayLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return `${dayNames[d.getDay()]}, ${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
}
