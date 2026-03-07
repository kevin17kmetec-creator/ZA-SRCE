import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PageType } from '../types';

interface CookieBannerProps {
  onNavigate: (view: PageType) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('privacy-policy');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 z-[100] shadow-xl border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Piškotki in zasebnost</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Spletna stran uporablja piškotke za zagotavljanje boljše uporabniške izkušnje in spremljanje statistike obiska. 
            Z nadaljnjo uporabo spletne strani soglašate z uporabo piškotkov. 
            Več o tem si lahko preberete v <a href="/privacy-policy" onClick={handlePrivacyClick} className="underline hover:text-cardio-400">politiki zasebnosti</a>.
          </p>
        </div>
        <div className="flex flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleReject}
            className="flex-1 md:flex-none px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Zavrni vse
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2 bg-cardio-600 hover:bg-cardio-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
          >
            Sprejmi vse
          </button>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-white md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
