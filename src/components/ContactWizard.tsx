"use client";

import { useState } from "react";

type InstallationType = "refrigeracion" | "climatizacion";
type RequestType = "averia" | "obra-nueva-reforma";
type UrgencyType = "urgente" | "no-urgente";
type EquipmentCountType = "1-3" | "3-10" | "+10";

interface WizardState {
  installationType: InstallationType | "";
  requestType: RequestType | "";
  urgency: UrgencyType | "";
  equipmentCount: EquipmentCountType | "";
}

interface ContactData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const TOTAL_STEPS = 4;

const WIZARD_INIT: WizardState = {
  installationType: "",
  requestType: "",
  urgency: "",
  equipmentCount: "",
};

const CONTACT_INIT: ContactData = { name: "", phone: "", email: "", message: "" };

const OPTION_LABELS: Record<string, string> = {
  refrigeracion: "Refrigeración",
  climatizacion: "Climatización",
  averia: "Avería",
  "obra-nueva-reforma": "Obra nueva / reforma",
  urgente: "Urgente",
  "no-urgente": "No urgente",
  "1-3": "1-3 equipos",
  "3-10": "3-10 equipos",
  "+10": "+10 equipos",
};

export interface ContactWizardProps {
  theme?: "light" | "dark";
}

export function ContactWizard({ theme = "light" }: ContactWizardProps) {
  const isDark = theme === "dark";

  const [step, setStep] = useState(1);
  const [wizard, setWizard] = useState<WizardState>(WIZARD_INIT);
  const [contact, setContact] = useState<ContactData>(CONTACT_INIT);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function selectInstallationType(value: InstallationType) {
    setWizard({ installationType: value, requestType: "", urgency: "", equipmentCount: "" });
    setTimeout(() => setStep(2), 160);
  }

  function selectRequestType(value: RequestType) {
    setWizard((prev) => ({ ...prev, requestType: value, urgency: "", equipmentCount: "" }));
    setTimeout(() => setStep(3), 160);
  }

  function selectUrgency(value: UrgencyType) {
    setWizard((prev) => ({ ...prev, urgency: value }));
    setTimeout(() => setStep(4), 160);
  }

  function selectEquipmentCount(value: EquipmentCountType) {
    setWizard((prev) => ({ ...prev, equipmentCount: value }));
    setTimeout(() => setStep(4), 160);
  }

  function handleBack() {
    if (step === 4) { setStep(3); return; }
    if (step === 3) { setStep(2); return; }
    if (step === 2) { setStep(1); }
  }

  function handleContactChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContact((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const detailLabel =
      wizard.requestType === "averia"
        ? OPTION_LABELS[wizard.urgency]
        : OPTION_LABELS[wizard.equipmentCount];

    const payload = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: "",
      service: [
        OPTION_LABELS[wizard.installationType],
        OPTION_LABELS[wizard.requestType],
        detailLabel,
      ].filter(Boolean).join(" · "),
      message: contact.message,
      installationType: wizard.installationType,
      requestType: wizard.requestType,
      urgency: wizard.urgency,
      equipmentCount: wizard.equipmentCount,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("No se pudo enviar. Vuelve a intentarlo o llámanos directamente.");
    }
  }

  function reset() {
    setStep(1);
    setWizard(WIZARD_INIT);
    setContact(CONTACT_INIT);
    setStatus("idle");
    setErrorMsg("");
  }

  const summaryChips: string[] = [];
  if (wizard.installationType) summaryChips.push(OPTION_LABELS[wizard.installationType]);
  if (wizard.requestType) summaryChips.push(OPTION_LABELS[wizard.requestType]);
  if (wizard.requestType === "averia" && wizard.urgency) summaryChips.push(OPTION_LABELS[wizard.urgency]);
  if (wizard.requestType === "obra-nueva-reforma" && wizard.equipmentCount) summaryChips.push(OPTION_LABELS[wizard.equipmentCount]);

  return (
    <div className="space-y-5">
      {/* Progress bar + step dots */}
      {status !== "success" && (
        <div>
          <div className={`flex justify-between text-xs font-semibold mb-2 ${isDark ? "text-white/60" : "text-[#6B7280]"}`}>
            <span>Paso {step} de {TOTAL_STEPS}</span>
            <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-[#E8F4FD]"}`}>
            <div
              className="h-full bg-[#00C2D4] rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i + 1 < step
                    ? "bg-[#10B981] text-white"
                    : i + 1 === step
                      ? "bg-[#00C2D4] text-white ring-4 ring-[#00C2D4]/20"
                      : isDark
                        ? "bg-white/10 text-white/40"
                        : "bg-[#E8F4FD] text-[#9CA3AF]"
                }`}
              >
                {i + 1 < step ? <CheckMiniIcon /> : i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 */}
      {status !== "success" && step === 1 && (
        <StepQuestion
          isDark={isDark}
          question="Tipo de instalación"
          options={[
            { value: "refrigeracion", label: "Refrigeración", desc: "Cámaras, vitrinas, frío industrial o comercial", icon: <SnowflakeIcon className="w-7 h-7" /> },
            { value: "climatizacion", label: "Climatización", desc: "Climatización de espacios, VRF/VRV y splits", icon: <WindIcon className="w-7 h-7" /> },
          ]}
          onSelect={(v) => selectInstallationType(v as InstallationType)}
          selected={wizard.installationType}
        />
      )}

      {/* Step 2 */}
      {status !== "success" && step === 2 && (
        <StepQuestion
          isDark={isDark}
          question="Avería u obra nueva / reforma"
          options={[
            { value: "averia", label: "Avería", desc: "Necesito reparación de una instalación existente", icon: <WrenchIcon className="w-7 h-7" /> },
            { value: "obra-nueva-reforma", label: "Obra nueva / reforma", desc: "Necesito instalar o ampliar equipos", icon: <BuildingIcon className="w-7 h-7" /> },
          ]}
          onSelect={(v) => selectRequestType(v as RequestType)}
          selected={wizard.requestType}
        />
      )}

      {/* Step 3a */}
      {status !== "success" && step === 3 && wizard.requestType === "averia" && (
        <StepQuestion
          isDark={isDark}
          question="¿Es urgente?"
          options={[
            { value: "urgente", label: "Urgente", desc: "Necesito asistencia cuanto antes", icon: <AlertIcon className="w-7 h-7" /> },
            { value: "no-urgente", label: "No urgente", desc: "Puedo esperar una visita programada", icon: <ClockIcon className="w-7 h-7" /> },
          ]}
          onSelect={(v) => selectUrgency(v as UrgencyType)}
          selected={wizard.urgency}
        />
      )}

      {/* Step 3b */}
      {status !== "success" && step === 3 && wizard.requestType === "obra-nueva-reforma" && (
        <StepQuestion
          isDark={isDark}
          question="Número de equipos"
          options={[
            { value: "1-3", label: "1-3", desc: "Instalación pequeña", icon: <EquipSmallIcon className="w-7 h-7" /> },
            { value: "3-10", label: "3-10", desc: "Instalación media", icon: <EquipMedIcon className="w-7 h-7" /> },
            { value: "+10", label: "+10", desc: "Instalación grande", icon: <EquipLargeIcon className="w-7 h-7" /> },
          ]}
          onSelect={(v) => selectEquipmentCount(v as EquipmentCountType)}
          selected={wizard.equipmentCount}
          columns={3}
        />
      )}

      {/* Step 4: éxito */}
      {step === 4 && status === "success" && (
        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#10B981]/20 flex items-center justify-center">
            <CheckCircleIcon className="w-7 h-7 text-[#10B981]" />
          </div>
          <p className={`font-bold text-lg ${isDark ? "text-white" : "text-[#0D1B2A]"}`}>Solicitud recibida</p>
          <p className={`text-sm ${isDark ? "text-white/60" : "text-[#6B7280]"}`}>
            Te contactaremos en menos de 24 h.
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-[#00C2D4] hover:underline transition-colors"
          >
            Enviar otra consulta
          </button>
        </div>
      )}

      {/* Step 4: formulario */}
      {step === 4 && status !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {summaryChips.length > 0 && (
            <div className={`flex flex-wrap gap-2 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-[#E8F4FD]"}`}>
              {summaryChips.map((chip) => (
                <span
                  key={chip}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    isDark
                      ? "text-white bg-white/10 border-white/20"
                      : "text-[#1E6FB0] bg-white border-[#1E6FB0]/20"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-[#0D1B2A]"}`}>
            Formulario de contacto
          </h3>

          <WizardField
            isDark={isDark} label="Nombre y apellidos *" name="name" type="text"
            value={contact.name} onChange={handleContactChange} required
            autoComplete="name" placeholder="Juan García"
          />
          <WizardField
            isDark={isDark} label="Teléfono *" name="phone" type="tel"
            value={contact.phone} onChange={handleContactChange} required
            autoComplete="tel" placeholder="600 000 000"
          />
          <WizardField
            isDark={isDark} label="Email" name="email" type="email"
            value={contact.email} onChange={handleContactChange}
            autoComplete="email" placeholder="juan@empresa.com"
          />

          <div className="space-y-1.5">
            <label
              htmlFor="wizard-message"
              className={`block text-sm font-semibold ${isDark ? "text-white/70" : "text-[#374151]"}`}
            >
              Mensaje
            </label>
            <textarea
              id="wizard-message"
              name="message"
              rows={isDark ? 2 : 3}
              value={contact.message}
              onChange={handleContactChange}
              placeholder="Ejemplo: necesito visita técnica para esta semana"
              className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2D4] focus:border-transparent transition resize-none ${
                isDark
                  ? "bg-white/10 border border-white/20 text-white placeholder-white/30"
                  : "border border-[#E5E7EB] bg-white text-[#0D1B2A]"
              }`}
            />
          </div>

          {status === "error" && (
            <p className={`text-sm px-4 py-3 rounded-xl border ${
              isDark
                ? "text-red-400 bg-red-500/10 border-red-500/20"
                : "text-red-600 bg-red-50 border-red-200"
            }`}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 bg-[#00C2D4] hover:bg-[#00a8b8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base py-4 px-6 rounded-xl transition-colors"
          >
            {status === "loading" ? (
              <><SpinnerIcon className="w-5 h-5 animate-spin" /> Enviando...</>
            ) : (
              <><SendIcon className="w-5 h-5" /> Enviar solicitud</>
            )}
          </button>
        </form>
      )}

      {/* Volver atrás */}
      {step > 1 && status !== "loading" && status !== "success" && (
        <button
          type="button"
          onClick={handleBack}
          className={`text-sm transition-colors inline-flex items-center gap-1.5 ${
            isDark ? "text-white/70 hover:text-white" : "text-[#6B7280] hover:text-[#1E6FB0]"
          }`}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Volver atrás
        </button>
      )}
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

interface StepOption {
  value: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

function StepQuestion({
  isDark,
  question,
  options,
  onSelect,
  selected,
  columns = 2,
}: {
  isDark: boolean;
  question: string;
  options: StepOption[];
  onSelect: (value: string) => void;
  selected: string;
  columns?: 2 | 3;
}) {
  return (
    <div>
      <p className={`text-lg font-bold mb-5 ${isDark ? "text-white" : "text-[#0D1B2A]"}`}>{question}</p>
      <div className={`grid gap-3 ${columns === 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`flex flex-col items-center text-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C2D4] ${
                isSelected
                  ? "border-[#00C2D4] bg-[#00C2D4]/10 ring-4 ring-[#00C2D4]/10"
                  : isDark
                    ? "border-white/20 bg-white/5 hover:border-[#00C2D4] hover:bg-white/10"
                    : "border-[#E5E7EB] bg-white hover:border-[#00C2D4] hover:bg-[#E8F4FD]/50"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-[#00C2D4] text-white"
                  : isDark
                    ? "bg-white/10 text-[#00C2D4]"
                    : "bg-[#E8F4FD] text-[#1E6FB0]"
              }`}>
                {option.icon}
              </div>
              <div>
                <p className={`font-bold text-sm ${isSelected ? "text-[#00C2D4]" : isDark ? "text-white" : "text-[#0D1B2A]"}`}>
                  {option.label}
                </p>
                <p className={`text-xs mt-0.5 leading-tight ${isDark ? "text-white/50" : "text-[#6B7280]"}`}>
                  {option.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WizardField({
  isDark,
  label,
  name,
  type,
  value,
  onChange,
  required,
  autoComplete,
  placeholder,
}: {
  isDark: boolean;
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={`wizard-${name}`} className={`block text-sm font-semibold ${isDark ? "text-white/70" : "text-[#374151]"}`}>
        {label}
      </label>
      <input
        id={`wizard-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2D4] focus:border-transparent transition ${
          isDark
            ? "bg-white/10 border border-white/20 text-white placeholder-white/30"
            : "border border-[#E5E7EB] bg-white text-[#0D1B2A] placeholder-[#9CA3AF]"
        }`}
      />
    </div>
  );
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CheckMiniIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5">
      <polyline points="3 8 6.5 11.5 13 5" />
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

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m17 7-5 5-5-5" />
      <path d="m17 17-5-5-5 5" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="m7 7-5 5 5 5" />
      <path d="m17 7 5 5-5 5" />
    </svg>
  );
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
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

function EquipSmallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="4" width="10" height="16" rx="1" />
      <path d="M10 8h4M10 12h4M10 16h4" />
    </svg>
  );
}

function EquipMedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="8" height="14" rx="1" />
      <rect x="14" y="6" width="8" height="14" rx="1" />
      <rect x="8" y="2" width="8" height="18" rx="1" />
    </svg>
  );
}

function EquipLargeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="8" width="5" height="12" rx="1" />
      <rect x="8" y="4" width="8" height="16" rx="1" />
      <rect x="18" y="8" width="5" height="12" rx="1" />
      <path d="M11 8V4M13 8V4" />
    </svg>
  );
}
