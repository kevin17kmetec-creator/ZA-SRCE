import React, { useState, useEffect } from 'react';
import { Activity, Tv, FileText, ArrowRight, Video, Loader2 } from 'lucide-react';
import { PageType } from '../types';
import { fetchMinuteZaSrceFromSheet, MinuteItem } from '../services/minuteZaSrceService';

interface MinuteZaSrcePageProps {
  onNavigate: (view: PageType) => void;
}

const MinuteZaSrcePage: React.FC<MinuteZaSrcePageProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<MinuteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchMinuteZaSrceFromSheet();
        setItems(data);
      } catch (error) {
        console.error('Failed to load Minute za srce:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#6b2121] py-8 text-white border-b-4 border-cardio-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Minute za srce
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Koristne informacije, zanimivosti in medijske objave.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
          
          <div className="p-8 md:p-12">
            
            <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
               <div className="bg-cardio-50 p-2 rounded-lg mr-3">
                 <FileText className="h-6 w-6 text-cardio-600" />
               </div>
               <h2 className="text-2xl font-bold text-trust-900">Zanimivosti</h2>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-10 w-10 text-cardio-600 animate-spin" />
                </div>
              ) : items.length > 0 ? (
                items.map((item, index) => {
                  const isVideo = item.link.includes('video') || item.link.includes('youtube');
                  
                  return (
                    <div key={index} className="group bg-stone-50 rounded-xl p-6 border border-stone-200 hover:border-cardio-300 hover:shadow-md transition-all">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {isVideo ? (
                             <Video className="h-6 w-6 text-cardio-600" />
                          ) : (
                             <FileText className="h-6 w-6 text-trust-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-trust-900 mb-2 group-hover:text-cardio-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 whitespace-pre-wrap">
                            {item.subtitle}
                          </p>
                          {item.link === 'video-player' ? (
                             <button 
                               onClick={() => onNavigate('video-player')}
                               className="text-cardio-600 font-medium text-sm inline-flex items-center hover:underline cursor-pointer"
                             >
                               Ogled videoposnetka <ArrowRight className="ml-1 h-3 w-3" />
                             </button>
                          ) : item.link ? (
                             <a 
                               href={item.link} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-cardio-600 font-medium text-sm inline-flex items-center hover:underline"
                             >
                               Preberi več <ArrowRight className="ml-1 h-3 w-3" />
                             </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 py-10">
                  Trenutno ni objav.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MinuteZaSrcePage;