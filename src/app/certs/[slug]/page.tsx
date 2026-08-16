import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertDetailLayout } from "@/components/certs/CertDetailLayout";
import { profile } from "@/content/profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return profile.certs.map((cert) => ({ slug: cert.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cert = profile.certs.find((c) => c.slug === slug);
  if (!cert) return { title: "Sertifikat tidak ditemukan" };
  return {
    title: `${cert.title.en} · Sertifikat`,
    description: cert.explanation.en,
  };
}

export default async function CertPage({ params }: PageProps) {
  const { slug } = await params;
  const cert = profile.certs.find((c) => c.slug === slug);
  if (!cert) notFound();
  return <CertDetailLayout cert={cert} />;
}
