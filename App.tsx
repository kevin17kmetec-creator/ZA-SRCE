
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MembershipPage from './components/MembershipPage';
import AboutPage from './components/AboutPage';
import PosvetovalnicaPage from './components/PosvetovalnicaPage';
import GlezenjskiIndeksPage from './components/GlezenjskiIndeksPage';
import MembershipBenefitsPage from './components/MembershipBenefitsPage';
import DejavnostPage from './components/DejavnostPage';
import AritmijePage from './components/AritmijePage'; 
import CenikPage from './components/CenikPage'; 
import ProjektiPage from './components/ProjektiPage'; 
import FundacijaPage from './components/FundacijaPage';
import PublikacijePage from './components/PublikacijePage'; 
import ObjaveVecerPage from './components/ObjaveVecerPage';
import MinuteZaSrcePage from './components/MinuteZaSrcePage';
import GalerijaPage from './components/GalerijaPage'; // New Component
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import { PageType } from './types';

function App() {
  // 1. State Management for Navigation
  const [currentView, setCurrentView] = useState<PageType>('home');
  
  // State to track navigation source
  const [posvetovalnicaSource, setPosvetovalnicaSource] = useState<'o-drustvu' | 'ugodnosti'>('o-drustvu');
  const [glezenjskiSource, setGlezenjskiSource] = useState<'o-drustvu' | 'dejavnost'>('o-drustvu');

  // 2. Navigation Handler
  const handleNavigate = (view: PageType, sectionId?: string) => {
    setCurrentView(view);
    
    // Logic to handle scrolling after state update
    setTimeout(() => {
       if (sectionId) {
         const element = document.getElementById(sectionId);
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
         }
       } else {
         window.scrollTo({ top: 0, behavior: 'auto' });
       }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-trust-900 flex flex-col">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === 'home' && <Home onNavigate={handleNavigate} />}
        {currentView === 'clanstvo' && <MembershipPage onNavigate={handleNavigate} />}
        
        {currentView === 'o-drustvu' && (
          <AboutPage 
            onNavigate={(view, sectionId) => {
              if (view === 'posvetovalnica') setPosvetovalnicaSource('o-drustvu');
              if (view === 'glezenjski-indeks') setGlezenjskiSource('o-drustvu');
              handleNavigate(view, sectionId);
            }} 
          />
        )}
        
        {currentView === 'posvetovalnica' && (
          <PosvetovalnicaPage 
            onNavigate={handleNavigate} 
            source={posvetovalnicaSource}
          />
        )}
        
        {currentView === 'glezenjski-indeks' && (
          <GlezenjskiIndeksPage 
            onNavigate={handleNavigate} 
            source={glezenjskiSource}
          />
        )}
        
        {currentView === 'ugodnosti' && (
          <MembershipBenefitsPage 
            onNavigate={(view) => {
               if (view === 'posvetovalnica') setPosvetovalnicaSource('ugodnosti');
               handleNavigate(view);
            }} 
          />
        )}

        {currentView === 'dejavnost' && (
          <DejavnostPage 
            onNavigate={(view) => {
              if (view === 'glezenjski-indeks') setGlezenjskiSource('dejavnost');
              handleNavigate(view);
            }} 
          />
        )}

        {currentView === 'aritmije' && <AritmijePage onNavigate={handleNavigate} />}
        {currentView === 'cenik' && <CenikPage onNavigate={handleNavigate} />}
        {currentView === 'projekti' && <ProjektiPage onNavigate={handleNavigate} />}
        {currentView === 'fundacija' && <FundacijaPage onNavigate={handleNavigate} />}
        {currentView === 'publikacije' && <PublikacijePage onNavigate={handleNavigate} />}
        {currentView === 'objave-vecer' && <ObjaveVecerPage onNavigate={handleNavigate} />}
        {currentView === 'minute-za-srce' && <MinuteZaSrcePage onNavigate={handleNavigate} />}
        {currentView === 'galerija' && <GalerijaPage onNavigate={handleNavigate} />}

      </main>
      
      <Footer onNavigate={handleNavigate} />
      <Assistant />
    </div>
  );
}

export default App;
