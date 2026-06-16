import React from 'react';
import { Activity, ArrowRight, HeartPulse } from 'lucide-react';
import { PageType } from '../types';

interface DejavnostPageProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const DejavnostPage: React.FC<DejavnostPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Dejavnosti društva
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
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                S svojimi zdravstvenimi ekipami merimo krvni tlak, nasičenost kisika v krvi, holesterol, trigliceride, sladkor v krvi ter ITM.
              </span>
            </li>

            {/* GI Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                <button 
                  onClick={() => onNavigate('glezenjski-indeks')}
                  className="text-cardio-600 underline font-medium hover:text-cardio-800 transition-colors cursor-pointer"
                >
                  gleženjski indeks (GI)
                </button>
                {' '}je hkratna meritev tlakov in pretokov na žilah okončin.
              </span>
            </li>

            {/* 2. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Na stalnih merilnih mestih in akcijah na terenu merimo srčni utrip in{' '}
                <button 
                  onClick={() => onNavigate('aritmije')}
                  className="text-cardio-600 underline font-medium hover:text-cardio-800 transition-colors cursor-pointer"
                >
                  odkrivamo aritmije z enokanalnim EKG monitorjem
                </button>
                .
              </span>
            </li>

            {/* 3. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                S svojimi zdravniki, specialisti vam individualno svetujemo kako ohraniti zdravje in kako ukrepati ob zdravstvenih težavah.
              </span>
            </li>

            {/* 4. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Prirejamo tečaje temeljnih postopkov oživljanja z uporabo defibrilatorja.
              </span>
            </li>

            {/* 5. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Sodelujemo pri izvajanju preventivnega zdravstvenega programa na šolah.
              </span>
            </li>

            {/* 6. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Prirejamo predavanja uglednih zdravnikov, zdravstvenih delavcev ter drugih strokovnjakov o zdravju in boleznih.
              </span>
            </li>

            {/* 7. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Pri uresničevanju nacionalnega in regionalnega programa gibanja za zdrav način življenja sodelujemo z občinami, mestnimi četrtmi, krajevnimi skupnostmi, organizacijo Rdečega križa, z društvi upokojencev ter drugimi društvi in organizacijami.
              </span>
            </li>

            {/* 8. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Sodelujemo pri organizaciji rekreativnih prireditev, ki spodbujajo prebivalce, da bi bili telesno dejavni.
              </span>
            </li>

            {/* 9. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
              <span>
                Na »srčnih poteh«, na katerih se izvaja hitra hoja na 2 km, vam izmerimo krvni pritisk in srčni utrip, ter na podlagi vaše telesne teže, višine, starosti in časa hoje izračunamo telesno zmogljivost.
              </span>
            </li>

            {/* 10. Bullet */}
            <li className="flex items-start">
              <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-600 mr-4"></span>
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