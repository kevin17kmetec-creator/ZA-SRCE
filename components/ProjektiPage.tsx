import React from 'react';
import { Target, ClipboardList } from 'lucide-react';
import { PageType } from '../types';

interface ProjektiPageProps {
  onNavigate: (view: PageType) => void;
}

const ProjektiPage: React.FC<ProjektiPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-trust-900 py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-white/10 p-4 rounded-full inline-block mb-6">
            <ClipboardList className="h-12 w-12 text-cardio-500" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Naši projekti (2022–2026)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pregled ključnih projektov, s katerimi uresničujemo naše poslanstvo v obdobju 2022–2026.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          <div className="p-8 md:p-12">
            
            <div className="space-y-8">
              
              {/* Project 1 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt splošne preventive in zdravstvenega osveščanja prebivalstva</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-cardio-700">Nosilci:</span> prim. Mirko BOMBEK, dr. med., spec. int. med., Vasil KOSEV, dr. med., spec. anest. in reanimat.
                  </p>
                </div>
              </div>

              {/* Project 2 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt temeljnih postopkov oživljanja</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-cardio-700">Nosilec:</span> prim. Marko BOMBEK, dr. med., spec. int. med.
                  </p>
                </div>
              </div>

              {/* Project 3 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt za zdravje mladih</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-cardio-700">Nosilec:</span> prof. dr. Jernej ZAVRŠNIK, dr. med., spec. ped., prim.
                  </p>
                </div>
              </div>

              {/* Project 4 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt možganskožilne bolezni</h3>
                </div>
              </div>

              {/* Project 5 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt gibanje za zdravje</h3>
                   <p className="text-gray-600">
                    <span className="font-semibold text-cardio-700">Nosilec:</span> Matej LUBEJ, prof. šp. vzg.
                  </p>
                </div>
              </div>

              {/* Project 6 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    6
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt zdrave prehrane</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-cardio-700">Nosilka:</span> dr. Blanka VOMBERGAR, univ. dipl. inž. živ. tehnol.
                  </p>
                </div>
              </div>

              {/* Project 7 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    7
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Projekt ugotavljanja zdravstvenega stanja prebivalstva in meritev dejavnikov tveganja</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold text-cardio-700">Nosilka:</span> Ljudmila ŠTEGER, inž. kem. tehnol.
                  </p>
                </div>
              </div>

              {/* Project 8 */}
              <div className="flex flex-col md:flex-row md:items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    8
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Informacijsko publicistična dejavnost</h3>
                </div>
              </div>

              {/* Project 9 */}
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardio-50 text-cardio-600 font-bold text-xl border border-cardio-100">
                    9
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-trust-900 mb-2">Sekcija študentov in diplomantov medicine in zdravstvenih ved UM</h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjektiPage;