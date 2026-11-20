import CvDownload from '@/components/ui/cv-download';
import ThemeToggle from '@/components/ui/theme-toggle';

/** Controles fijos arriba a la derecha, visibles en todas las secciones. */
export default function SiteHeader() {
  return (
    <header className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
      <CvDownload variant="header" />
      <ThemeToggle />
    </header>
  );
}
