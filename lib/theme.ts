export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Corre en <head> antes del primer render (ver app/layout.tsx): usa la
 * elección guardada en localStorage y, si no hay, prefers-color-scheme.
 * Vive fuera de theme-toggle.tsx porque ese archivo es 'use client' y el
 * layout (Server Component) necesita el string, no una referencia de cliente.
 */
export const themeInitScript = `(function(){try{var t=null;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
