"use client";

import { useRef, useState } from "react";
import { ContactWizard } from "@/components/ContactWizard";

export function Hero() {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setPlaying(true); }
    else { video.pause(); setPlaying(false); }
  }

  return (
    <section
      className="relative min-h-screen flex items-center gradient-dark overflow-hidden"
      aria-label="Presentación principal"
    >
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        className="absolute top-1/4 right-[5%] w-80 h-80 md:w-[500px] md:h-[500px] rounded-full opacity-15 blur-[80px]"
        style={{ background: "radial-gradient(circle, #00C2D4, #1E6FB0)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-[10%] w-64 h-64 rounded-full opacity-10 blur-[60px]"
        style={{ background: "radial-gradient(circle, #1E6FB0, transparent)" }}
        aria-hidden="true"
      />

      <div className="container-narrow relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — headline + vídeo */}
          <div>
            <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Solución 360 en
              <br />
              <span className="text-gradient">refrigeración y climatización</span>
              <br />
              para tu empresa
            </h1>

            <p className="animate-fade-up delay-100 text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Instalamos y mantenemos sistemas de refrigeración y climatización con refrigerantes naturales —
              la solución más eficiente, económica y a prueba de la normativa F-Gas de la UE.
            </p>

            <div className="animate-fade-up delay-200 relative rounded-2xl overflow-hidden bg-[#1B3A5C] border border-white/10 aspect-video group">
              <video
                ref={videoRef}
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/photos/Fotos-Divina-Pastora-08.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pausar video" : "Reproducir video"}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="w-16 h-16 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                  {playing ? (
                    <PauseIcon className="w-7 h-7 text-white" />
                  ) : (
                    <PlayIcon className="w-7 h-7 text-white ml-1" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Right — formulario */}
          <div className="animate-fade-up delay-200">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <div className="space-y-1 mb-6">
                <p className="text-[#00C2D4] text-sm font-semibold uppercase tracking-wider">
                  Contacto rápido
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Cuéntanos tu caso
                  <br />
                  <span className="text-gradient">y te contactamos en 24 h</span>
                </h2>
              </div>

              <ContactWizard theme="dark" />

              <p className="text-center text-xs text-white/30 mt-5">
                Te responderemos en menos de 24 h
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDownIcon className="w-6 h-6 text-white/30" />
      </div>
    </section>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
