import HeroSection from '@/components/ui/hero-ascii-one';
import IntroSection from '@/components/ui/intro-section';
import AboutSection from '@/components/ui/about-section';
import ProjectsSection from '@/components/ui/projects-section';
import StackSection from '@/components/ui/stack-section';
import ContactSection from '@/components/ui/contact-section';
import CvDownload from '@/components/ui/cv-download';

export default function Home() {
  return (
    <main className="bg-bg">
      <HeroSection
        cvButton={<CvDownload variant="button" />}
        cvNote={<CvDownload variant="note" />}
      />
      <IntroSection />
      <AboutSection />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </main>
  );
}
