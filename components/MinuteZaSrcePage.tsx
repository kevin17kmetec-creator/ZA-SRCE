import React from 'react';
import { Activity, Tv, FileText, ArrowRight, Video } from 'lucide-react';
import { PageType } from '../types';

interface MinuteZaSrcePageProps {
  onNavigate: (view: PageType) => void;
}

const MinuteZaSrcePage: React.FC<MinuteZaSrcePageProps> = ({ onNavigate }) => {
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
            Minute za srce
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Koristne informacije, zanimivosti in medijske objave.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          
          <div className="p-8 md:p-12">
            
            <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
               <div className="bg-cardio-50 p-2 rounded-lg mr-3">
                 <FileText className="h-6 w-6 text-cardio-600" />
               </div>
               <h2 className="text-2xl font-bold text-trust-900">Zanimivosti</h2>
            </div>

            <div className="space-y-6">

              {/* Item 1: Interview */}
              <div className="group block bg-stone-50 rounded-xl p-6 border border-stone-200 hover:border-cardio-300 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Video className="h-6 w-6 text-cardio-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-trust-900 mb-2 group-hover:text-cardio-600 transition-colors">
                      Intervju prim. Mirko Bombek, dr. med., in doc. dr. Franjo Naji, dr. med.
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                       Na TV Maribor, RTV Slovenija (Omizje: 20 let Društva za zdravje srca in ožilja za Maribor in Podravje)
                    </p>
                    <a 
                       href="https://365.rtvslo.si/arhiv/omizje/174860854" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-cardio-600 font-medium text-sm inline-flex items-center hover:underline"
                    >
                      Poglej posnetek na RTV 365 <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Item 2: Arterijska bolezen */}
              <div className="group bg-stone-50 rounded-xl p-6 border border-stone-200 hover:border-cardio-300 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="h-6 w-6 text-trust-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-trust-900 mb-2 group-hover:text-cardio-600 transition-colors">
                      Kaj je arterijska bolezen nog?
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Strokovni prispevek o simptomih, vzrokih in zdravljenju periferne arterijske bolezni.
                    </p>
                    <a 
                       href="https://www.ezdravje.com/srce-in-zilje/druge-bolezni-srca-in-zilja/arterijska-bolezen-nog/?s=vse&utm_source=301" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-cardio-600 font-medium text-sm inline-flex items-center hover:underline"
                    >
                      Preberi več <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Item 3: Bolečine v nogah */}
              <div className="group bg-stone-50 rounded-xl p-6 border border-stone-200 hover:border-cardio-300 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="h-6 w-6 text-trust-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-trust-900 mb-2 group-hover:text-cardio-600 transition-colors">
                      So bolečine v nogah lahko nevarne?
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Kako prepoznati nevarno bolečino in kdaj obiskati zdravnika.
                    </p>
                    <a 
                       href="http://www.zasrce-mb.si/So-bolecine-v-nogah-lahko-nevarne.pdf" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-cardio-600 font-medium text-sm inline-flex items-center hover:underline"
                    >
                      Prenesi PDF <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MinuteZaSrcePage;