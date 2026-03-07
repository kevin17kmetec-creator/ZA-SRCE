import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { getCombinedNews } from '../services/newsService';
import { NewsArticle, PageType } from '../types';

interface NewsCarouselProps {
  onNavigate: (view: PageType, param?: string | number) => void;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const allNews = await getCombinedNews();
        // Sort by date descending (newest first)
        const sortedNews = allNews.sort((a, b) => {
          // Parse dates manually since they are in "DD. Month YYYY" format or similar
          // Or just use a simple string comparison if format is YYYY-MM-DD, but it's not.
          // Let's try to parse the date string.
          // Example: "15. Oktober 2023"
          // This is tricky without a library like date-fns or moment.
          // Let's try a simple approach: extract year, month, day.
          
          const parseDate = (dateStr: string) => {
             // Basic parser for "DD. Month YYYY" or "DD. MM. YYYY"
             // If it fails, return 0
             try {
               const parts = dateStr.split(' ');
               if (parts.length >= 3) {
                 const day = parseInt(parts[0].replace('.', ''));
                 const year = parseInt(parts[parts.length - 1]);
                 const monthStr = parts[1].toLowerCase();
                 
                 let month = 0;
                 if (monthStr.includes('jan')) month = 0;
                 else if (monthStr.includes('feb')) month = 1;
                 else if (monthStr.includes('mar')) month = 2;
                 else if (monthStr.includes('apr')) month = 3;
                 else if (monthStr.includes('maj')) month = 4;
                 else if (monthStr.includes('jun')) month = 5;
                 else if (monthStr.includes('jul')) month = 6;
                 else if (monthStr.includes('avg')) month = 7;
                 else if (monthStr.includes('sep')) month = 8;
                 else if (monthStr.includes('okt')) month = 9;
                 else if (monthStr.includes('nov')) month = 10;
                 else if (monthStr.includes('dec')) month = 11;
                 else month = parseInt(monthStr.replace('.', '')) - 1; // Fallback for numeric month

                 return new Date(year, month, day).getTime();
               }
               return 0;
             } catch (e) {
               return 0;
             }
          };

          return parseDate(b.date) - parseDate(a.date);
        });
        
        setNews(sortedNews);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const nextSlide = () => {
    if (news.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === news.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (news.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? news.length - 3 : prevIndex - 1
    );
  };

  // Ensure we don't go out of bounds if news length < 3
  const visibleNews = news.length > 0 ? news.slice(currentIndex, currentIndex + 3) : [];
  
  // If we have fewer than 3 items, we just show what we have
  const displayNews = news.length < 3 ? news : visibleNews;
  
  // Adjust navigation logic for small number of items
  const canScroll = news.length > 3;

  if (loading || news.length === 0) {
    return null; // Or a loading spinner if preferred, but for a home section, hiding is often better until ready
  }

  return (
    <section className="py-8 lg:py-8 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-trust-900">Zadnje novice</h2>
          <div className="flex space-x-2">
            <button 
              onClick={prevSlide}
              disabled={!canScroll}
              className={`p-2 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors ${!canScroll ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={!canScroll}
              className={`p-2 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors ${!canScroll ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayNews.map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate('novica-details', item.id)}
              className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group h-full flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-cardio-700 shadow-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.date}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cardio-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                  {item.summary}
                </p>
                <div className="flex items-center text-cardio-600 text-sm font-medium mt-auto">
                  Preberi več <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <button 
              onClick={() => onNavigate('novice-page')}
              className="text-cardio-600 font-medium hover:text-cardio-700"
            >
                Vse novice
            </button>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
