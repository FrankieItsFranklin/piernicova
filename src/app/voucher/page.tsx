import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VoucherDesigner } from "@/components/VoucherDesigner";

export const metadata: Metadata = {
  title: "Voucher prezentowy",
  description: "Podaruj kolację w restauracji Piernicova w Toruniu. Wpisz imię obdarowanej osoby i kwotę — płatność i odbiór ustalimy mailowo.",
  alternates: { canonical: "/voucher" },
};

export default function VoucherPage() {
  return (
    <>
      <PageHero crumb="Voucher" title="Voucher na kolację" lead="Wpisz imię i kwotę, a zobaczysz voucher od razu. Płatność i odbiór ustalimy mailowo." compact>
        <div className="mt-12"><VoucherDesigner /></div>
      </PageHero>
    </>
  );
}
