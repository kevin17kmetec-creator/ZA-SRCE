
import React, { useState, useEffect } from 'react';
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
import GalerijaPage from './components/GalerijaPage';
import NewsPage from './components/NewsPage';
import NewsArticlePage from './components/NewsArticlePage';
import UrnikMeritevPage from './components/UrnikMeritevPage'; // New
import KoledarVadbPage from './components/KoledarVadbPage'; // New
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import { PageType } from './types';

function App() {
  // 1. State Management for Navigation
  const [currentView, setCurrentView] = useState<PageType>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  
  // State to track navigation source
  const [posvetovalnicaSource, setPosvetovalnicaSource] = useState<'o-drustvu' | 'ugodnosti'>('o-drustvu');
  const [glezenjskiSource, setGlezenjskiSource] = useState<'o-drustvu' | 'dejavnost'>('o-drustvu');

  // Helper to get URL from PageType
  const getUrlFromView = (view: PageType, param?: string | number): string => {
    switch (view) {
      case 'home': return '/';
      case 'clanstvo': return '/clanstvo';
      case 'o-drustvu': return '/o-drustvu';
      case 'posvetovalnica': return '/posvetovalnica';
      case 'glezenjski-indeks': return '/glezenjski-indeks';
      case 'ugodnosti': return '/ugodnosti';
      case 'dejavnost': return '/dejavnost';
      case 'aritmije': return '/aritmije';
      case 'cenik': return '/cenik';
      case 'projekti': return '/projekti';
      case 'fundacija': return '/fundacija';
      case 'publikacije': return '/publikacije';
      case 'objave-vecer': return '/objave-vecer';
      case 'minute-za-srce': return '/minute-za-srce';
      case 'galerija': return '/galerija';
      case 'novice-page': return '/novice';
      case 'novica-details': return `/novica/${param}`;
      case 'urnik-meritev': return '/urnik-meritev';
      case 'koledar-vadb': return '/koledar-vadb';
      default: return '/';
    }
  };

  // Helper to get PageType from URL
  const getViewFromUrl = (pathname: string): { view: PageType, id?: number } => {
    if (pathname === '/' || pathname === '') return { view: 'home' };
    if (pathname === '/clanstvo') return { view: 'clanstvo' };
    if (pathname === '/o-drustvu') return { view: 'o-drustvu' };
    if (pathname === '/posvetovalnica') return { view: 'posvetovalnica' };
    if (pathname === '/glezenjski-indeks') return { view: 'glezenjski-indeks' };
    if (pathname === '/ugodnosti') return { view: 'ugodnosti' };
    if (pathname === '/dejavnost') return { view: 'dejavnost' };
    if (pathname === '/aritmije') return { view: 'aritmije' };
    if (pathname === '/cenik') return { view: 'cenik' };
    if (pathname === '/projekti') return { view: 'projekti' };
    if (pathname === '/fundacija') return { view: 'fundacija' };
    if (pathname === '/publikacije') return { view: 'publikacije' };
    if (pathname === '/objave-vecer') return { view: 'objave-vecer' };
    if (pathname === '/minute-za-srce') return { view: 'minute-za-srce' };
    if (pathname === '/galerija') return { view: 'galerija' };
    if (pathname === '/novice') return { view: 'novice-page' };
    if (pathname === '/urnik-meritev') return { view: 'urnik-meritev' };
    if (pathname === '/koledar-vadb') return { view: 'koledar-vadb' };
    
    // Check for novica details
    const novicaMatch = pathname.match(/^\/novica\/(\d+)$/);
    if (novicaMatch) {
      return { view: 'novica-details', id: parseInt(novicaMatch[1], 10) };
    }

    return { view: 'home' };
  };

  // Initialize state from URL on mount and handle popstate
  useEffect(() => {
    const handlePopState = () => {
      const { view, id } = getViewFromUrl(window.location.pathname);
      setCurrentView(view);
      if (id) setSelectedArticleId(id);
    };

    // Set initial state
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 2. Navigation Handler
  const handleNavigate = (view: PageType, param?: string | number) => {
    // Prevent pushing same state twice
    const newUrl = getUrlFromView(view, param);
    if (window.location.pathname !== newUrl) {
      window.history.pushState({}, '', newUrl);
    }

    setCurrentView(view);
    
    if (view === 'novica-details' && typeof param === 'number') {
      setSelectedArticleId(param);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // Logic to handle scrolling after state update
    setTimeout(() => {
       if (typeof param === 'string') {
         const element = document.getElementById(param);
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
        {currentView === 'novice-page' && <NewsPage onNavigate={handleNavigate} />}
        
        {currentView === 'novica-details' && selectedArticleId && (
          <NewsArticlePage 
            articleId={selectedArticleId} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentView === 'urnik-meritev' && <UrnikMeritevPage onNavigate={handleNavigate} />}
        {currentView === 'koledar-vadb' && <KoledarVadbPage onNavigate={handleNavigate} />}

      </main>
      
      <Footer onNavigate={handleNavigate} />
      <Assistant />
    </div>
  );
}

export default App;
