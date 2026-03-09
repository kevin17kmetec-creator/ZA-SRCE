
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ContactMap from './ContactMap';
import { PageType } from '../types';

interface ContactPageProps {
  onNavigate: (view: PageType) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      {/* Header - Standardized with Logo and Brand Red */}
      <div className="bg-[#4a0404] py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
             <img 
               src="https://lh3.googleusercontent.com/d/11rKJiQHB8HSHQcpf88ejOyx41HoAznhk" 
               alt="Logotip Društva za zdravje srca" 
               className="h-16 md:h-24 w-auto mx-auto object-contain drop-shadow-lg"
               referrerPolicy="no-referrer"
             />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Stopite v stik z nami za vprašanja, svetovanje ali informacije o naših programih.
          </p>
        </div>
      </div>

      {/* Breadcrumb / Back Navigation */}
      <div className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-cardio-600 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nazaj na prvo stran
          </button>
        </div>
      </div>

      {/* Main Content - Reusing ContactMap component */}
      <div className="flex-grow">
        <ContactMap />
      </div>
    </div>
  );
};

export default ContactPage;
