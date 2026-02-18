import React from 'react';
import { Heart, ArrowLeft, Activity, Info } from 'lucide-react';
import { PageType } from '../types';

interface GlezenjskiIndeksPageProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
  source?: 'o-drustvu' | 'dejavnost';
}

const GlezenjskiIndeksPage: React.FC<GlezenjskiIndeksPageProps> = ({ onNavigate, source = 'o-drustvu' }) => {
  
  const handleBack = () => {
    if (source === 'dejavnost') {
      onNavigate('dejavnost');
    } else {
      onNavigate('o-drustvu', 'posvetovalnica-meritve');
    }
  };

  const backLabel = source === 'dejavnost' ? 'Nazaj na Dejavnost' : 'Nazaj na O društvu';

  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-cardio-700 to-trust-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBack}
            className="flex items-center text-cardio-100 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {backLabel}
          </button>
          <div className="flex items-center mb-4">
             <div className="bg-white/10 p-3 rounded-full mr-4">
                <Activity className="h-10 w-10 text-cardio-500" />
             </div>
             <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
               Meritve gleženjskega indeksa (GI)
             </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed text-lg">
            
            {/* Red Highlight Section */}
            <div className="bg-cardio-50 border-l-8 border-cardio-600 p-6 rounded-r-lg">
              <p className="text-cardio-800 font-bold text-lg md:text-xl">
                Farmacevtska družba KRKA nas je podprla v prizadevanjih za odkrivanje in preprečevanje srčnožilnih zapletov pri še posebej ogroženih posameznikih.
              </p>
            </div>

            {/* Main Explanation */}
            <div className="prose prose-lg text-gray-700">
              <p>
                Gre za zgodnje odkrivanje aterosklerotičnih zožitev na arterijah nog z meritvijo pretokov in tlakov s prenosnim ultrazvočnim detektorjem in primerjavo z vrednostjo tlaka na rokah.
              </p>
              <p>
                Gleženjski indeks je tako merilo žilne okvare na nogah, ki se strokovno imenuje <span className="font-semibold text-trust-900">periferna aterosklerotična bolezen</span>, posredno pa merilo splošne okvare žil v telesu, zato je skupna srčnožilna ogroženost (za srčno in možgansko kap) prizadetih oseb bistveno višja.
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="mt-8">
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-xl bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center relative group">
                <img 
                  src="https://picsum.photos/1200/800?grayscale" 
                  alt="Predaja aparata za merjenje gleženjskega indeksa" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-medium text-lg drop-shadow-md">
                   Slika: Predaja aparata (Placeholder)
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center italic">
                Slika: Predaja aparata za določanje pretoka v spodnjih okončinah.
              </p>
            </div>
            
             <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 mt-8 flex items-start">
                <Info className="h-6 w-6 text-cardio-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-trust-900 mb-2">Kdaj na meritev?</h4>
                  <p className="text-sm text-gray-600">
                    Meritve potekajo na sedežu društva (Pobreška c. 8) <span className="font-semibold">vsaki drugi ponedeljek v mesecu med 8. in 10. uro</span>. Zaželena je predhodna prijava v času uradnih ur.
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GlezenjskiIndeksPage;