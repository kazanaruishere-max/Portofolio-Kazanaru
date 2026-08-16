"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Word PullUp — kata naik per-kata saat masuk viewport (POLISH §5). */
export function PullUp({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.045 }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** RotatingText — kata berganti vertikal (POLISH §5, hero roles). */
export function RotatingText({
  words,
  interval = 2600,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, words.length, interval, reduce]);

  return (
    <span className={`inline-block overflow-hidden align-baseline ${className ?? ""}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className="inline-block will-change-transform"
          initial={reduce ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "-100%" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':,./<>?";

/** DecryptedText — teks "decrypt" saat masuk viewport (POLISH §5, micro). */
export function DecryptedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce || !inView) return;
    let frame = 0;
    const total = Math.max(14, Math.round(text.length * 2.2));
    let rafId = 0;

    const tick = () => {
      frame++;
      const progress = frame / total;
      const revealed = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealed) out += text[i];
        else out += CHARS[(Math.random() * CHARS.length) | 0];
      }
      setDisplay(out);
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reduce, text]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** Wrapper kecil agar deklaratif: `<PullUp/>`, `<RotatingText/>`, `<DecryptedText/>`. */
export function TextEffects({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
