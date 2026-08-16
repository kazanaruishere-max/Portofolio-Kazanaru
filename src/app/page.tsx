import { Marquee, Preloader, ScrollProgress } from "@/components/ui";
import {
  ContactSection,
  CraftSection,
  Footer,
  Hero,
  Manifesto,
  Navbar,
  NowStrip,
  Story,
  TimelineSection,
  WorkSection,
} from "@/components/sections";
import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <h1 className="sr-only">Azka Syahirull · AI Developer</h1>
      <Preloader />
      <Navbar />
      <ScrollProgress />
      <Hero />
      <NowStrip />
      <Story />
      <Manifesto />
      <Marquee items={profile.marquee} className="border-y border-line py-4" />
      <WorkSection />
      <TimelineSection />
      <CraftSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
