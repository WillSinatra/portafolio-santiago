/**
 * Métricas de proyectos. Para actualizarlas: cambiá los valores y el `asOf`
 * del grupo (fecha ISO del corte). Fuente: CV v6 (noviembre 2026).
 *
 * `chip` es el texto corto de la tarjeta (opcional; se muestran hasta 3);
 * `detail` es la versión completa que aparece en "Detalles".
 */

export type Metric = {
  chip?: string;
  detail: string;
};

export type MetricGroup = {
  /** Fecha de corte de los datos, formato ISO (AAAA-MM-DD). Sin fecha, no se muestra la leyenda. */
  asOf?: string;
  items: Metric[];
};

const metricsData = {
  atlas: {
    asOf: '2026-11-18',
    items: [
      {
        detail: 'Resolvía la gestión de órdenes de trabajo y cuadrillas.',
      },
      {
        chip: '5 meses en producción',
        detail: 'Atlas y la app de técnicos estuvieron 5 meses en producción con uso diario.',
      },
      {
        chip: '~17 OT y ~11 tickets/día',
        detail:
          'Gestionaba ~17 OT y ~11 tickets por día: 521 órdenes de trabajo y 318 tickets entre el 20/10 y el 18/11.',
      },
      {
        chip: '8 tomos de especificación',
        detail: 'Quedó documentado en 8 tomos de especificación.',
      },
      {
        chip: '564 órdenes migradas',
        detail:
          'Migración a servidores propios (Debian, Apache, SSL): 564 órdenes migradas y 14 tablas verificadas entre servidores.',
      },
      {
        detail:
          'Decisiones técnicas: asignación atómica de órdenes para evitar la doble reserva, permisos por sección y polling en lugar de WebSocket.',
      },
    ],
  },
  chatbot: {
    asOf: '2026-11-18',
    items: [
      {
        chip: '~109 conversaciones/día',
        detail: 'Atendía ~109 conversaciones por día.',
      },
      {
        chip: '33,4% sin operador',
        detail:
          'Resolvió el 33,4% de forma autónoma (1.095 de 3.276 conversaciones en sus últimos 30 días de registro), sin intervención de un operador.',
      },
    ],
  },
  alertas: {
    asOf: '2026-11-18',
    items: [
      {
        chip: '38 tests',
        detail: 'Cubierto por 38 tests en Jest.',
      },
    ],
  },
  correos: {
    items: [
      {
        detail: 'Descarga de correos por IMAP desde varias cuentas, con interfaz multicuenta.',
      },
      {
        detail:
          'Clasificación por área (ventas, administración, soporte técnico) y por tipo de asunto (pago, baja, reclamo, falla).',
      },
      {
        detail: 'Clasificación asistida por IA como segunda etapa.',
      },
      {
        detail: 'Migrada a un servidor propio y ejecutada como servicio.',
      },
    ],
  },
} satisfies Record<string, MetricGroup>;

export type MetricKey = keyof typeof metricsData;

export const metrics: Record<MetricKey, MetricGroup> = metricsData;
