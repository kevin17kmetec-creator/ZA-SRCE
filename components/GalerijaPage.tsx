import React, { useState } from 'react';
import { ArrowLeft, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';

interface GalerijaPageProps {
  onNavigate: (view: PageType) => void;
}

const GalerijaPage: React.FC<GalerijaPageProps> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string, caption: string } | null>(null);

  const images = [
    {
      src: "https://lh3.googleusercontent.com/d/1tugqCHsqi1ef9vd5vObIvt1J0sdhz3Kd",
      caption: "Trska gora"
    },
    {
      src: "https://lh3.googleusercontent.com/d/1HViNAmH08-XiyPD1fqCxggVHr4cASH0U",
      caption: "Trska gora 2"
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
       {/* Header */}
      <div className="bg-[#4a0404] py-8 text-white border-b-4 border-cardio-600 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => onNavigate('home')}
            className="absolute top-8 left-4 md:left-8 flex items-center text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Nazaj
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              Galerija
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Utrinki z naših dogodkov, meritev in srečanj.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              layoutId={`image-${index}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                   <p className="text-white font-medium text-lg">{img.caption}</p>
                   <Maximize2 className="text-white h-6 w-6" />
                </div>
              </div>
              <div className="p-4 md:hidden">
                 <p className="text-trust-900 font-medium">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white hover:text-cardio-400 transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-10 w-10" />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.caption} 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 text-center">
                <h3 className="text-white text-2xl font-bold">{selectedImage.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalerijaPage;