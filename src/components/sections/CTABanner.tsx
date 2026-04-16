import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export function CTABanner() {
  return (
    <section
      className="section-padding gradient-ice relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-narrow relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6">
          <ClockIcon className="w-3.5 h-3.5" />
          Respuesta garantizada en 48 h
        </div>

        <h2
          id="cta-heading"
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight"
        >
          Reduce Costes y Cumple
          <br />
          la Normativa F-Gas
        </h2>

        <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Habla con nuestros técnicos hoy. Analizamos tu instalación actual y te proponemos
          la solución más eficiente y económica para tu negocio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#contacto" variant="primary" size="lg" className="bg-[#0D1B2A] hover:bg-[#1B3A5C] border-0">
            <MessageIcon className="w-5 h-5" />
            Solicita Visita Técnica Gratuita
          </Button>
          <a
            href={`tel:${COMPANY.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold text-lg transition-all duration-200"
          >
            <PhoneIcon className="w-5 h-5" />
            {COMPANY.phone}
          </a>
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

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l1.27-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
