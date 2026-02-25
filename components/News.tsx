
import React, { useState, useEffect } from 'react';
import { getCombinedNews } from '../services/newsService';
import { Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { PageType, NewsArticle } from '../types';

interface NewsProps {
  onNavigate: (view: PageType, param?: string | number) => void;
}

const News: React.FC<NewsProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const combinedNews = await getCombinedNews();
        setNews(combinedNews);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Show only top 4 as requested
  const homeNews = news.slice(0, 4);

  return (
    <section id="news" className="py-16 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-trust-900">Aktualno</h2>
            <p className="mt-2 text-lg text-gray-500">Zadnje novice in dogodki društva.</p>
          </div>
          <button 
            onClick={() => onNavigate('novice-page')}
            className="hidden md:flex items-center text-cardio-600 font-bold hover:text-cardio-700 whitespace-nowrap transition-colors cursor-pointer"
          >
            Vse novice <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-cardio-600 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {homeNews.map((item) => (
              <article 
                key={item.id} 
                className="flex flex-col bg-stone-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-stone-100 group"
              >
                <div className="flex-shrink-0 relative overflow-hidden">
                  <img 
                    className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    src={item.image} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/90 text-cardio-700 shadow-sm backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center text-xs text-gray-400 mb-3">
                      <Calendar className="flex-shrink-0 mr-1.5 h-3.5 w-3.5" />
                      <p>{item.date}</p>
                    </div>
                    <h3 className="text-lg font-bold text-trust-900 leading-tight mb-2 group-hover:text-cardio-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <button 
                      onClick={() => onNavigate('novica-details', item.id)}
                      className="text-xs font-bold text-cardio-600 hover:text-cardio-700 flex items-center transition-colors cursor-pointer"
                    >
                      Preberi več <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center md:hidden">
           <button 
            onClick={() => onNavigate('novice-page')}
            className="inline-flex items-center px-6 py-3 border border-cardio-600 rounded-full text-cardio-600 font-bold hover:bg-cardio-50 transition-colors cursor-pointer"
          >
            Vse novice <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
