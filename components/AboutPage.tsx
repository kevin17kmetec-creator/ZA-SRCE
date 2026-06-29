import React from 'react';
import { MapPin, Clock, Activity, Mic2, Heart, Users, Phone, History } from 'lucide-react';
import { PageType } from '../types';

interface AboutPageProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
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
                Naši društveni prostori so na Pobreški cesti 8 
                (<a 
                  href="https://www.google.com/maps/place/Pobre%C5%A1ka+cesta+8,+2000+Maribor,+Slovenija/@46.554273,15.6464886,188m/data=!3m1!1e3!4m6!3m5!1s0x476f77a7075fd30d:0x5517f59777822351!8m2!3d46.5542952!4d15.6469012!16s%2Fg%2F11q2nd7gln?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cardio-500 underline hover:text-cardio-600 font-medium transition-colors"
                >
                  satelitska slika lokacije
                </a>), 
                v pritličju in prvem nadstropju.
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
          
          {/* History Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100 lg:col-span-2">
             <h3 className="text-xl font-bold text-trust-900 mb-4 flex items-center">
               <History className="h-6 w-6 text-cardio-600 mr-2" />
               Naša zgodovina
             </h3>
             <p className="text-gray-600 text-lg">
               Društvo za zdravje srca in ožilja za Maribor in Podravje je bilo ustanovljeno leta 2002. 
               V dveh desetletjih delovanja smo izvedli več kot 1000 preventivnih akcij in pomagali tisočim 
               občanom pri zgodnjem odkrivanju dejavnikov tveganja.
             </p>
          </div>

          {/* Glavna področja dela Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100 lg:col-span-2">
             <h3 className="text-xl font-bold text-trust-900 mb-4 flex items-center">
               <Activity className="h-6 w-6 text-cardio-600 mr-2" />
               Glavna področja dela
             </h3>
             <p className="text-gray-600 text-lg">
               Društvo za zdravje srca in ožilja za Maribor in Podravje izvaja aktivnosti na področju 
               zdravstvene preventive in promocije zdravega življenjskega sloga. Organiziramo in izvajamo 
               preventivne meritve srčno-žilnih dejavnikov tveganja (krvni tlak, sladkor, holesterol, 
               trigliceridi, EKG monitor, gleženjski indeks …), individualna svetovanja, predavanja, 
               delavnice, pohode in druge aktivnosti za ohranjanje zdravja srca in ožilja.
             </p>
          </div>

          {/* O nas Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100 lg:col-span-2">
             <h3 className="text-xl font-bold text-trust-900 mb-4 flex items-center">
               <Users className="h-6 w-6 text-cardio-600 mr-2" />
               O nas
             </h3>
             <div className="text-gray-600 text-lg space-y-4">
               <p>
                 Društvo za zdravje srca in ožilja za Maribor in Podravje deluje od leta 2002 kot samostojno Društvo (v nadaljevanju Društvo ZA SRCE Maribor), s sedežem v Mariboru, Pobreška cesta 8.
               </p>
               <p>
                 Društvo ZA SRCE Maribor deluje s statusom humanitarne organizacije na področju zdravstvene preventive in statusom društva posebnega družbenega pomena na področju zdravja. Izvaja nacionalni program preventive bolezni srca in ožilja na območju Mestne občine Maribor in 27 občin Podravja ter območju, ki ga pokrivajo Univerzitetni klinični center Maribor, Zdravstveni dom dr. Adolfa Drolca Maribor, Zdravstveni dom Lenart in Zdravstveni dom Slovenska Bistrica.
               </p>
               <p>
                 Naše društvo sodeluje z Društvom za zdravje srca in ožilja Slovenije, s Koronarnim klubom Maribor, z Društvom živilskih in prehranskih strokovnih delavcev SV Slovenije, z Društvom bolnikov po možganski kapi in Društvom diabetikov Maribor ter Društvom Glog iz Miklavža na Dravskem polju.
               </p>
               <p>
                 Pomembno je sodelovanje z Medicinsko fakulteto Univerze v Mariboru in UKC Maribor in Zdravstveni dom dr. Adolfa Drolca Maribor.
               </p>
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
               Pokličete nas lahko na <strong>02/228-22-63</strong> v času uradnih ur (ponedeljek od 9 do 12 ure in sredo od 9 do 14 ure).
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
             <h2 className="text-2xl font-bold text-trust-900">Vodstvo in organi društva (2026)</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             
             {/* Vodstvo */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-trust-800">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Vodstvo</h4>
               <ul className="space-y-3 text-sm text-gray-700">
                 <li><span className="font-semibold block">Predsednik:</span> Mirko BOMBEK</li>
                 <li><span className="font-semibold block">Podpredsednik:</span> Vasil KOSEV</li>
               </ul>
             </div>

             {/* Nadzorni odbor */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-400">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Nadzorni odbor</h4>
               <ul className="space-y-2 text-sm text-gray-700">
                 <li>1. Romana FIŠER - predsednik</li>
                 <li>2. Zdenka PAŠIČ - član</li>
                 <li>3. Boris FATUR - član</li>
               </ul>
             </div>

             {/* Upravni odbor */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-cardio-600 md:col-span-2 lg:col-span-1">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Upravni odbor</h4>
               <ul className="space-y-1 text-sm text-gray-700 grid grid-cols-1 gap-x-4">
                 <li>1. Mirko BOMBEK</li>
                 <li>2. Jana DRAGAR</li>
                 <li>3. Petra HOJNIK</li>
                 <li>4. Ljudmila KOLENC</li>
                 <li>5. Vasil KOSEV</li>
                 <li>6. Franc KRIŠTOFELC</li>
                 <li>7. Matej LUBEJ</li>
                 <li>8. Marjan MAKARI</li>
                 <li>9. Blanka VOMBERGAR</li>
                 <li>10. Jernej ZAVRŠNIK</li>
                 <li>11. Bojana ZORNIK</li>
                 <li>12. 2. podpredsednik (NEDOLOČEN)</li>
                 <li>13. direktor – strokovni sodel. (NEDOLOČEN)</li>
               </ul>
             </div>

             {/* Strokovni svet */}
             <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600 md:col-span-2 lg:col-span-1">
               <h4 className="text-lg font-bold text-trust-900 mb-4 border-b pb-2">Strokovni svet</h4>
               <ul className="space-y-1 text-sm text-gray-700">
                 <li>1. Prim. Mirko BOMBEK</li>
                 <li>2. Jana DRAGAR</li>
                 <li>3. Matej LUBEJ</li>
                 <li>4. Dr. Blanka VOMBERGAR</li>
                 <li>5. Prim. prof. dr. Jernej ZAVRŠNIK</li>
                 <li>6. Bojana ZORNIK</li>
               </ul>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;