import React, { useState, useEffect } from 'react';
import { Quote, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PageType } from '../types';
import { fetchFundacijaFromSheet, FundacijaItem } from '../services/fundacijaService';
import { motion, AnimatePresence } from 'motion/react';

interface FundacijaPageProps {
  onNavigate: (view: PageType) => void;
}

const ImageSlider: React.FC<{ images: string[], onImageClick: (img: string) => void }> = ({ images, onImageClick }) => {
  const [startIndex, setStartIndex] = useState(0);
  
  const nextSlide = () => {
    if (startIndex + 3 < images.length) {
      setStartIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  const visibleImages = images.slice(startIndex, startIndex + 3);
  const showControls = images.length > 3;

  return (
    <div className="relative mt-8 group">
      <div className="flex gap-4 overflow-hidden">
        {visibleImages.map((img, idx) => (
          <div 
            key={startIndex + idx} 
            className="flex-1 min-w-0 h-48 sm:h-64 rounded-xl overflow-hidden cursor-pointer relative"
            onClick={() => onImageClick(img)}
          >
            <img 
              src={img} 
              alt="Fundacija" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
          </div>
        ))}
        {visibleImages.length === 1 && (
            <>
                <div className="flex-1 hidden sm:block"></div>
                <div className="flex-1 hidden sm:block"></div>
            </>
        )}
        {visibleImages.length === 2 && (
            <div className="flex-1 hidden sm:block"></div>
        )}
      </div>

      {showControls && (
        <>
          <button 
            onClick={prevSlide}
            disabled={startIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-lg text-gray-800 transition-opacity ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 hover:scale-110'}`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            disabled={startIndex + 3 >= images.length}
            className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-lg text-gray-800 transition-opacity ${startIndex + 3 >= images.length ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 hover:scale-110'}`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
};

const FundacijaPage: React.FC<FundacijaPageProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<FundacijaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchFundacijaFromSheet();
      setItems(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl mb-4">
            Fundacija prim. dr. Janka Držečnika
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Podpora prihodnjim generacijam zdravnikov Medicinske fakultete v Mariboru.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          <div className="p-8 md:p-12 space-y-12">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-[#6b2121] animate-spin mb-4" />
                <p className="text-stone-600 font-medium">Nalaganje vsebine...</p>
              </div>
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="space-y-8 pb-12 border-b border-gray-100 last:border-0 last:pb-0">
                  
                  {item.mainText && (
                    <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
                      <p className="whitespace-pre-wrap">{item.mainText}</p>
                    </div>
                  )}

                  {item.quoteText && (
                    <div className="bg-stone-50 rounded-xl p-6 md:p-8 border-l-4 border-cardio-600 relative">
                      <Quote className="absolute top-4 left-4 h-8 w-8 text-cardio-200" />
                      <div className="relative z-10 pl-8">
                        <p className="text-gray-600 italic mb-4 text-lg whitespace-pre-wrap">
                          »{item.quoteText}«
                        </p>
                        {item.quoteAuthor && (
                          <footer className="text-sm font-bold text-trust-900 mt-2">
                            — {item.quoteAuthor}
                          </footer>
                        )}
                      </div>
                    </div>
                  )}

                  {item.images && item.images.length > 0 && (
                     <ImageSlider images={item.images} onImageClick={setSelectedImage} />
                  )}
                  
                </div>
              ))
            ) : (
                <div className="text-center text-gray-500 py-10">
                    Vsebina trenutno ni na voljo.
                </div>
            )}

            {/* Footer / History Note - Optional to keep or remove if it should be dynamic too.
                Keeping it dynamic might be better, we can leave it out or hardcode it at the bottom.
                Since it's not in the sheet, I'll keep the static footer at the end. */}
            <div className="border-t border-gray-100 pt-8 mt-4 text-center">
              <p className="text-gray-600 font-medium">
                Fundacija podeljuje že od leta ustanovitve vsaj eno štipendijo letno.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Prvi dve sta v študijskem letu 2005/06 dobila Martina Babič in Robi Kelc.
              </p>
            </div>

          </div>
        </div>
      </div>

       {/* Lightbox Modal */}
       <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage}
                alt="Povečana slika" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FundacijaPage;