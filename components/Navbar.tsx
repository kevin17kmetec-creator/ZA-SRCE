
import React from 'react';
import { PageType } from '../types';

interface NavbarProps {
  currentView: PageType;
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (href === '/clanstvo') {
      onNavigate('clanstvo');
    } else if (href === '/o-drustvu') {
      onNavigate('o-drustvu');
    } else if (href === '/dejavnost') {
      onNavigate('dejavnost');
    } else if (href === '/projekti') {
      onNavigate('projekti');
    } else if (href === '/fundacija') {
      onNavigate('fundacija');
    } else if (href === '/publikacije') {
      onNavigate('publikacije');
    } else if (href === '/minute-za-srce') {
      onNavigate('minute-za-srce');
    } else if (href === '/galerija') {
      onNavigate('galerija');
    } else if (href === '/novice') {
      onNavigate('novice-page');
    } else if (href === '/') {
      onNavigate('home');
    } else if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      onNavigate('home', sectionId);
    }
  };

  return (
    <nav className="bg-[#4a0404] shadow-md fixed w-full z-50 top-0 border-b border-[#3a0303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center flex-shrink-0 cursor-pointer" 
            onClick={(e) => handleNavClick(e, '/')}
          >
            <div className="mr-3 bg-white/10 p-1 rounded-lg">
               <img 
                 src="https://lh3.googleusercontent.com/d/1mazUXuPKrHZMBIF3As1wQEU6E7OV2rAz" 
                 alt="ZA SRCE" 
                 className="h-10 w-auto object-contain"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl text-white leading-tight whitespace-nowrap">Društvo za srce</span>
              <span className="text-xs md:text-sm text-gray-200 uppercase tracking-wider whitespace-nowrap">Maribor in Podravje</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
