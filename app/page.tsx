import { SiteNavigation } from '@/components/portfolio/site-navigation';
import { HeroSection } from '@/components/portfolio/hero-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { RetroEffects } from '@/components/portfolio/retro-effects';

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 -z-20 bg-dither" />
      <div aria-hidden="true" className="glow glow-one" />
      <div aria-hidden="true" className="glow glow-two" />

      <RetroEffects />
      <SiteNavigation />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />

      <footer className="section-shell border-t-[3px] border-dashed border-border py-8 text-center font-hud text-xs uppercase tracking-[0.06em] text-muted-foreground">
        feito com curiosidade, café e algumas tentativas
      </footer>
    </main>
  );
}
