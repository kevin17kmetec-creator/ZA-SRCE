import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { PageType } from '../types';

interface SidebarProps {
  currentView: PageType;
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
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
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-5rem)] fixed left-0 top-20 bg-[#4a0404] text-white overflow-y-auto z-40 shadow-xl border-r border-[#3a0303]">
      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAVIGATION_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.href) 
                ? 'bg-white text-[#4a0404] shadow-md translate-x-1' 
                : 'text-gray-100 hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="p-4 border-t border-[#5c0505]">
        <button
            onClick={(e) => handleNavClick(e, '/clanstvo')}
            className="w-full bg-white text-[#4a0404] font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-[1.02] active:scale-95"
        >
            Postani član
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-3">
            © {new Date().getFullYear()} Društvo za srce
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
