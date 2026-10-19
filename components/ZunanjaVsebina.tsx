import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { nastaviSoglasje, useSoglasje } from '../services/consentService';

// Platzhalter für eingebettete Fremdinhalte (Google Maps, RTV-Video …).
// Der iframe wird erst geladen, wenn der Besucher zugestimmt hat –
// entweder allgemein über das Cookie-Banner oder einmalig per Klick.

interface ZunanjaVsebinaProps {
  ponudnik: string;
  opis: string;
  povezava?: { besedilo: string; url: string };
  temno?: boolean;
  children: React.ReactNode;
}

const ZunanjaVsebina: React.FC<ZunanjaVsebinaProps> = ({ ponudnik, opis, povezava, temno, children }) => {
  const soglasje = useSoglasje();
  const [enkratno, setEnkratno] = useState(false);

  if (soglasje === 'accepted' || enkratno) {
    return <>{children}</>;
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center p-6 text-center ${
        temno ? 'bg-trust-900 text-stone-200' : 'bg-stone-100 text-trust-800'
      }`}
    >
      <div className="max-w-md">
        <ShieldCheck className={`mx-auto mb-3 h-10 w-10 ${temno ? 'text-cardio-500' : 'text-cardio-600'}`} />
        <p className="font-semibold mb-2">{opis}</p>
        <p className={`text-sm mb-5 ${temno ? 'text-stone-400' : 'text-stone-600'}`}>
          Vsebina se naloži s strežnika {ponudnik}, ki lahko nastavi svoje piškotke.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setEnkratno(true)}
            className="px-5 py-2 bg-cardio-600 hover:bg-cardio-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Prikaži vsebino
          </button>
          <button
            onClick={() => nastaviSoglasje('accepted')}
            className={`px-5 py-2 text-sm font-medium rounded-lg border transition-colors ${
              temno ? 'border-stone-500 hover:bg-white/10' : 'border-stone-300 hover:bg-white'
            }`}
          >
            Vedno dovoli
          </button>
        </div>
        {povezava && (
          <a
            href={povezava.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm underline hover:text-cardio-600"
          >
            {povezava.besedilo}
          </a>
        )}
      </div>
    </div>
  );
};

export default ZunanjaVsebina;
