import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import type { ContactFormData } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const REQUIRED_FIELDS: (keyof ContactFormData)[] = ["name", "phone"];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ALLOWED_ORIGINS = [
  "https://kolder.cat",
  "https://www.kolder.cat",
  "https://landingkolder.vercel.app",
  "https://kolderrefrigeracion.kolder.cat",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

console.log("[contact] RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Origin check
  const origin = request.headers.get("origin") ?? "";
  console.log("[contact] origin received:", origin);
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Massa sol·licituds. Torna-ho a intentar en uns minuts." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data = body as Partial<ContactFormData>;

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || typeof data[field] !== "string" || !data[field]!.trim()) {
      return NextResponse.json(
        { error: `El camp "${field}" és obligatori` },
        { status: 422 }
      );
    }
  }

  if (data.email && data.email.trim() && !isValidEmail(data.email)) {
    return NextResponse.json(
      { error: "El format del correu electrònic no és vàlid" },
      { status: 422 }
    );
  }

  const sanitized: ContactFormData = {
    name:             String(data.name             ?? "").slice(0, 100),
    email:            String(data.email            ?? "").slice(0, 200),
    phone:            String(data.phone            ?? "").slice(0, 30),
    company:          String(data.company          ?? "").slice(0, 100),
    service:          String(data.service          ?? "").slice(0, 200),
    message:          String(data.message          ?? "").slice(0, 2000),
    installationType: String(data.installationType ?? "").slice(0, 50),
    requestType:      String(data.requestType      ?? "").slice(0, 50),
    urgency:          String(data.urgency          ?? "").slice(0, 50),
    equipmentCount:   String(data.equipmentCount   ?? "").slice(0, 50),
  };

  const lines = [
    `Nom: ${sanitized.name}`,
    `Telèfon: ${sanitized.phone}`,
    sanitized.email   ? `Email: ${sanitized.email}`      : null,
    sanitized.company ? `Empresa: ${sanitized.company}`  : null,
    sanitized.service ? `Servei: ${sanitized.service}`   : null,
    sanitized.message ? `Missatge: ${sanitized.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: "web@kolder.cat",
      to: ["comercial@kolder.cat", "n.alexandre@kolder.cat"],
      subject: `Nova sol·licitud de ${sanitized.name}`,
      text: lines,
    });

    if (error) {
      console.error("[Resend error]", error);
      return NextResponse.json(
        { error: "No s'ha pogut enviar el missatge. Truca'ns directament." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Error intern. Truca'ns directament." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Missatge rebut correctament" },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
