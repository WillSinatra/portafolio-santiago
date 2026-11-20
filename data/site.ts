/**
 * Datos personales y de contacto del sitio. Fuente: CV v6 (noviembre 2026).
 */

export const site = {
  name: 'Santiago Sánchez',
  headline: 'Desarrollador Full Stack Jr. e Infraestructura de Redes',
  location: 'Buenos Aires, Argentina',
  description:
    'Desarrollador Full Stack Jr. e Infraestructura de Redes en Buenos Aires, Argentina. Plataformas internas, apps de campo, IA self-hosted y automatización.',
  // TODO: URL pública del sitio, para metadataBase y og:url (aún sin dominio).
  url: null as string | null,
  email: 'santiagosanchezlema@gmail.com',
  github: 'https://github.com/WillSinatra',
  linkedin: 'https://linkedin.com/in/santiagosanchez-programming',
} as const;

export type CvFile = {
  /** Ruta dentro de /public. */
  href: string;
  label: string;
  hint: string;
};

/**
 * Archivos del CV en /public/cv/. Al reemplazarlos, actualizá `cvUpdated`;
 * el tamaño se calcula solo al compilar.
 */
export const cvUpdated = 'noviembre 2026';

export const cvFiles = {
  design: {
    href: '/cv/CV_Santiago_Sanchez.pdf',
    label: 'Descargar CV',
    hint: 'PDF con diseño',
  },
  ats: {
    href: '/cv/CV_Santiago_Sanchez_ATS.pdf',
    label: 'Versión ATS',
    hint: 'PDF de una columna',
  },
} satisfies Record<string, CvFile>;
