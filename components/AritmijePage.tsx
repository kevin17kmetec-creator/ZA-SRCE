import React from 'react';
import { ArrowLeft, Activity, HeartPulse } from 'lucide-react';
import { PageType } from '../types';

interface AritmijePageProps {
  onNavigate: (view: PageType) => void;
}

const AritmijePage: React.FC<AritmijePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#4a0404] py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
             <img 
               src="https://lh3.googleusercontent.com/d/11rKJiQHB8HSHQcpf88ejOyx41HoAznhk" 
               alt="Logotip Društva za zdravje srca" 
               className="h-16 md:h-24 w-auto mx-auto object-contain drop-shadow-lg"
               referrerPolicy="no-referrer"
             />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Z enokanalnim EKG monitorjem iščemo aritmije
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Odkrivanje motenj srčnega ritma na terenu in stalnih merilnih mestih.
          </p>
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
          
          {/* Decorative footer image */}
          <div className="h-64 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/d/1j4s0ryRSul4UqoAgg1n5B3M9PchndONC")' }}>
             <div className="w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AritmijePage;