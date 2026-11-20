import { GitHubIcon, LinkedInIcon } from '@/components/ui/brand-icons';
import CvDownload from '@/components/ui/cv-download';
import { site } from '@/data/site';

const profiles = [
  { label: 'GitHub', href: site.github, handle: site.github.replace('https://', ''), Icon: GitHubIcon },
  { label: 'LinkedIn', href: site.linkedin, handle: site.linkedin.replace('https://', ''), Icon: LinkedInIcon },
];

export default function ContactSection() {
  return (
    <section id="contacto" className="relative w-full border-t border-fg/10 bg-bg">
      {/* Remates de esquina, cerrando visualmente el recorrido que abrió el Hero */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <span className="absolute left-6 top-6 h-3 w-3 border-l border-t border-fg/20 lg:left-10 lg:top-10" />
        <span className="absolute right-6 top-6 h-3 w-3 border-r border-t border-fg/20 lg:right-10 lg:top-10" />
        <span className="absolute bottom-6 left-6 h-3 w-3 border-b border-l border-fg/20 lg:bottom-10 lg:left-10" />
        <span className="absolute bottom-6 right-6 h-3 w-3 border-b border-r border-fg/20 lg:bottom-10 lg:right-10" />
      </div>

      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-6 py-28 sm:px-10 sm:py-32 lg:px-16">
        {/* Folio de cierre */}
        <div className="mb-14 flex items-center gap-2 font-mono">
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span className="text-[11px] tracking-[0.12em] text-fg-3">
            06 — CONTACTO / 06
          </span>
        </div>

        <div className="max-w-3xl">
          <h2
            className="font-sans text-fg"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
            }}
          >
            ¿Charlamos?
          </h2>

          <p className="mt-6 max-w-xl font-sans text-fg-2" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.5 }}>
            Disponible para proyectos remotos y oportunidades nuevas. La
            forma más directa de contactarme es por mail.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-3 font-mono text-fg transition-opacity hover:opacity-80"
            // 4.1vw en móvil: el mail entra en una línea desde 320px.
            style={{ fontSize: 'clamp(0.8rem, 4.1vw, 2rem)' }}
          >
            <span className="min-w-0 break-all border-b-2 pb-1" style={{ borderColor: 'var(--accent)' }}>
              {site.email}
            </span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: 'var(--accent)' }}
            >
              →
            </span>
          </a>

          {/* Perfiles: texto visible + aviso de pestaña nueva para lectores de pantalla */}
          <ul className="mt-8 flex flex-col gap-3 font-mono text-sm sm:flex-row sm:flex-wrap sm:gap-8 sm:gap-y-3">
            {profiles.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/profile inline-flex flex-wrap items-baseline gap-x-2.5 rounded-sm text-fg-2 transition-colors hover:text-fg sm:whitespace-nowrap"
                >
                  <p.Icon className="h-6 w-6 shrink-0 self-center text-fg" />
                  <span className="text-fg">{p.label}</span>
                  <span className="text-xs text-fg-3 sm:text-sm">{p.handle}</span>
                  <span className="sr-only"> (abre en una pestaña nueva)</span>
                  <span
                    aria-hidden="true"
                    className="text-accent transition-transform duration-200 group-hover/profile:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <CvDownload variant="block" />
        </div>

        <footer className="mt-24 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-fg-3">
          <span>{site.location.toUpperCase()}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-fg/20" />
          <span>© 2026 {site.name.toUpperCase()}</span>
        </footer>
      </div>
    </section>
  );
}
