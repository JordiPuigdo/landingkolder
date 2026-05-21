import Image from "next/image";

const PHONE_NUMBER = "680321346";

export function AboutKolder() {

  return (
    <section
      id="sobre-nosotros"
      className="section-padding bg-white"
      aria-labelledby="about-heading"
    >
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — texto empresa */}
          <div className="space-y-6">
            <p className="text-[#00C2D4] text-sm font-semibold uppercase tracking-wider">
              Sobre nosotros
            </p>

            <h2
              id="about-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0D1B2A] leading-tight tracking-tight"
            >
              El socio que te<br />
              <span className="text-gradient">acompaña de 0 a 100</span>
            </h2>

            <div className="space-y-4 text-[#6B7280] leading-relaxed">
              <p>
                Entendemos qué necesita tu negocio porque llevamos más de 20 años
                ayudando a empresas como la tuya.
              </p>
              <p>
                En Kölder te ofrecemos mucho más que instalaciones. Te ofrecemos tranquilidad.
                Un servicio 360 con un equipo experto que te acompaña en cada fase del proyecto.
              </p>
              <p>
                Desde el asesoramiento inicial y la ingeniería propia, hasta la ejecución de
                obra nueva o reforma y un servicio técnico disponible 24/7, estamos a tu lado
                en todo momento.
              </p>
              <p className="font-semibold text-[#0D1B2A]">
                Porque Kölder no es solo una empresa frigorista,
                es el socio que te acompaña de 0 a 100.
              </p>
            </div>

            {/* CTA Teléfono */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-3 bg-[#1E6FB0] hover:bg-[#1B3A5C] text-white font-bold text-base py-4 px-7 rounded-xl transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              Habla con nosotros
            </a>
          </div>

          {/* Right — fotos empresa */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src="/photos/Fotos-Divina-Pastora-37.jpg"
                alt="Unidades de refrigeración industrial instaladas por Kölder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/photos/Fotos-Divina-Pastora-08.jpg"
                alt="Técnico de Kölder instalando una unidad de refrigeración"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/photos/Fotos-GymMontcada-20.jpg"
                alt="Sistema de climatización industrial en el Gym Montcada"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l1.27-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
