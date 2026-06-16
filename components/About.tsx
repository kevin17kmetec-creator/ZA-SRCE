import React from 'react';
import { Target, Users, History, FileCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-10 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-base text-cardio-600 font-semibold tracking-wide uppercase">O Društvu</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-trust-900 sm:text-4xl">
            Srce Podravja že 20 let
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Smo humanitarna organizacija, ki združuje ljudi z boleznimi srca in ožilja ter vse, ki želijo ohraniti svoje zdravje.
          </p>
        </div>

        {/* Mission Section */}
        <div id="mission" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 lg:mb-20 scroll-mt-28">
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-cardio-100 rounded-lg text-cardio-600 mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-trust-900 mb-4">Kdo smo in naše poslanstvo</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Smo humanitarna organizacija in društvo posebnega pomena na področju zdravja. Naše poslanstvo je ozaveščanje o dejavnikih tveganja za nastanek bolezni srca in ožilja, njihovo zgodnje prepoznavanje in hitro ukrepanje ter pomoč pri rehabilitaciji in izboljšanju kakovosti življenja.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-500 mr-4"></span>
                <span className="text-gray-600">Organizacija in izvajanje preventivnih meritev, strokovnih predavanj in svetovanj.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-500 mr-4"></span>
                <span className="text-gray-600">Meritve dejavnikov tveganja srčno-žilnih pokazateljev.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-2 w-2 mt-2.5 rounded-full bg-cardio-500 mr-4"></span>
                <span className="text-gray-600">Spodbujanje zdravih navad v vseh obdobjih življenja.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
             <img 
               src="https://www.telegraph.co.uk/content/dam/money/2025/04/30/TELEMMGLPICT000420323875_17460181981600_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQf0Rf_Wk3V23H2268P_XkPxc.jpeg?imwidth=1920" 
               alt="Ekipa društva pri delu" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
               loading="lazy"
               decoding="async"
             />
          </div>
        </div>

        {/* Team Section */}
        <div id="team" className="bg-stone-50 rounded-3xl p-6 md:p-12 mb-10 lg:mb-20 scroll-mt-28">
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
              <p className="text-cardio-600 text-sm font-medium">prim. Mirko Bombek</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">S</div>
              <h4 className="font-bold text-lg text-trust-900">Strokovni sodelavci</h4>
              <p className="text-cardio-600 text-sm font-medium">Marjan Makari, Karmen Prašnikar</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">T</div>
              <h4 className="font-bold text-lg text-trust-900">Tajnica</h4>
              <p className="text-cardio-600 text-sm font-medium">Metka Tkalčič</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;