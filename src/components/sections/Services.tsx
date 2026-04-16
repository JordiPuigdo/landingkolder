import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="servicios" className="section-padding bg-[#F8FBFF]" aria-labelledby="services-heading">
      <div className="container-narrow">
        {/* Section header */}
        <div className="text-center mb-14">
          <Badge variant="certified" className="mb-4">Nuestros Servicios</Badge>
          <h2
            id="services-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight mb-4"
          >
            Soluciones Frigoríficas y de
            <br />
            <span className="text-gradient">Climatización</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
            Diseñamos, instalamos y mantenemos sistemas frigoríficos y de climatización a medida para cada
            cliente, con la máxima eficiencia energética y respeto al medio ambiente.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <Card key={service.id} hover className="flex flex-col">
              {/* Card header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-ice flex items-center justify-center shrink-0">
                  {service.icon === "snowflake" ? (
                    <SnowflakeIcon className="w-7 h-7 text-white" />
                  ) : (
                    <WindIcon className="w-7 h-7 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#00C2D4] uppercase tracking-wider mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-[#0D1B2A]">{service.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#6B7280] leading-relaxed mb-6">{service.description}</p>

              {/* Features list */}
              <ul className="space-y-2.5 mb-8 flex-1" role="list">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#0D1B2A]">
                    <CheckIcon className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button href={service.href} variant={i === 0 ? "primary" : "secondary"} className="w-full">
                Solicitar Presupuesto
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#6B7280]">
            ¿Necesitas un servicio específico?{" "}
            <a href="#contacto" className="text-[#1E6FB0] font-semibold hover:text-[#00C2D4] transition-colors">
              Contáctanos y lo valoramos juntos &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="m20 6-8 6-8-6" /><path d="m20 18-8-6-8 6" />
      <path d="m6 4-4 4 4 4" /><path d="m18 4 4 4-4 4" />
    </svg>
  );
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
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
