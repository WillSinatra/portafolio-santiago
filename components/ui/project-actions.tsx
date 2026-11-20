'use client';

import { useId, useState, type ReactNode } from 'react';
import type { ProjectLink } from '@/data/projects';

type Props = {
  link?: ProjectLink;
  /** Contenido del panel "Detalles"; si no hay, no se muestra el botón. */
  details?: ReactNode;
};

/** Botones de la tarjeta: "Detalles" (desplegable) y Repo/Demo (externo). */
export default function ProjectActions({ link, details }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (!link && !details) return null;

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {details && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-fg-2 transition-colors hover:text-fg"
          >
            Detalles
            <span
              aria-hidden="true"
              className={`inline-block transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
            >
              ›
            </span>
          </button>
        )}

        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-accent transition-opacity hover:opacity-75"
          >
            {link.label}
            <span className="sr-only"> (abre en una pestaña nueva)</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        )}
      </div>

      {details && (
        <div id={panelId} hidden={!open} className="mt-4 border-t border-fg/10 pt-4">
          {details}
        </div>
      )}
    </div>
  );
}
