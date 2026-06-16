import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Maximize2, Loader2, FolderHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';
import { fetchGalleryFromSheet, GalleryAlbum, GalleryImage } from '../services/galleryService';

interface GalerijaPageProps {
  onNavigate: (view: PageType) => void;
}

const GalerijaPage: React.FC<GalerijaPageProps> = ({ onNavigate }) => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await fetchGalleryFromSheet();
      setAlbums(data);
      setLoading(false);
    };
    loadImages();
  }, []);

  const clearSelection = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImage) {
      setSelectedImage(null);
    } else if (selectedAlbum) {
      setSelectedAlbum(null);
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
       {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={clearSelection}
            className="absolute top-8 left-4 md:left-8 flex items-center text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Nazaj
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              {selectedAlbum ? selectedAlbum.title : 'Galerija'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {selectedAlbum ? `Vse slike za album ${selectedAlbum.title}` : 'Utrinki z naših dogodkov, meritev in srečanj.'}
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
        ) : albums.length > 0 ? (
          <AnimatePresence mode="wait">
            {!selectedAlbum ? (
              // ALBUMS VIEW
              <motion.div 
                key="albums-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {albums.map((album, index) => {
                  const previewImages = album.images.slice(0, 4);
                  return (
                    <motion.div 
                      key={album.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-all cursor-pointer overflow-hidden pb-4"
                      onClick={() => setSelectedAlbum(album)}
                    >
                      <div className="p-4 flex items-center justify-between border-b border-stone-100 bg-stone-50">
                         <h3 className="text-xl font-bold text-trust-900 truncate">{album.title}</h3>
                         <div className="flex items-center text-cardio-500 text-sm font-medium">
                           <FolderHeart className="w-5 h-5 mr-1.5" />
                           {album.images.length} 
                         </div>
                      </div>
                      <div className={`p-4 grid gap-2 ${previewImages.length > 1 ? (previewImages.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2') : 'grid-cols-1'} h-64`}>
                        {previewImages.map((img, i) => (
                           <div key={i} className="relative overflow-hidden rounded-xl h-full w-full">
                             <img 
                              src={img.src} 
                              alt={img.caption || `${album.title} slika preview ${i}`} 
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                             />
                           </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              // INSIDE ALBUM VIEW (IMAGES)
              <motion.div 
                key="images-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {selectedAlbum.images.map((img, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl shadow overflow-hidden border border-stone-100 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={img.src} 
                        alt={img.caption || `Slika ${index + 1}`} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                         <Maximize2 className="text-white h-6 w-6" />
                      </div>
                    </div>
                    {/* Caption area */}
                    <div className="p-4 bg-white border-t border-stone-100">
                      <p className="text-trust-900 font-medium text-center truncate">{img.caption || `Slika ${index + 1}`}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-stone-200">
            <p className="text-stone-500 text-lg">V galeriji trenutno ni albumov.</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] bg-black/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-8 w-8" />
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
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {selectedImage.caption && (
                <div className="mt-6 text-center bg-black/50 px-6 py-2 rounded-full">
                  <h3 className="text-white text-xl font-medium">{selectedImage.caption}</h3>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalerijaPage;