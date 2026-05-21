"use client";

import { Badge } from "@/components/ui/Badge";
import { COMPANY } from "@/lib/constants";
import { ContactWizard } from "@/components/ContactWizard";

export function Contact() {
  return (
    <section id="contacto" className="section-padding bg-[#F8FBFF]" aria-labelledby="contact-heading">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — info de contacto */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Badge variant="certified" className="mb-4">
                Contacto
              </Badge>
              <h2
                id="contact-heading"
                className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-4"
              >
                Cuéntanos tu caso
                <br />
                <span className="text-gradient">en menos de 1 minuto</span>
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                Sigue este cuestionario y te contactaremos con la solución adecuada.
              </p>
            </div>

            <ul className="space-y-5" role="list">
              <li>
                <ContactItem
                  icon={<PhoneIcon className="w-5 h-5 text-[#00C2D4]" />}
                  label="Teléfono"
                  value={COMPANY.phone}
                  href={`tel:${COMPANY.phone}`}
                />
              </li>
              <li>
                <ContactItem
                  icon={<MailIcon className="w-5 h-5 text-[#00C2D4]" />}
                  label="Email"
                  value={COMPANY.email}
                  href={`mailto:${COMPANY.email}`}
                />
              </li>
              <li>
                <ContactItem
                  icon={<MapPinIcon className="w-5 h-5 text-[#00C2D4]" />}
                  label="Zona de servicio"
                  value={COMPANY.address}
                />
              </li>
            </ul>

            <div className="p-5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20">
              <p className="text-sm text-[#065F46] font-medium flex items-start gap-2">
                <ShieldCheckIcon className="w-5 h-5 shrink-0 mt-0.5 text-[#10B981]" />
                Tus datos están protegidos y solo los usaremos para responderte.
              </p>
            </div>
          </div>

          {/* Right — wizard */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_24px_0_rgba(13,27,42,0.08)] border border-[#E8F4FD]">
              <ContactWizard theme="light" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#E8F4FD] flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-[#0D1B2A] font-medium hover:text-[#1E6FB0] transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-[#0D1B2A] font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l1.27-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
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

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
