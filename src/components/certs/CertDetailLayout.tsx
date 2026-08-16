"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { MotionToggle, Reveal } from "@/components/ui";
import { profile } from "@/content/profile";
import { useT } from "@/lib/lang";

type Cert = (typeof profile.certs)[number];

function resetScroll() {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(0, { duration: 0 });
  else window.scrollTo(0, 0);
}

/**
 * Halaman detail sertifikat (PERSONALIZE) — penjelasan + gambar + PDF di bawah.
 */
export function CertDetailLayout({ cert }: { cert: Cert }) {
  const title = useT(cert.title);
  const note = useT(cert.note);
  const explanation = useT(cert.explanation);

  useEffect(() => {
    resetScroll();
  }, [cert.slug]);

  return (
    <main className="min-h-dvh">
      <header className="fixed inset-x-0 top-0 z-[var(--z-ui)] flex items-center justify-between border-b border-line bg-bg/80 px-6 py-4 backdrop-blur md:px-10">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.3em] text-text">
          {profile.name}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#craft"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-text"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Sertifikat
          </Link>
          <MotionToggle />
        </div>
      </header>

      <section className="px-6 pt-36 md:px-10 md:pt-44">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted">
          {cert.index} / Sertifikat
        </p>
        <h1
          className="mt-4 max-w-3xl font-display font-medium leading-[0.98] tracking-[-0.03em] text-balance text-text"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {title}
        </h1>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.15em] text-text-secondary">
          {cert.issuer}
        </p>

        <Reveal className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-text-secondary">{note}</p>
        </Reveal>
      </section>

      <section className="px-6 py-20 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Tentang</p>
          <p className="mt-5 text-xl leading-relaxed text-text md:text-2xl">{explanation}</p>
        </Reveal>

        {cert.image && (
          <Reveal className="mt-16 max-w-3xl">
            <div className="overflow-hidden border border-line bg-surface">
              <Image
                src={cert.image}
                alt={title}
                width={1307}
                height={922}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        )}

        {cert.pdfs && cert.pdfs.length > 0 && (
          <Reveal className="mt-16 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">PDF / Dokumen</p>
            <ul className="mt-6 space-y-3">
              {cert.pdfs.map((pdf) => (
                <li key={pdf.file} className="flex flex-wrap items-center gap-4 border-b border-line py-3">
                  <FileText size={16} aria-hidden="true" className="text-text-secondary" />
                  <span className="font-mono text-sm text-text-secondary">{pdf.name}</span>
                  <div className="ml-auto flex gap-4">
                    <a
                      href={pdf.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-text underline-offset-4 hover:underline"
                    >
                      <ExternalLink size={12} aria-hidden="true" />
                      Buka
                    </a>
                    <a
                      href={pdf.file}
                      download
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-text underline-offset-4 hover:underline"
                    >
                      <Download size={12} aria-hidden="true" />
                      Unduh
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {cert.href && (
          <Reveal className="mt-12">
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-text transition-colors hover:border-text"
            >
              Verifikasi
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </Reveal>
        )}
      </section>

      <section className="border-t border-line px-6 py-14 md:px-10">
        <Link
          href="/#craft"
          className="group inline-flex items-center gap-3 font-display text-2xl font-medium tracking-tight text-text transition-opacity hover:opacity-70 md:text-3xl"
        >
          <ArrowLeft size={18} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          Semua sertifikat
        </Link>
      </section>
    </main>
  );
}
