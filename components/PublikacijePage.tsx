import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { PageType } from '../types';
import { fetchPublicationsFromSheet, Publication } from '../services/publicationService';

interface PublikacijePageProps {
  onNavigate: (view: PageType) => void;
}

const PublikacijePage: React.FC<PublikacijePageProps> = ({ onNavigate }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPublicationsFromSheet();
      setPublications(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Publikacije
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Izdajateljska dejavnost društva in pomembne objave.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          
          <div className="p-8 md:p-12 space-y-10">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-10 w-10 text-[#6b2121] animate-spin mb-4" />
                <p className="text-stone-600 font-medium">Nalaganje publikacij...</p>
              </div>
            ) : (
              publications.map((pub, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-8">
                   <div className="flex-shrink-0 mt-1">
                     <div className="bg-cardio-50 p-3 rounded-lg">
                        <FileText className="h-8 w-8 text-cardio-600" />
                     </div>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-trust-900 mb-2">{pub.title}</h3>
                     {pub.subtitle && (
                       <p className="text-gray-700 font-medium mb-3">
                         {pub.subtitle}
                       </p>
                     )}
                     <div className="mt-4">
                        <button 
                          onClick={() => onNavigate('objave-vecer', encodeURIComponent(pub.link))}
                          className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-cardio-600 hover:bg-cardio-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardio-500 transition-colors cursor-pointer"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          {pub.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                        <p className="text-xs text-gray-500 mt-2 ml-1">
                          Ogled digitaliziranih strani priloge.
                        </p>
                     </div>
                   </div>
                </div>
              ))
            )}

            {/* Static Publication */}
            <div className="flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-8">
               <div className="flex-shrink-0 mt-1">
                 <div className="bg-blue-50 p-3 rounded-lg">
                    <ExternalLink className="h-8 w-8 text-blue-600" />
                 </div>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-trust-900 mb-2">Publikacije Zveze Slovenskega društva ZA SRCE Slovenije</h3>
                 <a 
                   href="https://zasrce.si/rubrika/publikacije/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-cardio-600 text-lg font-medium hover:underline flex items-center mt-2"
                 >
                   Publikacije s spletne strani Slovenskega društva ZA SRCE
                   <ExternalLink className="ml-2 h-4 w-4" />
                 </a>
               </div>
            </div>

            {/* Additional Info */}
            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-trust-800">
              <p className="text-gray-700 leading-relaxed text-lg">
                Ob jubilejni izdaji revije <span className="font-semibold text-trust-900">Mariborski srčni utrip</span> ob 20-letnici društva je izšla tudi posebna priloga Večera <span className="font-semibold">FOKUS</span>, nekaj prispevkov pa je bilo objavljeno tudi v reviji Seniorji.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PublikacijePage;