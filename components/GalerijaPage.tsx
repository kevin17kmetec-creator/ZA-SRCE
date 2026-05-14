import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Maximize2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';
import { fetchGalleryFromSheet, GalleryImage } from '../services/galleryService';

interface GalerijaPageProps {
  onNavigate: (view: PageType) => void;
}

const GalerijaPage: React.FC<GalerijaPageProps> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await fetchGalleryFromSheet();
      setImages(data);
      setLoading(false);
    };
    loadImages();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
       {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600 relative">
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-[#6b2121] animate-spin mb-4" />
            <p className="text-stone-600 font-medium">Nalaganje galerije...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, index) => (
              <motion.div 
                key={index} 
                layoutId={`image-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-100 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.caption || `Galerija ${index + 1}`} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                     <p className="text-white font-medium text-lg">{img.caption || `Slika ${index + 1}`}</p>
                     <Maximize2 className="text-white h-6 w-6" />
                  </div>
                </div>
                {img.caption && (
                  <div className="p-4 md:hidden">
                    <p className="text-trust-900 font-medium">{img.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-stone-200">
            <p className="text-stone-500 text-lg">V galeriji trenutno ni slik.</p>
          </div>
        )}
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
                loading="lazy"
                decoding="async"
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