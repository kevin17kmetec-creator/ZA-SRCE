import React from 'react';
import { MapPin, Clock, Activity, Mic2, Heart, Users, Phone } from 'lucide-react';
import { PageType } from '../types';

interface AboutPageProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4a0404] py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
             <img 
               src="https://lh3.googleusercontent.com/d/1mazUXuPKrHZMBIF3As1wQEU6E7OV2rAz" 
               alt="Logotip Društva za zdravje srca" 
               className="h-32 w-auto mx-auto object-contain drop-shadow-lg"
               referrerPolicy="no-referrer"
             />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            O društvu
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Društvo za zdravje srca in ožilja za Maribor in Podravje deluje v javnem interesu že več kot 20 let.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Info Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border-t-4 border-cardio-600">
          <div className="p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-trust-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-cardio-600 mr-2" />
              Lokacija in dostopnost
            </h2>
            
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p className="text-lg leading-relaxed">
                Z veseljem in ponosom sporočamo, da so naši društveni prostori na Pobreški cesti 8 
                (<a 
                  href="https://www.google.com/maps/place/Pobre%C5%A1ka+cesta+8,+2000+Maribor,+Slovenija/@46.554273,15.6464886,188m/data=!3m1!1e3!4m6!3m5!1s0x476f77a7075fd30d:0x5517f59777822351!8m2!3d46.5542952!4d15.6469012!16s%2Fg%2F11q2nd7gln?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cardio-500 underline hover:text-cardio-600 font-medium transition-colors"
                >
                  satelitska slika lokacije
                </a>), 
                v pritličju in prvem nadstropju novejše, primernejše in lažje dostopne stavbe.
              </p>
              <p>
                Prostori so v bližini UKC Maribor in nasproti Medicinske fakultete Univerze v Mariboru. 
                V neposredni bližini je tudi avtobusno postajališče mestnega prometa. V prostorih je sedež društva, 
                stalno merilno mesto dejavnikov tveganja in Posvetovalnica za zdravo življenje. 
                Prostore nam je uspelo pridobiti z vztrajnostjo in velikim razumevanjem Mestne občine Maribor!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Measurements Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100">
             <h3 className="text-xl font-bold text-trust-900 mb-6 flex items-center">
               <Activity className="h-6 w-6 text-cardio-600 mr-2" />
               Stalna merilna mesta in urniki
             </h3>
             <p className="text-gray-600 mb-4">Na stalnih merilnih mestih svetuje zdravnik in sicer:</p>
             <ul className="space-y-4 text-sm md:text-base">
               <li className="flex items-start p-3 bg-stone-50 rounded-lg">
                 <Clock className="h-5 w-5 text-cardio-500 mr-3 mt-0.5 flex-shrink-0" />
                 <span>
                   <strong className="block text-trust-900">Prvo soboto vsak drugi mesec</strong>
                   v prostorih Društva upokojencev Maribor Center, med 7.30 in 10.30 uro (Slomškov trg 5).
                 </span>
               </li>
               <li className="flex items-start p-3 bg-stone-50 rounded-lg">
                 <Clock className="h-5 w-5 text-cardio-500 mr-3 mt-0.5 flex-shrink-0" />
                 <span>
                   <strong className="block text-trust-900">Vsak prvi torek v mesecu</strong>
                   v prostorih Društva upokojencev Tabor, med 7.30 in 10.30 uro (Gorkega ul. 48).
                 </span>
               </li>
               <li className="flex items-start p-3 bg-stone-50 rounded-lg">
                 <Clock className="h-5 w-5 text-cardio-500 mr-3 mt-0.5 flex-shrink-0" />
                 <span>
                   <strong className="block text-trust-900">Vsako prvo sredo v mesecu</strong>
                   v prostorih Mestne četrti Pobrežje, med 7.30 in 9.30 uro (Kosovelova ul. 11).
                 </span>
               </li>
               <li className="flex items-start p-3 bg-stone-50 rounded-lg">
                 <Clock className="h-5 w-5 text-cardio-500 mr-3 mt-0.5 flex-shrink-0" />
                 <span>
                   <strong className="block text-trust-900">Vsak drugi ponedeljek v mesecu</strong>
                   na sedežu društva, med 8.00 in 10.00 uro (Pobreška cesta 8).
                 </span>
               </li>
             </ul>
          </div>

          {/* Activities & Consulting */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100">
               <h3 className="text-xl font-bold text-trust-900 mb-4 flex items-center">
                 <Mic2 className="h-6 w-6 text-cardio-600 mr-2" />
                 Predavanja
               </h3>
               <p className="text-gray-600">
                 Naša predavanja so v prostorih Medicinske fakultete UM, Taborska ulica 8. 
                 Parkirate lahko ob medicinski fakulteti. Vstop na predavanja je za člane in nečlane prost, 
                 vljudno vabljeni člani društva, koronarnega kluba, simpatizerji in vsi, ki jih takšna predavanja zanimajo.
               </p>
            </div>

            {/* Added ID for scrolling target */}
            <div id="posvetovalnica-meritve" className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-cardio-500 scroll-mt-28">
               <h3 className="text-xl font-bold text-trust-900 mb-4 flex items-center">
                 <Heart className="h-6 w-6 text-cardio-500 mr-2" />
                 Posvetovalnica in Meritve
               </h3>
               <p className="text-gray-600 mb-3">
                 Na sedežu društva na Pobreški cesti 8 deluje{' '}
                 <button 
                   onClick={() => onNavigate('posvetovalnica')} 
                   className="text-cardio-500 underline hover:text-cardio-600 font-medium transition-colors"
                 >
                   Posvetovalnica ZA SRCE
                 </button>{' '}
                 vsako drugo sredo v mesecu med 14. in 16. uro.
               </p>
               <p className="text-gray-600 mb-3">
                 Na sedežu društva potekajo tudi meritve{' '}
                 <button 
                   onClick={() => onNavigate('glezenjski-indeks')}
                   className="text-cardio-500 underline hover:text-cardio-600 font-medium transition-colors"
                 >
                   gleženjskega indeksa (GI)
                 </button>{' '}
                 vsaki drugi ponedeljek v mesecu med 8. in 10. uro.
                 Za posvet z zdravnikom in meritve GI se prijavite v času uradnih ur.
               </p>
               <div className="mt-4 p-3 bg-red-50 rounded text-sm text-cardio-800">
                 <strong>Dodatno:</strong> Na sedežu društva izvajamo meritve krvnega tlaka, sladkorja, holesterola, trigliceridov in EKG, vsak drugi ponedeljek v mesecu med 8. in 10. uro.
               </div>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-trust-900 text-white rounded-2xl p-8 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
           <div className="mb-6 md:mb-0">
             <h3 className="text-xl font-bold mb-2 flex items-center">
               <Phone className="h-5 w-5 mr-2" />
               Kontakt in informacije
             </h3>
             <p className="text-gray-300">
               Pokličete nas lahko na <strong>02/228-22-63</strong> v času uradnih ur (pon 8-10, sre 9-14).
             </p>
             <p className="text-gray-300 mt-1">
               Ali na elektronsko pošto: <a href="mailto:tajnistvo@zasrce-mb.si" className="text-cardio-400 underline hover:text-cardio-300 font-medium transition-colors">tajnistvo@zasrce-mb.si</a>
             </p>
           </div>
           <div className="text-right text-sm text-gray-400 max-w-xs">
             <p>Vse akcije in prireditve redno objavljamo v dnevniku VEČER in po Radiu Maribor.</p>
           </div>
        </div>

        {/* Leadership Section */}
        <div className="space-y-8">
           <div className="flex items-center mb-6">
             <div className="p-2 bg-cardio-50 rounded-lg mr-3">
               <Users className="h-6 w-6 text-cardio-600" />
             </div>
             <h2 className="text-2xl font-bold text-trust-900">Vodstvo in organi društva (2022–2026)</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             
             {/* Vodstvo */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-trust-800">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Vodstvo</h4>
               <ul className="space-y-3 text-sm text-gray-700">
                 <li><span className="font-semibold block">Predsednik:</span> Prim. Mirko BOMBEK</li>
                 <li><span className="font-semibold block">Podpredsednik:</span> Vasil KOSEV</li>
               </ul>
             </div>

             {/* Nadzorni odbor */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-400">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Nadzorni odbor</h4>
               <ul className="space-y-2 text-sm text-gray-700">
                 <li>1. Romana FIŠER, predsednica</li>
                 <li>2. Boris FATUR, član</li>
                 <li>3. Alojz KOVAČIČ, član</li>
               </ul>
             </div>

             {/* Upravni odbor */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-cardio-600 md:col-span-2 lg:col-span-1">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Upravni odbor</h4>
               <ul className="space-y-1 text-sm text-gray-700 grid grid-cols-1 gap-x-4">
                 <li>1. Prim. Mirko BOMBEK</li>
                 <li>2. Marko BOMBEK</li>
                 <li>3. Jana DRAGAR</li>
                 <li>4. Petra HOJNIK</li>
                 <li>5. Mojca KIRBIŠ</li>
                 <li>6. Viš. predav. dr. Ljudmila KOLENC</li>
                 <li>7. Vasil KOSEV</li>
                 <li>8. Matej LUBEJ</li>
                 <li>9. Marjan MAKARI</li>
                 <li>10. Ljudmila ŠTEGER</li>
                 <li>11. Dr. Blanka VOMBERGAR</li>
                 <li>12. Prim. prof. dr. Jernej ZAVRŠNIK</li>
                 <li>13. Bojana ZORNIK</li>
                 <li>14. Jože ŽMAUC</li>
               </ul>
             </div>

             {/* Strokovni svet */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600 md:col-span-2 lg:col-span-1">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Strokovni svet</h4>
               <ul className="space-y-1 text-sm text-gray-700">
                 <li>1. Prim. Mirko BOMBEK</li>
                 <li>2. Marko BOMBEK</li>
                 <li>3. Jana DRAGAR</li>
                 <li>4. Mojca KIRBIŠ</li>
                 <li>5. Matej LUBEJ</li>
                 <li>6. Ljudmila ŠTEGER</li>
                 <li>7. Dr. Blanka VOMBERGAR</li>
                 <li>8. Prim. prof. dr. Jernej ZAVRŠNIK</li>
               </ul>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;