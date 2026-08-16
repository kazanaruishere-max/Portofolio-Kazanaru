"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Magnetic, OutlinedText } from "@/components/ui";
import { useT } from "@/lib/lang";
import { contact, profile } from "@/content/profile";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="fill-current"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="fill-current"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Contact (PRD §6.9) — CTA raksasa, giant outlined "AZKA" (2D editorial),
 * email copy-to-clipboard, GitHub, LinkedIn. Focus kontak < 5 detik (G3).
 */
export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cta = useT(contact.cta);
  const sub = useT(contact.sub);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard tidak tersedia — biarkan fallback ke mailto
    }
  };

  return (
    <section id="contact" className="cv-auto relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 py-32 md:px-10">
      {/* giant outlined word — momen tipografi penutup (2D, dekoratif) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <OutlinedText
          text="AZKA"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display font-bold leading-none [font-size:clamp(10rem,30vw,26rem)]"
        />
      </div>

      <div className="relative z-[var(--z-content)]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">06 / Contact</p>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-balance text-text md:text-7xl">
          {cta}
        </h2>
        <p className="mt-6 max-w-[55ch] text-lg text-text-secondary">{sub}</p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Salin email: ${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-text px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-all duration-150 hover:opacity-85 active:scale-[0.97]"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {profile.email}
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text transition-all duration-150 hover:border-text active:scale-[0.97]"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text transition-all duration-150 hover:border-text active:scale-[0.97]"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </a>
          </Magnetic>
        </div>

        {copied && (
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-text-muted" role="status">
            Email disalin ✓
          </p>
        )}
      </div>
    </section>
  );
}
