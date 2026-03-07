import React from 'react';

const AccessibilityStatement: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Izjava o dostopnosti</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p className="lead text-xl text-gray-600 mb-8">
          Društvo za zdravje srca in ožilja za Maribor in Podravje se zavezuje, da bo svojo spletno stran naredilo dostopno vsem uporabnikom v skladu z Zakonom o dostopnosti spletišč in mobilnih aplikacij (ZDSMA).
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Stopnja skladnosti</h2>
        <p>
          Ta spletna stran je delno skladna z ZDSMA zaradi spodaj navedenih izjem.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nedostopna vsebina</h2>
        <p>
          Vsebina, navedena spodaj, ni dostopna zaradi nesorazmernega bremena:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Nekateri dokumenti v formatu PDF (skenirani dokumenti) morda niso berljivi z bralniki zaslona.</li>
          <li>Nekatere slike morda nimajo ustreznega alternativnega besedila.</li>
          <li>Video vsebine morda nimajo podnapisov.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Priprava izjave o dostopnosti</h2>
        <p>
          Ta izjava je bila pripravljena 7. marca 2026 na podlagi samoocene.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Povratne informacije in kontaktni podatki</h2>
        <p>
          Če naletite na težave pri dostopu do vsebine na naši spletni strani ali če potrebujete informacije v dostopnejši obliki, nas prosim kontaktirajte na:
        </p>
        <p>
          <strong>E-pošta:</strong> drustvo.za.srce.mb@siol.net<br />
          <strong>Telefon:</strong> 02 228 22 63
        </p>
        <p>
          Na vaše sporočilo bomo odgovorili v roku 8 dni.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Izvršilni postopek</h2>
        <p>
          V primeru nezadovoljivih odgovorov na katero koli obvestilo ali zahtevo, poslano v skladu z 8. členom ZDSMA, lahko podate prijavo inšpektorjem za informacijsko družbo.
        </p>
        <p>
          <strong>Naslov:</strong><br />
          Inšpektorat Republike Slovenije za informacijsko družbo<br />
          Davčna ulica 1<br />
          1000 Ljubljana<br />
          E-pošta: gp.irsid@gov.si
        </p>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
