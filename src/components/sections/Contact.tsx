"use client";

import { useState } from "react";
import type { ContactFormState } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

type InstallationType = "refrigeracion" | "climatizacion";
type RequestType = "averia" | "obra-nueva-reforma";
type UrgencyType = "urgente" | "no-urgente";
type EquipmentCountType = "1-3" | "3-10" | "+10";

interface WizardAnswers {
  installationType: InstallationType | "";
  requestType: RequestType | "";
  urgency: UrgencyType | "";
  equipmentCount: EquipmentCountType | "";
}

interface ContactData {
  name: string;
  phone: string;
  message: string;
}

const TOTAL_STEPS = 4;

const WIZARD_INIT: WizardAnswers = {
  installationType: "",
  requestType: "",
  urgency: "",
  equipmentCount: "",
};

const CONTACT_INIT: ContactData = {
  name: "",
  phone: "",
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

export function Contact() {
  const [step, setStep] = useState(1);
  const [wizard, setWizard] = useState<WizardAnswers>(WIZARD_INIT);
  const [contact, setContact] = useState<ContactData>(CONTACT_INIT);
  const [formState, setFormState] = useState<ContactFormState>({ status: "idle" });

  function selectInstallationType(value: InstallationType) {
    setWizard({
      installationType: value,
      requestType: "",
      urgency: "",
      equipmentCount: "",
    });
    setTimeout(() => setStep(2), 160);
  }

  function selectRequestType(value: RequestType) {
    setWizard((prev) => ({
      ...prev,
      requestType: value,
      urgency: "",
      equipmentCount: "",
    }));
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

  function handleContactChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setContact((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState({ status: "loading" });

    const detailLabel =
      wizard.requestType === "averia"
        ? OPTION_LABELS[wizard.urgency]
        : OPTION_LABELS[wizard.equipmentCount];

    const payload = {
      name: contact.name,
      email: "",
      phone: contact.phone,
      company: "",
      service: [
        OPTION_LABELS[wizard.installationType],
        OPTION_LABELS[wizard.requestType],
        detailLabel,
      ]
        .filter(Boolean)
        .join(" · "),
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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormState({
        status: "success",
        message: "Solicitud enviada. Te contactaremos en menos de 48h.",
      });
    } catch {
      setFormState({
        status: "error",
        message: "No se pudo enviar. Vuelve a intentarlo o llamanos directamente.",
      });
    }
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

  function reset() {
    setStep(1);
    setWizard(WIZARD_INIT);
    setContact(CONTACT_INIT);
    setFormState({ status: "idle" });
  }

  const summaryChips: string[] = [];
  if (wizard.installationType) {
    summaryChips.push(OPTION_LABELS[wizard.installationType]);
  }
  if (wizard.requestType) {
    summaryChips.push(OPTION_LABELS[wizard.requestType]);
  }
  if (wizard.requestType === "averia" && wizard.urgency) {
    summaryChips.push(OPTION_LABELS[wizard.urgency]);
  }
  if (wizard.requestType === "obra-nueva-reforma" && wizard.equipmentCount) {
    summaryChips.push(OPTION_LABELS[wizard.equipmentCount]);
  }

  return (
    <section id="contacto" className="section-padding bg-[#F8FBFF]" aria-labelledby="contact-heading">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Badge variant="certified" className="mb-4">
                Contacto
              </Badge>
              <h2
                id="contact-heading"
                className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] tracking-tight mb-4"
              >
                Cuentanos tu caso
                <br />
                <span className="text-gradient">en menos de 1 minuto</span>
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                Sigue este cuestionario y te contactaremos con la solucion adecuada.
              </p>
            </div>

            <ul className="space-y-5" role="list">
              <li>
                <ContactItem
                  icon={<PhoneIcon className="w-5 h-5 text-[#00C2D4]" />}
                  label="Telefono"
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
                Tus datos estan protegidos y solo los usaremos para responderte.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {formState.status === "success" ? (
              <div className="bg-white rounded-2xl p-10 shadow-[0_4px_24px_0_rgba(13,27,42,0.08)] border border-[#E8F4FD] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto">
                  <CheckCircleIcon className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0D1B2A]">Solicitud recibida</h3>
                <p className="text-[#6B7280]">{formState.message}</p>
                <Button variant="secondary" onClick={reset} className="mt-4">
                  Enviar otra consulta
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_24px_0_rgba(13,27,42,0.08)] border border-[#E8F4FD]">
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-semibold text-[#6B7280] mb-2">
                    <span>
                      Paso {step} de {TOTAL_STEPS}
                    </span>
                    <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E8F4FD] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00C2D4] rounded-full transition-all duration-500"
                      style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    {Array.from({ length: TOTAL_STEPS }, (_, index) => (
                      <div
                        key={index}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          index + 1 < step
                            ? "bg-[#10B981] text-white"
                            : index + 1 === step
                              ? "bg-[#00C2D4] text-white ring-4 ring-[#00C2D4]/20"
                              : "bg-[#E8F4FD] text-[#9CA3AF]"
                        }`}
                      >
                        {index + 1 < step ? <CheckMiniIcon /> : index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <StepQuestion
                    question="Tipo de instalacion"
                    options={[
                      {
                        value: "refrigeracion",
                        label: "Refrigeracion",
                        desc: "Camaras, vitrinas, frio industrial o comercial",
                        icon: <SnowflakeIcon className="w-7 h-7" />,
                      },
                      {
                        value: "climatizacion",
                        label: "Climatizacion",
                        desc: "Clima de espacios, VRF/VRV y splits",
                        icon: <WindIcon className="w-7 h-7" />,
                      },
                    ]}
                    onSelect={(value) => selectInstallationType(value as InstallationType)}
                    selected={wizard.installationType}
                  />
                )}

                {step === 2 && (
                  <StepQuestion
                    question="Averia o obra nueva / reforma"
                    options={[
                      {
                        value: "averia",
                        label: "Averia",
                        desc: "Necesito reparacion de una instalacion existente",
                        icon: <WrenchIcon className="w-7 h-7" />,
                      },
                      {
                        value: "obra-nueva-reforma",
                        label: "Obra nueva / reforma",
                        desc: "Necesito instalar o ampliar equipos",
                        icon: <BuildingIcon className="w-7 h-7" />,
                      },
                    ]}
                    onSelect={(value) => selectRequestType(value as RequestType)}
                    selected={wizard.requestType}
                  />
                )}

                {step === 3 && wizard.requestType === "averia" && (
                  <StepQuestion
                    question="Es urgente"
                    options={[
                      {
                        value: "urgente",
                        label: "Urgente",
                        desc: "Necesito asistencia cuanto antes",
                        icon: <AlertIcon className="w-7 h-7" />,
                      },
                      {
                        value: "no-urgente",
                        label: "No urgente",
                        desc: "Puedo esperar una visita programada",
                        icon: <ClockIcon className="w-7 h-7" />,
                      },
                    ]}
                    onSelect={(value) => selectUrgency(value as UrgencyType)}
                    selected={wizard.urgency}
                  />
                )}

                {step === 3 && wizard.requestType === "obra-nueva-reforma" && (
                  <StepQuestion
                    question="Numero de equipos"
                    options={[
                      {
                        value: "1-3",
                        label: "1-3",
                        desc: "Instalacion pequena",
                        icon: <EquipSmallIcon className="w-7 h-7" />,
                      },
                      {
                        value: "3-10",
                        label: "3-10",
                        desc: "Instalacion media",
                        icon: <EquipMedIcon className="w-7 h-7" />,
                      },
                      {
                        value: "+10",
                        label: "+10",
                        desc: "Instalacion grande",
                        icon: <EquipLargeIcon className="w-7 h-7" />,
                      },
                    ]}
                    onSelect={(value) => selectEquipmentCount(value as EquipmentCountType)}
                    selected={wizard.equipmentCount}
                    columns={3}
                  />
                )}

                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {summaryChips.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#E8F4FD]">
                        {summaryChips.map((chip) => (
                          <span
                            key={chip}
                            className="text-xs font-semibold text-[#1E6FB0] bg-white px-3 py-1 rounded-full border border-[#1E6FB0]/20"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-[#0D1B2A]">Formulario de contacto</h3>

                    <Field
                      label="Nombre y apellidos *"
                      name="name"
                      type="text"
                      value={contact.name}
                      onChange={handleContactChange}
                      required
                      autoComplete="name"
                    />

                    <Field
                      label="Telefono *"
                      name="phone"
                      type="tel"
                      value={contact.phone}
                      onChange={handleContactChange}
                      required
                      autoComplete="tel"
                    />

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-sm font-semibold text-[#374151]">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contact.message}
                        onChange={handleContactChange}
                        rows={3}
                        placeholder="Ejemplo: necesito visita tecnica para esta semana"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#0D1B2A] text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2D4] focus:border-transparent transition resize-none"
                      />
                    </div>

                    {formState.status === "error" && (
                      <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200">
                        {formState.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="ice"
                      size="lg"
                      className="w-full"
                      disabled={formState.status === "loading"}
                    >
                      {formState.status === "loading" ? (
                        <>
                          <SpinnerIcon className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-5 h-5" />
                          Enviar solicitud
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {step > 1 && formState.status !== "loading" && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-6 text-sm text-[#6B7280] hover:text-[#1E6FB0] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    Volver atras
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StepOption {
  value: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

function StepQuestion({
  question,
  options,
  onSelect,
  selected,
  columns = 2,
}: {
  question: string;
  options: StepOption[];
  onSelect: (value: string) => void;
  selected: string;
  columns?: 2 | 3;
}) {
  return (
    <div>
      <p className="text-lg font-bold text-[#0D1B2A] mb-5">{question}</p>
      <div className={`grid gap-3 ${columns === 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`flex flex-col items-center text-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:border-[#00C2D4] hover:bg-[#E8F4FD]/50 focus:outline-none focus:ring-2 focus:ring-[#00C2D4] ${
                isSelected
                  ? "border-[#00C2D4] bg-[#E8F4FD]/60 ring-4 ring-[#00C2D4]/10"
                  : "border-[#E5E7EB] bg-white"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  isSelected ? "bg-[#00C2D4] text-white" : "bg-[#E8F4FD] text-[#1E6FB0]"
                }`}
              >
                {option.icon}
              </div>
              <div>
                <p className={`font-bold text-sm ${isSelected ? "text-[#1E6FB0]" : "text-[#0D1B2A]"}`}>
                  {option.label}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5 leading-tight">{option.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-semibold text-[#374151]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#0D1B2A] text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00C2D4] focus:border-transparent transition"
      />
    </div>
  );
}

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
