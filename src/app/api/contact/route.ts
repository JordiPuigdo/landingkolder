import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ContactFormData } from "@/types";

const REQUIRED_FIELDS: (keyof ContactFormData)[] = ["name", "phone"];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Type guard
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data = body as Partial<ContactFormData>;

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || typeof data[field] !== "string" || !data[field]!.trim()) {
      return NextResponse.json(
        { error: `El campo "${field}" es obligatorio` },
        { status: 422 }
      );
    }
  }

  // Validate email format only if provided
  if (data.email && data.email.trim() && !isValidEmail(data.email)) {
    return NextResponse.json(
      { error: "El formato del correo electrónico no es válido" },
      { status: 422 }
    );
  }

  // Sanitize - only allow expected fields
  const sanitized: ContactFormData = {
    name:            String(data.name            ?? "").slice(0, 100),
    email:           String(data.email           ?? "").slice(0, 200),
    phone:           String(data.phone           ?? "").slice(0, 30),
    company:         String(data.company         ?? "").slice(0, 100),
    service:         String(data.service         ?? "").slice(0, 200),
    message:         String(data.message         ?? "").slice(0, 2000),
    installationType: String(data.installationType ?? "").slice(0, 50),
    requestType:     String(data.requestType     ?? "").slice(0, 50),
    urgency:         String(data.urgency         ?? "").slice(0, 50),
    equipmentCount:  String(data.equipmentCount  ?? "").slice(0, 50),
  };

  // TODO: Replace with real email delivery (e.g. Resend, Nodemailer, CRM webhook)
  // Example with Resend:
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "web@kolder.cat",
  //   to: process.env.CONTACT_EMAIL ?? "info@kolder.cat",
  //   subject: `Nova sol·licitud de ${sanitized.name}`,
  //   text: JSON.stringify(sanitized, null, 2),
  // });

  // For now: log to server console (safe for development)
  console.log("[Contact form submission]", {
    timestamp: new Date().toISOString(),
    ...sanitized,
  });

  return NextResponse.json(
    { success: true, message: "Mensaje recibido correctamente" },
    { status: 200 }
  );
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
