import React from 'react';
import { Heart, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { PageType } from '../types';

interface PosvetovalnicaPageProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
  source?: 'o-drustvu' | 'ugodnosti';
}

const PosvetovalnicaPage: React.FC<PosvetovalnicaPageProps> = ({ onNavigate, source = 'o-drustvu' }) => {
  
  const handleBackClick = () => {
    if (source === 'ugodnosti') {
      onNavigate('ugodnosti');
    } else {
      onNavigate('o-drustvu', 'posvetovalnica-meritve');
    }
  };

  const backLabel = source === 'ugodnosti' 
    ? 'Nazaj na Kaj prinaša članstvo' 
    : 'Nazaj na O društvu';

  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-cardio-700 to-trust-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBackClick}
            className="flex items-center text-cardio-100 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {backLabel}
          </button>
          <div className="flex items-center mb-4">
             <div className="bg-white/10 p-3 rounded-full mr-4">
                <Heart className="h-10 w-10 text-cardio-500 fill-current" />
             </div>
             <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
               Posvetovalnica ZA SRCE
             </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          <div className="p-8 md:p-12 space-y-6 text-gray-700 leading-relaxed text-lg">
            
            <p>
              <span className="font-bold text-trust-900">»Posvetovalnica ZA SRCE«</span> v okviru Društva za zdravje srca in ožilja je odprla svoja vrata ob Svetovnem dnevu srca, leta 2011, na tedanji lokaciji društva na Partizanski cesti 12/II.
            </p>

            <p>
              Takšne samostojne posvetovalnice so spoznali že v različnih krajih Slovenije, mi pa smo svetovanje priključili meritvam dejavnikov tveganja na terenu. Sedaj smo na <span className="font-semibold text-trust-900">novi lokaciji, na Pobreški cesti 8</span>, zbrali ekipo zdravnikov, ki bodo delali menjaje.
            </p>

            <div className="bg-red-50 border-l-4 border-cardio-500 p-6 my-8 italic">
              "Želimo, da bi ljudje zastavljali vprašanja, kako preprečiti srčnožilne bolezni, šele nato kako jih zdraviti."
            </div>

            <p>
              Vsi, ki delamo z bolniki vemo, da jih muči veliko vprašanj, dvomov in bojazni, ki jih lahko odpravimo že s kratkim zaupnim pogovorom. Našim članom in nečlanom nudimo željeno pomoč, radi pojasnjujemo in razjasnjujemo, vendar si posvetovalnice nismo zamislili kot ambulanto za drugo mnenje oz. izvedenska mnenja in ne izdajamo izvidov.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                <h3 className="font-bold text-trust-900 flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-cardio-500 mr-2" />
                  Prijave
                </h3>
                <p className="text-sm">
                  Prijave sprejemamo na sedežu društva v času uradnih ur. Člani našega društva bodo imeli prednost pred drugimi zainteresiranimi, če bo število prijavljenih preveliko.
                </p>
              </div>

              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                <h3 className="font-bold text-trust-900 flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-cardio-500 mr-2" />
                  Lokacija in Parkiranje
                </h3>
                <p className="text-sm">
                  Na sedežu društva Pobreška c. 8 so prostori v pritličju in prvem nadstropju, v bližini je avtobusno postajališče. Tisti, ki radi nakupujejo lahko parkirajo pri Europarku, sicer pa tudi v garažni hiši UKC Maribor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosvetovalnicaPage;