
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import { PageType } from '../types';

interface NavbarProps {
  currentView: PageType;
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);

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

  const isActive = (href: string) => {
    if (href === '/clanstvo' && currentView === 'clanstvo') return true;
    if (href === '/o-drustvu' && currentView === 'o-drustvu') return true;
    if (href === '/dejavnost' && currentView === 'dejavnost') return true;
    if (href === '/projekti' && currentView === 'projekti') return true;
    if (href === '/fundacija' && currentView === 'fundacija') return true;
    if (href === '/publikacije' && currentView === 'publikacije') return true;
    if (href === '/minute-za-srce' && currentView === 'minute-za-srce') return true;
    if (href === '/galerija' && currentView === 'galerija') return true;
    if (href === '/novice' && currentView === 'novice-page') return true;
    if (href === '/' && currentView === 'home') return true;
    return false;
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
              <span className="font-bold text-lg md:text-xl text-white leading-tight whitespace-nowrap">Društvo za srce</span>
              <span className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider whitespace-nowrap">Maribor in Podravje</span>
            </div>
          </div>

          {/* Mobile menu button (Always visible now) */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-white/10 focus:outline-none transition-colors cursor-pointer"
            >
              <span className="sr-only">Odpri meni</span>
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Panel (Dropdown) */}
      {isOpen && (
        <div className="bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto shadow-xl absolute w-full left-0 top-20 z-40">
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsOpen(false);
                }}
                className={`block px-4 py-3 rounded-lg text-lg font-medium hover:text-[#4a0404] hover:bg-red-50 transition-colors ${
                   isActive(item.href) ? 'text-[#4a0404] bg-red-50' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={(e) => {
                  handleNavClick(e, '/clanstvo');
                  setIsOpen(false);
                }}
                className="block w-full text-center bg-[#4a0404] text-white px-4 py-4 rounded-lg text-lg font-bold hover:bg-[#3a0303] transition-colors shadow-md cursor-pointer"
              >
                Postani član
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
