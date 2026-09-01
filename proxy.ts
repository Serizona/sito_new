import { NextRequest, NextResponse } from "next/server";

/**
 * Interruttore generale del sito.
 *
 * Cambia SOLO la costante MODE qui sotto e fai un push: il sito cambia stato.
 * Il codice del sito resta tutto al suo posto, non viene cancellato niente.
 *
 *   "down"        → ogni richiesta riceve una pagina 404 (sito non accessibile)
 *   "maintenance" → pagina "in manutenzione" con status 503 (giù temporaneamente)
 *   "live"        → sito normale
 *
 * Differenza importante per Google:
 *   - 404 dice ai motori di ricerca "questa pagina non esiste": dopo qualche
 *     settimana il sito viene deindicizzato e va fatto reindicizzare da zero.
 *   - 503 dice "torna più tardi": il posizionamento resta intatto.
 *   Usa "maintenance" se il down è temporaneo e ti interessa la SEO.
 *
 * Per vedere il sito mentre è giù, imposta la env var SITE_BYPASS_TOKEN su
 * Vercel e poi visita:
 *   https://www.intusai.com/?bypass=<SITE_BYPASS_TOKEN>
 * Viene impostato un cookie che ti fa navigare normalmente per 7 giorni.
 */

const MODE: "down" | "maintenance" | "live" = "live";

const BYPASS_COOKIE = "intusai-bypass";
const BYPASS_PARAM = "bypass";

export default function proxy(request: NextRequest) {
  // in locale (`npm run dev`) il sito si vede sempre, anche a sito giu':
  // altrimenti non si potrebbe lavorare sulle pagine mentre sono offline
  if (MODE === "live" || process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const token = process.env.SITE_BYPASS_TOKEN;

  if (token) {
    // ?bypass=<token> imposta il cookie e ripulisce l'URL
    if (request.nextUrl.searchParams.get(BYPASS_PARAM) === token) {
      const target = request.nextUrl.clone();
      target.searchParams.delete(BYPASS_PARAM);

      const response = NextResponse.redirect(target);
      response.cookies.set(BYPASS_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    if (request.cookies.get(BYPASS_COOKIE)?.value === token) {
      return NextResponse.next();
    }
  }

  const status = MODE === "down" ? 404 : 503;

  // nessuna cache, così alla riaccensione non resta la pagina appesa in CDN
  const headers: Record<string, string> = {
    "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    "cdn-cache-control": "no-store",
    "vercel-cdn-cache-control": "no-store",
  };

  if (MODE === "maintenance") {
    // un'ora: segnale di indisponibilità temporanea per i crawler.
    // NIENTE noindex qui: 503 + Retry-After dice "torna piu' tardi" e conserva
    // il posizionamento, mentre noindex direbbe a Google di deindicizzare —
    // i due segnali si contraddicono.
    headers["retry-after"] = "3600";
  } else {
    headers["x-robots-tag"] = "noindex";
  }

  // le API rispondono in JSON, non in HTML
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: MODE === "down" ? "Not found" : "Service unavailable" },
      { status, headers },
    );
  }

  return new NextResponse(MODE === "down" ? notFoundPage : maintenancePage, {
    status,
    headers: { ...headers, "content-type": "text/html; charset=utf-8" },
  });
}

export const config = {
  // tutto tranne gli asset statici di Next e le icone (così la favicon resta viva)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|logo-favicon.png|logo-transparent.png).*)",
  ],
};

const notFoundPage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>404 — Page not found</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, Helvetica, sans-serif;
    background: #ffffff;
    color: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    -webkit-font-smoothing: antialiased;
  }
  main {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  h1 {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    padding-right: 20px;
    border-right: 1px solid rgba(15, 23, 42, 0.2);
    line-height: 1.2;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    line-height: 1.6;
  }
  @media (prefers-color-scheme: dark) {
    body { background: #000000; color: #ededed; }
    h1 { border-right-color: rgba(237, 237, 237, 0.3); }
  }
</style>
</head>
<body>
<main>
  <h1>404</h1>
  <p>This page could not be found.</p>
</main>
</body>
</html>`;

const maintenancePage = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Intus.AI — Sito in manutenzione</title>
<link rel="icon" href="/logo-favicon.png" type="image/png" sizes="32x32">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, Helvetica, sans-serif;
    background: linear-gradient(180deg, #f5f8ff 0%, #ffffff 55%);
    color: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    -webkit-font-smoothing: antialiased;
  }
  main {
    width: 100%;
    max-width: 520px;
    text-align: center;
  }
  .mark {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f2f63;
    margin: 0 0 36px;
  }
  .mark span { color: #0047ff; }
  .badge {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #0047ff;
    background: #eef3ff;
    border-radius: 999px;
    padding: 6px 14px;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 26px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #475569;
    margin: 0 0 10px;
  }
  .en {
    margin-top: 28px;
    padding-top: 22px;
    border-top: 1px solid #e2e8f0;
    font-size: 15px;
    color: #64748b;
  }
  a {
    color: #0047ff;
    font-weight: 600;
    text-decoration: none;
  }
  a:hover { text-decoration: underline; }
  @media (prefers-color-scheme: dark) {
    body { background: #0a0f1e; color: #e2e8f0; }
    .mark { color: #dbeafe; }
    .badge { color: #93b4ff; background: rgba(0,71,255,0.14); }
    p { color: #94a3b8; }
    .en { border-top-color: #1e293b; color: #7c8ba1; }
    a { color: #7aa2ff; }
  }
</style>
</head>
<body>
<main>
  <p class="mark">Intus<span>.AI</span></p>
  <p class="badge">Manutenzione</p>
  <h1>Stiamo lavorando al sito</h1>
  <p>Il sito è temporaneamente offline per manutenzione. Torniamo online a breve.</p>
  <p>Per qualsiasi necessità scrivici a <a href="mailto:info@intus-ai.com">info@intus-ai.com</a>.</p>
  <div class="en">
    <p><strong>We&rsquo;ll be back shortly.</strong> The site is temporarily down for maintenance.
    In the meantime you can reach us at <a href="mailto:info@intus-ai.com">info@intus-ai.com</a>.</p>
  </div>
</main>
</body>
</html>`;
