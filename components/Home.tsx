
import React from 'react';
import Hero from './Hero';
import About from './About';
import Programs from './Programs';
import ContactMap from './ContactMap';
import { PageType } from '../types';

interface HomeProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {

  const handleJoinClick = () => {
    onNavigate('clanstvo');
  };

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <About />
      <Programs />
      
      {/* Membership Banner - Teaser on Home Page */}
      <section id="membership-teaser" className="bg-gradient-to-r from-cardio-600 to-cardio-700 py-16 relative overflow-hidden">
          {/* Decorative pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="heart-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 35C20 35 35 25 35 15C35 9 30 5 25 5C22 5 19 7 17.5 10C16 7 13 5 10 5C5 5 0 9 0 15C0 25 15 35 15 35" fill="white"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heart-pattern)" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-8 md:mb-0 text-center md:text-left max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-3">Postanite naš član še danes!</h2>
            <p className="text-cardio-50 text-lg">
              Pridobite ugodnosti pri meritvah, izletih in strokovnih posvetih. 
              Članarina znaša le 15€ letno.
            </p>
          </div>
          <button 
            onClick={handleJoinClick}
            className="bg-white text-cardio-700 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-stone-50 transition-all transform hover:scale-105 hover:shadow-xl ring-2 ring-white/50 whitespace-nowrap cursor-pointer"
          >
            Več o članstvu
          </button>
        </div>
      </section>

      <ContactMap />
    </>
  );
};

export default Home;
