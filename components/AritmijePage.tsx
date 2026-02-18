import React from 'react';
import { ArrowLeft, Activity, HeartPulse } from 'lucide-react';
import { PageType } from '../types';

interface AritmijePageProps {
  onNavigate: (view: PageType) => void;
}

const AritmijePage: React.FC<AritmijePageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-trust-900 to-cardio-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('dejavnost')}
            className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Nazaj na Dejavnost
          </button>
          <div className="flex items-center mb-4">
             <div className="bg-white/10 p-3 rounded-full mr-4">
                <HeartPulse className="h-10 w-10 text-cardio-500" />
             </div>
             <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
               Z enokanalnim EKG monitorjem iščemo aritmije
             </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          
          {/* Main Content Section - Dark Red Background Style as requested */}
          <div className="bg-gradient-to-b from-[#4a0404] to-[#7f1d1d] p-8 md:p-12 text-white">
            <h2 className="text-2xl font-bold mb-6 text-cardio-100 border-b border-cardio-800 pb-4">
              Z enokanalnim EKG monitorjem iščemo aritmije
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-100">
              <p>
                Na stalnih merilnih mestih in na akcijah na terenu po poprejšnjem dogovoru snemamo srčni utrip in odkrivamo aritmije z enokanalnim EKG monitorjem, ki takšno motnjo odkrije, če je med snemanjem prisotna.
              </p>
              
              <p>
                V primeru nepravilnosti prejmete posnetek s kratkim komentarjem na dom. Aritmije niso vedno prisotne in njihova diagnostika ni vedno dostopna. Mogoče se na naši akciji razkrije vaša težava!
              </p>

              <div className="bg-black/20 p-6 rounded-xl border border-white/10 mt-8">
                <p>
                  Meritve izvaja medicinska sestra z izkušnjami pri delu s kardiološkimi bolniki ali zdravnik. Rezultate meritev pregleduje <span className="font-bold text-white">prim. Mirko Bombek, dr. med., spec. int. med.</span> in s priloženim posnetkom udeležence meritev, pri katerih ugotovi motnje, napoti na izbranega zdravnika.
                </p>
              </div>

              <p className="font-medium text-cardio-200">
                Do sedaj smo opravili več kot 800 meritev in odkrili več za bolnike pomembnih motenj ritma, izsledke bomo objavili v društveni reviji.
              </p>
            </div>
          </div>
          
          {/* Decorative hearts footer image representation */}
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516616370751-86d6bd8b0651?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}>
             <div className="w-full h-full bg-gradient-to-t from-[#7f1d1d] to-transparent opacity-90"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AritmijePage;