import Link from "next/link";
import { Katarzynka } from "@/components/Katarzynka";

export default function NotFound() {
  return (
    <section className="wood flex min-h-svh items-center pt-[78px]">
      <div className="container-site grid items-center gap-10 py-24 md:grid-cols-[1fr_auto]">
        <div>
          <p className="carved text-[clamp(5rem,16vw,12rem)] leading-none" aria-hidden="true">404</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3.2rem)]">Ta strona się nie upiekła</h1>
          <p className="mt-4 max-w-lg text-lg text-sand">Możliwe, że adres się zmienił. Zajrzyj do karty albo zarezerwuj stolik.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-icing">Strona główna</Link>
            <Link href="/menu" className="btn btn-gold">Karta</Link>
          </div>
        </div>
        <Katarzynka className="w-48 md:w-64" />
      </div>
    </section>
  );
}
