
import React from 'react';
import { Heart, Facebook } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (view: PageType, sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
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
    } else if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      onNavigate('home', sectionId);
    } else {
      onNavigate('home');
    }
  };

  return (
    <footer className="bg-trust-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
               <Heart className="h-6 w-6 text-cardio-500 fill-current mr-2" />
               <span className="font-bold text-xl">Društvo za zdravje srca</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Naše poslanstvo je izobraževanje ljudi o boleznih srca in ožilja, spodbujanje zdravega načina življenja ter organizacija preventivnih meritev v Mariboru in okolici.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Povezave</h3>
            <ul className="space-y-3">
              <li><a href="/o-drustvu" onClick={(e) => handleLinkClick(e, '/o-drustvu')} className="text-base text-gray-400 hover:text-white transition-colors">O društvu</a></li>
              <li><a href="/dejavnost" onClick={(e) => handleLinkClick(e, '/dejavnost')} className="text-base text-gray-400 hover:text-white transition-colors">Dejavnost</a></li>
              <li><a href="/projekti" onClick={(e) => handleLinkClick(e, '/projekti')} className="text-base text-gray-400 hover:text-white transition-colors">Projekti</a></li>
              <li><a href="/fundacija" onClick={(e) => handleLinkClick(e, '/fundacija')} className="text-base text-gray-400 hover:text-white transition-colors">Fundacija</a></li>
              <li><a href="/publikacije" onClick={(e) => handleLinkClick(e, '/publikacije')} className="text-base text-gray-400 hover:text-white transition-colors">Publikacije</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{CONTACT_INFO.address.split(',')[0]}</li>
              <li>{CONTACT_INFO.address.split(',')[1]}</li>
              <li>Tel: {CONTACT_INFO.phone}</li>
              {CONTACT_INFO.fax && <li>Fax: {CONTACT_INFO.fax}</li>}
              <li>{CONTACT_INFO.email}</li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61575200512915" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Društvo za zdravje srca in ožilja za Maribor in Podravje. Vse pravice pridržane.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
