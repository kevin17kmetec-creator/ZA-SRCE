import React, { useState, useRef, MouseEvent } from 'react';
import { ArrowLeft, BookOpen, Info, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { PageType } from '../types';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Nastavitev workerja za react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ObjaveVecerPageProps {
  onNavigate: (view: PageType) => void;
}

const ObjaveVecerPage: React.FC<ObjaveVecerPageProps> = ({ onNavigate }) => {
  // Nova URL povezava do PDF datoteke
  const pdfUrl = "https://zxwy5mkhvcay6fpb.public.blob.vercel-storage.com/Mariborski%20sr%C4%8Dni%20utrip.pdf";
  
  // Dinamično pridobivanje imena iz URL-ja
  const urlParts = pdfUrl.split('/');
  const rawFilename = urlParts[urlParts.length - 1];
  const decodedFilename = decodeURIComponent(rawFilename);
  // Odstranimo končnico (vse od pike dalje)
  const title = decodedFilename.split('.')[0];

  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState<number>(1.2);
  
  // Stanja za premikanje (pan) z miško
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  // Funkcije za premikanje (pan) z miško
  const handleMouseDown = (e: MouseEvent) => {
    if (!containerRef.current || scale <= 1.0) return; // Premikanje omogočeno samo pri povečavi
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current || scale <= 1.0) return;
    e.preventDefault();
    const walkX = (e.clientX - startX) * 1.5; // Hitrost premikanja
    const walkY = (e.clientY - startY) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  return (
    <div className="bg-stone-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#1a1a1a] py-4 md:py-6 text-white shadow-lg z-20 border-b border-white/10 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => onNavigate('publikacije')}
              className="flex items-center text-gray-400 hover:text-white transition-colors font-medium cursor-pointer group whitespace-nowrap"
            >
              <ArrowLeft className="h-5 w-5 mr-1 md:mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Nazaj na Publikacije</span>
              <span className="sm:hidden">Nazaj</span>
            </button>
            
            <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
               {/* Prazno območje, kot ste želeli */}
            </div>

            <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
               <span className="text-xs md:text-sm font-medium text-gray-400 mr-2">
                 {numPages ? `1 publikacija (${numPages} strani)` : 'Nalaganje...'}
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Glavno območje - ENA VELIKA KARTICA */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 flex justify-center items-start">
         
         {/* ENA KARTICA, KI DELUJE KOT PDF PREGLEDOVALNIK */}
         <div className="w-full max-w-5xl h-[200vh] bg-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-400 relative">
            
            {/* Glava kartice (SVETLO ZELEN KVADRATEK) */}
            <div className="bg-white p-4 border-b border-stone-300 flex justify-between items-center flex-shrink-0 z-10 shadow-sm">
               <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-cardio-600" />
                  {/* Dinamičen naslov iz URL-ja */}
                  <h2 className="font-bold text-stone-800 text-lg">{title}</h2>
               </div>
               
               {/* Orodna vrstica za Zoom in informacije */}
               <div className="flex items-center gap-4">
                 <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200">
                    <button onClick={handleZoomOut} className="p-1.5 hover:bg-white rounded-md transition-all shadow-sm" title="Zmanjšaj">
                      <ZoomOut className="h-5 w-5 text-stone-700" />
                    </button>
                    <span className="text-sm font-bold text-stone-600 w-16 text-center select-none">
                      {Math.round((scale / 1.2) * 100)}%
                    </span>
                    <button onClick={handleZoomIn} className="p-1.5 hover:bg-white rounded-md transition-all shadow-sm" title="Povečaj">
                      <ZoomIn className="h-5 w-5 text-stone-700" />
                    </button>
                 </div>
                 
                 <div className="hidden sm:flex items-center gap-2 text-sm text-stone-500 bg-stone-100 px-4 py-2 rounded-full font-medium">
                    <Info className="h-4 w-4" />
                    <span>Pomikajte se navzdol po dokumentu</span>
                 </div>
               </div>
            </div>

            {/* Notranje območje s PDF-jem (Custom viewer) */}
            <div 
              ref={containerRef}
              className={`flex-grow overflow-auto bg-[#323639] p-4 md:p-8 ${scale > 1.0 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-auto'}`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
               <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex flex-col gap-8"
                  loading={
                    <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                      <Loader2 className="h-8 w-8 animate-spin mb-4" />
                      <p>Nalaganje dokumenta...</p>
                    </div>
                  }
                  error={
                    <div className="flex flex-col items-center justify-center h-64 text-red-400">
                      <p>Napaka pri nalaganju PDF dokumenta.</p>
                    </div>
                  }
               >
                  {numPages && Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="shadow-2xl bg-white mx-auto w-max">
                      <Page 
                        pageNumber={index + 1} 
                        scale={scale} 
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={
                          <div className="flex items-center justify-center bg-stone-100 text-stone-400" style={{ width: 595 * scale, height: 842 * scale }}>
                             <Loader2 className="h-6 w-6 animate-spin" />
                          </div>
                        }
                      />
                    </div>
                  ))}
               </Document>
            </div>
         </div>

      </div>
    </div>
  );
};

export default ObjaveVecerPage;
