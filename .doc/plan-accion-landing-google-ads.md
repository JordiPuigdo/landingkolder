# Plan de accion Google Ads aplicado a tu web (Kolder)

## 1) Contexto real de tu landing actual
- Marca y servicio: Kolder (refrigeracion y climatizacion para empresa), no software GMAO.
- Estructura publicada en `src/app/page.tsx`: `Hero` + `AboutKolder` + `DetailedPoints`.
- Captacion principal actual: clic a WhatsApp desde `Hero` y `WhatsAppFloat`.
- Problemas detectados en codigo:
- `WHATSAPP_NUMBER` es placeholder en varios archivos (`34930000000`).
- Boton WhatsApp de navbar apunta a `#` en `src/components/Navbar.tsx`.
- Hay placeholders de video y fotos en `Hero` y `AboutKolder`.
- Existe formulario avanzado (`src/components/sections/Contact.tsx`) pero no se renderiza en la home.
- API `/api/contact` solo hace `console.log`, no envia email ni CRM.

## 2) Objetivo de negocio para Ads
- Generar leads cualificados de:
- Refrigeracion industrial/comercial.
- Climatizacion para empresas.
- Mantenimiento 24/7.
- Mantener el estilo visual actual (colores, tipografia, tono), mejorando conversion y medicion.

## 3) KPI que si aplican a tu caso
- `Clic a WhatsApp` por sesion de pago.
- `Envio de formulario` por sesion de pago (si activamos formulario).
- `CPL` por campaña y por servicio.
- `Tasa de contacto valido` (lead con telefono/email util).
- `Tiempo a primer contacto` (SLA comercial).

## 4) Plan por fases (sobre tus archivos reales)

## Fase 1 (0-48h) - Bloqueantes de conversion
- Reemplazar numero real de WhatsApp en:
- `src/components/sections/Hero.tsx`
- `src/components/WhatsAppFloat.tsx`
- Corregir CTA WhatsApp de navbar para que no vaya a `#`:
- `src/components/Navbar.tsx`
- Definir un solo CTA primario arriba del fold: "Solicitar presupuesto por WhatsApp".
- Quitar friccion inicial:
- Mantener solo nombre + necesidad breve en el Hero.
- Mensaje por defecto orientado a presupuesto/visita tecnica.

## Fase 2 (Semana 1) - Medicion y atribucion
- Instrumentar eventos para Google Ads/GA4:
- `click_whatsapp_hero`
- `click_whatsapp_nav`
- `click_whatsapp_float`
- Activar una via de conversion secundaria con formulario real:
- Renderizar `Contact` en `src/app/page.tsx` o crear una landing variante con formulario.
- Enviar datos a email/CRM desde `src/app/api/contact/route.ts` (Resend, webhook o similar).
- Capturar y persistir parametros:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`.
- Guardarlos en campos ocultos si hay formulario y reenviarlos al backend.

## Fase 3 (Semana 1-2) - Mensaje alineado a campañas
- Ajustar copy del Hero para intencion de busqueda B2B:
- Servicio + zona + promesa concreta (ej: respuesta tecnica en menos de 3h para averias).
- Crear variantes por grupo de anuncios sin tocar branding:
- Variante A: Refrigeracion industrial.
- Variante B: Climatizacion comercial/industrial.
- Variante C: Mantenimiento 24/7.
- Mantener la misma base visual y cambiar solo titulares, subtitulos y CTA.

## Fase 4 (Semana 2-3) - Prueba social real y confianza
- Sustituir placeholders por activos reales:
- Video corporativo en `Hero`.
- Fotos reales de instalaciones en `AboutKolder`.
- Añadir prueba de confianza visible cerca del CTA:
- Certificaciones, zonas de cobertura, tiempo de respuesta, casos reales.
- Mantener el bloque de "20+ años", pero con evidencia concreta (numero de instalaciones o clientes).

## Fase 5 (Semana 3-4) - Optimizacion continua
- Test A/B 1: CTA WhatsApp ("Habla con un tecnico" vs "Pide presupuesto en 2 minutos").
- Test A/B 2: Hero con enfoque urgencia (averias) vs ahorro energetico.
- Test A/B 3: Landing corta (Hero + confianza + CTA) vs actual completa.
- Decision por datos de negocio:
- Priorizar calidad de lead y CPL, no solo volumen de clic.

## 5) Prioridad de implementacion
- P1 (hacer ya):
- Numero real WhatsApp.
- CTA navbar funcional.
- Evento de conversion en clic de WhatsApp.
- P2 (siguiente iteracion):
- Formulario visible y backend real (email/CRM).
- Captura UTM/GCLID end-to-end.
- P3 (escalado):
- Variantes por servicio para Ads.
- Tests A/B y optimizacion de mensajes.

## 6) Definition of done (aplicada a tu web)
- Todos los CTA de contacto funcionan y llegan a un destino real.
- Hay al menos 1 conversion medible y validada en Google Ads.
- Se conserva tu identidad visual actual.
- La landing refleja servicios reales de Kolder (no mensajes genericos).
- Quedan eliminados placeholders criticos de venta (numero, video o fotos clave).
