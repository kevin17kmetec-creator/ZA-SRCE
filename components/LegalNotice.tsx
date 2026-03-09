import React from 'react';

const LegalNotice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Pravno obvestilo (Impressum)</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p className="lead text-xl text-gray-600 mb-8">
          Podatki o upravljavcu spletne strani in društvu.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Društvo za zdravje srca in ožilja za Maribor in Podravje</h2>
        <p>
          <strong>Naslov:</strong> Pobreška cesta 8, 2000 Maribor, Slovenija<br />
          <strong>Telefon:</strong> 02 228 22 63, 02 252 51 51<br />
          <strong>Faks:</strong> 02 228 24 99<br />
          <strong>E-pošta:</strong> drustvo.za.srce.mb@siol.net
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Uradne ure</h2>
        <p>
          <strong>Ponedeljek, torek, četrtek, petek:</strong> 8.00 - 12.00<br />
          <strong>Sreda:</strong> 8.00 - 12.00 in 14.00 - 16.00
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Zakoniti zastopnik</h2>
        <p>
          <strong>Predsednik društva:</strong> prim. Mirko Bombek, dr. med., spec. internist
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Davčna in matična številka</h2>
        <p>
          <strong>Matična številka:</strong> 1436791000<br />
          <strong>Davčna številka:</strong> 70088039<br />
          <strong>Transakcijski račun:</strong> SI56 0417 3000 0592 185 (OTP banka d.d.)
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Odgovornost za vsebino</h2>
        <p>
          Vsebina spletne strani je pripravljena z največjo skrbnostjo. 
          Kljub temu ne prevzemamo odgovornosti za točnost, popolnost in aktualnost vsebine. 
          Kot ponudnik storitev smo odgovorni za lastno vsebino na teh straneh v skladu s splošnimi zakoni.
        </p>
      </div>
    </div>
  );
};

export default LegalNotice;
