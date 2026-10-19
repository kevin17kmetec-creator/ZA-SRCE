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
          <li><strong>Anonimna statistika obiska:</strong> obiskane podstrani, čas ogleda, globina pomika, vrsta naprave in brskalnika, jezik brskalnika, spletna stran, s katere ste prišli, ter kliki na kontaktne podatke in dokumente (podrobneje v 4. točki).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Namen obdelave</h2>
        <p>Vaše podatke obdelujemo za naslednje namene:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Odgovarjanje na vaša povpraševanja in komunikacija z vami.</li>
          <li>Obveščanje o dogodkih, meritvah in novicah (če ste se prijavili na e-novice).</li>
          <li>Izvajanje članskih ugodnosti in vodenje evidence članov.</li>
          <li>Izboljšanje uporabniške izkušnje na spletni strani.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Statistika obiska, piškotki in zunanje vsebine</h2>
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Anonimna statistika obiska (brez piškotkov)</h3>
        <p>
          Za izboljšanje spletne strani merimo obisk z lastnim orodjem, ki deluje na našem strežniku. Podatki se ne posredujejo tretjim osebam.
          Orodje na vaši napravi ne shranjuje ničesar (ne uporablja piškotkov ali podobnih tehnologij) in ne shranjuje vašega IP naslova.
          Za štetje obiskovalcev se iz IP naslova in vrste brskalnika izračuna enosmerna kodirana vrednost, ki se vsak dan zamenja,
          zato vas ni mogoče prepoznati niti ob naslednjem obisku niti po imenu.
        </p>
        <p>
          Beležimo le: obiskane podstrani, čas ogleda in globino pomika, vrsto naprave, brskalnika in operacijskega sistema, jezik brskalnika,
          domeno spletne strani, s katere ste prišli, klike na telefonsko številko, e-naslov in dokumente ter dejstvo, da je bil obrazec oddan
          ali vprašanje asistentu zastavljeno. Vsebine obrazcev in vprašanj v statistiko nikoli ne zapisujemo.
        </p>
        <p>
          Pravna podlaga je zakoniti interes društva (6.(1)(f) člen GDPR) za spremljanje uporabe in izboljšanje spletne strani.
          Podrobni zapisi se hranijo največ 90 dni, nato ostanejo le zbirni dnevni podatki (npr. število ogledov posamezne podstrani na dan),
          ki se ne nanašajo na posameznika.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Piškotki</h3>
        <p>Spletna stran sama ne nastavlja analitičnih ali oglaševalskih piškotkov. Uporabljamo le:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Zapis vaše izbire glede piškotkov</strong> (v lokalni shrambi brskalnika), da vas pasica ne sprašuje ob vsakem obisku.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Zunanje vsebine</h3>
        <p>
          Nekatere podstrani vsebujejo vdelane vsebine zunanjih ponudnikov: zemljevid (Google Ireland Ltd.) in video posnetke (RTV Slovenija).
          Ti ponudniki lahko ob prikazu prejmejo vaš IP naslov in nastavijo svoje piškotke. Zato se te vsebine naložijo šele, ko v pasici
          izberete »Sprejmi« ali pri posamezni vsebini kliknete »Prikaži vsebino«. Svojo izbiro lahko kadar koli spremenite prek povezave
          »Nastavitve piškotkov« v nogi strani.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Virtualni asistent</h3>
        <p>
          Vprašanja, ki jih zastavite virtualnemu asistentu, naš strežnik posreduje storitvi Google Gemini (Google Ireland Ltd.), ki pripravi odgovor.
          Pri tem se Googlu ne posreduje vaš IP naslov. Društvo vprašanj ne shranjuje. Prosimo, da v vprašanja ne vpisujete osebnih podatkov
          ali podrobnosti o svojem zdravstvenem stanju.
        </p>

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
          Zadnja posodobitev: oktober 2026.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
