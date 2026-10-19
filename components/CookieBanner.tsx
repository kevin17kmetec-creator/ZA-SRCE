import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PageType } from '../types';
import { nastaviSoglasje, preberiSoglasje, naOdpiranjeNastavitev } from '../services/consentService';
import { sledi } from '../services/analyticsService';

interface CookieBannerProps {
  onNavigate: (view: PageType) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Banner nur zeigen, solange noch keine Wahl getroffen wurde
    if (!preberiSoglasje()) {
      setIsVisible(true);
    }
    // Über "Nastavitve piškotkov" im Footer erneut öffnen
    return naOdpiranjeNastavitev(() => setIsVisible(true));
  }, []);

  const izberi = (vrednost: 'accepted' | 'rejected') => {
    nastaviSoglasje(vrednost);
    // Nur die Wahl wird gezählt (anonym), damit die Statistik zeigt, wie viele zustimmen
    sledi('soglasje', vrednost === 'accepted' ? 'sprejeto' : 'zavrnjeno');
    setIsVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('privacy-policy');
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Piškotki in zasebnost"
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 z-[100] shadow-xl border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Piškotki in zasebnost</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Naša spletna stran sama uporablja le nujne tehnične podatke, statistiko obiska pa merimo anonimno in brez piškotkov.
            Z vašim soglasjem prikažemo tudi zunanje vsebine (Google zemljevid in video posnetke RTV Slovenija), ki lahko nastavijo
            svoje piškotke. Izbiro lahko kadar koli spremenite v nogi strani pod »Nastavitve piškotkov«.
            Več v <a href="/privacy-policy" onClick={handlePrivacyClick} className="underline hover:text-cardio-400">politiki zasebnosti</a>.
          </p>
        </div>
        <div className="flex flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => izberi('rejected')}
            className="flex-1 md:flex-none px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Zavrni
          </button>
          <button
            onClick={() => izberi('accepted')}
            className="flex-1 md:flex-none px-6 py-2 bg-cardio-600 hover:bg-cardio-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
          >
            Sprejmi
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Zapri"
          className="absolute top-2 right-2 text-gray-500 hover:text-white md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
