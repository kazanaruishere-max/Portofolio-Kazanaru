import { PullUp } from "./TextEffects";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Angka chapter (01–06) — SATU-SATUNYA eyebrow system (amendemen #4) */
  index: string;
  title: string;
  className?: string;
}

/**
 * Section heading editorial (PRD §6.5): sistem angka 01–06 sebagai
 * satu-satunya eyebrow. Judul naik per-kata (Word PullUp, POLISH §5).
 */
export function SectionHeading({ index, title, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <span className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">
        {index}
      </span>
      <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-text md:text-6xl">
        <PullUp text={title} />
      </h2>
    </div>
  );
}
