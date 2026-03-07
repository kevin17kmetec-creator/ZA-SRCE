import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Politika zasebnosti</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p className="lead text-xl text-gray-600 mb-8">
          V Društvu za zdravje srca in ožilja za Maribor in Podravje spoštujemo vašo zasebnost in se zavezujemo, da bomo vaše osebne podatke varovali skrbno in v skladu z veljavno zakonodajo (GDPR).
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Upravljavec podatkov</h2>
        <p>
          Upravljavec osebnih podatkov je:<br />
          <strong>Društvo za zdravje srca in ožilja za Maribor in Podravje</strong><br />
          Pobreška cesta 8<br />
          2000 Maribor<br />
          Slovenija<br />
          E-naslov: drustvo.za.srce.mb@siol.net
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Katere podatke zbiramo</h2>
        <p>Zbiramo naslednje vrste osebnih podatkov:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Kontaktni podatki:</strong> Ime, priimek, e-poštni naslov, telefonska številka (če nam jih posredujete preko kontaktnih obrazcev ali e-pošte).</li>
          <li><strong>Podatki o članstvu:</strong> Naslov, datum rojstva in drugi podatki potrebni za vodenje evidence članstva (samo za člane).</li>
          <li><strong>Tehnični podatki:</strong> IP naslov, vrsta brskalnika, čas obiska (preko piškotkov za analitiko).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Namen obdelave</h2>
        <p>Vaše podatke obdelujemo za naslednje namene:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Odgovarjanje na vaša povpraševanja in komunikacija z vami.</li>
          <li>Obveščanje o dogodkih, meritvah in novicah (če ste se prijavili na e-novice).</li>
          <li>Izvajanje članskih ugodnosti in vodenje evidence članov.</li>
          <li>Izboljšanje uporabniške izkušnje na spletni strani.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Piškotki</h2>
        <p>
          Spletna stran uporablja piškotke za zagotavljanje delovanja strani in analitiko. 
          Ob prvem obisku strani vas prosimo za soglasje k uporabi nenujnih piškotkov.
        </p>
        <p>Vrste piškotkov, ki jih uporabljamo:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Nujni piškotki:</strong> Potrebni za tehnično delovanje strani (npr. seja).</li>
          <li><strong>Analitični piškotki:</strong> Za spremljanje statistike obiska (Google Analytics - anonimizirano).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Vaše pravice</h2>
        <p>Skladno z GDPR imate naslednje pravice:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Pravica do dostopa do vaših podatkov.</li>
          <li>Pravica do popravka netočnih podatkov.</li>
          <li>Pravica do izbrisa ("pravica do pozabe").</li>
          <li>Pravica do omejitve obdelave.</li>
          <li>Pravica do prenosljivosti podatkov.</li>
          <li>Pravica do ugovora.</li>
        </ul>
        <p>
          Za uveljavljanje teh pravic nas kontaktirajte na zgoraj navedeni naslov.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Spremembe politike</h2>
        <p>
          Pridržujemo si pravico do spremembe te politike zasebnosti. 
          Zadnja posodobitev: Marec 2026.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
