import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  return (
    <section
      id="proceso"
      className="section-padding bg-white"
      aria-labelledby="process-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="default" className="mb-4">Cómo Trabajamos</Badge>
          <h2
            id="process-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight mb-4"
          >
            De la Idea a la
            <br />
            <span className="text-gradient">Puesta en Marcha</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
            Un proceso claro, transparente y sin sorpresas. Te acompañamos en cada fase para garantizar
            el mejor resultado para tu negocio.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-14 left-1/2 -translate-x-1/2 w-[calc(66.666%-4rem)] h-0.5"
            style={{ background: "linear-gradient(90deg, #00C2D4, #1E6FB0, #00C2D4)" }}
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                {/* Step bubble */}
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full gradient-dark border-4 border-[#00C2D4] flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-extrabold text-[#00C2D4]">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">{step.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Button href="#contacto" variant="primary" size="lg">
            Empieza ahora — Presupuesto en 48 h
            <ClockIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
