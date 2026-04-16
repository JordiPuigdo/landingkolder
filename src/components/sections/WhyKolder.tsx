import { Badge } from "@/components/ui/Badge";
import { DIFFERENTIATORS } from "@/lib/constants";

const ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  leaf: LeafIcon,
  zap: ZapIcon,
  award: AwardIcon,
  shield: ShieldIcon,
  "map-pin": MapPinIcon,
  "check-circle": CheckCircleIcon,
};

export function WhyKolder() {
  return (
    <section
      id="por-que-kolder"
      className="section-padding gradient-dark"
      aria-labelledby="why-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="ice" className="mb-4">Por Qué Kölder</Badge>
          <h2
            id="why-heading"
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            El Partner que tu
            <br />
            <span className="text-gradient">Empresa Necesita</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            No somos un instalador más. Somos el partner tecnológico que optimiza tu infraestructura
            frigorífica para reducir costes y garantizar el cumplimiento normativo.
          </p>
        </div>

        {/* Differentiator grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((diff) => {
            const IconComponent = ICONS[diff.icon] ?? CheckCircleIcon;
            return (
              <div
                key={diff.id}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00C2D4]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-ice flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{diff.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{diff.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 p-8 rounded-2xl bg-white/5 border border-[#00C2D4]/20 text-center">
          <p className="text-white/80 text-lg mb-4">
            ¿Listo para reducir hasta un <strong className="text-[#00C2D4]">40% el consumo energético</strong> de
            tu instalación?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#00C2D4] text-[#0D1B2A] font-semibold text-base hover:bg-[#00A8B8] transition-colors"
          >
            Hablemos
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function AwardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
