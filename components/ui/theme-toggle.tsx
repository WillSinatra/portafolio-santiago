'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

function readStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animate && !reduceMotion) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
  }
  root.setAttribute('data-theme', theme);
}

// El atributo data-theme de <html> es la fuente de verdad; React se suscribe a él.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Si el usuario nunca eligió, seguimos los cambios del sistema en vivo.
  const media = window.matchMedia('(prefers-color-scheme: light)');
  const onSystemChange = () => {
    if (!readStoredTheme()) applyTheme(systemTheme(), true);
  };
  media.addEventListener('change', onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener('change', onSystemChange);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

// El servidor siempre renderiza oscuro (coincide con data-theme="dark" del layout).
const getServerSnapshot = (): Theme => 'dark';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === 'dark';

  // En desarrollo, Strict Mode remonta y React limpia el atributo que puso el
  // script inline; lo reaplicamos antes del paint. En producción no cambia nada.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme() ?? systemTheme(), false);
  }, []);

  function toggle() {
    const next: Theme = isDark ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin storage (modo privado, bloqueado): el cambio vale solo para esta visita.
    }
    applyTheme(next, true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // aria-pressed = "tema oscuro activado"; la etiqueta dice la acción.
      aria-pressed={isDark}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-fg/15 bg-bg/80 text-fg-2 backdrop-blur transition-colors duration-200 hover:border-accent hover:text-fg"
    >
      {/* Sol en tema claro, luna en tema oscuro, con cruce rotado/escalado. */}
      <span
        className={`absolute transition-all duration-300 ease-out ${
          isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      >
        <SunIcon />
      </span>
      <span
        className={`absolute transition-all duration-300 ease-out ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        }`}
      >
        <MoonIcon />
      </span>
    </button>
  );
}
