
import React from 'react';
import { Image, ArrowLeft } from 'lucide-react';
import { PageType } from '../types';

interface GalerijaPageProps {
  onNavigate: (view: PageType) => void;
}

const GalerijaPage: React.FC<GalerijaPageProps> = ({ onNavigate }) => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      caption: "Rekreacija in pohodi v naravi"
    },
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      caption: "Preventivne meritve krvnega tlaka"
    },
    {
      src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      caption: "Strokovna predavanja in izobraževanja"
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      caption: "Družabna srečanja članov"
    }
  ];

  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
       {/* Header */}
      <div className="bg-trust-900 py-16 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-white/10 p-4 rounded-full inline-block mb-6">
            <Image className="h-12 w-12 text-cardio-500" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Galerija
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Utrinki z naših dogodkov, meritev in srečanj.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100 hover:shadow-xl transition-shadow">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                   <p className="text-white font-medium p-6 text-lg">{img.caption}</p>
                </div>
              </div>
              <div className="p-4 md:hidden">
                 <p className="text-trust-900 font-medium">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalerijaPage;
