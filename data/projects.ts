import type { MetricKey } from './metrics';

/**
 * Proyectos del portfolio. Cada URL vive solo acá (si renombrás un repo,
 * cambiala en un único lugar).
 *
 * Imagen: se usa /public/projects/<slug>.png si existe; si no, un fallback.
 * Las capturas NO deben mostrar URLs internas, credenciales ni datos de
 * clientes: anonimizá antes de subirlas.
 *
 * Datos que faltan: marcados con TODO. Un campo en null no se muestra.
 */

export type ProjectLink = {
  href: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Período o año. null = desconocido (no se muestra). */
  year: string | null;
  /** Tipo / contexto: "Producto interno", "Proyecto propio", empresa… */
  kind: string;
  description: string;
  /** Rol propio, si aporta (se muestra en "Detalles"). */
  role?: string;
  stack: string[];
  /** Clave en data/metrics.ts. */
  metrics?: MetricKey;
  /** Link externo a repo o demo; solo se muestra el botón si existe. */
  link?: ProjectLink;
  /** Ruta de imagen en /public (tiene prioridad sobre /projects/<slug>.png). */
  image?: string;
  /** Texto alternativo de la imagen; por defecto "Captura de <título>". */
  imageAlt?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: 'atlas',
    title: 'Atlas',
    year: '2025 — 2026',
    kind: 'Producto interno · Empresa ISP',
    description:
      'Plataforma de gestión de operaciones de campo que desarrollé: panel de supervisión, app móvil offline-first para técnicos y backend propio.',
    role: 'Diseñé y desarrollé la arquitectura, el panel, la app móvil y el backend.',
    // SQLite figura en el CV (almacenamiento local de la app offline-first).
    stack: ['React', 'TypeScript', 'Vite', 'React Native / Expo', 'SQLite', 'PHP', 'PostgreSQL'],
    metrics: 'atlas',
    link: { href: 'https://github.com/WillSinatra/Field-Dispatch-demo', label: 'Demo técnico en GitHub' },
    image: '/projects/panel-demo.png',
    imageAlt: 'Panel de supervisión de órdenes y cuadrillas (datos de ejemplo)',
    featured: true,
  },
  {
    slug: 'chatbot',
    title: 'Chatbot de soporte con IA',
    year: null, // TODO: confirmar año (no figura en el CV).
    kind: 'Empresa ISP',
    description:
      'Desarrollé un chatbot de soporte basado en Llama 3.1 8B con fine-tuning LoRA/QLoRA, self-hosted con Ollama en GPU AMD (ROCm). Derivaba a un agente humano cuando hacía falta y se integraba con Atlas para crear tickets.',
    stack: ['Llama 3.1', 'LoRA / QLoRA', 'Ollama', 'Node.js', 'PHP', 'PostgreSQL'],
    metrics: 'chatbot',
    image: '/projects/chatbot-demo.png',
    imageAlt: 'Panel de conversación del chatbot con derivación a operador (datos de ejemplo)',
    featured: true,
  },
  {
    slug: 'alertas-de-red',
    title: 'Alertas de Red',
    year: '2025', // TODO: confirmar año.
    kind: 'Empresa ISP',
    description:
      'Desarrollé un sistema de monitoreo de incidentes para el NOC que agrupaba alertas por topología para reducir la saturación y avisaba al equipo por Telegram.',
    stack: ['Node.js', 'Telegram Bot API', 'SmartOLT', 'Jest'],
    metrics: 'alertas',
    image: '/eventos-masivos-demo.png',
    imageAlt: 'Panel de eventos masivos de red (datos de ejemplo)',
    featured: true,
  },
  {
    slug: 'automatizacion-de-correos',
    title: 'Automatización de correos',
    year: '2026',
    kind: 'Empresa ISP',
    description:
      'Desarrollé una herramienta para gestionar y clasificar el correo institucional de varias cuentas, que resolvía lo que el webmail no hacía: filtrar y ordenar los mensajes por área, para no revisar todo a mano ni perder correos entre spam y newsletters.',
    role: 'Diseñé y desarrollé la herramienta completa: backend, interfaz y clasificación.',
    stack: ['Node.js', 'Express', 'React', 'Vite', 'PostgreSQL', 'IMAP'],
    metrics: 'correos',
    image: '/projects/correos-demo.png',
    imageAlt: 'Panel de clasificación de correo por área y tipo de asunto (datos de ejemplo)',
    featured: true,
  },
  {
    slug: 'knowmatch',
    title: 'KnowMatch',
    year: '2025',
    kind: 'Proyecto propio',
    description:
      'Plataforma de intercambio de habilidades con libro mayor de créditos de tiempo, nacida en un hackathon de 48 horas y en desarrollo activo.',
    stack: ['React', 'FastAPI', 'PostgreSQL'],
    // TODO: URL de "Ver proyecto". El link anterior apuntaba a "#"; agregar:
    // link: { href: 'https://…', label: 'Ver proyecto' },
    image: '/projects/knowmatch-pagina.png',
    imageAlt: 'Página de inicio de KnowMatch, plataforma de intercambio de habilidades',
    featured: false,
  },
  {
    slug: 'excel-csv-automator',
    title: 'Excel & CSV Automator',
    year: null, // TODO: confirmar año.
    kind: 'Proyecto propio',
    description:
      'Toolkit en Python para limpiar, combinar, convertir y generar reportes de archivos Excel y CSV.',
    stack: ['Python', 'pandas', 'openpyxl'],
    link: { href: 'https://github.com/WillSinatra/excel-csv-automator', label: 'Repo' },
    image: '/projects/excel-csv-automator-demo.png',
    imageAlt: 'Ilustración del flujo de limpieza y reporte de archivos Excel y CSV (datos de ejemplo)',
    featured: false,
  },
  {
    slug: 'web-automation-toolkit',
    title: 'Web Automation Toolkit',
    year: null, // TODO: confirmar año.
    kind: 'Proyecto propio',
    description:
      'Automatización web con Python y Playwright: ejecución por lotes desde CSV y reporte de resultados.',
    // TODO: el CV v6 lo lista como "Selenium Web Automation Demo"; unificar
    // nombre y herramienta (Playwright vs Selenium) entre CV y portfolio.
    stack: ['Python', 'Playwright'],
    // TODO: actualizar cuando se renombre el repo (única ocurrencia de esta URL).
    link: { href: 'https://github.com/WillSinatra/selenium-web-automation-demo', label: 'Repo' },
    image: '/projects/web-automation-toolkit-demo.png',
    imageAlt: 'Ilustración de una ejecución por lotes con reporte de resultados (datos de ejemplo)',
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
