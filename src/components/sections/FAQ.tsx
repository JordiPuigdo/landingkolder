"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "¿Qué son los refrigerantes naturales y por qué son mejores?",
    answer:
      "Los refrigerantes naturales (NH₃ amoníaco, CO₂ y hidrocarburos) tienen un potencial de calentamiento global (GWP) prácticamente nulo frente a los gases fluorados HFCs tradicionales. Además de ser mucho más respetuosos con el medio ambiente, ofrecen mayor eficiencia energética y están libres de las restricciones del Reglamento F-Gas 2024, lo que garantiza el futuro de tu instalación sin riesgo de prohibiciones ni encarecimientos de refrigerante.",
  },
  {
    question: "¿Qué es el Reglamento F-Gas y cómo me afecta?",
    answer:
      "El Reglamento (UE) 2024/573 sobre gases fluorados de efecto invernadero establece una reducción progresiva del uso de HFCs hasta 2050. Esto implica que los equipos que usan refrigerantes con alto GWP (R-404A, R-410A, R-134a…) serán cada vez más costosos de mantener y recargar. En Kölder te asesoramos para migrar a sistemas con refrigerantes naturales o de bajo GWP antes de que la normativa te obligue a hacerlo en peores condiciones económicas.",
  },
  {
    question: "¿Cuánto puedo ahorrar en la factura eléctrica con un sistema eficiente?",
    answer:
      "Nuestros sistemas de refrigeración y climatización eficiente reducen el consumo eléctrico entre un 20% y un 40% respecto a instalaciones convencionales. En función del tamaño de la instalación y las horas de funcionamiento, el retorno de la inversión (ROI) se sitúa habitualmente en menos de 3 años. Te entregamos un estudio de eficiencia con el presupuesto para que puedas valorarlo con datos reales.",
  },
  {
    question: "¿Realizáis instalaciones tanto industriales como comerciales?",
    answer:
      "Sí. Trabajamos con todo tipo de empresas en Cataluña: industria alimentaria, logística de frío, supermercados, restauración, hoteles, oficinas y centros comerciales. Tanto si necesitas una cámara frigorífica industrial como la climatización de una tienda, nuestro equipo de ingeniería diseña la solución adecuada a tu volumen y presupuesto.",
  },
  {
    question: "¿Ofrecéis mantenimiento preventivo tras la instalación?",
    answer:
      "Sí, disponemos de contratos de mantenimiento preventivo anuales que incluyen revisiones periódicas, limpieza de componentes, control de parámetros y detección precoz de averías. Nuestros clientes con contrato tienen garantizada la asistencia técnica en menos de 3 horas, los 365 días del año. El mantenimiento preventivo reduce el riesgo de averías críticas en más de un 80%.",
  },
  {
    question: "¿En cuánto tiempo recibiré el presupuesto?",
    answer:
      "Realizamos una visita técnica gratuita y sin compromiso para analizar tus necesidades. En un plazo máximo de 48 horas hábiles recibirás un presupuesto detallado con la solución propuesta, el dimensionado del sistema, la estimación de ahorro energético y las condiciones de garantía.",
  },
  {
    question: "¿Cumplís con la normativa RSIF?",
    answer:
      "Sí. Todos nuestros proyectos se ejecutan cumpliendo el Reglamento de Seguridad para Plantas e Instalaciones Frigoríficas (RSIF) y la normativa F-Gas vigente. Somos empresa instaladora autorizada y nuestros técnicos disponen de las certificaciones requeridas para el manejo de refrigerantes. Nos encargamos de toda la documentación legal y las legalizaciones ante la administración.",
  },
  {
    question: "¿En qué zonas de Cataluña trabajáis?",
    answer:
      "Operamos en toda Cataluña: Barcelona y área metropolitana, Tarragona, Girona, Lleida y sus respectivas comarcas. Para instalaciones de gran envergadura también podemos desplazarnos fuera de Cataluña. Consúltanos sin compromiso.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // JSON-LD FAQPage schema for Google rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="preguntas-frecuentes"
      className="section-padding bg-white"
      aria-labelledby="faq-heading"
    >
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#00C2D4] text-sm font-semibold uppercase tracking-wider mb-3">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0D1B2A] leading-tight tracking-tight mb-4"
          >
            Todo lo que necesitas
            <br />
            <span className="text-gradient">saber antes de empezar</span>
          </h2>
          <p className="text-[#6B7280] leading-relaxed">
            Resolvemos las dudas más habituales sobre refrigeración industrial, climatización
            eficiente y normativa F-Gas.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-[#E8F4FD]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FB0] rounded"
                >
                  <span className="text-base font-semibold text-[#0D1B2A] group-hover:text-[#1E6FB0] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  {/* Plus / minus icon */}
                  <span
                    aria-hidden
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isOpen
                        ? "border-[#00C2D4] bg-[#00C2D4] text-white"
                        : "border-[#E8F4FD] bg-[#F8FBFF] text-[#1E6FB0] group-hover:border-[#1E6FB0]"
                    }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#6B7280] leading-relaxed text-sm pr-11">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6B7280] text-sm mb-4">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-[#1E6FB0] hover:bg-[#1B3A5C] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
          >
            Habla con un técnico
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
