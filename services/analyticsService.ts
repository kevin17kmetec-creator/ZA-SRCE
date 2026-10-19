// Eigene, cookielose Besucherstatistik.
// Es wird NICHTS auf dem Gerät des Besuchers gespeichert (keine Cookies, kein localStorage).
// Die Daten gehen ausschließlich an den eigenen Server (/api/collect.php).
// Inhalte von Formularen oder Fragen an den Assistenten werden NIE übertragen.

const KONCNA_TOCKA = '/api/collect.php';

type TipDogodka = 'ogled' | 'odhod' | 'klik' | 'obrazec' | 'soglasje' | 'asistent';

interface Podatki {
  t: TipDogodka;
  p: string;
  o?: string;
  v?: string;
  r?: string;
  us?: string;
  uc?: string;
  j?: string;
  s?: number;
  d?: number;
  m?: number;
}

let zagnano = false;
let prviOgled = true;
let trenutnaPot: string | null = null;
let vidnoOd: number | null = null;
let nabranCasMs = 0;
let najvecjiPomik = 0;

const jeLokalno = () =>
  ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

const poslji = (podatki: Podatki) => {
  // Während der Entwicklung (npm run dev) nichts senden
  if (jeLokalno()) return;

  const telo = JSON.stringify(podatki);
  try {
    // text/plain vermeidet einen CORS-Preflight; sendBeacon funktioniert auch beim Schließen des Tabs
    const blob = new Blob([telo], { type: 'text/plain' });
    if (navigator.sendBeacon && navigator.sendBeacon(KONCNA_TOCKA, blob)) return;
  } catch {
    // Auf fetch ausweichen
  }
  fetch(KONCNA_TOCKA, {
    method: 'POST',
    body: telo,
    keepalive: true,
    headers: { 'Content-Type': 'text/plain' },
  }).catch(() => undefined);
};

const izracunajPomik = () => {
  const visina = document.documentElement.scrollHeight;
  if (visina <= 0) return 0;
  const vidno = window.scrollY + window.innerHeight;
  return Math.min(100, Math.round((vidno / visina) * 100));
};

const ustaviMerjenjeCasa = () => {
  if (vidnoOd !== null) {
    nabranCasMs += Date.now() - vidnoOd;
    vidnoOd = null;
  }
};

// Sendet die bisher gemessene Verweildauer und Scrolltiefe der aktuellen Seite
const zakljuciStran = () => {
  if (!trenutnaPot) return;
  ustaviMerjenjeCasa();
  const sekunde = Math.round(nabranCasMs / 1000);
  if (sekunde > 0) {
    poslji({ t: 'odhod', p: trenutnaPot, d: sekunde, m: najvecjiPomik });
  }
  nabranCasMs = 0;
};

const zunanjiNapotitelj = (): string | undefined => {
  if (!document.referrer) return undefined;
  try {
    const url = new URL(document.referrer);
    if (url.hostname === window.location.hostname) return undefined;
    // Nur die Domain übertragen, nicht den vollständigen Pfad
    return url.hostname;
  } catch {
    return undefined;
  }
};

const razvrstiPovezavo = (povezava: HTMLAnchorElement): { o: string; v: string } | null => {
  const href = povezava.getAttribute('href') || '';
  if (href.startsWith('tel:')) return { o: 'telefon', v: href.slice(4) };
  if (href.startsWith('mailto:')) return { o: 'e-pošta', v: href.slice(7).split('?')[0] };

  let url: URL;
  try {
    url = new URL(povezava.href);
  } catch {
    return null;
  }
  const gostitelj = url.hostname.replace(/^www\./, '');
  const cilj = (gostitelj + url.pathname).slice(0, 200);

  if (gostitelj.includes('facebook.com')) return { o: 'facebook', v: cilj };
  if (url.pathname.toLowerCase().endsWith('.pdf') || gostitelj === 'drive.google.com' || gostitelj === 'docs.google.com') {
    return { o: 'dokument', v: cilj };
  }
  if (gostitelj.includes('google.') && url.pathname.includes('/maps')) return { o: 'zemljevid', v: cilj };
  if (url.hostname !== window.location.hostname) return { o: 'zunanja povezava', v: cilj };
  return null;
};

const obKliku = (dogodek: MouseEvent) => {
  const tarca = dogodek.target as Element | null;
  if (!tarca || !trenutnaPot) return;

  // Explizit markierte Elemente: <button data-track="ime-dogodka">
  const oznacen = tarca.closest('[data-track]') as HTMLElement | null;
  if (oznacen) {
    poslji({ t: 'klik', p: trenutnaPot, o: (oznacen.dataset.track || 'gumb').slice(0, 60) });
    return;
  }

  const povezava = tarca.closest('a[href]') as HTMLAnchorElement | null;
  if (!povezava) return;
  const razvrstitev = razvrstiPovezavo(povezava);
  if (razvrstitev) poslji({ t: 'klik', p: trenutnaPot, ...razvrstitev });
};

let cakaNaOkvir = false;
const obPomiku = () => {
  if (cakaNaOkvir) return;
  cakaNaOkvir = true;
  requestAnimationFrame(() => {
    cakaNaOkvir = false;
    najvecjiPomik = Math.max(najvecjiPomik, izracunajPomik());
  });
};

const obSpremembiVidnosti = () => {
  if (document.visibilityState === 'hidden') {
    zakljuciStran();
  } else if (trenutnaPot && vidnoOd === null) {
    vidnoOd = Date.now();
  }
};

export const zacniSledenje = () => {
  if (zagnano) return;
  zagnano = true;
  document.addEventListener('click', obKliku, { capture: true });
  window.addEventListener('scroll', obPomiku, { passive: true });
  document.addEventListener('visibilitychange', obSpremembiVidnosti);
  window.addEventListener('pagehide', zakljuciStran);
};

// Wird bei jedem Seitenwechsel der SPA aufgerufen
export const beleziOgled = (pot: string) => {
  zacniSledenje();
  if (pot === trenutnaPot) return;

  zakljuciStran();

  trenutnaPot = pot.slice(0, 190);
  nabranCasMs = 0;
  najvecjiPomik = 0;
  vidnoOd = document.visibilityState === 'visible' ? Date.now() : null;

  const podatki: Podatki = {
    t: 'ogled',
    p: trenutnaPot,
    j: (navigator.language || '').slice(0, 5),
    s: window.screen?.width || 0,
  };

  // Herkunft und UTM-Parameter nur beim ersten Aufruf (Einstieg in die Seite)
  if (prviOgled) {
    prviOgled = false;
    podatki.r = zunanjiNapotitelj();
    const parametri = new URLSearchParams(window.location.search);
    podatki.us = parametri.get('utm_source')?.slice(0, 100) || undefined;
    podatki.uc = parametri.get('utm_campaign')?.slice(0, 100) || undefined;
  }

  poslji(podatki);

  // Scrolltiefe nach dem Rendern der neuen Seite neu bestimmen
  setTimeout(() => {
    najvecjiPomik = Math.max(najvecjiPomik, izracunajPomik());
  }, 500);
};

// Allgemeines Ereignis (z. B. Formular gesendet) – nur Bezeichnung, nie Inhalt
export const sledi = (tip: 'obrazec' | 'soglasje' | 'asistent', oznaka: string) => {
  poslji({ t: tip, p: trenutnaPot || window.location.pathname, o: oznaka.slice(0, 60) });
};
