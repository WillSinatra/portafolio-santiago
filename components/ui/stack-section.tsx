import PrinciplesGrid from '@/components/ui/principles-grid';

type StackGroup = {
  label: string;
  items: string[];
};

const stackGroups: StackGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'React Native / Expo', 'Tailwind'],
  },
  {
    label: 'Backend y datos',
    items: ['PHP', 'Node.js', 'FastAPI', 'PostgreSQL', 'SQLite'],
  },
  {
    label: 'IA e infraestructura',
    items: ['LoRA / QLoRA', 'Llama 3.1', 'Ollama', 'Linux Debian', 'Apache', 'Docker'],
  },
  {
    label: 'Automatización',
    items: ['Python', 'Selenium', 'Playwright', 'Pandas', 'BeautifulSoup', 'Power Automate'],
  },
];

const softSkills = [
  'Comunicación clara',
  'Trabajo en equipo',
  'Responsabilidad',
  'Resolución de problemas',
  'Pensamiento analítico',
  'Autodidacta',
  'Aprendizaje rápido',
];

/** Mismo estilo que las etiquetas de grupo del stack ("FRONTEND", etc.). */
const blockHeading = 'font-mono text-[11px] tracking-[0.14em] text-fg-3';

function StackBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-fg/10 bg-fg/5 px-3 py-1 font-mono text-[11px] tracking-wide text-fg-2 transition-colors duration-200 hover:border-fg/20 hover:text-fg">
      {label}
    </span>
  );
}

export default function StackSection() {
  return (
    <section className="relative w-full border-t border-fg/10 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        {/* Folio de sección */}
        <div className="mb-14 flex items-center gap-2 font-mono sm:mb-16">
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span className="text-[11px] tracking-[0.12em] text-fg-3">
            05 — STACK / 06
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Columna izquierda: título + criterio de trabajo */}
          <div className="lg:col-span-6">
            <h2
              className="font-sans text-fg"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              Cómo trabajo
            </h2>
            <p className="mt-6 max-w-md font-sans text-[15px] leading-relaxed text-fg-2 sm:text-base">
              Prefiero herramientas simples que no rompan bajo presión antes
              que arquitecturas ambiciosas a medio terminar. Avanzo en pasos
              chicos y verificables, con evidencia real en cada uno —build,
              curl, capturas— antes de seguir.
            </p>
            <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-fg-2 sm:text-base">
              Cuido el historial de cambios tanto como el código: cada commit
              cuenta una decisión, no un volcado de archivos.
            </p>
          </div>

          {/* Columna derecha: stack agrupado por criterio, sin iconos ni tarjetas */}
          <div className="lg:col-span-6 lg:pt-2">
            <div className="flex flex-col gap-8">
              {stackGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-fg-3">
                    {group.label.toUpperCase()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <StackBadge key={item} label={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Habilidades blandas */}
        <div className="mt-20">
          <h3 className={blockHeading}>HABILIDADES BLANDAS</h3>
          <p className="mt-3 max-w-md font-sans text-[15px] leading-relaxed text-fg-2 sm:text-base">
            Lo que me llevo de trabajar con equipos reales.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <li key={skill}>
                <StackBadge label={skill} />
              </li>
            ))}
          </ul>
        </div>

        {/* Principios */}
        <div className="mt-20">
          <h3 className={`mb-6 ${blockHeading}`}>PRINCIPIOS</h3>
          <PrinciplesGrid />
        </div>
      </div>
    </section>
  );
}
