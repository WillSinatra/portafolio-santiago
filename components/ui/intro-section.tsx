export default function IntroSection() {
  return (
    <section className="relative w-full border-t border-fg/10 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        {/* Folio: continúa la numeración real del recorrido */}
        <div className="mb-10 flex items-center gap-2 font-mono">
          <span
            className="h-[5px] w-[5px] rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span className="text-[11px] tracking-[0.12em] text-fg-3">
            02 — INTRO / 06
          </span>
        </div>

        {/* Frase corta y directa, integrada como puente entre Hero y Proyectos */}
        <p
          className="max-w-3xl font-sans text-fg/85"
          style={{
            fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          Desarrollo soluciones tecnológicas con un propósito claro:
          transformar la forma en que trabajamos mediante herramientas{' '}
          <span
            className="border-b-2 pb-[2px]"
            style={{ borderColor: 'var(--accent)' }}
          >
            simples, robustas y listas para evolucionar
          </span>
          .
        </p>
      </div>
    </section>
  );
}
