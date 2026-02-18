import React from 'react';
import { Gift, ArrowLeft, Check } from 'lucide-react';
import { PageType } from '../types';

interface MembershipBenefitsPageProps {
  onNavigate: (view: PageType) => void;
}

const MembershipBenefitsPage: React.FC<MembershipBenefitsPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-cardio-700 to-trust-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('clanstvo')}
            className="flex items-center text-cardio-100 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Nazaj na Članstvo
          </button>
          <div className="flex items-center mb-4">
             <div className="bg-white/10 p-3 rounded-full mr-4">
                <Gift className="h-10 w-10 text-cardio-500" />
             </div>
             <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
               Kaj prinaša članstvo v društvu
             </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          
          {/* Header Strip inside card */}
          <div className="bg-trust-900 px-8 py-6 border-b border-trust-800">
            <h2 className="text-xl font-bold text-white flex items-center">
              Seznam ugodnosti za člane
            </h2>
          </div>

          <div className="p-8 md:p-12">
            <ul className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Brezplačno prejemanje mesečne revije slovenskega društva ZA SRCE.</span>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Enkrat na leto boste prejeli revijo Mariborski srčni utrip.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Brezplačno merjenje krvnega pritiska.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Popust pri meritvah sladkorja, holesterola in trigliceridov v krvi.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">
                  Popust pri snemanju srčnega utripa s priročnim EKG, meritvah gleženjskega indeksa in v{' '}
                  <button 
                    onClick={() => onNavigate('posvetovalnica')}
                    className="text-cardio-600 font-bold underline hover:text-cardio-800 transition-colors cursor-pointer"
                  >
                    Posvetovalnici ZA SRCE
                  </button>.
                </span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Brezplačna predavanja o preprečevanju srčnožilnih in možganskožilnih bolezni.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Brezplačna predavanja o zdravi prehrani.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Brezplačne teste telesne zmogljivosti v hitri hoji na 2 km po »Srčni poti« z izpisom rezultatov in navodil ter posvetom z zdravnikom.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Brezplačne organizirane pohode v naravo.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Ogled vsakoletne kulturne prireditve v Slovenskem narodnem gledališču Maribor po zelo ugodni ceni vstopnice.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Možnost udeležbe na vsakoletni strokovni ekskurziji.</span>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-6 w-6 text-cardio-600 bg-red-50 rounded-full p-1" />
                </div>
                <span className="ml-4">Člani društva za zdravje srca in ožilja za Maribor in Podravje imajo tudi druge ugodnosti navedene v februarski reviji ZA SRCE slovenskega društva.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipBenefitsPage;