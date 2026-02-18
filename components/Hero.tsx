import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageType } from '../types';

interface HeroProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {

  const scrollToSection = (id: string) => {
    onNavigate('home', id);
  };

  return (
    <div className="relative overflow-hidden mt-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* Decorative clip path */}
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-cardio-100 bg-red-50 text-cardio-700 mb-6 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-cardio-500 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium">Naslednja meritev: 20. Oktober, Glavni trg</span>
              </div>
              
              <h1 className="text-4xl tracking-tight font-extrabold text-trust-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Vaše srce je</span>{' '}
                <span className="block text-cardio-600 xl:inline">naša skrb.</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Pridružite se Društvu za zdravje srca in ožilja za Maribor. Skupaj skrbimo za preventivo, organiziramo strokovne meritve in spodbujamo aktiven življenjski slog v Podravju.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-full shadow-lg">
                  <button
                    onClick={() => onNavigate('clanstvo')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-cardio-600 hover:bg-cardio-700 md:py-4 md:text-lg transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    Včlanite se
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => scrollToSection('programs')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-cardio-700 bg-white border-cardio-100 hover:bg-red-50 md:py-4 md:text-lg shadow-sm cursor-pointer"
                  >
                    Naši programi
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Skupina pohodnikov v naravi"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 to-transparent lg:via-stone-50/20"></div>
      </div>
    </div>
  );
};

export default Hero;