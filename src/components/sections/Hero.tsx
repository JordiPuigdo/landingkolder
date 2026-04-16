"use client";

import { useRef, useState } from "react";

const WHATSAPP_NUMBER = "34930000000"; // TODO: reemplazar con numero real
const TOTAL_STEPS = 4;

type InstallationType = "refrigeracion" | "climatizacion";
type RequestType = "averia" | "obra-nueva-reforma";
type UrgencyType = "urgente" | "no-urgente";
type EquipmentCountType = "1-3" | "3-10" | "+10";

interface HeroWizardState {
  installationType: InstallationType | "";
  requestType: RequestType | "";
  urgency: UrgencyType | "";
  equipmentCount: EquipmentCountType | "";
}

interface HeroContactState {
  name: string;
  message: string;
}

const WIZARD_INITIAL_STATE: HeroWizardState = {
  installationType: "",
  requestType: "",
  urgency: "",
  equipmentCount: "",
};

const CONTACT_INITIAL_STATE: HeroContactState = {
  name: "",
  message: "",
};

const OPTION_LABELS: Record<string, string> = {
  refrigeracion: "Refrigeracion",
  climatizacion: "Climatizacion",
  averia: "Averia",
  "obra-nueva-reforma": "Obra nueva / reforma",
  urgente: "Urgente",
  "no-urgente": "No urgente",
  "1-3": "1-3 equipos",
  "3-10": "3-10 equipos",
  "+10": "+10 equipos",
};

