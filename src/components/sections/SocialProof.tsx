import { TRUST_BADGES } from "@/lib/constants";

export function SocialProof() {
  return (
    <section
      className="bg-[#1B3A5C] py-10 border-y border-white/10"
      aria-label="Certificaciones y reconocimientos"
    >
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
          {/* Label */}
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest whitespace-nowrap md:pr-8 md:border-r md:border-white/20">
            Certificados y homologados por
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:pl-8">
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium border border-white/10 hover:bg-white/15 transition-colors"
              >
                <ShieldCheckIcon className="w-4 h-4 text-[#00C2D4] shrink-0" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
