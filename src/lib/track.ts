// Jedno miejsce na zdarzenia biznesowe. Dostawca analityki nie jest jeszcze wybrany:
// zdarzenia trafiają do window.dataLayer (GTM/GA4 odczyta je bez zmian w kodzie).
export type TrackEvent =
  | "form_start"
  | "form_submit"
  | "click_phone"
  | "click_email"
  | "click_directions"
  | "estimator_used"
  | "consult_cta"
  | "reservation_start"
  | "reservation_submit"
  | "event_submit"
  | "voucher_submit"
  | "menu_filter";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
}
