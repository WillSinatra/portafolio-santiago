'use client';

import { useEffect, type ReactNode } from 'react';
import { site } from '@/data/site';

type Props = {
  /** Botón de descarga del CV (Server Component, lee el tamaño del PDF). */
  cvButton?: ReactNode;
  /** Fecha de actualización + versión ATS. */
  cvNote?: ReactNode;
};

export default function AnimationPage({ cvButton, cvNote }: Props) {
  useEffect(() => {
    // Con movimiento reducido no cargamos la animación: queda el fondo liso.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    // Regla CSS global: apenas el navegador pinta el badge queda oculto,
    // sin tocar la nitidez/brillo del canvas de la animación en sí.
    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] a,
      [data-us-project] div[class*="brand"],
      a[href*="unicorn.studio"] {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    const isBottomCenterAnchored = (el: HTMLElement) => {
      const computed = window.getComputedStyle(el);
      const isAnchored = computed.position === 'fixed' || computed.position === 'absolute';
      const isAtBottom = computed.bottom === '0px';
      const isCentered =
        computed.left === '50%' || /translate/.test(computed.transform);
      return isAnchored && isAtBottom && isCentered;
    };

    const isUnicornBranding = (el: Element): el is HTMLElement => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      if (tag !== 'a' && tag !== 'div') return false;

      const cls = el.className.toLowerCase();
      const id = el.id.toLowerCase();
      const href = (el.getAttribute('href') || '').toLowerCase();
      const text = (el.textContent || '').toLowerCase();

      if (
        cls.includes('unicorn') ||
        id.includes('unicorn') ||
        href.includes('unicorn.studio') ||
        text.includes('unicorn')
      ) {
        return true;
      }

      return isBottomCenterAnchored(el);
    };

    // Elimina directamente el nodo (no solo lo oculta) apenas el script de
    // Unicorn Studio lo inyecta en el DOM.
    const removeBranding = (root: ParentNode) => {
      root.querySelectorAll('a, div').forEach((el) => {
        if (isUnicornBranding(el)) {
          el.remove();
        }
      });
    };

    removeBranding(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (isUnicornBranding(node)) {
            node.remove();
            return;
          }
          removeBranding(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg">
      {/* Animación de fondo: completa, sin atenuar, tal como en el componente
          original — el negro de fondo ya le da lugar sin necesidad de velos.
          En tema claro, --hero-filter invierte el canvas (puntos + ilustración)
          y rota el tono para conservar el verde. */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ filter: 'var(--hero-filter)' }}
        aria-hidden="true"
      >
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Degradé sutil solo detrás del bloque de texto, para legibilidad,
          sin tapar el resto de la animación. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-full lg:block lg:w-3/5"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--bg) 85%, transparent) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Parche temporal: tapa puntual del badge de Unicorn Studio mientras
          se confirma si el MutationObserver logra eliminarlo (podría estar
          en shadow DOM). "absolute" (no "fixed") para que quede anclado al
          fondo de ESTA sección y desaparezca al scrollear a las demás; el
          z-index al máximo es porque el badge lo inyecta la librería directo
          en document.body, fuera de nuestro árbol de React, y un z-index
          "normal" adentro del componente no le gana. */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-24 w-96 -translate-x-1/2 bg-black lg:block"
        // Negro + el mismo filtro que el canvas: coincide con su fondo en ambos temas.
        style={{ zIndex: 2147483647, filter: 'var(--hero-filter)' }}
        aria-hidden="true"
      />

      {/* Fondo simple en mobile, donde la animación se oculta */}
      <div className="absolute inset-0 bg-bg lg:hidden" aria-hidden="true" />

      {/* Marco: filete perimetral fino */}
      <div
        className="pointer-events-none absolute inset-4 z-20 hidden border border-fg/10 sm:inset-6 sm:block lg:inset-10"
        aria-hidden="true"
      />

      {/* Remates de esquina, finos */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block" aria-hidden="true">
        <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-fg/30 sm:left-6 sm:top-6 lg:left-10 lg:top-10" />
        <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-fg/30 sm:right-6 sm:top-6 lg:right-10 lg:top-10" />
        <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-fg/30 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-10" />
        <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-fg/30 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10" />
      </div>

      {/* Texto de lomo, vertical, solo desktop */}
      <div
        className="pointer-events-none absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 font-mono lg:block"
        style={{
          writingMode: 'vertical-rl',
          fontSize: '11px',
          letterSpacing: '0.22em',
          color: 'var(--fg-3)',
        }}
        aria-hidden="true"
      >
        PORTFOLIO — 2026
      </div>

      {/* Folio inferior: marcador de secuencia real (sección 1 de 6) */}
      <div
        className="pointer-events-none absolute bottom-6 left-4 z-20 flex items-center gap-2 font-mono sm:bottom-8 sm:left-6 lg:bottom-10 lg:left-10"
        aria-hidden="true"
      >
        <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="text-[11px] tracking-[0.12em] text-fg-3">01 — PRESENTACIÓN / 06</span>
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          {/* Nivel 3: eyebrow técnico, monoespaciado */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-fg/25" />
            <p className="font-mono text-[13px] tracking-[0.14em] text-fg-3">
              {site.headline} —{' '}
              <span className="whitespace-nowrap">{site.location}</span>
            </p>
          </div>

          {/* Nivel 1: título, sans-serif moderna, mucho más grande que el resto */}
          <h1
            className="font-sans text-fg"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(3.4rem, 9vw, 7.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            {site.name}
          </h1>

          {/* Nivel 2: la frase que explica el título */}
          <p
            className="mt-8 max-w-xl font-sans text-fg-2"
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Construyo plataformas y herramientas internas que ordenan el
            trabajo diario — desde paneles de gestión hasta apps para equipos
            de campo.
          </p>

          {/* CTA: único acento verde, ahora como botón con glow al hover */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-md border border-accent/50 px-5 py-2.5 font-mono text-sm text-fg transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_35%,transparent)] focus-visible:border-accent"
            >
              Ver proyectos
              <span
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: 'var(--accent)' }}
              >
                →
              </span>
            </a>

            {cvButton}

            <a
              href="#contacto"
              className="rounded-sm font-mono text-sm text-fg-2 transition-colors hover:text-fg"
            >
              Escribime
            </a>
          </div>

          {cvNote && <div className="mt-4">{cvNote}</div>}
        </div>
      </div>
    </section>
  );
}
