import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Splošni pogoji poslovanja</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p className="lead text-xl text-gray-600 mb-8">
          Dobrodošli na spletni strani Društva za zdravje srca in ožilja za Maribor in Podravje. 
          Z uporabo te spletne strani se strinjate s spodaj navedenimi pogoji.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Splošno</h2>
        <p>
          Spletna stran je namenjena informiranju javnosti o dejavnostih društva, zdravju srca in ožilja ter preventivi. 
          Vsebina na spletni strani je informativne narave in ne nadomešča strokovnega zdravniškega nasveta.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Odgovornost</h2>
        <p>
          Društvo si prizadeva za točnost in ažurnost objavljenih informacij, vendar ne prevzema odgovornosti za morebitne napake ali pomanjkljivosti. 
          Uporaba informacij s te spletne strani je na lastno odgovornost uporabnika.
        </p>
        <p>
          Društvo ne odgovarja za škodo, ki bi nastala zaradi uporabe ali nezmožnosti uporabe te spletne strani.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Avtorske pravice</h2>
        <p>
          Vsa vsebina na spletni strani (besedila, slike, logotipi) je last Društva za zdravje srca in ožilja za Maribor in Podravje ali pa ima društvo pravico do njene uporabe. 
          Reprodukcija, distribucija ali druga uporaba vsebine brez predhodnega pisnega dovoljenja društva je prepovedana.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Povezave do drugih strani</h2>
        <p>
          Spletna stran lahko vsebuje povezave do drugih spletnih strani, ki niso v lasti ali pod nadzorom društva. 
          Društvo ne odgovarja za vsebino ali politiko zasebnosti na teh straneh.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Spremembe pogojev</h2>
        <p>
          Društvo si pridržuje pravico do spremembe teh splošnih pogojev kadarkoli in brez predhodnega obvestila. 
          Spremembe stopijo v veljavo z dnem objave na spletni strani.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Reševanje sporov</h2>
        <p>
          Morebitne spore, ki bi nastali v zvezi z uporabo te spletne strani, bosta stranki reševali sporazumno. 
          Če to ne bo mogoče, je za reševanje sporov pristojno sodišče v Mariboru.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
