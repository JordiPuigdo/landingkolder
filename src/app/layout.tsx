import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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
    "Instalación y mantenimiento de sistemas de refrigeración industrial y comercial, y climatización de espacios. Especialistas en refrigerantes naturales y eficiencia energética. Presupuesto gratuito en 48 h.",
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KT3LJWMR');`,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KT3LJWMR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
