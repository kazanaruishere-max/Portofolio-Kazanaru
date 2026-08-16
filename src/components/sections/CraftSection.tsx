"use client";

import Link from "next/link";
import { SectionHeading, ToolIcon, ToolsOrbit, useProximity } from "@/components/ui";
import { useT } from "@/lib/lang";
import { profile, tools } from "@/content/profile";

function groupTools() {
  const map = new Map<string, typeof tools>();
  for (const tool of tools) {
    const list = map.get(tool.category) ?? [];
    list.push(tool);
    map.set(tool.category, list);
  }
  return Array.from(map.entries());
}

/**
 * Craft (PRD §6.8) — stack grid, sertifikat + verifier, tools logo grid.
 * Logo monokrom → hover invert (amendemen #10, konsisten pure mono).
 */
export function CraftSection() {
  const categories = groupTools();
  const craftTitle = useT(profile.titles.craft);

  return (
    <section id="craft" className="cv-auto relative px-6 py-32 md:px-10 md:py-44">
      <SectionHeading index="05" title={craftTitle} />

      <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
        {categories.map(([category, items]) => (
          <CategoryCell key={category} category={category} items={items} />
        ))}
      </div>

      {/* Sertifikat & Prestasi — rows editorial (3 credentials) */}
      <div className="mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Sertifikat</p>
        <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-text md:text-5xl">
          Sertifikat &amp; Prestasi
        </h3>
        <div className="mt-10 border-t border-line">
          {profile.certs.map((cert) => (
            <CertRow key={cert.index} cert={cert} />
          ))}
        </div>
      </div>

      {/* Tools orbit — kompak, melingkar, interaktif */}
      <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Tools</p>
          <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-text md:text-4xl">
            Ekosistem kerja
          </h3>
          <p className="mt-4 max-w-[45ch] leading-relaxed text-text-secondary">
            {tools.length} tools yang membentuk cara saya bekerja · dari AI inference sampai
            quantitative runtime.
          </p>
        </div>
        <ToolsOrbit />
      </div>
    </section>
  );
}

function CategoryCell({ category, items }: { category: string; items: typeof tools }) {
  const ref = useProximity<HTMLDivElement>({ type: "aura", strength: 0.6, range: 200 });
  return (
    <div ref={ref} className="aura bg-bg p-8 md:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{category}</p>
      <ul className="mt-6 space-y-2">
        {items.map((tool) => (
          <li key={tool.name} className="flex items-center gap-3 text-text-secondary">
            <ToolIcon tool={tool} className="h-4 w-4" />
            <span className="font-mono text-sm">{tool.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface CertRowProps {
  cert: {
    slug: string;
    index: string;
    title: { id: string; en: string };
    issuer: string;
    note: { id: string; en: string };
    href: string | null;
    external: boolean;
  };
}

/** Row sertifikat editorial — klik → halaman detail /certs/[slug]. */
function CertRow({ cert }: CertRowProps) {
  const title = useT(cert.title);
  const note = useT(cert.note);
  const inner = (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-baseline">
      <span className="font-display text-3xl font-medium text-text-muted lg:col-span-1 md:text-4xl">
        {cert.index}
      </span>
      <div className="lg:col-span-11">
        <p className="font-display text-3xl font-medium tracking-tight text-text md:text-4xl">
          {title}
        </p>
        <p className="mt-1 font-mono text-sm uppercase tracking-[0.15em] text-text-secondary">
          {cert.issuer}
        </p>
        <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-text-muted">{note}</p>
      </div>
    </div>
  );

  return (
    <Link
      href={`/certs/${cert.slug}`}
      className="group flex items-center gap-6 border-b border-line py-8 transition-colors hover:bg-surface/40 md:py-10"
    >
      <div className="flex-1">{inner}</div>
      <span className="font-display text-2xl text-text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text">
        →
      </span>
    </Link>
  );
}
