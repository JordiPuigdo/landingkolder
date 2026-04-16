import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kölder — Refrigeración y Climatización Eficiente en Cataluña",
  description:
    "Instalación y mantenimiento de sistemas de refrigeración industrial y comercial, y climatización de espacios. Especialistas en refrigerantes naturales y eficiencia energética. Presupuesto gratuito en 48h.",
  keywords: [
    "refrigeración industrial Cataluña",
    "climatización eficiente",
    "refrigerantes naturales",
    "F-Gas",
    "instalación frigorífica",
    "cámaras frigoríficas",
    "Kölder",
    "mantenimiento refrigeración",
  ],
  authors: [{ name: "Kölder Climatización Eficiente" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://kolder.cat",
    siteName: "Kölder Climatización Eficiente",
    title: "Kölder — Refrigeración y Climatización Eficiente",
    description:
      "Especialistas en sistemas frigoríficos con refrigerantes naturales. Industrial y comercial. Presupuesto gratuito.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kölder Climatización Eficiente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kölder — Refrigeración y Climatización Eficiente",
    description: "Especialistas en refrigerantes naturales y eficiencia energética en Cataluña.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://kolder.cat"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1B2A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
