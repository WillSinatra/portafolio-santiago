'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

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
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** lucide-static@1.77.0 · users */
const UsersIcon = () => (
  <Icon>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <circle cx="9" cy="7" r="4" />
  </Icon>
);

/** lucide-static@1.77.0 · message-circle */
const MessageCircleIcon = () => (
  <Icon>
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </Icon>
);

/** lucide-static@1.77.0 · trending-up */
const TrendingUpIcon = () => (
  <Icon>
    <path d="M16 7h6v6" />
    <path d="m22 7-8.5 8.5-5-5L2 17" />
  </Icon>
);

/** lucide-static@1.77.0 · calendar-check */
const CalendarCheckIcon = () => (
  <Icon>
    <path d="M8 2v3" />
    <path d="M16 2v3" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="m9 15 2 2 4-4" />
  </Icon>
);

type Principle = {
  icon: () => ReactNode;
  title: string;
  text: string;
};

const principles: Principle[] = [
  {
    icon: UsersIcon,
    title: 'Trabajo en equipo',
    text: 'Coordino equipos multidisciplinarios y promuevo la colaboración y el intercambio de conocimientos.',
  },
  {
    icon: MessageCircleIcon,
    title: 'Comunicación',
    text: 'Transmito información técnica con claridad y documento avances para facilitar el seguimiento.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Mejora continua',
    text: 'Evalúo resultados, incorporo feedback y optimizo procesos de forma constante.',
  },
  {
    icon: CalendarCheckIcon,
    title: 'Organización',
    text: 'Priorizo tareas según su impacto, planifico actividades y mantengo un seguimiento ordenado.',
  },
];

/* Colores derivados solo de los tokens del sitio (--accent, --fg, --surface). */
const accentMix = (pct: number) => `color-mix(in srgb, var(--accent) ${pct}%, transparent)`;
const faceBackground = `linear-gradient(160deg, color-mix(in srgb, var(--fg) 4%, var(--surface)) 0%, var(--surface) 60%)`;
const FLIP_EASE = 'cubic-bezier(.2,.8,.2,1)';

/** Capa de luz que sigue al puntero (solo con hover real: las variantes hover de Tailwind v4 ya van en @media (hover:hover)). */
function PointerLight({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        // La cara trasera está girada 180°: se espeja la X para que la luz siga al puntero.
        background: `radial-gradient(220px circle at ${mirrored ? 'calc(100% - var(--x, 50%))' : 'var(--x, 50%)'} var(--y, 50%), ${accentMix(12)}, transparent 70%)`,
      }}
    />
  );
}

type CardProps = {
  principle: Principle;
  index: number;
  open: boolean;
  revealed: boolean;
  onToggle: () => void;
};

function PrincipleCard({ principle, index, open, revealed, onToggle }: CardProps) {
  const backId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const PrincipleIcon = principle.icon;

  const onPointerMove = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  const faceBase =
    'absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border px-5 py-6 text-center [backface-visibility:hidden] motion-reduce:transition-opacity motion-reduce:duration-200!';
  // `!`: la regla global de reduced-motion (globals.css) fuerza 0.01ms; el crossfade de 200ms es intencional.

  return (
    <li
      className={`transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
        revealed ? 'translate-y-0 opacity-100' : 'motion-safe:translate-y-4 opacity-0 motion-reduce:opacity-100'
      }`}
      style={{ transitionDelay: revealed ? `${index * 80}ms` : '0ms' }}
    >
      <div
        ref={cardRef}
        onPointerMove={onPointerMove}
        className="group relative h-[300px] rounded-2xl outline-offset-[3px] transition-transform duration-300 ease-out [perspective:1000px] hover:-translate-y-1 has-[button:focus-visible]:-translate-y-1 has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:has-[button:focus-visible]:translate-y-0"
      >
        {/* Volteador: gira 0 → 180° al abrir (crossfade con prefers-reduced-motion). */}
        <div
          className={`relative h-full w-full [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-[600ms] ${
            open ? 'motion-safe:[transform:rotateY(180deg)]' : ''
          }`}
          style={{ transitionTimingFunction: FLIP_EASE }}
        >
          {/* Cara frontal */}
          <div
            aria-hidden={open}
            inert={open}
            className={`${faceBase} border-fg/[0.08] transition-[border-color,box-shadow] duration-300 group-hover:border-accent/40 group-has-[button:focus-visible]:border-accent/40 group-hover:[box-shadow:var(--glow)] group-has-[button:focus-visible]:[box-shadow:var(--glow)] ${
              open ? 'motion-reduce:opacity-0' : ''
            }`}
            style={{ background: faceBackground, '--glow': `0 14px 40px -14px ${accentMix(45)}` } as CSSProperties}
          >
            <PointerLight />
            <span
              className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-[1.08] group-has-[button:focus-visible]:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            >
              <PrincipleIcon />
            </span>
            <h4 className="relative mt-5 font-sans text-lg font-semibold text-fg sm:text-xl" style={{ lineHeight: 1.2 }}>
              {principle.title}
            </h4>
            <span aria-hidden="true" className="relative mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-accent">
              <span className="inline-block transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none">+</span>
              [ VER MÁS ]
            </span>
          </div>

          {/* Cara trasera */}
          <div
            id={backId}
            aria-hidden={!open}
            inert={!open}
            className={`${faceBase} border-accent/50 motion-safe:[transform:rotateY(180deg)] ${open ? '' : 'motion-reduce:opacity-0'}`}
            style={{ background: faceBackground, boxShadow: `0 18px 48px -14px ${accentMix(55)}` }}
          >
            <PointerLight mirrored />
            <p className="relative font-mono text-[11px] tracking-[0.14em] text-accent">{'// PRINCIPIO CLAVE'}</p>
            <h4 className="relative mt-3 font-sans text-lg font-semibold text-fg sm:text-xl" style={{ lineHeight: 1.2 }}>
              {principle.title}
            </h4>
            <span
              aria-hidden="true"
              className={`relative mt-4 block h-px w-12 origin-center bg-accent transition-transform duration-500 motion-reduce:transition-none ${
                open ? 'scale-x-100 delay-[250ms]' : 'scale-x-0 delay-0'
              } motion-reduce:scale-x-100`}
            />
            <p
              className={`relative mt-4 font-sans text-sm leading-relaxed text-fg-2 transition-[opacity,translate] duration-500 motion-reduce:translate-y-0 motion-reduce:duration-200 ${
                open ? 'translate-y-0 opacity-100 delay-300 motion-reduce:delay-0' : 'translate-y-2 opacity-0 delay-0'
              }`}
            >
              {principle.text}
            </p>
          </div>
        </div>

        {/* Un único botón cubre la tarjeta: siempre accesible, sea cual sea la cara visible. */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={backId}
          onClick={onToggle}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl"
          // El foco global (:focus-visible en globals.css) se dibuja en la tarjeta, no en el botón.
          style={{ outline: 'none' }}
        >
          <span className="sr-only">{principle.title}</span>
        </button>
      </div>
    </li>
  );
}

export default function PrinciplesGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Entrada escalonada al hacer scroll (una sola vez).
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Escape cierra la tarjeta abierta.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex]);

  return (
    <>
      {/* Detalle de acento bajo el eyebrow "PRINCIPIOS" */}
      <span aria-hidden="true" className="-mt-3 mb-8 block h-px w-10 bg-accent" />

      <ul ref={listRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <PrincipleCard
            key={p.title}
            principle={p}
            index={i}
            open={openIndex === i}
            revealed={revealed}
            onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
          />
        ))}
      </ul>
    </>
  );
}
