import Image from "next/image";
import { dishPhotos } from "@/content/photos";
import { Katarzynka } from "@/components/Katarzynka";

// Zdjęcie dania albo — do czasu zdjęć — talerz na drewnie z katarzynką (nie pusta ramka).
export function DishPhoto({ name, className = "", sizes = "(min-width:1024px) 33vw, 100vw", caption = true }: { name: string; className?: string; sizes?: string; caption?: boolean }) {
  const slot = dishPhotos[name];
  if (!slot?.ready) {
    return (
      <div className={`wood relative grid place-items-center overflow-hidden ${className}`} role="img" aria-label={slot?.alt ?? name}>
        <span className="absolute aspect-square w-[62%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.07)_0%,rgb(255_255_255/0.03)_60%,transparent_62%)] shadow-[inset_0_0_0_2px_rgb(255_214_170/0.08)]" aria-hidden="true" />
        <Katarzynka className="relative w-[30%] opacity-80" />
      </div>
    );
  }
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <Image src={`/photos/${slot.file}`} alt={slot.alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      {caption && slot.generated && <figcaption className="absolute bottom-2 right-3 text-[13px] text-white/85 [text-shadow:0_1px_2px_rgb(0_0_0/0.85)]">Zdjęcie poglądowe</figcaption>}
    </figure>
  );
}
