import React from 'react';
import { Activity, ArrowRight, HeartPulse } from 'lucide-react';
import { PageType } from '../types';

interface DejavnostPageProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const DejavnostPage: React.FC<DejavnostPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4a0404] py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-block mb-4">
             <img 
               src="https://lh3.googleusercontent.com/d/1mazUXuPKrHZMBIF3As1wQEU6E7OV2rAz" 
               alt="Logotip Društva za zdravje srca" 
               className="h-32 w-auto mx-auto object-contain drop-shadow-lg"
               referrerPolicy="no-referrer"
             />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Dejavnost društva
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Naše poslanstvo uresničujemo s širokim naborom strokovnih aktivnosti in preventivnih programov.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 p-8 md:p-12">
          
          <ul className="space-y-6 text-gray-700 leading-relaxed text-lg">
            
            {/* 1. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                S svojimi zdravstvenimi ekipami merimo krvni tlak, holesterol, trigliceride, sladkor v krvi in tudi{' '}
                <button 
                  onClick={() => onNavigate('glezenjski-indeks')}
                  className="text-cardio-600 underline font-medium hover:text-cardio-800 transition-colors cursor-pointer"
                >
                  gleženjski indeks (GI)
                </button>
                {' '}ter ITM.
              </span>
            </li>

            {/* 2. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Na stalnih merilnih mestih in akcijah na terenu merimo srčni utrip in{' '}
                <button 
                  onClick={() => onNavigate('aritmije')}
                  className="text-cardio-600 underline font-medium hover:text-cardio-800 transition-colors cursor-pointer"
                >
                  odkrivamo aritmije z enokanalnim EKG monitorjem
                </button>
                . Meritve izvaja medicinska sestra z dolgoletnimi izkušnjami s kardiološkimi bolniki. V primeru nepravilnosti posnetek pregleda zdravnik in kratko obrazložitev prejmete na dom.
              </span>
            </li>

            {/* 3. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                S svojimi zdravniki, specialisti internisti vam svetujemo, kaj lahko storite za vaše dobro zdravstveno počutje.
              </span>
            </li>

            {/* 4. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Prirejamo tečaje temeljnih postopkov oživljanja z uporabo defibrilatorja.
              </span>
            </li>

            {/* 5. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Sodelujemo pri izvajanju preventivnega zdravstvenega programa na šolah.
              </span>
            </li>

            {/* 6. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Prirejamo predavanja uglednih zdravnikov in drugih zdravstvenih delavcev ter drugih strokovnjakov o skrbi za zdravje.
              </span>
            </li>

            {/* 7. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Pri uresničevanju nacionalnega in regionalnega programa gibanja za zdrav način življenja sodelujemo z občinami, mestnimi četrtmi, krajevnimi skupnostmi, organizacijo Rdečega križa, z društvi upokojencev ter drugimi društvi in organizacijami.
              </span>
            </li>

            {/* 8. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Sodelujemo pri organizaciji rekreativnih prireditev, ki spodbujajo prebivalce, da bi bili telesno dejavni.
              </span>
            </li>

            {/* 9. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Na »srčnih poteh«, na katerih se izvaja hitra hoja na 2 km, vam izmerimo krvni pritisk in srčni utrip, ter na podlagi določnih osebnih podatkov /telesne teže, višine, starosti/ in časa hoje, po posebnem mednarodno priznanem programu izračunamo telesno zmogljivost. Izdamo vam tudi kartonček z ugotovljenim rezultatom, o katerem se lahko posvetujete s prisotnim zdravnikom.
              </span>
            </li>

            {/* 10. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-3 w-3 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                <button 
                  onClick={() => onNavigate('cenik')}
                  className="text-cardio-600 underline font-medium hover:text-cardio-800 transition-colors cursor-pointer"
                >
                  Cenik storitev
                </button>
                {' '}Društva za zdravje srca in ožilja za Maribor in Podravje od 1.4.2023.
              </span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DejavnostPage;