export function Hero() {
  const [step, setStep] = useState(1);
  const [wizard, setWizard] = useState<HeroWizardState>(WIZARD_INITIAL_STATE);
  const [contact, setContact] = useState<HeroContactState>(CONTACT_INITIAL_STATE);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
      return;
    }

    video.pause();
    setPlaying(false);
  }

  function selectInstallationType(value: InstallationType) {
    setWizard({
      installationType: value,
      requestType: "",
      urgency: "",
      equipmentCount: "",
    });
    setStep(2);
  }

  function selectRequestType(value: RequestType) {
    setWizard((prev) => ({
      ...prev,
      requestType: value,
      urgency: "",
      equipmentCount: "",
    }));
    setStep(3);
  }

  function selectUrgency(value: UrgencyType) {
    setWizard((prev) => ({ ...prev, urgency: value }));
    setStep(4);
  }

  function selectEquipmentCount(value: EquipmentCountType) {
    setWizard((prev) => ({ ...prev, equipmentCount: value }));
    setStep(4);
  }

  function handleBack() {
    if (step === 4) {
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(1);
    }
  }

  function handleContactChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setContact((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleWhatsApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const detailLabel =
      wizard.requestType === "averia"
        ? OPTION_LABELS[wizard.urgency]
        : OPTION_LABELS[wizard.equipmentCount];

    const text = encodeURIComponent(
      `Hola, soy ${contact.name}.

Tipo de instalacion: ${OPTION_LABELS[wizard.installationType]}
Tipo de solicitud: ${OPTION_LABELS[wizard.requestType]}
Detalle: ${detailLabel}

Mensaje: ${contact.message || "Quiero recibir mas informacion."}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  const summaryChips: string[] = [];
  if (wizard.installationType) summaryChips.push(OPTION_LABELS[wizard.installationType]);
  if (wizard.requestType) summaryChips.push(OPTION_LABELS[wizard.requestType]);
  if (wizard.requestType === "averia" && wizard.urgency) {
    summaryChips.push(OPTION_LABELS[wizard.urgency]);
  }
  if (wizard.requestType === "obra-nueva-reforma" && wizard.equipmentCount) {
    summaryChips.push(OPTION_LABELS[wizard.equipmentCount]);
  }

  return (
    <section
      className="relative min-h-screen flex items-center gradient-dark overflow-hidden"
      aria-label="Presentacion principal"
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
          <div>
            <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Somos la
              <br />
              solucion 360 en
              <br />
              <span className="text-gradient">refrigeracion y climatizacion</span>
              <br />
              para tu empresa
            </h1>

            <p className="animate-fade-up delay-100 text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Mas de 20 anos ayudando a negocios industriales y comerciales con
              soluciones fiables y servicio tecnico 24/7.
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

          <div className="animate-fade-up delay-200">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-5">
              <div className="space-y-1">
                <p className="text-[#00C2D4] text-sm font-semibold uppercase tracking-wider">
                  Contacto rapido
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Cuentanos tu caso
                  <br />
                  <span className="text-gradient">y te escribimos por WhatsApp</span>
                </h2>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white/60 mb-2">
                  <span>
                    Paso {step} de {TOTAL_STEPS}
                  </span>
                  <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00C2D4] rounded-full transition-all duration-300"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              {step === 1 && (
                <HeroQuestion
                  question="Tipo de instalacion"
                  options={[
                    { value: "refrigeracion", label: "Refrigeracion" },
                    { value: "climatizacion", label: "Climatizacion" },
                  ]}
                  onSelect={(value) => selectInstallationType(value as InstallationType)}
                  selected={wizard.installationType}
                />
              )}

              {step === 2 && (
                <HeroQuestion
                  question="Averia o obra nueva / reforma"
                  options={[
                    { value: "averia", label: "Averia" },
                    { value: "obra-nueva-reforma", label: "Obra nueva / reforma" },
                  ]}
                  onSelect={(value) => selectRequestType(value as RequestType)}
                  selected={wizard.requestType}
                />
              )}

              {step === 3 && wizard.requestType === "averia" && (
                <HeroQuestion
                  question="Es urgente"
                  options={[
                    { value: "urgente", label: "Urgente" },
                    { value: "no-urgente", label: "No urgente" },
                  ]}
                  onSelect={(value) => selectUrgency(value as UrgencyType)}
                  selected={wizard.urgency}
                />
              )}

              {step === 3 && wizard.requestType === "obra-nueva-reforma" && (
                <HeroQuestion
                  question="Numero de equipos"
                  options={[
                    { value: "1-3", label: "1-3" },
                    { value: "3-10", label: "3-10" },
                    { value: "+10", label: "+10" },
                  ]}
                  onSelect={(value) => selectEquipmentCount(value as EquipmentCountType)}
                  selected={wizard.equipmentCount}
                  columns={3}
                />
              )}

              {step === 4 && (
                <form onSubmit={handleWhatsApp} className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {summaryChips.map((chip) => (
                      <span
                        key={chip}
                        className="text-xs font-semibold text-[#0D1B2A] bg-[#E8F4FD] px-3 py-1 rounded-full border border-[#1E6FB0]/20"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="hero-name"
                      className="block text-sm font-semibold text-white/70"
                    >
                      Tu nombre *
                    </label>
                    <input
                      id="hero-name"
                      name="name"
                      type="text"
                      required
                      value={contact.name}
                      onChange={handleContactChange}
                      placeholder="Juan Garcia"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2D4] focus:border-transparent transition"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="hero-message"
                      className="block text-sm font-semibold text-white/70"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="hero-message"
                      name="message"
                      rows={3}
                      value={contact.message}
                      onChange={handleContactChange}
                      placeholder="Necesito presupuesto para..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2D4] focus:border-transparent transition resize-none"
                      suppressHydrationWarning
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-base py-4 px-6 rounded-xl transition-colors animate-pulse-ice"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Enviar por WhatsApp
                  </button>
                </form>
              )}

              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  Volver atras
                </button>
              )}

              <p className="text-center text-xs text-white/30">
                Te responderemos en menos de 24h
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

function HeroQuestion({
  question,
  options,
  selected,
  onSelect,
  columns = 2,
}: {
  question: string;
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div className="space-y-3">
      <p className="text-white font-semibold">{question}</p>
      <div className={`grid gap-2 ${columns === 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                isSelected
                  ? "bg-[#00C2D4] border-[#00C2D4] text-white"
                  : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
