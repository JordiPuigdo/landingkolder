import Image from "next/image";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white/70">
      <div className="container-narrow py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1 space-y-4">
          <Image
            src="/logo.png"
            alt="Kölder Climatització Eficient"
            width={80}
            height={28}
            className="h-7 w-auto"
          />
          <p className="text-sm leading-relaxed">
            Refrigeración y climatización eficiente para industria y comercio. Especialistas en refrigerantes naturales.
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="LinkedIn de Kölder"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Instagram de Kölder"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Servicios */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Servicios</h3>
          <ul className="space-y-2 text-sm" role="list">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a href="#servicios" className="hover:text-white transition-colors">
                  {s.title} {s.subtitle}
                </a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="hover:text-white transition-colors">
                Mantenimiento Preventivo
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-white transition-colors">
                Consultoría F-Gas
              </a>
            </li>
          </ul>
        </div>

        {/* Empresa */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Empresa</h3>
          <ul className="space-y-2 text-sm" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h3>
          <ul className="space-y-3 text-sm" role="list">
            <li className="flex items-start gap-2">
              <MailIcon className="w-4 h-4 mt-0.5 shrink-0 text-[#00C2D4]" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <PhoneIcon className="w-4 h-4 mt-0.5 shrink-0 text-[#00C2D4]" />
              <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-[#00C2D4]" />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-narrow py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.</p>
          <a href={COMPANY.privacyUrl} className="hover:text-white/70 transition-colors">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 6-8 6-8-6" />
      <path d="m20 18-8-6-8 6" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
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

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
