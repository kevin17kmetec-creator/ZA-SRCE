import { useEffect, useState } from 'react';

// Zentrale Verwaltung der Cookie-Einwilligung.
// Die Wahl selbst wird in localStorage gespeichert – das ist technisch notwendig,
// damit das Banner nicht bei jedem Besuch erneut erscheint.

export type Soglasje = 'accepted' | 'rejected' | null;

const KLJUC = 'cookie-consent';
const DOGODEK_SPREMEMBA = 'zs-soglasje-spremenjeno';
const DOGODEK_ODPRI = 'zs-odpri-nastavitve-piskotkov';

export const preberiSoglasje = (): Soglasje => {
  try {
    const vrednost = localStorage.getItem(KLJUC);
    return vrednost === 'accepted' || vrednost === 'rejected' ? vrednost : null;
  } catch {
    // localStorage nicht verfügbar (privater Modus o. Ä.) – wie "keine Wahl" behandeln
    return null;
  }
};

export const nastaviSoglasje = (vrednost: 'accepted' | 'rejected') => {
  try {
    localStorage.setItem(KLJUC, vrednost);
  } catch {
    // Ignorieren – die Wahl gilt dann nur für diese Sitzung
  }
  window.dispatchEvent(new CustomEvent(DOGODEK_SPREMEMBA, { detail: vrednost }));
};

// Öffnet das Banner erneut (z. B. über den Link "Nastavitve piškotkov" im Footer),
// damit Besucher ihre Einwilligung jederzeit widerrufen oder ändern können.
export const odpriNastavitvePiskotkov = () => {
  window.dispatchEvent(new CustomEvent(DOGODEK_ODPRI));
};

export const naOdpiranjeNastavitev = (povratniKlic: () => void) => {
  window.addEventListener(DOGODEK_ODPRI, povratniKlic);
  return () => window.removeEventListener(DOGODEK_ODPRI, povratniKlic);
};

// React-Hook: liefert die aktuelle Einwilligung und reagiert auf Änderungen
export const useSoglasje = (): Soglasje => {
  const [soglasje, setSoglasje] = useState<Soglasje>(() => preberiSoglasje());

  useEffect(() => {
    const obSpremembi = () => setSoglasje(preberiSoglasje());
    window.addEventListener(DOGODEK_SPREMEMBA, obSpremembi);
    return () => window.removeEventListener(DOGODEK_SPREMEMBA, obSpremembi);
  }, []);

  return soglasje;
};
