import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import ProjectActions from '@/components/ui/project-actions';
import { metrics, type Metric } from '@/data/metrics';
import { featuredProjects, moreProjects, type Project } from '@/data/projects';

const MAX_METRIC_CHIPS = 3;

/** Se resuelve al renderizar en el servidor (en build, para la página estática). */
function projectImage(slug: string): string | null {
  const file = path.join(process.cwd(), 'public', 'projects', `${slug}.png`);
  return fs.existsSync(file) ? `/projects/${slug}.png` : null;
}

function formatAsOf(iso: string) {
  // Fecha fija (sin hora) en UTC: el mismo texto en servidor y cliente.
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-fg/10 bg-fg/5 px-3 py-1 font-mono text-[11px] tracking-wide text-fg-2 transition-colors duration-200 group-hover:border-fg/20 group-hover:text-fg">
      {label}
    </span>
  );
}

function MetricBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[11px] tracking-wide text-fg">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
      {label}
    </span>
  );
}

function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  const src = project.image ?? projectImage(project.slug);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-fg/10 bg-fg/5">
      {src ? (
        <Image
          src={src}
          // Decorativa respecto del texto de la tarjeta, pero describe la captura.
          alt={project.imageAlt ?? `Captura de ${project.title}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      ) : (
        // Fallback mientras no haya captura en /public/projects/<slug>.png
        <div aria-hidden="true">
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
            style={{
              backgroundImage:
                'linear-gradient(color-mix(in srgb, var(--fg) 5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--fg) 5%, transparent) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span
              className="font-sans text-fg/15"
              style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1 }}
            >
              {project.title.charAt(0)}
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-fg-3">
              {project.title.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-fg-3">
      {project.year && (
        <>
          <span>{project.year}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-fg/20" />
        </>
      )}
      <span>{project.kind}</span>
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const group = project.metrics ? metrics[project.metrics] : undefined;
  if (!project.role && !group) return null;

  return (
    <div className="space-y-3 font-sans text-sm leading-relaxed text-fg-2">
      {project.role && (
        <p>
          <span className="font-mono text-[11px] tracking-[0.12em] text-fg-3">ROL · </span>
          {project.role}
        </p>
      )}
      {group && (
        <>
          <ul className="space-y-2">
            {group.items.map((m) => (
              <li key={m.detail} className="flex gap-2">
                <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{m.detail}</span>
              </li>
            ))}
          </ul>
          {group.asOf && (
            <p className="font-mono text-[11px] tracking-[0.12em] text-fg-3">
              {`ÚLTIMO REGISTRO AL ${formatAsOf(group.asOf).toUpperCase()}`}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function CardBody({ project, featured }: { project: Project; featured: boolean }) {
  const group = project.metrics ? metrics[project.metrics] : undefined;
  const chips =
    group?.items
      .filter((m): m is Metric & { chip: string } => Boolean(m.chip))
      .slice(0, MAX_METRIC_CHIPS) ?? [];
  const hasDetails = Boolean(project.role || group);
  // Destacados cuelgan del h2; los chicos, del h3 "Más proyectos".
  const Heading = featured ? 'h3' : 'h4';

  return (
    <>
      <ProjectMeta project={project} />

      <Heading
        className={`mt-3 font-sans font-bold text-fg ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}
        style={featured ? { letterSpacing: '-0.02em', lineHeight: 1.05 } : undefined}
      >
        {project.title}
      </Heading>

      <p
        className={`mt-3 font-sans leading-relaxed text-fg-2 ${featured ? 'text-[15px] sm:text-base' : 'text-sm'}`}
      >
        {project.description}
      </p>

      {chips.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Métricas">
          {chips.map((m) => (
            <li key={m.chip}>
              <MetricBadge label={m.chip} />
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
        {project.stack.map((tech) => (
          <li key={tech}>
            <TechBadge label={tech} />
          </li>
        ))}
      </ul>

      {/* Tarjetas chicas: empuja las acciones al fondo para alinearlas entre tarjetas de la misma fila. */}
      {!featured && <div aria-hidden="true" className="grow" />}

      <ProjectActions
        link={project.link}
        details={hasDetails ? <ProjectDetails project={project} /> : undefined}
      />
    </>
  );
}

const cardBase =
  'group relative rounded-xl border border-fg/10 bg-surface p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_color-mix(in_srgb,var(--accent)_25%,transparent)] sm:p-6';

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className={`${cardBase} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 lg:p-8`}>
      <div className="lg:col-span-6">
        <ProjectMedia project={project} sizes="(min-width: 1024px) 520px, 100vw" />
      </div>
      <div className="flex flex-col justify-center lg:col-span-6">
        <CardBody project={project} featured />
      </div>
    </article>
  );
}

function SmallCard({ project }: { project: Project }) {
  return (
    <article
      className={`${cardBase} flex flex-col hover:-translate-y-1 motion-reduce:hover:translate-y-0`}
    >
      <ProjectMedia project={project} sizes="(min-width: 1024px) 340px, (min-width: 768px) 50vw, 100vw" />
      <div className="mt-5 flex grow flex-col">
        <CardBody project={project} featured={false} />
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="relative w-full border-t border-fg/10 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        {/* Folio de sección */}
        <div className="mb-14 flex items-center gap-2 font-mono sm:mb-16">
          <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="text-[11px] tracking-[0.12em] text-fg-3">
            04 — PROYECTOS / 06
          </span>
        </div>

        <div className="mb-10 max-w-2xl">
          <h2
            className="font-sans text-fg"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Proyectos destacados
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.slug} project={project} />
          ))}
        </div>

        <h3
          className="mb-8 mt-20 font-sans text-fg"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Más proyectos
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project) => (
            <SmallCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
