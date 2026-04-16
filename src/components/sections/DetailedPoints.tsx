const POINTS = [
  {
    number: "01",
    title: "Asesoramiento y diseño con ingeniería propia",
    description:
      "Gracias a nuestra experiencia en el sector, te asesoramos desde el primer momento para encontrar la solución más eficiente para tu empresa. Nuestro equipo de ingeniería propia analiza cada caso y desarrolla los cálculos y diseños necesarios para garantizar una instalación óptima, adaptada a tus necesidades reales.",
  },
  {
    number: "02",
    title: "Montaje de nuevas instalaciones y modernización de existentes",
    description:
      "Ofrecemos soluciones adaptadas a las necesidades de cada cliente. Nuestra experiencia es clave en todo el proceso de la obra: diseño, planificación y ejecución, así como también en su mantenimiento posterior.",
  },
  {
    number: "03",
    title: "Servicio técnico de averías 24 h, 365 días al año",
    description:
      "Tenemos una plantilla propia de técnicos formados y cualificados que siempre tiene en cuenta al cliente. Nuestros vehículos taller están equipados con todo tipo de repuestos para poder resolver el 90% de averías en el momento. Asistencia garantizada en menos de 3 horas.",
  },
  {
    number: "04",
    title: "Mantenimiento preventivo de instalaciones de refrigeración y climatización",
    description:
      "Cuidamos y nos hacemos cargo de la instalación durante todo el año. Nuestros mantenimientos preventivos están pensados para anticiparse y resolver las averías antes de que se produzcan. De esta manera reducimos un 80% el coste a nuestros clientes.",
  },
];

export function DetailedPoints() {
  return (
    <section
      id="servicios"
      className="section-padding bg-[#F8FBFF]"
      aria-labelledby="points-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#00C2D4] text-sm font-semibold uppercase tracking-wider mb-3">
            Lo que hacemos
          </p>
          <h2
            id="points-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0D1B2A] leading-tight tracking-tight mb-4"
          >
            Nuestros servicios,
            <br />
            <span className="text-gradient">tu tranquilidad</span>
          </h2>
          <p className="text-[#6B7280] leading-relaxed">
            Más de 20 años de experiencia en instalaciones frigoríficas y de climatización
            para industria y comercio en Cataluña.
          </p>
        </div>

        {/* Points grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {POINTS.map((point) => (
            <div
              key={point.number}
              className="bg-white rounded-2xl p-7 border border-[#E8F4FD] shadow-[0_4px_24px_0_rgba(13,27,42,0.06)] hover:shadow-[0_8px_40px_0_rgba(13,27,42,0.12)] hover:-translate-y-1 transition-all duration-200"
            >
              <span className="block text-4xl font-black text-[#00C2D4]/20 mb-3 leading-none">
                {point.number}
              </span>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">{point.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
