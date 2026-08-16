import { cn } from "@/lib/utils";

/**
 * Giant outlined word — pengganti 3D (POLISH convert 2D editorial).
 * CSS text-stroke, fill transparan → dekoratif, aria-hidden.
 */
export function OutlinedText({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("text-outline select-none", className)}>
      {text}
    </span>
  );
}
