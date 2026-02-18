import React from 'react';
import { GraduationCap, Quote } from 'lucide-react';
import { PageType } from '../types';

interface FundacijaPageProps {
  onNavigate: (view: PageType) => void;
}

const FundacijaPage: React.FC<FundacijaPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-trust-900 py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-white/10 p-4 rounded-full inline-block mb-6">
            <GraduationCap className="h-12 w-12 text-cardio-500" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Fundacija prim. dr. Janka Držečnika
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Podpora prihodnjim generacijam zdravnikov Medicinske fakultete v Mariboru.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Introduction */}
            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
              <p>
                Društvo za zdravje srca in ožilja za Maribor in Podravje je leta 2005 ustanovilo 
                <span className="font-bold text-trust-900"> Fundacijo prim. dr. Janka Držečnika</span>, 
                ki štipendira študente mariborske Medicinske fakultete, na pobudo tedanjega podpredsednika tega društva 
                <span className="font-semibold"> prof. dr. Eriha Tetičkoviča, dr.med., spec. nevrologije</span>.
              </p>
            </div>

            {/* Quote 1 - Prof. Tetičkovič */}
            <div className="bg-stone-50 rounded-xl p-6 md:p-8 border-l-4 border-cardio-600 relative">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-cardio-200" />
              <div className="relative z-10 pl-8">
                <p className="text-gray-600 italic mb-4 text-lg">
                  »V našem društvu smo se odločili ustanoviti to fundacijo, ki bo pomagala študentom medicine na mariborski Medicinski fakulteti. 
                  Fundacijo smo poimenovali po uglednem mariborskem zdravniku, kirurgu, človeku izrednega duha ter širokih obzorij, 
                  učitelju in vzorniku nizu generacij mladih zdravnikov, po primariju dr. Janku Držečniku.«
                </p>
                <footer className="text-sm font-bold text-trust-900 mt-2">
                  — Idejni oče fundacije, prof. dr. Erih Tetičkovič, dr.med., spec. nevrologije
                </footer>
              </div>
            </div>

            {/* Transition Text */}
            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
              <p>
                Kaj pomeni štipendija nekaterim študentom medicine, pove tudi izpoved <span className="font-semibold">Alenke Koren</span>, 
                ki je med prvimi prejela štipendijo primarija Držečnika:
              </p>
            </div>

            {/* Quote 2 - Student */}
            <div className="bg-cardio-50 rounded-xl p-6 md:p-8 border-l-4 border-trust-800 relative">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-cardio-200" />
              <div className="relative z-10 pl-8">
                <p className="text-gray-700 italic mb-4 text-lg">
                  »Ljudje se zberemo ob različnih priložnostih. Ena izmed njih je prav gotovo tudi proslavljanje takšnih in drugačnih dosežkov. 
                  In zame je bil eden takšnih dogodkov podelitev štipendije. Že sam občutek, da so se ljudje potrudili in za to priložnost 
                  pripravili majhen svečan dogodek, je neverjetno navdihujoč. Zavest, da te ljudje cenijo, da cenijo tvoje delo in te zanj nagradijo, 
                  je prijetna in spodbudna, krepi človekovo samozavest.
                </p>
                <p className="text-gray-700 italic mb-4 text-lg">
                  Veseli me, da sem po svoje prišla v zavetje te ugledne fundacije, vidim jo kot še eno budno oko, ki bo bdelo nad mojo potjo, 
                  nad vsemi dosežki in morda tudi porazi. Ljudje, ki pokažejo mlademu, razvijajočemu se človeku pot, ki mu bo prihranila marsikatero oviro, 
                  ga popeljala do mnogih pomembnih poznanstev, so zlata vredni. In prav to so zame storili ljudje te fundacije.«
                </p>
                <footer className="text-sm font-bold text-trust-900 mt-2">
                  — Alenka Koren, prejemnica štipendije
                </footer>
              </div>
            </div>

            {/* Footer / History Note */}
            <div className="border-t border-gray-100 pt-8 mt-4 text-center">
              <p className="text-gray-600 font-medium">
                Fundacija podeljuje že od leta ustanovitve vsaj eno štipendijo letno.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Prvi dve sta v študijskem letu 2005/06 dobila Martina Babič in Robi Kelc.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FundacijaPage;