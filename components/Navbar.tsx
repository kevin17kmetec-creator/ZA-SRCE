
import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook } from 'lucide-react';
import { PageType } from '../types';
import { NAVIGATION_ITEMS } from '../constants';

interface NavbarProps {
  currentView: PageType;
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const event = new CustomEvent('mobileMenuState', { detail: isMobileMenuOpen });
    window.dispatchEvent(event);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsNavVisible(true);
      return;
    }
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up. Only applies when not at the very top.
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '/urnik-meritev') {
      onNavigate('urnik-meritev');
    } else if (href === '/predavanja') {
      onNavigate('predavanja_urnik');
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
    <nav className={`bg-[#6b2121] shadow-md fixed w-full z-[70] top-0 border-b border-[#4f1717] transition-transform duration-300 ease-in-out ${
      isNavVisible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'
    }`}>
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center flex-shrink-1 cursor-pointer min-w-0 max-w-[85%] md:max-w-none" 
            onClick={(e) => handleNavClick(e, '/')}
          >
            <div className="mr-2 md:mr-3 bg-white/10 p-1 rounded-lg flex-shrink-0">
               <img 
                 src="https://lh3.googleusercontent.com/d/11rKJiQHB8HSHQcpf88ejOyx41HoAznhk" 
                 alt="ZA SRCE" 
                 className="h-8 w-auto md:h-12 md:w-auto object-contain"
                 referrerPolicy="no-referrer"
                 decoding="async"
               />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[12px] sm:text-base md:text-2xl text-white leading-[1.1] whitespace-normal">Društvo za zdravje srca in ožilja</span>
              <span className="text-[9px] sm:text-[10px] md:text-sm text-gray-200 uppercase tracking-wider whitespace-normal mt-0.5">za Maribor in Podravje</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
             <a 
                href="https://www.facebook.com/profile.php?id=61575200512915" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-gray-200 transition-colors hidden sm:block p-2"
                title="Sledite nam na Facebooku"
              >
                <Facebook className="h-6 w-6" />
             </a>
             
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
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#6b2121] border-t border-[#4f1717] absolute w-full shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-3 pt-4 pb-6">
            
            {/* Main Action Buttons - At the top for immediate visibility */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <a 
                href="https://www.facebook.com/profile.php?id=61575200512915" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center bg-blue-600 text-white font-bold py-2.5 px-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-sm"
              >
                <Facebook className="h-4 w-4 mr-1.5" />
                Facebook
              </a>
              <button
                onClick={(e) => handleNavClick(e, '/clanstvo')}
                className="bg-white text-[#6b2121] font-bold py-2.5 px-2 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
              >
                Postani član
              </button>
              <button
                onClick={(e) => handleNavClick(e, '/urnik-meritev')}
                className="bg-white text-[#6b2121] font-bold py-2.5 px-2 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
              >
                Urnik meritev
              </button>
              <button
                onClick={(e) => handleNavClick(e, '/predavanja')}
                className="bg-white text-[#6b2121] font-bold py-2.5 px-2 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
              >
                Predavanja
              </button>
            </div>

            {/* Navigation Links in a grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 border-t border-white/10 pt-4">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-2 py-2 rounded-md text-[15px] font-semibold text-white hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
