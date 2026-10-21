import Image from "next/image";
import type { PhotoSlot } from "@/content/photos";

// Zdjęcie z manifestu; bez pliku — drewno formy z delikatnym światłem (układ kompletny przed sesją).
export function Photo({ slot, className = "", sizes = "100vw", priority, caption = true }: { slot: PhotoSlot; className?: string; sizes?: string; priority?: boolean; caption?: boolean }) {
  if (!slot.ready) {
    return (
      <div className={`wood relative overflow-hidden ${className}`} role="img" aria-label={slot.alt}>
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_40%,rgb(236_211_138/0.18),transparent_70%)]" />
      </div>
    );
  }
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <Image src={`/photos/${slot.file}`} alt={slot.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {caption && slot.generated && (
        <figcaption className="absolute bottom-2 right-3 text-[13px] text-white/85 [text-shadow:0_1px_2px_rgb(0_0_0/0.8)]">Zdjęcie poglądowe</figcaption>
      )}
    </figure>
  );
}
