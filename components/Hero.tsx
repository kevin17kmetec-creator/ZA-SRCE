
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

  // Helper to generate multiple animated circles for a path
  const renderBloodCells = (pathId: string, count: number, color: string, baseDur: number) => {
    return [...Array(count)].map((_, i) => (
      <circle key={`${pathId}-${i}`} r={Math.random() * 3 + 2} fill={color} opacity="0">
        <animateMotion 
          dur={`${baseDur + Math.random() * 2}s`} 
          repeatCount="indefinite" 
          begin={`${i * (baseDur / count)}s`} 
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate 
          attributeName="opacity" 
          values="0;0.8;0" 
          dur={`${baseDur + Math.random() * 2}s`} 
          repeatCount="indefinite" 
          begin={`${i * (baseDur / count)}s`} 
        />
      </circle>
    ));
  };

  return (
    <div className="relative overflow-hidden mt-20 bg-white min-h-[800px] flex items-center justify-center">
      
      {/* Background Layer: High-Density Vascular Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 organic-glow opacity-70"></div>
        <svg className="w-full h-full opacity-[0.35]" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="mainArtery" d="M-100 400C100 350 300 500 600 400C900 300 1200 450 1400 400C1600 350 1700 400 1800 450" />
            <path id="veinVertical1" d="M300 -100C350 150 250 350 300 550C350 750 450 850 500 1100" />
            <path id="veinVertical2" d="M1100 -100C1050 150 1150 350 1100 550C1050 750 950 850 900 1100" />
            <path id="branchTop" d="M-100 150C250 50 500 250 800 150C1100 50 1400 200 1600 150" />
            <path id="branchBottom" d="M1500 50C1300 150 1000 100 700 350C400 600 200 550 -100 650" />
          </defs>

          {/* Base Vascular Lines */}
          <use href="#mainArtery" stroke="#dc2626" strokeWidth="14" strokeLinecap="round" className="vascular-path opacity-25" />
          <use href="#veinVertical1" stroke="#ef4444" strokeWidth="8" className="vascular-path opacity-15" />
          <use href="#veinVertical2" stroke="#ef4444" strokeWidth="8" className="vascular-path opacity-15" />
          <use href="#branchTop" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" className="vascular-path opacity-10" />
          <use href="#branchBottom" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" className="vascular-path opacity-10" />
          
          {/* Animated Blood Cells - Dense Population */}
          {renderBloodCells("mainArtery", 12, "#dc2626", 6)}
          {renderBloodCells("veinVertical1", 8, "#ef4444", 5)}
          {renderBloodCells("veinVertical2", 8, "#ef4444", 7)}
          {renderBloodCells("branchTop", 6, "#dc2626", 8)}
          {renderBloodCells("branchBottom", 6, "#ef4444", 10)}
          
          {/* Atmosphere floating particles */}
          {[...Array(30)].map((_, i) => (
            <circle 
              key={i} 
              r={Math.random() * 5 + 1} 
              fill="#ef4444" 
              className="animate-float" 
              style={{ 
                opacity: Math.random() * 0.3 + 0.05, 
                animationDuration: `${Math.random() * 8 + 5}s`,
                animationDelay: `${i * 0.2}s`, 
                cx: `${Math.random() * 100}%`, 
                cy: `${Math.random() * 100}%` 
              }} 
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <div className="text-center lg:text-left py-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-100 text-cardio-700 mb-10 shadow-sm animate-bounce-slow">
              <span className="flex h-3 w-3 rounded-full bg-cardio-500 mr-3 animate-pulse"></span>
              <span className="text-sm font-bold tracking-tight">Naslednja meritev: 20. Oktober, Glavni trg</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-trust-900 tracking-tighter leading-[0.95] mb-8">
              Vaše srce je<br />
              <span className="text-cardio-600 relative">
                naša skrb.
                <svg className="absolute -bottom-4 left-0 w-full h-4 text-cardio-100 opacity-60" viewBox="0 0 400 20" fill="none">
                  <path d="M0 10C50 0 150 20 200 10C250 0 350 20 400 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-500 sm:text-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Pridružite se Društvu za zdravje srca in ožilja za Maribor. Skupaj skrbimo za preventivo in spodbujamo aktiven življenjski slog.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
              <button
                onClick={() => onNavigate('clanstvo')}
                className="group relative flex items-center justify-center px-12 py-5 text-xl font-bold rounded-full text-white bg-cardio-600 hover:bg-cardio-700 transition-all shadow-2xl hover:shadow-cardio-500/40 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  Včlanite se
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cardio-700 to-cardio-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button
                onClick={() => scrollToSection('programs')}
                className="flex items-center justify-center px-12 py-5 text-xl font-bold rounded-full text-trust-900 bg-white border-2 border-stone-100 hover:border-cardio-200 hover:text-cardio-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer"
              >
                Naši programi
              </button>
            </div>
          </div>

          {/* Fixed Anatomical Heart - Centered and Non-Clipping */}
          <div className="relative flex justify-center items-center min-h-[450px]">
            {/* Pulsing Atmosphere - Background Glow */}
            <div className="absolute w-[500px] h-[500px] bg-cardio-100/40 rounded-full animate-pulse-glow z-0"></div>
            
            {/* The Heart Vessel Container - Added padding to prevent clipping during scale up */}
            <div className="relative z-10 w-full max-w-sm aspect-square flex items-center justify-center p-12">
              
              {/* Organic Animated Heart SVG - Resized to 240x280 to provide safety margin */}
              <div className="animate-heartbeat-real drop-shadow-[0_40px_80px_rgba(220,38,38,0.5)] transform-gpu">
                <svg width="240" height="280" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="50%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#7f1d1d" />
                    </linearGradient>
                  </defs>
                  
                  {/* Organic Heart Shape */}
                  <path 
                    d="M50 110C50 110 95 85 95 45C95 20 75 5 50 25C25 5 5 20 5 45C5 85 50 110 50 110Z" 
                    fill="url(#heartGradient)"
                    stroke="#991b1b"
                    strokeWidth="0.5"
                  />
                  
                  {/* Vein Highlights */}
                  <path 
                    d="M45 40 Q52 65 38 92" 
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                  <path 
                    d="M55 35 Q72 65 62 85" 
                    stroke="rgba(255,255,255,0.35)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                  
                  {/* Arterial Structures */}
                  <path 
                    d="M45 25C40 5 25 12 18 6" 
                    stroke="#7f1d1d" 
                    strokeWidth="9" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M55 22C64 1 85 6 90 2" 
                    stroke="#6b0d0d" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M49 20C49 2 51 2 51 20" 
                    stroke="#b91c1c" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
