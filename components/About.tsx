import React from 'react';
import { Target, Users, History, FileCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <h2 className="text-base text-cardio-600 font-semibold tracking-wide uppercase">O Društvu</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-trust-900 sm:text-4xl">
            Srce Podravja že 20 let
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Smo humanitarna organizacija, ki združuje ljudi z boleznimi srca in ožilja ter vse, ki želijo ohraniti svoje zdravje.
          </p>
        </div>

        {/* Mission Section */}
        <div id="mission" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 scroll-mt-28">
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-cardio-100 rounded-lg text-cardio-600 mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-trust-900 mb-4">Kdo smo in naše poslanstvo</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Naše poslanstvo je preprečevanje bolezni srca in ožilja, rehabilitacija bolnikov in izboljšanje kakovosti življenja v Mariboru in okolici.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FileCheck className="h-5 w-5 text-cardio-500 mr-2 mt-1" />
                <span className="text-gray-600">Ozaveščanje javnosti o tveganjih.</span>
              </li>
              <li className="flex items-start">
                <FileCheck className="h-5 w-5 text-cardio-500 mr-2 mt-1" />
                <span className="text-gray-600">Organizacija preventivnih meritev krvnega tlaka, sladkorja in holesterola.</span>
              </li>
              <li className="flex items-start">
                <FileCheck className="h-5 w-5 text-cardio-500 mr-2 mt-1" />
                <span className="text-gray-600">Spodbujanje gibanja in zdrave prehrane.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
               alt="Ekipa društva pri delu" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Team Section */}
        <div id="team" className="bg-stone-50 rounded-3xl p-8 md:p-12 mb-20 scroll-mt-28">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-lg text-cardio-600 shadow-sm mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-trust-900">Organi društva</h3>
            <p className="text-gray-500 mt-2">Društvo vodijo predani prostovoljci in strokovnjaki.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">P</div>
              <h4 className="font-bold text-lg text-trust-900">Predsednik</h4>
              <p className="text-cardio-600 text-sm font-medium">Prim. dr. Janez Novak</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">S</div>
              <h4 className="font-bold text-lg text-trust-900">Strokovni svet</h4>
              <p className="text-cardio-600 text-sm font-medium">Mag. Marija Horvat</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">T</div>
              <h4 className="font-bold text-lg text-trust-900">Tajništvo</h4>
              <p className="text-cardio-600 text-sm font-medium">Ana Kovač</p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div id="history" className="text-center scroll-mt-28">
           <div className="inline-flex items-center justify-center p-3 bg-cardio-100 rounded-lg text-cardio-600 mb-4">
              <History className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-trust-900 mb-4">Naša zgodovina</h3>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              Društvo za zdravje srca in ožilja za Maribor in Podravje je bilo ustanovljeno leta 2002. 
              V dveh desetletjih delovanja smo izvedli več kot 1000 preventivnih akcij in pomagali tisočim 
              občanom pri zgodnjem odkrivanju dejavnikov tveganja.
            </p>
        </div>

      </div>
    </section>
  );
};

export default About;