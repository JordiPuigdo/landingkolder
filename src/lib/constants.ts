import type { Service, Differentiator, ProcessStep, Testimonial, NavLink } from "@/types";

/* ─── Navigation ────────────────────────────────────────────────────────── */

export const NAV_LINKS: NavLink[] = [
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Servicios", href: "#servicios" },
];

/* ─── Services ──────────────────────────────────────────────────────────── */

export const SERVICES: Service[] = [
  {
    id: "refrigeracion",
    title: "Refrigeración",
    subtitle: "Industrial y Comercial",
    description:
      "Instalación y mantenimiento de sistemas frigoríficos profesionales. Especializados en refrigerantes naturales (NH₃, CO₂, HC) que reducen hasta un 80% el impacto ambiental respecto a los gases fluorados.",
    features: [
      "Cámaras frigoríficas y congeladoras",
      "Expositores y vitrinas comerciales",
      "Túneles de congelación rápida",
      "Sistemas de refrigeración industrial",
      "Refrigerantes naturales y baja carga",
      "Mantenimiento preventivo y correctivo",
    ],
    icon: "snowflake",
    href: "#contacto",
  },
  {
    id: "climatizacion",
    title: "Climatización",
    subtitle: "de Espacios",
    description:
      "Sistemas de climatización eficientes para todo tipo de espacios comerciales e industriales. Baja carga de refrigerante y máxima eficiencia energética para reducir los costes operativos.",
    features: [
      "Clima para oficinas y comercios",
      "Sistemas VRF/VRV multi-split",
      "Climatización industrial",
      "Recuperación de calor",
      "Control inteligente de temperatura",
      "Certificación energética A+",
    ],
    icon: "wind",
    href: "#contacto",
  },
];

/* ─── Differentiators ───────────────────────────────────────────────────── */

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: "natural",
    title: "Refrigerantes Naturales",
    description:
      "Trabajamos exclusivamente con NH₃, CO₂ e hidrocarburos. Zero GWP, cumplimiento total del Reglamento F-Gas y futuro a prueba de normativas.",
    icon: "leaf",
  },
  {
    id: "eficiencia",
    title: "Eficiencia Energética",
    description:
      "Nuestros sistemas reducen el consumo eléctrico entre un 20-40% comparado con instalaciones convencionales. ROI en menos de 3 años.",
    icon: "zap",
  },
  {
    id: "experiencia",
    title: "Experiencia Técnica",
    description:
      "Equipo de técnicos certificados con años de experiencia en instalaciones complejas. Formación continua y actualización tecnológica constante.",
    icon: "award",
  },
  {
    id: "servicio",
    title: "Servicio Integral",
    description:
      "De estudio y diseño a puesta en marcha y mantenimiento. Un solo punto de contacto para toda la vida útil de la instalación.",
    icon: "shield",
  },
  {
    id: "local",
    title: "Proximidad Local",
    description:
      "Empresa catalana con profundo conocimiento del mercado local y respuesta rápida. Soporte técnico en 24h para clientes con contrato de mantenimiento.",
    icon: "map-pin",
  },
  {
    id: "normativa",
    title: "Cumplimiento Normativo",
    description:
      "Proyectos ejecutados cumpliendo toda la normativa vigente: Reglamento de Seguridad para Plantas e Instalaciones Frigoríficas (RSIF) y F-Gas 2024.",
    icon: "check-circle",
  },
];

/* ─── Process steps ─────────────────────────────────────────────────────── */

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Estudio y Presupuesto",
    description:
      "Visita técnica gratuita para analizar tus necesidades. Recibirás un presupuesto detallado y sin compromiso en 48h.",
  },
  {
    step: 2,
    title: "Diseño e Instalación",
    description:
      "Nuestro equipo técnico diseña la solución óptima y ejecuta la instalación minimizando la interrupción de tu negocio.",
  },
  {
    step: 3,
    title: "Mantenimiento y Soporte",
    description:
      "Contratos de mantenimiento preventivo y asistencia técnica 24/7 para garantizar el máximo rendimiento y vida útil.",
  },
];

/* ─── Testimonials ──────────────────────────────────────────────────────── */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Kölder diseñó e instaló todo el sistema frigorífico de nuestra nueva planta. Profesionales, puntuales y muy buena relación calidad-precio. El sistema funciona perfectamente desde el primer día.",
    author: "Marc Puigdomènech",
    role: "Director de Producción",
    company: "Cárnicas Montserrat",
  },
  {
    id: "t2",
    quote:
      "Gracias a la climatización eficiente que nos instalaron, hemos reducido la factura eléctrica un 32%. El sistema de control inteligente es increíble. 100% recomendables.",
    author: "Anna Ferrer",
    role: "Responsable de Mantenimiento",
    company: "Centro Comercial L'Illa",
  },
  {
    id: "t3",
    quote:
      "Lo más importante para nosotros era cumplir la normativa F-Gas. Kölder nos asesoró perfectamente y ahora tenemos una instalación completamente sostenible y eficiente.",
    author: "Jordi Massana",
    role: "CEO",
    company: "Logística Freda Catalana",
  },
];

/* ─── Stats / Social proof ──────────────────────────────────────────────── */

export const STATS = [
  { value: "200+", label: "Instalaciones realizadas" },
  { value: "20+", label: "Años de experiencia" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "24h", label: "Respuesta técnica garantizada" },
];

/* ─── Trust badges ──────────────────────────────────────────────────────── */

export const TRUST_BADGES = [
  "Certificación F-Gas",
  "RSIF Homologado",
  "ISO 9001",
  "Empresa Instaladora Autorizada",
  "Eficiencia Energética A+",
];

/* ─── Contact / Company info ────────────────────────────────────────────── */

export const COMPANY = {
  name: "Kölder Climatización Eficiente",
  shortName: "Kölder",
  email: "info@kolder.cat",
  phone: "+34 93 000 00 00",
  address: "Cataluña, España",
  linkedin: "https://www.linkedin.com/company/kolder",
  instagram: "https://www.instagram.com/kolder.cat",
  privacyUrl: "/politica-de-privacidad",
};

export const SERVICE_OPTIONS = [
  { value: "", label: "Selecciona un servicio..." },
  { value: "refrigeracion-industrial", label: "Refrigeración Industrial" },
  { value: "refrigeracion-comercial", label: "Refrigeración Comercial" },
  { value: "climatizacion", label: "Climatización de Espacios" },
  { value: "mantenimiento", label: "Contrato de Mantenimiento" },
  { value: "consultoria", label: "Consultoría / Normativa F-Gas" },
  { value: "otros", label: "Otros" },
];
