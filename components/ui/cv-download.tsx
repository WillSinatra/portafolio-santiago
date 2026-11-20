import fs from 'node:fs';
import path from 'node:path';
import { cvFiles, cvUpdated, type CvFile } from '@/data/site';

/** Tamaño legible del archivo en /public, o null si no existe (no se muestra nada). */
function fileSize(href: string): string | null {
  try {
    const { size } = fs.statSync(path.join(process.cwd(), 'public', href));
    return size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`
      : `${Math.round(size / 1024)} KB`;
  } catch {
    return null;
  }
}

const fileName = (file: CvFile) => file.href.split('/').pop();

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

/**
 * - header: botón compacto (CV con diseño).
 * - button: botón principal con tamaño, para ir junto a otros CTA.
 * - note:   fecha de actualización + link a la versión ATS.
 * - block:  button + note juntos (sección de contacto).
 */
type Variant = 'header' | 'button' | 'note' | 'block';

export default function CvDownload({ variant }: { variant: Variant }) {
  const { design, ats } = cvFiles;
  const designSize = fileSize(design.href);
  const atsSize = fileSize(ats.href);
  if (!designSize) return null;

  if (variant === 'header') {
    return (
      <a
        href={design.href}
        download={fileName(design)}
        aria-label={`${design.label} (${design.hint}, ${designSize}, actualizado: ${cvUpdated})`}
        title={`${design.hint} · ${designSize} · Actualizado: ${cvUpdated}`}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-fg/15 bg-bg/80 px-3 font-mono text-xs text-fg-2 backdrop-blur transition-colors duration-200 hover:border-accent hover:text-fg"
      >
        <DownloadIcon />
        <span className="hidden sm:inline">Descargar CV</span>
        <span className="sm:hidden">CV</span>
        <span className="hidden text-fg-3 md:inline">· {designSize}</span>
      </a>
    );
  }

  const button = (
    <a
      href={design.href}
      download={fileName(design)}
      aria-label={`${design.label} (${design.hint}, ${designSize})`}
      className="inline-flex items-center gap-2 rounded-md border border-fg/20 px-5 py-2.5 font-mono text-sm text-fg transition-colors duration-200 hover:border-accent"
    >
      <DownloadIcon />
      {design.label}
      <span className="text-fg-3">· PDF {designSize}</span>
    </a>
  );

  const note = (
    <p className="font-mono text-[11px] tracking-[0.08em] text-fg-3">
      Actualizado: {cvUpdated}
      {atsSize && (
        <>
          <span aria-hidden="true"> · </span>
          <a
            href={ats.href}
            download={fileName(ats)}
            aria-label={`${ats.label} del CV (${ats.hint}, ${atsSize})`}
            className="rounded-sm text-fg-2 underline decoration-fg/30 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            {ats.label} ({ats.hint.replace('PDF ', '')}, {atsSize})
          </a>
        </>
      )}
    </p>
  );

  if (variant === 'button') return button;
  if (variant === 'note') return note;

  return (
    <div className="mt-10 flex flex-col items-start gap-3">
      {button}
      {note}
    </div>
  );
}
