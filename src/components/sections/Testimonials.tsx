import { Badge } from "@/components/ui/Badge";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      id="testimonios"
      className="section-padding bg-[#F8FBFF]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="eco" className="mb-4">
            <StarIcon className="w-3.5 h-3.5" />
            Clientes Satisfechos
          </Badge>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A] tracking-tight mb-4"
          >
            Lo que dicen
            <br />
            <span className="text-gradient">nuestros clientes</span>
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col bg-white rounded-2xl p-8 shadow-[0_4px_24px_0_rgba(13,27,42,0.08)] border border-[#E8F4FD] hover:shadow-[0_8px_40px_0_rgba(13,27,42,0.14)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" aria-hidden="true" />
                ))}
              </div>

              {/* Quote mark */}
              <QuoteIcon className="w-8 h-8 text-[#E8F4FD] mb-3 -mt-1" />

              {/* Quote text */}
              <p className="text-[#374151] text-sm leading-relaxed flex-1 mb-6">{t.quote}</p>

              {/* Author */}
              <footer>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-ice flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-[#0D1B2A] text-sm block">
                      {t.author}
                    </cite>
                    <span className="text-[#6B7280] text-xs">
                      {t.role} — {t.company}
                    </span>
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}
