import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import type { ReactNode } from 'react';

/** Foto de perfil, relativa a /public. Si el archivo no existe, se muestra un respaldo con iniciales. */
const PROFILE_PHOTO = '/profile/santi-foto.jpg';
const PROFILE_INITIALS = 'SS';

/** Se resuelve al renderizar en el servidor (en build, para la página estática). */
function profilePhoto(): string | null {
  const file = path.join(process.cwd(), 'public', ...PROFILE_PHOTO.split('/').filter(Boolean));
  return fs.existsSync(file) ? PROFILE_PHOTO : null;
}

/*
 * Íconos: lucide-static@1.77.0 (ISC), https://lucide.dev
 * Copiados de icons/<nombre>.svg; trazo ajustado a 1.75 como el ícono de cv-download.
 */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** lucide-static@1.77.0 · graduation-cap */
const GraduationCapIcon = () => (
  <Icon>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </Icon>
);

/** lucide-static@1.77.0 · languages */
const LanguagesIcon = () => (
  <Icon>
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </Icon>
);

/** lucide-static@1.77.0 · code */
const CodeIcon = () => (
  <Icon>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </Icon>
);

/** lucide-static@1.77.0 · laptop */
const LaptopIcon = () => (
  <Icon>
    <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" />
    <path d="M20.054 15.987H3.946" />
  </Icon>
);

type AboutCard = {
  icon: () => ReactNode;
  eyebrow: string;
  title: string;
  text: string;
  link?: { href: string; label: string };
};

const cards: AboutCard[] = [
  {
    icon: GraduationCapIcon,
    eyebrow: 'Universidad Nacional de Luján · En curso',
    title: 'Licenciatura en Sistemas de la Información',
    text: 'Carrera en curso.',
  },
  {
    icon: LanguagesIcon,
    eyebrow: 'Idiomas',
    title: 'Inglés B2 y portugués B1',
    text: 'Inglés con certificación B2 First y portugués de nivel intermedio.',
  },
  {
    icon: CodeIcon,
    eyebrow: 'NetLatin · 2025 — 2026',
    title: 'Desarrollador full stack e infraestructura',
    text: 'Diseño y desarrollo de herramientas internas: gestión de operaciones de campo, automatización de correos, chatbot con IA y monitoreo de red.',
    link: { href: '#proyectos', label: 'Ver proyectos' },
  },
  {
    icon: LaptopIcon,
    eyebrow: 'Blyx Nova Studio',
    title: 'Estudio de desarrollo web',
    text: 'Proyectos web para clientes desde Buenos Aires.',
  },
];

function ProfilePhoto() {
  const src = profilePhoto();
  const box =
    'relative mx-auto h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-fg/10 bg-surface sm:h-64 sm:w-64';

  return src ? (
    <div className={box}>
      <Image
        src={src}
        alt="Foto de Santiago Sánchez"
        fill
        sizes="(min-width: 640px) 256px, 192px"
        loading="lazy"
        className="object-cover"
      />
    </div>
  ) : (
    // Respaldo mientras no exista la foto en /public.
    <div className={`${box} flex items-center justify-center`} aria-hidden="true">
      <span
        className="font-sans text-fg/30"
        style={{ fontWeight: 800, fontSize: 'clamp(2.25rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
      >
        {PROFILE_INITIALS}
      </span>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="relative w-full border-t border-fg/10 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        {/* Folio de sección */}
        <div className="mb-14 flex items-center gap-2 font-mono sm:mb-16">
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span className="text-[11px] tracking-[0.12em] text-fg-3">
            03 — SOBRE MÍ / 06
          </span>
        </div>

        <ProfilePhoto />

        <div className="mt-10 max-w-3xl">
          <h2
            className="font-sans text-fg"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Sobre mí
          </h2>

          <p
            className="mt-6 font-sans text-fg/85"
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Soy Santiago, desarrollador full stack junior de Buenos Aires, con
            base en infraestructura de redes. Construí herramientas internas
            para un proveedor de internet: desde plataformas de gestión hasta
            automatizaciones y un chatbot con IA. Estudio Sistemas de la
            Información en la UNLu y desarrollo proyectos web a través de mi
            estudio, Blyx Nova Studio.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <li
              key={card.title}
              className="group flex flex-col rounded-xl border border-fg/10 bg-surface p-5 transition-colors duration-300 hover:border-accent/40 sm:p-6"
            >
              <div className="flex items-center gap-3 text-accent">
                <card.icon />
                <p className="font-mono text-[11px] tracking-[0.12em]">
                  {'// '}
                  {card.eyebrow}
                </p>
              </div>
              <h3 className="mt-4 font-sans text-xl font-bold text-fg sm:text-2xl" style={{ lineHeight: 1.15 }}>
                {card.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-fg-2 sm:text-[15px]">
                {card.text}
              </p>
              {card.link && (
                <a
                  href={card.link.href}
                  className="group/link mt-5 inline-flex w-fit items-center gap-1.5 rounded-sm font-mono text-sm text-accent transition-opacity hover:opacity-75"
                >
                  {card.link.label}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
