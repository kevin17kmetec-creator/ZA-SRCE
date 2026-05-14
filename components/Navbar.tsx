
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageType } from '../types';
import { NAVIGATION_ITEMS } from '../constants';

interface NavbarProps {
  currentView: PageType;
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '/urnik-meritev') {
      onNavigate('urnik-meritev');
    } else if (href === '/clanstvo') {
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
    } else if (href === '/kontakt') {
      onNavigate('kontakt');
    } else if (href === '/') {
      onNavigate('home');
    } else if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      onNavigate('home', sectionId);
    }
  };

  return (
    <nav className="bg-[#6b2121] shadow-md fixed w-full z-[70] top-0 border-b border-[#4f1717]">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center flex-shrink-0 cursor-pointer" 
            onClick={(e) => handleNavClick(e, '/')}
          >
            <div className="mr-2 md:mr-3 bg-white/10 p-1 rounded-lg">
               <img 
                 src="https://lh3.googleusercontent.com/d/11rKJiQHB8HSHQcpf88ejOyx41HoAznhk" 
                 alt="ZA SRCE" 
                 className="h-8 w-auto md:h-12 md:w-auto object-contain"
                 referrerPolicy="no-referrer"
                 decoding="async"
               />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-2xl text-white leading-tight whitespace-nowrap">Društvo za srce</span>
              <span className="text-[10px] md:text-sm text-gray-200 uppercase tracking-wider whitespace-nowrap">Maribor in Podravje</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#6b2121] border-t border-[#4f1717] absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 px-2 space-y-2 pb-2">
              <button
                onClick={(e) => handleNavClick(e, '/urnik-meritev')}
                className="w-full bg-white text-[#6b2121] font-bold py-3 px-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
              >
                Urnik meritev
              </button>
              <button
                onClick={(e) => handleNavClick(e, '/clanstvo')}
                className="w-full bg-white text-[#6b2121] font-bold py-3 px-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
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
